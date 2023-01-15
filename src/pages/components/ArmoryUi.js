import { useState } from "react"
import  UserTag  from "./UserTag"
import Storage from "./Storage";
import { Html, Stats } from "@react-three/drei";
import './components.css'

export default function ArmoryUI(props){
  const [active, SetActive] = useState(false)
  
  return(
    <>
      <div className="main-ui">
        <UserTag />
        <div className="storage">
          <div className="main-data">
            <h1>Name</h1>
            <div className="metadata">
              <h1>Voe's Cowl</h1>
            </div>
          </div>
          <div className="main-data">
            <h1>Type</h1>
            <div className="metadata">
              <h1>Garment</h1>
            </div>
          </div>
          <div className="main-data">
            <h1>Rarity</h1>
            <div className="metadata">
              <h1>Prosaic</h1>
            </div>
          </div>
          <div className="attributes2">
            <div className="attr-box2"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/2258px-Love_Heart_SVG.svg.png" />VITALITY: {props.vitality}</div>
            <div className="attr-box2"><img src='https://www.pngkey.com/png/full/98-987560_brain-icon-png-brain-clipart-black-and-white.png'/>SAGACITY: {props.sagacity}</div>
            <div className="attr-box2"><img src='https://assets.stickpng.com/images/5871675d7b7f6103e35c6c88.png'/>PIETY: {props.piety}</div>
            <div className="attr-box2"><img src='http://cdn.onlinewebfonts.com/svg/img_81086.png'/>CELERITY: {props.celerity}</div>
          </div>
          <div className="lore-armory">
            <p>Belonging to the Ethereal Paintress, Voe, the cowl seems to contain a mote of her power. With a stroke, the paintress alters the fates for friend and foe alike. What a haunting hobby.</p>
          </div>
          <div className="cycle">
            <h1>Prev</h1>
            <h1>Next</h1>
          </div>
        </div>
      </div>
    </>
    )
}