import React from 'react'
import Image from '../components/Image'
//import { Link } from 'react-router-dom'

function Brand() {
  const videoSource = require('../img/homeVideo.mp4');
  return (
    <>
      <div id="app">
        
        <div className="Brandphoto">
          <div className="Brandtext">
            
            <p>Cozy Life</p>
          </div>
        
           <div className="bannerAboutTop">
            <div className="bannerAbout">
              <video autoPlay="autoplay" loop="loop" muted >
                <source src={videoSource} type="video/mp4" className="sourcepro" />
                Your browser does not support the video tag.
              </video>     
                <i className="fa fa-copyright" aria-hidden="true"></i>
            </div>
          </div>
          <img src={require('../img/a3.jpg')} alt="Background" className="Brandimg"/>
          {/* <img src="https://fakeimg.pl/1344x800/" className="Brandimg" /> */}
        </div>

        <div className="BrandContent">
          <div className="BrandCon1">
            <div className="BrandCon2">
              <h2 className="conh4">品牌理念</h2>
              <p>
              科技令生活步調加快，購物講求便捷與效率。<br />
              抗疫期間人們更加依賴電商購物，待在家裡的<br />
              時間變多了，也比以往更重視居家生活，<br />
              Cozy Life提供眾多居家選物，讓使用者<br />
              輕鬆打造舒適好宅。
              </p>
            </div>
          </div>
        </div>
        <div className="BrandFour">
          <div className="Brandh2">
            <h2>品牌</h2>
            <div id="slick">
              <img src={require('../img/b1.jpg')} alt="Background" className="Brandimg"/>
              <img src={require('../img/b2.jpg')} alt="Background" className="Brandimg"/>
              <img src={require('../img/b3.jpg')} alt="Background" className="Brandimg"/>
              <img src={require('../img/b4.jpg')} alt="Background" className="Brandimg"/>
              <img src={require('../img/b5.jpg')} alt="Background" className="Brandimg"/>
              <img src={require('../img/b6.jpg')} alt="Background" className="Brandimg"/>
            </div>
          </div>
        </div>
      <div className="BrandSix">
        <div className="Sixh2">
            <h2 >CozyLife 團隊</h2>
        </div>
          <div className="Brandteam">
            <div className="Brandman"> 
              <Image img="https://i.imgur.com/qmlZUen.jpg"/>
              {/* <img src={require('../img/c1.jpg')} alt="Background" className="Brandimg"/> */}
              <h3>陳政德</h3>
              {/* <p>234365867967543567</p> */}
            </div>
            <div className="Brandman">     
              <Image img="https://i.imgur.com/8l5YmEA.jpg" />
              <h3>羅天鴻</h3>
              {/* <p>234365867967543567</p>   */}
            </div>
            <div className="Brandman">
              <Image img="https://i.imgur.com/LIAnewG.jpg" />
              <h3>陳芮以</h3>
              {/* <p>234365867967543567</p> */}
            </div>
          </div>
          <div className="Brandteam">
            <div className="Brandman">
              <Image img="https://i.imgur.com/UOzTumP.jpg" />
              <h3>吳宣旻</h3>
              {/* <p>234365867967543567</p> */}
            </div>
            <div className="Brandman">
              <Image img="https://i.imgur.com/NqZ0im8.jpg" />
              <h3>黃右昕</h3>
              {/* <p>234365867967543567</p> */}
            </div>  
            <div className="Brandman">
              <Image img="https://i.imgur.com/pVqHsxy.jpg" />
              <h3>曹宗訓</h3>
              {/* <p>234365867967543567</p> */}
            </div>
          </div>   
        </div>
      </div>
    </>
  )
}

export default Brand
