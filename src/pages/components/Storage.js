import './components.css'

export default function Storage(props){
  return(
    <div  className="storage-item" >
      <img width='100%'src={props.image} />
      <h2>{props.title}</h2>
    </div>
  )
}