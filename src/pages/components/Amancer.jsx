/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 ./src/Amancer.glb
*/

import React, { useRef } from 'react'
import { useGLTF, Sparkles } from '@react-three/drei'

export function Amancer(props) {
  const { nodes, materials } = useGLTF('/Amancer.glb')
  return (
    <group {...props} dispose={null}>
      <Sparkles count={100} scale={1} size={10} speed={1} />
      <mesh geometry={nodes.Tunic.geometry} material={materials.SleevedMat}  position={[.7, -2.3, -2.5]}  scale={0.02} />
    </group>
  )
}

useGLTF.preload('/Amancer.glb')