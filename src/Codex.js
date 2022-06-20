import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import './about.css'

export default function Codex(props) {

    const info ="Behold Mikla, the Wing Ridden, a central protagonist from the world of covenaunt"

    
    const [isTrue, SetisTrue] = useState(false)
    function handleClick() {
        SetisTrue(prevState => !prevState)
    }
    return(
            <motion.div
            
            initial={{height: 0}}
            animate ={{height: "100%"}}
            exit ={{y: window.innerWidth, transition: {duration: 3}}}


            className="backdrop">
                <div className="main" onClick={handleClick}>
                    <div className="card-1" >
                        <div 
                        className="text-card" style={{display: isTrue ? 'block' : 'none'}} onClick={handleClick}>
                            <h1 className="title">Mikla, the Wing Ridden King</h1>
                            <p className="lore">
                            A descendant of the lesser Human and Besmirched Noblity, Mikla was raised to be am Augur, though his lust for war and conquest would see him forsake his gift in favor of claiming a domain of his own. He would Assume the epithet, The Wing Ridden, upon slaying the mythical angel Serapis.
                            </p>
                        </div>  
                    </div>
                    <div className="card-4" >
                        <div className="text-card" style={{display: isTrue ? 'block' : 'none'}}>
                            <h1 className="title">Mother Cybele, the Doyenne</h1>
                            <p className="lore">
                            Mother of gods, Cybele sought beyond her sundered heart through divine blessing she and her kind are raised to the peerage to sit as equals to Throne of Ourenris. Her sons, Edelid and Adelim now inherit a vast domain, christened the Yoked Lands.  
                            </p>
                        </div>
                    </div>  
                    <div className="card-2" >
                        <div className="text-card" style={{display: isTrue ? 'block' : 'none'}}>
                            <h1 className="title"> Edelid and Aedelim, the Ovate Princes</h1>
                            <p className="lore">
                            Emerging from the Ovate Curio, the twin brothers, Edelid and Aedelim are a byproduct of Cybele who served as a surrogate mother for the pair. Edelid and Adelim are identical twins with only their hair color differing. Edelid was stillborn, being resurrected by his brother Adelim, though as a result, his once golden hair is now black with streaks of grey.
                            </p>
                        </div>  
                    </div>
                    <div className="card-3" >
                        <div className="text-card" style={{display: isTrue ? 'block' : 'none'}}>
                            <h1 className="title">Auberon, the Pecant Demiurge</h1>
                            <p className="lore">
                            Before his ascencion to the Eldritch Peerage, Auberon served as a servant of the Emanations - carrying out their will without question. It would be through perversion that the humble pygmy would find himself an equal of the gods he once served. 
                            </p>
                        </div>  
                    </div>
                    <h3 className="flicker">{isTrue ? "": 'Click to Learn'}</h3>
                </div>
            </motion.div>
    )
}