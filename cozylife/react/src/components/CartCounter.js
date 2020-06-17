import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';



function CartCounter(props) {
  
  const { id, name, amount, price, picture } = props.value;
  const [idx, setIdx] = useState(0);
  const [mycart, setMycart] = useState([])


  function updateCartToLocalStorage( id, name, amount, price, picture, type = '') {

    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    let newCart = {id, name, amount, price, picture};
    
    
      if(type === 'increase') {
        newCart.amount = 1;
        const displayCart = [...currentCart, newCart];
        localStorage.setItem('cart', JSON.stringify(displayCart));

        // 設定資料
        setMycart(displayCart);
        
        props.sendNewData(displayCart);
        
        // 重新整理
        // window.location.reload(" http://localhost:3000/Cart ");
      }else if(type === 'decrease') {

        // 找到要刪除對象的位置
        const index = currentCart.findIndex(item => item.id === id);
      
        // 執行刪除
        const decreaseCart = [
          ...currentCart.slice(0, index),
          ...currentCart.slice(index + 1)
        ];

        // 不能讓顯示的數字小於一
        if(idx <= 1){
          return
        }
        newCart.amount = 1;
        
        localStorage.setItem('cart', JSON.stringify(decreaseCart));
        // 設定資料
        setMycart(decreaseCart);
        
        props.sendNewData(decreaseCart);
        // 重新整理
        // window.location.reload(" http://localhost:3000/Cart ");

      }else if(type === 'aaa') {
        amount = amount * 1;
        
        newCart = {id, name, amount, price, picture};

        // 找到要改變對象以外的數值
        const newCurrentCart = currentCart.filter(item => {
          if(item.id !== id){
            return item
          }
        });

        //改變對象和其他合併
        const displayCart = [...newCurrentCart, newCart];
        localStorage.setItem('cart', JSON.stringify(displayCart));
        // 設定資料
        setMycart(displayCart);
        // 重新整理
        window.location.reload(" http://localhost:3000/Cart ");
        // console.log(newCart);
        
      }
    
  }


  useEffect(() => {
    setIdx(amount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <button 
        // disabled="true"
        onClick={()=>{
          setIdx((idx > 1) ? (idx - 1) : idx);
          updateCartToLocalStorage( id, name, amount, price, picture, 'decrease');
        }}>-</button>
        <input
          className="cartQuantity"
          type="text"
          onChange={(e) => {
              setIdx(e.target.value);
              updateCartToLocalStorage( id, name, e.target.value, price, picture, 'aaa');
            }
          }
          value={idx}
        />
      <button onClick={()=>{
        setIdx(idx + 1);
        updateCartToLocalStorage( id, name, amount, price, picture, 'increase');

      }}>+</button>

    </>
  )
}

export default withRouter(CartCounter)