// import React,{useState,useEffect} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { Carousel, Card, CardDeck, Row,Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// function Popuslide(props) {
//   const [productImg,setProductImg] = useState([])
//   useEffect(()=>{
//     const newProductImg = localStorage.getItem('product') || []
//     setProductImg(JSON.parse(newProductImg))
//   },[])
//   return (
//     <>
//       <div className="container popslide">
//         {productImg.map((value,index)=>{
//                 return (
//                   <Row xs={1}>
//                     <Col >
//                       <CardDeck key={index}>
//                         <Card>
//                           <Link to="/product">
//                             <Card.Img variant="top" src={value.Picturepath} />
//                             <Card.Body>
//                               <Card.Title className="h6">{value.productName}</Card.Title>
//                               <Card.Text>{value.productStock}</Card.Text>
//                             </Card.Body>
//                           </Link>
//                         </Card>    
//                       </CardDeck>
//                     </Col>
//                   </Row>       
//                 )
//               })
//             }             
//             {/* <Carousel className="carousel slide">
//               <Carousel.Item className="carousel-item">
//               {productImg.map((value,index)=>{
//                   return (
//                     <CardDeck key={index}>
//                       <Card>
//                         <Card.Img variant="top" src={value.Picturepath} alt="First slide"/>
//                         <Card.Body>
//                           <Card.Title>{value.productName}</Card.Title>
//                           <Card.Text>{value.productStock}</Card.Text>
//                         </Card.Body>
//                       </Card>
//                     </CardDeck>
//                     )
//                   })
//               }
//               </Carousel.Item>
//           </Carousel>*/}              
//       </div>
//     </>
//   )
// }

// export default Popuslide

import React, { useState, useEffect } from 'react'
import { withRouter,Link } from 'react-router-dom'
import { Card,Row,Col,CardDeck } from 'react-bootstrap'

function Popslide(props) {
  const [productcat, setProductcat] = useState([])


  async function getProductCatFromServer() {
      // const cid = props.match.params.cid
      // 連接的伺服器資料網址
      const url = 'http://localhost:7777/popslide'
      
      // 注意header資料格式要設定，伺服器才知道是json格式
      const request = new Request(url, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      
      const response = await fetch(request)
      const data = await response.json()
      
      console.log(data)
      // 設定資料
      setProductcat(data)
    }

      // 一開始就會開始載入資料
      useEffect(() => {
        getProductCatFromServer()
      }, [])

    return (
      <>
      {/* <div className="popslide">
        {productcat.map((value, index) => {
            return (
              <Row xs={1}>
                <Col >
                  <CardDeck key={value.productID}>         
                    <Card >
                      <Card.Img variant="top"
                            src={value.Picturepath}
                            alt="relate-product"
                          />
                      <Card.Body>
                        <Card.Title className="h6">{value.productName}</Card.Title>
                        <Card.Text>{value.unitPrice}</Card.Text>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </Col>
              </Row>
            )
        })}
      </div> */}
      <div className="container popslide"> 
            {productcat.map((value, index) =>{
              return(                                           
                  <Card className="popcard" key={value.productID}>
                    <div className="rcardimg">
                      <Card.Img variant="top" src={value.Picturepath} />
                    </div>
                    <Card.Body>
                      <p className="poplink" onClick={()=>{
                          props.history.push('/productList/'+value.productID)
                        }}>
                        <Card.Title className="poptitle h6">{value.productName}</Card.Title>
                        <Card.Text>NT${value.unitPrice}</Card.Text>
                      </p>
                    </Card.Body>
                  </Card>                         
              )
            })}
      </div>       
      </>
    )
  }

export default withRouter(Popslide)