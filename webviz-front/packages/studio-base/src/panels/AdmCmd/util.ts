import ReconnectingWebSocket from "reconnecting-websocket"
const wsMap = new Map<string,ReconnectingWebSocket>();
export function useWebsocket(url:string){
  let ws = wsMap.get(url);
  if(!ws){
    ws = new ReconnectingWebSocket(url);
    ws.onerror = (err)=>console.log("err：", err)
    ws.onclose = (e)=>console.log("close:",e)
    wsMap.set(url,ws)
  }
  return ws;
}
