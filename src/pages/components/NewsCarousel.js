


export const NewsCarousel =(props)=>{
  return(
    <div 
    className="news-carousel" style={{backgroundImage: `linear-gradient(to bottom, transparent, #0A0A0A), url(${props.image})`}}>
      <div className="car-content">
          <h1>{props.title}</h1>
          <hr></hr>
          <p>{props.content}</p>
      </div>
    </div>
  )
}