import { extend, useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass })

export default function Effects() {
  const composer = useRef<EffectComposer>()
  const { scene, gl, size, camera } = useThree()
  useEffect(() => composer.current?.setSize(size.width, size.height), [size])
  useFrame(() => composer.current?.render(), 2)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass attachArray="passes" args={[FXAAShader]} material-uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
      {/*@ts-ignore*/}
      <unrealBloomPass attachArray="passes" args={[undefined, 0.4, 1, 0]} />
    </effectComposer>
  )
}
