import { OrbitControls, Environment, Stars, Sky,Sparkles, useProgress, Html, CameraShake  } from '@react-three/drei'
import { Canvas, ambientLight, pointLight, useFrame, fog,camera, meshPhongMaterial, } from '@react-three/fiber'
import { motion } from "framer-motion";
import '../styles/render.css'
import { useRef, useEffect, useState } from 'react';
import  ArmoryUI from './components/ArmoryUi';
import { Suspense, } from 'react';
import { EffectComposer, RenderPass, ReinhardToneMappingPass } from 'three-effectcomposer';
import { Amancer } from './components/Amancer';
import { Voe } from './components/Voe';




let Random = Math.random;
let count;


export default function Render(props){
  const {progress} = useProgress();
  const [show, setShow] = useState(true)

  return(
  <motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7 }}
  className='render'
  > 
    <Canvas  shadows flat camera={{ position: [0, 0, 10], fov: 40}} style={{height: '100%', width: '100%'}}>
      <Suspense fallback ={<Html>{progress}% Loaded</Html>}>
        <hemisphereLight  intensity={1} color={('blue','white')}/>
        <OrbitControls />
        <CameraShake
        maxYaw={0.05} // Max amount camera can yaw in either direction
        maxPitch={0.05} // Max amount camera can pitch in either direction
        maxRoll={0.05} // Max amount camera can roll in either direction
        yawFrequency={0.1} // Frequency of the the yaw rotation
        pitchFrequency={0.1} // Frequency of the pitch rotation
        rollFrequency={0.1} // Frequency of the roll rotation
        intensity={1} // initial intensity of the shake
        decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
      />
        <spotLight rotation={[-Math.PI / 2, 10, 0]} intensity={1} color="white" position={[10, -20, 30]} />
        <spotLight rotation={[Math.PI / 1, 10, 10]} intensity={.1} color="red" position={[-50, -50, 60]} />
        <spotLight rotation={[-Math.PI / 2, 10, 0]} intensity={1} color="orange" position={[10,  20, 0]} />
        <spotLight rotation={[Math.PI / 1, 0, 0]} intensity={.5} color="blue" position={[0, 30, 0]} />
        {show && <Voe shadows castShadows scale={20} position ={[0,0,0]}  />}
        {!show && <Amancer shadows castShadows scale={20} position ={[0,0,0]}  />}
      </Suspense>
    </Canvas>
    <ArmoryUI />
  </motion.div>
  )
}