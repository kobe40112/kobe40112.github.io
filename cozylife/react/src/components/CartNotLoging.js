import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Modal, Button} from 'react-bootstrap'
import { RiDeleteBin2Line } from 'react-icons/ri';




function CartNotLoging(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const modal = (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>請先登入</Modal.Title>
        </Modal.Header>
        <Modal.Body>是否跳轉到登錄頁?</Modal.Body>
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
            props.history.push('/login');
            handleClose();
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

    <i className="fa fa-cart-arrow-down" onClick={
        handleShow
      }></i>
    {modal}
    </>
  )
}

export default withRouter(CartNotLoging)