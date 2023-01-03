import { useState } from 'react';
import { useAccount } from 'wagmi'


let mint;

export const MintButton =()=>{
  const[mintState, setMintState] = useState(null)

  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  
  if(isConnected){
    mint = 'Coming Soon'
  } else if (isConnecting){
    mint =' Connecting'
  } else{
    mint ='Please Connect Wallet'
  }

  return (
    <button className='mint-btn'>{mint}</button>
  )
}