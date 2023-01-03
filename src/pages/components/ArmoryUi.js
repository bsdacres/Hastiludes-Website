import { useState } from "react"
import  UserTag  from "./UserTag"
import Storage from "./Storage";
import { Html, Stats } from "@react-three/drei";
import './components.css'

export default function ArmoryUI(){
  const [active, SetActive] = useState(false)
  
  return(
    <>
      <div className="main-ui">
        <UserTag />
        <div className="storage">
        </div>
      </div>
      <div className="stats">
        <h2>Stats</h2>
        <hr />
        <br></br>
          <div className="attributes">
            <div className="attr-box">VITALITY: 90</div>
            <div className="attr-box">SAGACITY: 45</div>
            <div className="attr-box">PIETY: 66</div>
            <div className="attr-box">CELERITY: 70</div>
          </div>
      </div>
    </>
    )
}