import './components.css'
import { Button } from './Button'
let date = new Date().now

export default function NewsComponent(props){
  
 
  return(
    <>
      <div className="news-con">
        <div className="image-container" style={{backgroundImage: `url(${props.thumbnail})`}}>
         
        </div>
        <div className="news-txt-container">
          <h1>{props.title}</h1>
          <h4>{props.date}</h4>
          <p>{props.preview}</p>
        </div>
        <Button
        label ='Read More'
        />
      </div>
    </>
  )
}