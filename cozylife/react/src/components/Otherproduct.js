import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// import './styles/ProductDetail.css'

    

function Otherproduct(props) {
  const [productcat, setProductcat] = useState([])


  async function getProductCatFromServer() {
      // const cid = props.match.params.cid
      // 連接的伺服器資料網址
      const url = 'http://localhost:7777/otherproduct'
      
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
      
      
  
{productcat.map((value, index) => {
            return (
    <Card className=" relatedcard justify-content-center"  key={value.productID}>
    <Card.Img
          src={value.Picturepath}
          alt="relate-product"
          id=" relatedcardimg"
          onClick={()=>{
                    props.history.push('/productList/'+value.productID)
                    window.location.reload()
                  }}
        />
    <Card.Body>
      <Card.Text>
      <li>{value.productName}</li>
      <li>$NT{value.unitPrice}</li>
      </Card.Text>
    </Card.Body>
  </Card>
    
            )
})}

        
      </>
    )
  }

    export default withRouter(Otherproduct)