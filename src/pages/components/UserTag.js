import { useAccount } from 'wagmi'
import './components.css'


const UserTag =()=>{
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  let UserAddress = `Welcome User: ${address}`

  return(
    <div className='tag'>
      {UserAddress}
    </div>
  )
};

export default UserTag;