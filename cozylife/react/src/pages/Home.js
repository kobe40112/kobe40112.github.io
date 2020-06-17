import React from 'react'
import BackgroundVide from '../components/BackgroundVideo'
import Popslide from '../components/Popslide'
import Newapro from '../components/Newapro'
import { Row, Col } from 'react-bootstrap'


function Home() {
  return (
    <>
      <BackgroundVide />
      <div className="pb-5 newArrival">
        <h4 className="mt-5">NEW ARRIVALS</h4>
      </div>

      <Newapro />

      <div className="pb-5 newArrival">
        <h4 className="mt-5">POPULAR PRODUCT</h4>
      </div>
      
      <Popslide />
    
      <div className="aboutCO">
        <div className="aboutCOtext">
          <h4>ABOUT COZY LIFE</h4>
          {/* <h6>Suggested trips from Taichung City</h6> */}
        </div>
      </div>
    </>
  )
}

export default Home
