import React, { useState, useEffect } from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Card,Row,Col,CardDeck } from 'react-bootstrap'

function Newapro(props) {
    const [productcat, setProductcat] = useState([])
    const style = {
        padding:0,
    }
    async function getProductCatFromServer() {
        // const cid = props.match.params.cid
        // 連接的伺服器資料網址
        const url = 'http://localhost:7777/newapro'
        
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
        <div className="newArrPro">
            <Row xs={1} md={4}>
                {productcat.map((value, index) =>{
                    return(
                        <Col style={style} >
                            <Card className="newAbox" key={value.productID}>
                                <div className="newAimg">
                                    <Card.Img variant="top" src={value.Picturepath} />
                                </div>
                                <Card.Body className="newAdetails">
                                    <Link className="newAcontent" onClick={()=>{
                                            props.history.push('/productList/'+value.productID)
                                        }}>
                                        <Card.Title className="Newaprotitle h6">{value.productName}</Card.Title>
                                        <Card.Text>NT${value.unitPrice}</Card.Text>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>       
        </div>
        </>
    )
}


export default withRouter(Newapro) 