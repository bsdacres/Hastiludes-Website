import { useState, useContext } from "react"
import  UserTag  from "./UserTag"
import Storage from "./Storage";
import { Html, Stats } from "@react-three/drei";
import './components.css'
import { useGarmentStore } from "../Context";


const items = [
  {
      "name": "Voe's Cowl",
      "type": "garment",
      "rarity": "Fabled",
      "description": "Belonging to the Ethereal Paintress, Voe, the cowl seems to contain a mote of her power. With a stroke, the paintress alters the fates for friend and foe alike. What a haunting hobby.",
      "attributes": [
          {
              "vitality": 90,
              "sagacity": 90,
              "piety": 90,
              "celerity": 90
          }
      ]
  },
  {
      "name": "Amanecer Tunic",
      "type": "garment",
      "rarity": "Prosaic",
      "description": "Long and following like the wind, the Amanecer Tunic is an ode to the coming day: it is an Ode to Aether",
      "attributes": [
          {
              "vitality": 90,
              "sagacity": 10,
              "piety": 87,
              "celerity": 56
          }
      ]
  }
]

export default function ArmoryUI(props){
  let garmentStore = useGarmentStore(state => state.showGarment)
  let nextGarmentStore = useGarmentStore((state) => state.nextGarmentStore)
  let prevGarmentStore = useGarmentStore((state) => state.prevGarmentStore) 
  console.log(nextGarmentStore)

  return(
    <>
      <div className="main-ui">
        <UserTag />
        <div className="storage">
          <div className="main-data">
            <h1>Name</h1>
            <div className="metadata">
              <h1>{items[garmentStore].name}</h1>
            </div>
          </div>
          <div className="main-data">
            <h1>Type</h1>
            <div className="metadata">
              <h1>{items[garmentStore].type}</h1>
            </div>
          </div>
          <div className="main-data">
            <h1>Rarity</h1>
            <div className="metadata">
              <h1>{items[garmentStore].rarity}</h1>
            </div>
          </div>
          <div className="attributes2">
            <div className="attr-box2"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/2258px-Love_Heart_SVG.svg.png" />VITALITY: {items[garmentStore].attributes[0].vitality}</div>
            <div className="attr-box2"><img src='https://www.pngkey.com/png/full/98-987560_brain-icon-png-brain-clipart-black-and-white.png'/>SAGACITY: {items[garmentStore].attributes[0].sagacity}</div>
            <div className="attr-box2"><img src='https://assets.stickpng.com/images/5871675d7b7f6103e35c6c88.png'/>PIETY: {items[garmentStore].attributes[0].piety}</div>
            <div className="attr-box2"><img src='http://cdn.onlinewebfonts.com/svg/img_81086.png'/>CELERITY: {items[garmentStore].attributes[0].celerity}</div>
          </div>
          <div className="lore-armory">
            <p>{items[garmentStore].description}</p>
          </div>
          <div className="cycle">
            <button onClick={prevGarmentStore} >
              <h1>Prev</h1>
            </button>
            <button onClick={nextGarmentStore}>
              <h1>Next</h1>
            </button>
          </div>
        </div>
      </div>
    </>
    )
}