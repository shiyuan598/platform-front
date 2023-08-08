import FfmpegH264Decoder from './H264Decoder'


const libavH264URL = new URL("@zhito/libav/libav-h264.js", import.meta.url)
/**
 * @type {{'libav-h264.wasm'}}
 */
const assets = {
  'libav-h264.js': libavH264URL,
  'libav-h264.wasm':  new URL("@zhito/libav/libav-h264.wasm.asset", import.meta.url).pathname,
  'libav-h264.worker.js':  new URL("@zhito/libav/libav-h264.worker.js", import.meta.url).pathname
}
declare var self: WorkerGlobalScope & typeof globalThis & {Module:any};
//@ts-ignore
self.Module = {
  //@ts-ignore
  locateFile: path => assets[path],
  mainScriptUrlOrBlob: libavH264URL
}
importScripts(libavH264URL)

/**
 * @type {Object.<number,FfmpegH264Decoder>}
 */
const h264Decoders:Record<string,FfmpegH264Decoder> = {}

function loadNativeModule () {
  return new Promise(resolve => {
    //@ts-ignore
    if (Module.calledRun) {
      //@ts-ignore
      resolve()

    } else {
      //@ts-ignore
      Module.onRuntimeInitialized = () => resolve()
    }
  })
}

async function init () {
  await loadNativeModule()

  //@ts-ignore
  self.addEventListener('message', ({ data: { data, length, offset, renderStateId, type,messageId } }) => {
    switch (type) {
      case 'decode': {
        let decoder = h264Decoders[renderStateId]
        if (!decoder) {
          decoder = new FfmpegH264Decoder(
            self.Module,
            (output:Uint8Array, width:number, height:number,messageId:number) => {
              postMessage({
                type: 'pictureReady',
                width,
                height,
                renderStateId,
                data: output.buffer,
                messageId
              }, [output.buffer])
            },
            () => postMessage({ type: 'needMoreData' }),
            (errorCode:number,messageId:number) => postMessage({ type: 'error', errorCode,messageId }))
          h264Decoders[renderStateId] = decoder
        }
        decoder.decode(data,messageId)
        break
      }
      case 'release': {
        const decoder = h264Decoders[renderStateId]
        if (decoder) {
          decoder.release()
          delete h264Decoders[renderStateId]
        }
        break
      }
    }
  })
  self.postMessage({ 'type': 'decoderReady' })
}

init()
