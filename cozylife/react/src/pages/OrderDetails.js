import React, { useState, useEffect } from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


function OrderDetails(props) {

  const [mycart, setMycart] = useState([]);
  const [mycartDisplay, setMycartDisplay] = useState([]);
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState([]);

  function getCartFromLocalStorage() {
    const newCart = localStorage.getItem('newCart') || []
    // 設定資料
    setMycart(JSON.parse(newCart));
    const userData = localStorage.getItem('user') || [];
    setUser(JSON.parse(userData));

    setUserData(JSON.parse(localStorage.getItem('newUser')));
  }


  // 一開始就會開始載入資料
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  // 每次mycart資料有變動就會1秒後關掉載入指示
  useEffect(() => {

    let newMycartDisplay = []


    //尋找mycartDisplay
    for (let i = 0; i < mycart.length; i++) {
      //尋找mycartDisplay中有沒有此mycart[i].id
      //有找到會返回陣列成員的索引值
      //沒找到會返回-1
      const index = newMycartDisplay.findIndex(
        (value) => value.id === mycart[i].id
      )
      //有的話就數量+1
      if (index !== -1) {
        //每次只有加1個數量
        //newMycartDisplay[index].amount++
        //假設是加數量的
        newMycartDisplay[index].amount += mycart[i].amount
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }

    setMycartDisplay(newMycartDisplay)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mycart])

  // 計算總價用的函式
  function sum(items) {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price;
    }
    return (total)
  }

  // 計算購買商品總數
  function num(items) {
    let num = 0;
    for (let i = 0; i < items.length; i++) {
      num += items[i].amount;
    }
    return num;
  }

  return (
        <div id="orderDetails">
          <div className="shoppingProcess">
            <div className="shoppingImg">
                <div className="cicle left">
                </div>
                <p>確認購物車</p>
                <IoIosArrowForward />
                <div className="cicle center">
                </div>
                <p>付款與運送方式</p>
                <IoIosArrowForward />
                <div className="cicle right">
                </div>
                <p>資料填寫</p>
            </div>
          </div>
          <div className="orderBody">
            <div className="orderContent">
              <header>
                <h1>👍🏼</h1>
                <h2>完成訂單</h2>
                <p>訂單編號:123456789</p>
              </header>
              <main>
                
                <div className="cardBody">
                  {mycartDisplay.map((value, index) => {
                    mycartDisplay.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                    return (
                      <div className="card" key={value.id}>
                        <div className="imgP">
                          <img
                            src= { value.picture }
                            alt=""
                          />
                          <div>
                            <h2>{ value.name }</h2>
                            <p>單價: ${ value.price }</p>
                            <p>數量: { value.amount }</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>


              </main>
              <footer>
                <div>
                  <p>共{ num(mycartDisplay) }件</p>
                  <p>商品總金額: ${ localStorage.getItem('finalSum') === null ? sum(mycartDisplay)*1+60*1 : localStorage.getItem('finalSum')*1+60*1}</p>
                </div>
              </footer>
              {userData.map((value, index) => {
                return (
                  <section key={value.CustomerID}>
                    <p>取貨人資訊(賣家宅配)</p>
                    <p>姓名: {value.CustomerName}</p>
                    <p>手機號碼: {value.CustomerTel}</p>
                    <p>取貨地址: {value.CustomerAddress}</p>
                    <Button variant="warning"
                      onClick={()=>{
                        props.history.push('/product/0/0/1');
                        localStorage.removeItem('finalSum');
                      }}
                    >
                  繼續購物
                </Button>
              </section>
              )
            })}
            </div>
          </div>
        </div>
  )
}


export default withRouter(OrderDetails);