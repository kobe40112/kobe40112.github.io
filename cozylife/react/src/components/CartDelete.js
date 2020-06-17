import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Modal, Button} from 'react-bootstrap'
import { RiDeleteBin2Line } from 'react-icons/ri';


function CartDelete(props) {
  const { id, name, amount, price } = props.value;

  const [mycart, setMycart] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let deleteData = ( id, name, amount, price ) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    let newCart = {id, name, amount, price};
    const newCurrentCart = currentCart.filter(item => {
      // 把沒有被點到刪除到return出去組成新陣列
      if(item.id !== id){
        return item
      }
      
    });

    localStorage.setItem('cart', JSON.stringify(newCurrentCart));
    // 設定資料
    setMycart(newCurrentCart);
    // 重新整理
    window.location.reload(" http://localhost:3000/Cart ");

    
  }

  const modal = (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>刪除</Modal.Title>
        </Modal.Header>
        <Modal.Body>確定要刪除{ name }嗎?</Modal.Body>
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
            deleteData( id, name, amount, price );
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
    <RiDeleteBin2Line 
      style={{ 'width': '50px', 'height': '50px' }}
      className = "deleteBtn"
      variant="primary" 
      onClick={
        handleShow
      }>
    </RiDeleteBin2Line>
    {modal}
    </>
  )
}

export default withRouter(CartDelete)