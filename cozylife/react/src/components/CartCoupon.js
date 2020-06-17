import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, InputGroup, FormControl, Modal } from 'react-bootstrap';

function CartCoupon(props) {
    const [show, setShow] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const [inputCoupon, setInputCoupon] = useState([]);
    const [couponName, setCouponName] = useState("目前沒有選用折價卷");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
      const newCoupon = JSON.parse(localStorage.getItem('coupon')) || [];  
      setCoupon(newCoupon);
    },[])

  const modal = (
    <>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>請輸入折扣碼</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">折扣碼</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder = ""
                aria-label="Usernamea"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  setInputCoupon(e.target.value)
                }}
              />
            </InputGroup>
            <p className="errorCoupon" style={{'color':'red'}}></p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" 
              onClick={()=>{
                handleClose();
              }}
            >
              取消
            </Button>
            <Button variant="primary" 
            onClick={() => {
              let mergeCoupon = coupon.filter((value)=>{
                return value.coupon_no === inputCoupon
              })
              if (mergeCoupon.length === 0) {
                document.querySelector('.errorCoupon')
                  .innerHTML = "請輸入正確的折扣碼";
                return
              } else {
                mergeCoupon.map((items,idx) => {
                  coupon.map((i)=>{
                    if(items.coupon_id === i.coupon_id){
                      let index = coupon.indexOf(i);
                      coupon.splice(index,1);
                    }
                  })
                });
                localStorage.setItem('coupon', JSON.stringify(coupon));
                setCouponName(mergeCoupon[0].coupon_name)
                props.sendCoupon(mergeCoupon);
                handleClose();
                // [{"coupon_id":1,"coupon_no":"abc","coupon_name":"3000dis300","coupon_setting_type":1,"coupon_condition":3000,"coupon_money":"0000000300.00","coupon_status":0},{"coupon_id":2,"coupon_no":"xxx","coupon_name":"3000打8折","coupon_setting_type":2,"coupon_condition":3000,"coupon_money":"0000000000.80","coupon_status":0}]
              }

            }}
            >
              確定
            </Button>
          </Modal.Footer>
        </Modal>

    </>
  )

//

  return (
    <>
    
    <p style={{'cursor':'pointer'}} onClick={
      handleShow
    } 
    >
      請輸入折扣碼
    </p>
    <p style={{ 'fontSize':'16px', 'color':'#000' }}>折扣碼內容:{' '}{ couponName }</p>
      {modal}
    </>
  )
}



export default withRouter(CartCoupon)