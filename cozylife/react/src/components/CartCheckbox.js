/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

let newProductArr = [];
let allProductArr = [];

function CartCheckbox(props) {
  const { id, name, amount, price, picture } = props.value;
  const [checkboxBool, setCheckboxBool] = useState(false);
  const [checkboxChildData, setCheckboxChildData] = useState([]);

  let newProduct = {};

  // 判斷Checkbox有沒有勾選
  function checkboxHandeler( id, name, amount, price, picture, e ) {

    
    setCheckboxBool(e.target.checked);
    //  && props.counterData.length === 0
    if(e.target.checked === true) {

      let sum = 0;
      props.counterData.map((item)=>{
        if(id === item.id){
          sum += item.amount
        }
        
      })
      
      if(sum !== 0){
        newProduct = { id, name, amount:sum, price, picture };
        newProductArr.push(newProduct);
      }else {
        newProduct = { id, name, amount, price, picture };
      // 把勾選的項目塞進陣列，包括他的數值ID,數量，價錢 等等的
      // console.log(newProduct);
        newProductArr.push(newProduct);
      }

    }else if(e.target.checked === false){
      // 找到被反選的位置
      const index = newProductArr.findIndex(item => item.id === id);
      // 把反選項目移出陣列，包括他的數值ID,數量，價錢 等等的
      newProductArr.splice(index,1);
    }
    
    setCheckboxChildData(newProductArr);
    localStorage.setItem('newCart', JSON.stringify(newProductArr));

  }



  useEffect(()=>{

    if(props.allCheckboxBool) {
      newProduct = { id, name, amount, price, picture };
      // 把勾選的項目塞進陣列，包括他的數值ID,數量，價錢 等等的
      newProductArr.push(newProduct);
      allProductArr.push(newProduct);
      setCheckboxChildData(allProductArr);
      localStorage.setItem('newCart', JSON.stringify(allProductArr));
      // 把Checkbox全勾起來
      setCheckboxBool(true);
      
    }else{
      newProductArr = [];
      allProductArr.map((items, idx) => {
        // 把反選項目移出陣列，包括他的數值ID,數量，價錢 等等的
        allProductArr.pop(items);
        setCheckboxChildData(allProductArr);
      })
      localStorage.setItem('newCart', JSON.stringify(allProductArr));
      setCheckboxBool(false);
    }

  // 當全選按鈕狀態改變會啟動
  },[props.allCheckboxBool])

  
  useEffect(()=>{
    
    props.sendMe(num(checkboxChildData), sum(checkboxChildData), checkboxBool, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkboxBool, checkboxChildData,props.allCheckboxBool])



  // 計算購買商品總數
  function num(items) {
    let quantity = 0;
    for (let i = 0; i < items.length; i++) {
      quantity += items[i].amount;
    }
    return quantity;
  }

  // 計算總價用的函式
  function sum(items) {

    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price;
    }
    return (total);
  }

  return (
    <>
    <input 
      type="checkbox" 
      id={"box" + id} 
      group="B1"
      checked = { checkboxBool }
      onChange={(e) => {
        newProduct = checkboxHandeler( id, name, amount, price, picture, e );
      }} 
    />
      <label htmlFor={"box" + id}></label>
    </>
  )

}


export default withRouter(CartCheckbox)