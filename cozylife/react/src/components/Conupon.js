import React,{useState,useEffect} from 'react'

import {Button } from 'react-bootstrap'

let newCouponArr = [];

function Conupon(props) {

  const [getoldCoupon, setgetoldCoupon] = useState([])

  const { coupon_id, coupon_no, coupon_name, coupon_setting_type, coupon_condition, coupon_money, coupon_status, coupon_start_time, coupon_end_time} = props.value
  // console.log(coupon_id);
  useEffect(()=>{
    
    if(localStorage.getItem('coupon') !== null){
      let getItemCoupon =JSON.parse(localStorage.getItem('coupon'))


      setgetoldCoupon(getItemCoupon)

      getItemCoupon.map((value)=>{
        if(value.coupon_id){
          console.log();
          let btn = document.getElementById('btn'+value.coupon_id);
          btn.disabled = true;
          btn.innerText = '已領';
        }
        
      })


    }


  },[])

  function updateDiscountToLocalStorage( value ) {

    // 開啟載入指示
    // setDataLoading(true)
    // const currentCoupon = JSON.parse(localStorage.getItem('coupon')) || []

    // console.log('currentCoupon', currentCoupon)
    newCouponArr.push(value)
        
    var connectionCoupon = [...getoldCoupon , ...newCouponArr];
    console.log(connectionCoupon);
    // console.log(newCouponArr);
    // [...getItemCoupon , ...newCouponArr]
    
    localStorage.setItem('coupon', JSON.stringify(connectionCoupon))
    
    // // console.log('newCoupon', newCoupon)
    // // 設定資料
    // setcoupon(newCouponArr)
    
  }


  //已領取
  function disableButton(e) {
    // coupon.map((value, index) => {
    //   if(e.target.id.substring(3,4)*1 === value.coupon_id){
    //     console.log(value);
    //     e.target.disabled = true;

    //   }
    // })

    // console.log(e.target.id.substring(3,4)*1)

    var btn = document.getElementById(e.target.id);

        btn.disabled = true;
        btn.innerText = '已領';
    //     btn.style.backgroundColor = "gray";
    // var c = document.getElementById('c');
    //     c.style.backgroundColor = "rgba(128,128,128,0.3)";
  }



  return (
  <>
      <Button id={"btn" + coupon_id}
      onClick={(e) => {
        updateDiscountToLocalStorage(
          { coupon_id, coupon_no, coupon_name, coupon_setting_type, coupon_condition, coupon_money, coupon_status, coupon_start_time, coupon_end_time}
        )
        disableButton(e)
      }}
      className="disbutton">領取</Button>
  </>
  )
}

export default Conupon



