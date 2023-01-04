import { OrbitControls, OrthographicCamera, PerspectiveCamera, PositionalAudio,Environment  } from '@react-three/drei'
import { Canvas, ambientLight, pointLight, useFrame, fog,camera, meshPhongMaterial, } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { OldModel } from './Model';
import { motion } from "framer-motion";
import '../styles/render.css'
import { useRef, useMemo } from 'react';
import  ArmoryUI from './components/ArmoryUi';
import Loader from './components/LoadingScreen';
import { Suspense, } from 'react';
import { Model } from './GirlAnimation';





let Random = Math.random;
let count;

export default function Render(props){



  return(
  <motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7 }}
  className='render'
  > 
    <Canvas  shadows  camera={{ position: [0, 0, 25], fov: 40}} style={{height: '100%', width: '100%'}}>
      <Suspense fallback ={<Loader />}>
        <ambientLight intensity={0.2} />
        <OrbitControls />
        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={40} bokehScale={1} height={1920} />
          <Bloom luminanceThreshold={.4} luminanceSmoothing={.8} height={1920} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={.8} />
        </EffectComposer>
        <Environment
            files={'/env.hdr'} 
            background
            resolution={512}
          />
        <spotLight rotation={[-Math.PI / 2, 0, 0]} intensity={.7} color="pink" position={[10, -40, 10]} />
        <spotLight rotation={[Math.PI / 1, 0, 0]} intensity={1.5} color="white" position={[-50, 0, 60]} />
        <Model  shadows castShadows scale={11} position ={[10,-10,-8]}  />
      </Suspense>
    </Canvas>
    <ArmoryUI  />
  </motion.div>
  )
}