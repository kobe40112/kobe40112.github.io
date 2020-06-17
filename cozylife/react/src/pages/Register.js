import React, { useState, useEffect } from 'react'
import {Button,Form} from 'react-bootstrap'
import { withRouter,Link } from 'react-router-dom'

function Register(props) {
  const [registerEmail,setRegisterEmail] = useState([]);
  const [registerPassword,setRegisterPassword] = useState([]);
  const [registerName,setRegisterName] = useState([]);
  const [registerAdd,setRegisterAdd] = useState([]);

  return (
    <>
      {/* <div className="container">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="text" placeholder="Enter e-mail" onChange={(e)=>{
                setRegisterEmail(e.target.value)
              }}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="password" onChange={(e)=>{
                setRegisterPassword(e.target.value)
              }}/>
            </Form.Group>             
            <Button id="loginbut" className="mr-2" variant="primary"
              onClick={()=>{
                let registerArr = [
                  {
                    CustomerMail: registerEmail,
                    CustomerPassword: registerPassword
                  },
                ]
                console.log( JSON.stringify(registerArr));
              
                fetch("http://localhost:7777/register", {
                  method: "POST",
                  body: JSON.stringify(registerArr),
                  headers: new Headers({
                    "Content-Type": "application/json",
                  }),
                })
                .then((r) => r.json())
                .then((obj) => {
                  console.log(obj);

                  setTimeout(() => {
                    alert('註冊成功')
                    props.history.push('/')
                  }, 500)
                });               
            }}>
              註冊
            </Button>
            <Button id="logoutbut" variant="primary" >
              取消
            </Button>
          </Form>
      </div> */}
      <div className="Allregister">
        <div className="registerBody container">
          <div className="rigesterfrom">
            <h2>Register</h2>
            <div className="riginput">
              <div className="riginputBox">
                <label className="form-label" htmlFor="formBasicEmail">Name</label>
                <input placeholder="Enter Name" type="text" id="formBasicEmail" className="form-control" onChange={(e)=>{
                setRegisterName(e.target.value)
              }}/>
              </div>
              <div className="riginputBox">
                <label className="form-label" htmlFor="formBasicEmail">Email address</label>
                <input placeholder="Enter email" type="email" id="formBasicEmail" className="form-control" onChange={(e)=>{
                setRegisterEmail(e.target.value)
              }}/>
              </div>
              <div className="riginputBox">
                <label className="form-label" htmlFor="formBasicPassword">Password</label>
                <input placeholder="Enter Password" type="password" id="formBasicPassword" className="form-control" onChange={(e)=>{
                setRegisterPassword(e.target.value)
              }}/>
              </div>
              <div className="riginputBox">
                <label className="form-label" htmlFor="formBasicPassword">Address</label>
                <input placeholder="Enter Address" type="text" id="formBasicPassword" className="form-control" onChange={(e)=>{
                setRegisterAdd(e.target.value)
                console.log(e.target.value)
              }}/>
              </div>
              <div className="riginputBox">
                <button type="submit" onClick={()=>{
                    let registerArr = [
                      {
                        CustomerMail: registerEmail,
                        CustomerPassword: registerPassword,
                        CustomerName: registerName,
                        CustomerAddress:registerAdd,
                      },
                    ]
                    console.log( JSON.stringify(registerArr));
                  
                    fetch("http://localhost:7777/register", {
                      method: "POST",
                      body: JSON.stringify(registerArr),
                      headers: new Headers({
                        "Content-Type": "application/json",
                      }),
                    })
                    .then((r) => r.json())
                    .then((obj) => {
                      console.log(obj);
                      const aaa = registerArr.find((value)=>{
                        console.log(registerEmail)
                        if( value.CustomerMail == registerEmail){
                        setTimeout(() => {
                        alert('註冊成功')
                        props.history.push('/login')
                      }, 500)
                      }else{
                        setTimeout(() => {
                        alert('請輸入帳密')
                        props.history.push('/register')
                      }, 500)
                      }     
                      })
                      
                    });         
                }}>Send</button>
                {/* <button type="submit">Clear</button> */}
              </div>
            </div>
            {/* <p className="forget">Not a member ? <Link to="/register">Click Here</Link></p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Register)