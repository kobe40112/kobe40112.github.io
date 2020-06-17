import React, { useState, useEffect } from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { withRouter } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import UserInput from '../components/UserInput'
import CreditCard from '../components/CreditCard'
import CartCoupon from '../components/CartCoupon'

function CheckoutPage(props) {

  const [mycart, setMycart] = useState([]);
  // const [mycartDisplay, setMycartDisplay] = useState([]);
  const [user, setUser] = useState([]);
  const [orderID, setOrderID] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [newCartArr, setNewCartArr] = useState([]);
  const [couponData, setCouponData] = useState([]);
  
  

  function getCartFromLocalStorage() {
    const newCart = localStorage.getItem('newCart') || []
    // console.log(JSON.parse(newCart))
    // 設定資料
    setMycart(JSON.parse(newCart));

    fetch('http://localhost:7777/orderID')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        setOrderID(myJson[0].orderID);
      });

    let userData = localStorage.getItem('user') || [];
    setUser(JSON.parse(userData));
    

  }


  // 一開始就會開始載入資料
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])





  // 每次mycart資料有變動就會1秒後關掉載入指示
  useEffect(() => {

  setNewCartArr(JSON.parse(localStorage.getItem('newCart')) || [])

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

  function userFn(Data) {
    setNewUser(Data);
  }

  function couponFn(data) {
    localStorage.setItem('newCoupon', JSON.stringify(data));
    
    if(data[0].coupon_setting_type === 1 && (sum(newCartArr) > 3000)){
      setCouponData(sum(newCartArr)-300);
      localStorage.setItem('finalSum', JSON.stringify( sum(newCartArr) - 300 ));

    }else if(data[0].coupon_setting_type === 2 && (sum(newCartArr) > 1000)){
      setCouponData(parseInt(sum(newCartArr)*0.8));
      
      localStorage.setItem('finalSum', JSON.stringify( parseInt(sum(newCartArr)*0.8) ));

    }

  }


  return (
        <div id="checkoutPage">
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
          <div className="checkoutBody">
              <div className="checkoutContent">
                  <header>
                    <div className="cardBody">
                      {newCartArr.map((value, index) => {
                        newCartArr.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                        return (
                          <div className="card" key={value.id}>
                            <div className="imgP">
                              <img
                                src= { value.picture }
                                alt=""
                              />
                              <div>
                                <h2>{value.name}</h2>
                                <p>單價: ${value.price}</p>
                                <p>數量: {value.amount}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                        {user.map((value, index) => {
                          return (
                            <nav key={value.CustomerID}>
                              <p>寄送資訊:</p>
                              <UserInput 
                                value={value} 
                                sendUser = { userFn } 
                              />
                              <p>預計到貨時間5月14日 - 5月21日</p>
                              <CartCoupon sendCoupon = { couponFn } />

                            </nav>
                          )
                        })}
                    </header>

                  <main></main>
                  <footer>
                      <nav>
                        <p>付款方式:</p>
                        <a href="#">貨到付款</a>
                        <a href="#">銀行轉帳</a>
                        <CreditCard />
                      </nav>
                      <div>
                        <p>商品總金額: ${ couponData.length === 0 ? sum(newCartArr) : couponData }</p>
                        <p>運費總金額: $60</p>
                        <p>應付總金額: ${ couponData.length === 0 ? sum(newCartArr) + 60 : couponData + 60 }</p>
                        <Button variant="warning"
                          onClick={() => {
                            props.history.push('/OrderDetails');
                            const newCart = JSON.parse(localStorage.getItem('newCart')) || [];
                            const orderCart = JSON.parse(localStorage.getItem('orderCart')) || [];
                            const newCoupon = JSON.parse(localStorage.getItem('newCoupon')) || [];

                            newCart.map((items,idx) => {
                              orderCart.map((i)=>{
                                if(items.id === i.id){
                                  let index = orderCart.indexOf(i);
                                  orderCart.splice(index, 1);
                                }
                              })
                            });
                            localStorage.setItem('cart', JSON.stringify(orderCart));
                            

// ----------------------------------------------------------------

                            // 資料庫裡的OrderID要加一
                            setOrderID(orderID + 1);
                            let newUserData = newUser;

// ----------------------------------------------------------------
                            

                            // 如果沒有更改會員資料，舊的資料就會送出
                            if(newUser.length === 0) {
                              newUserData = user;
                            }
                            localStorage.setItem('newUser', JSON.stringify(newUserData));

                            let orderData = {
                              "orderID": orderID,
                              "customerID": newUserData[0].CustomerID,
                              "shippedTel": newUserData[0].CustomerTel,
                              "shippedAdd": newUserData[0].CustomerAddress,
                              "unitTotalPrice": sum(newCartArr),
                              "discountTotalPrice": couponData.length === 0 ? sum(newCartArr) : couponData,
                            }

                            // if(newCoupon.length === 0){
                            //   newCoupon[0].coupon_id === 0;
                            // }
                       
                            //  ? newCoupon[0].coupon_id : 0

                            let couponID = {
                              couponID: newCoupon[0].coupon_id
                            }
                            
                            let newOrderID = [{
                              "orderID": orderID * 1
                            }]
                            let orderdetail = newCart.map((value)=>{
                              return {...value, orderID, ...couponID}
                            })

// ----------------------------------------------------------------
                            
                            fetch("http://localhost:7777/orderID", {
                              method: "POST",
                              body: JSON.stringify(newOrderID),
                              headers: new Headers({
                                "Content-Type": "application/json",
                              }),
                            })
                            .then((r) => r.json())
                            .then((obj) => {
                              // console.log(obj);
                            });

// ----------------------------------------------------------------

                            fetch("http://localhost:7777/clorderdetail", {
                              method: "POST",
                              body: JSON.stringify(orderdetail),
                              headers: new Headers({
                                "Content-Type": "application/json",
                              }),
                            })
                            .then((r) => r.json())
                            .then((obj) => {
                              // console.log(obj);
                            });

// ----------------------------------------------------------------

                            fetch("http://localhost:7777/order", {
                              method: "POST",
                              body: JSON.stringify(orderData),
                              headers: new Headers({
                                "Content-Type": "application/json",
                              }),
                            })
                            .then((r) => r.json())
                            .then((obj) => {
                              // console.log(obj);
                            });

                            

                          }}
                        >
                          下訂單
                        </Button>
                      </div>
                  </footer>
              </div>
          </div>
    </div>
  )
}


export default withRouter(CheckoutPage);
