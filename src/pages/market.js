import '../styles/marketplace.css'

const cards = [{
  image: '/card-1.png',
  title:'Auberon, Pecant Demiurge'
},
{
  image: '/card-2.png',
  title:'Edelid and Aedelim, the Precocious Godlines'
},
{
  image: '/card-3.png',
  title:'Mikle, the Wing Ridden King'
},
{
  image: '/card-4.png',
  title:'The Doyenne'
},
]


const CardsComponent =(props)=>{
  return(
    <div className='cards' style={{backgroundImage:`url(assets/${props.image})`}}>
        <div className='mock-card'>
        <h3>{props.title}</h3>
          <div className='price'>
            <p>Price</p>
              <div className='price-num'>
                <h2>3500</h2>
                <h3>VLX</h3>
                <button className='mint-btn'>Buy Now</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default function Market() {
  return(
    <div className='market-layout'>
      <div className='market-main'>
        <h1>Coming Soon</h1>
      </div>
    </div>
  )
}