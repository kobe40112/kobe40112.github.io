/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { withRouter, Redirect } from 'react-router-dom';
import CartCounter from '../components/CartCounter'
import CartDelete from '../components/CartDelete'
import CartCheckbox from '../components/CartCheckbox'
import CartCoupon from '../components/CartCoupon'
import { Spinner, Button, Jumbotron } from 'react-bootstrap'


function Cart(props) {
  

  const [mycart, setMycart] = useState([]);
  const [mycartDisplay, setMycartDisplay] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [checkboxAmountData, setCheckboxAountData] = useState([]);
  const [checkboxSumData, setCheckboxSumData] = useState([]);
  const [allCheckboxBool, setAllCheckboxBool] = useState(false);
  const [counterData, setCounterData] = useState([]);
  const [isUser, setIsUser] = useState([]);


  function getCartFromLocalStorage() {

    setDataLoading(true);

    // 開啟載入指示
    const newCart = localStorage.getItem('cart') || [];
    // console.log(JSON.parse(newCart));
    // 設定資料
    setMycart(JSON.parse(newCart));
    setIsUser(JSON.parse(localStorage.getItem('user')));
  }


  // 一開始就會開始載入資料
  useEffect(() => {
    getCartFromLocalStorage();
  }, [])

  // 每次mycart資料有變動就會1秒後關掉載入指示
  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false);
    }, 500)

    let newMycartDisplay = [];


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
        // console.log('findindex', index);
        //每次只有加1個數量
        //newMycartDisplay[index].amount++
        //假設是加數量的
        newMycartDisplay[index].amount += mycart[i].amount;
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...mycart[i] };
        newMycartDisplay = [...newMycartDisplay, newItem];
      }
    }
    localStorage.setItem('orderCart', JSON.stringify(newMycartDisplay));
    
    setMycartDisplay(newMycartDisplay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mycart])



  // 從子元件(Checkbox.js)拿資料(數量和總金額)
  function newSum(amountData, sumData, Bool) {

    setCheckboxAountData(amountData);
    setCheckboxSumData(sumData);
  }
  function newDataFn(data) {

    setCounterData(data);
  }
  

  const loading = (
    <div className="spinner">
      <Spinner animation="border" variant="warning" className="spinnerBody" />
    </div>
  )
  const CartNoProduct = (
    <Jumbotron>
      <h1>購物車內目前沒商品</h1>
      <p>
        歡迎回去購物喔!!!
      </p>
      <p>
        <Button variant="primary"
        onClick={() => {
          props.history.push('/');
        }}>
          回首頁
        </Button>
      </p>
    </Jumbotron>
  )
  
  const display = (
    <div id="cart">
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
                      <section>
                        <h2>{value.name}</h2>
                        <p>單價: ${ value.price }元</p>
                      </section>
                      <div className="checkboxStyle">
                        <CartCheckbox 
                          value = { value } 
                          sendMe = { newSum } 
                          allCheckboxBool = { allCheckboxBool }
                          counterData = { counterData }
                        />
                      </div>
                    <div className="buttonStyle">
                      <CartCounter 
                        value={ value }
                        sendNewData = { newDataFn } 
                      />
                    </div>
                    <CartDelete value={ value } />
                  </div>
                </div>
              )
            })}
      </div>
      <footer>
        <div>
          <div className="checkboxStyle">
            <input type="checkbox" id="checkall" 
              onClick={(e) => {
                setAllCheckboxBool(e.target.checked);
              }}
            />
            <label htmlFor="checkall">全選</label>
          </div>
          <p>共{ checkboxAmountData }件商品</p>

          <p>購買總金額: { checkboxSumData }{" "}$</p>
          <Button variant="warning"
            onClick={() => {
              props.history.push('/CheckoutPage');
            }}
          >
            下一步
          </Button>
        </div>
      </footer>
    </div>
  )
  
  return (
    <>{ dataLoading ? loading : isUser ? display : <Redirect to="/register"/> }</> 
    )
  }
  
  export default withRouter(Cart);
  
  // <>{ dataLoading ? loading : (JSON.parse(localStorage.getItem('cart')).length === 0) ? CartNoProduct : isUser.length !== 0 ? display : <Redirect to="/register"/> }</>
  // <>{ dataLoading ? loading : (JSON.parse(localStorage.getItem('cart')).length === 0) ? CartNoProduct : isUser ? display : <Redirect to="/register"/> }</>