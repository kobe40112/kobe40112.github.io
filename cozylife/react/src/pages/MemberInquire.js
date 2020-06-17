import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Container, Row, Col  } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
// import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Accordion from 'react-bootstrap/Accordion'
import { FaAngleLeft } from 'react-icons/fa'
// import $ from 'jquery'

function MemberInquire(props) {
  const [key, setKey] = useState('odd')
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const [orderID, setOrderID] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [shippedTel, setShippedTel] = useState('')
  const [shippedAdd, setShippedAdd] = useState('')
  const [requireDate, setRequireDate] = useState('')
  const [shippedDate, setShippedDate] = useState('')
  const [unitTotalPrice, setUnitTotalPrice] = useState('')
  const [discouTotalPrice, setDiscouTotalPrice] = useState('')
  // const [newUserid, setNewUserid] = useState(0)

  // 從後端提取訂單資料
  async function getUserOrderFromServer() {
    setLoading(true)
    let newuser = JSON.parse(localStorage.getItem('user'))
    const url = 'http://localhost:7777/orderListDetail/' + newuser[0].CustomerID

    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    console.log('data:',data);
    
    
    localStorage.setItem('orderDetail', JSON.stringify(data))
    // const data = dataArr[0]

    const orderDetail = JSON.parse(localStorage.getItem('orderDetail')) || []
    setOrderDetail(orderDetail)

    const userName = JSON.parse(localStorage.getItem('user')) || []
    // console.log(userName)
    setUserName(userName[0].CustomerName)

    // setDetail(data)
    setOrderID(orderDetail.orderID)
    setOrderDate(orderDetail.orderDate)
    setShippedTel(orderDetail.shippedTel)
    setShippedAdd(orderDetail.shippedAdd)
    setRequireDate(orderDetail.requireDate)
    setShippedDate(orderDetail.shippedDate)
    setUnitTotalPrice(orderDetail.unitTotalPrice)
    setDiscouTotalPrice(orderDetail.discouTotalPrice)
  }



  useEffect(() => {
    
    getUserOrderFromServer()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const spinner = (
    <>
      <div className="d-flex justify-content-center" id="loadinquire">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  )

  // 把GMT時間轉換為+8.00
  function setDate(value) {
    let nB = new Date(value).getTime()

    let date = nB + 8 * 60 * 60 * 1000
    let nd = new Date(date)
    let year = nd.getFullYear()
    let month = nd.getMonth() + 1
    let day = nd.getDate()
    return year + '-' + month + '-' + day
  }

  // 把所有日期以YYYY-MM-DD顯示
  for (let i = 0; i < orderDetail.length; i++) {
    orderDetail[i].orderDate = setDate(orderDetail[i].orderDate)
    orderDetail[i].requireDate = setDate(orderDetail[i].requireDate)
    orderDetail[i].shippedDate = setDate(orderDetail[i].shippedDate)
    // console.log(orderDetail[i].shippedDate)
  }

  // 訂單狀態
  const orderList = (
    <Accordion
      defaultActiveKey="0"
      striped
      bordered
      hover
      style={{ tableLayout: 'fixed' }}
    >
      {orderDetail.map((item) => {
        return (
          <>
            <Card key={item}>
              <Accordion.Toggle as={Card.Header} eventKey={item.orderID}>
                <Col>
                  <Row className="text-center">
                    <div id="pm">訂單編號</div>
                    <div id="pm">購買日期</div>
                    <div id="pm">訂單狀態</div>
                    <div id="pm">訂單金額</div>
                    <div id="pm">付款狀態</div>
                    <div id="pm">訂單明細</div>
                  </Row>
                  <Row className="text-center">
                    <div id="pm" style={{ paddingLeft: '5px' }}>{item.orderID}</div>
                    <div id="pm" style={{ paddingLeft: '5px' }}>
                      {item.orderDate}
                    </div>
                    <div id="pm">
                      {new Date(item.shippedDate) < new Date()
                        ? '已送達'
                        : '寄送中'}
                    </div>
                    <div id="pm">{item.unitTotalPrice}</div>
                    <div id="pm">已付款</div>
                    <div id="pm">點擊</div>
                  </Row>
                </Col>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={item.orderID}>
                <Card.Body>
                  <Row style={{ fontSize: '1.5rem' }}>
                    <Col>
                      <div id="pm1">訂單編號：{item.orderID}</div>
                      <div id="pm1">訂單日期：{item.orderDate}</div>
                      <div id="pm1">寄送日期：{item.shippedDate}</div>
                      <div id="pm1">購物金額：{item.unitTotalPrice}</div>
                      <div id="pm1">寄送地址：{item.shippedAdd}</div>
                    </Col>
                    <Col>
                      <div id="pm2">顧客姓名：{userName}</div>
                      <div id="pm2">出貨日期：{item.requireDate}</div>
                      <div id="pm2">連絡電話：{item.shippedTel}</div>
                      <div id="pm2">
                        使用折扣：
                        {item.discountTotalPrice < item.unitTotalPrice + 60
                          ? '有使用折扣'
                          : '無'}
                      </div>
                      {/* <div id="pm2">點擊關閉</div> */}
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </>
        )
      })}
    </Accordion>
  )

  // 有訂單就顯示訂單狀態 沒有就顯示沒有訂單紀錄
  const display = (
    <>
      {orderDetail.length === 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <td style={{ backgroundColor: 'white' }}>目前沒有訂單紀錄</td>
            </tr>
          </thead>
        </Table>
      ) : (
        orderList
      )}
    </>
  )

  return (
    <>
      <Container id="filetabs">
        <Tabs
          justify
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="odd" title="訂單">
            <Container id="requiretop">{loading ? spinner : display}</Container>
            {/* <MyFile /> */}
          </Tab>
          {/* <Tab eventKey="cqa" title="問答">
            <Container id="requiretop">{loading ? spinner : display2}</Container>
            <MyFileChangePass />
          </Tab>
          <Tab eventKey="ri" title={<>退貨查詢</>} disabled></Tab> */}
          <Tab
            title={
              <>
                <FaAngleLeft />
                {'訂單列表'}
              </>
            }
            disabled
          ></Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default withRouter(MemberInquire)
