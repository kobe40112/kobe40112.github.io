import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, InputGroup, FormControl, Modal } from 'react-bootstrap';

function CreditCard(props) {
    const [mycart, setMycart] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const modal = (
    <>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>信用卡</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">信用卡卡號</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder = "0123-4567-8901"
                aria-label="Usernamea"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  // setUserN(e.target.value)
                }}
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">信用卡到期日</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder = "03/24"
                aria-label="Usernamea"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  // setUserN(e.target.value)
                }}
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">驗證碼</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder = "159"
                aria-label="Usernamea"
                aria-describedby="basic-addon1"
                onChange={(e)=>{
                  // setUserN(e.target.value)
                }}
              />
            </InputGroup>
          
          
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
    
    <a style={{'cursor':'pointer'}} onClick={
        handleShow
      } 
    >
      信用卡
    </a>
      {modal}
    </>
  )
}



export default withRouter(CreditCard)