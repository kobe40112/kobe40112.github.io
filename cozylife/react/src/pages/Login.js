import React,{ useState, useEffect } from 'react'
import { withRouter,Link } from 'react-router-dom'

function Login(props) {
  const [userData,setUserData] = useState([]);
  const [userEmail,setUserEmail] = useState([]);
  const [userPassword,setUserPassword] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:7777/myserver')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      //console.log(myJson); //資料庫的三個會員物件json
      setUserData(myJson);
    });
  },[])

  useEffect(() => {
    //console.log(userData);
  },[userEmail])
  useEffect(() => {
    //console.log(userData);
  },[userPassword])
  
  let button;
  if(props.isAuth){
  } else {button = <button id="loginbut" type="submit" onClick={(e)=>{
    //console.log(userData)
    //console.log(userEmail) //物件和字串不能比較
    const getUser = userData.find((value) => { //回傳使用者資料物件
      //console.log(value)
      //console.log(value.CustomerMail)
      //console.log(value.CustomerPassword)
      if(userEmail === value.CustomerMail && userPassword === value.CustomerPassword)
      {
        setTimeout(() => {
        alert('成功登入')
        props.history.push('/')
      }, 500)
        return true
      }else{   
        
      }        
    })
    let newGetUser = [getUser] //把物件轉陣列中有物件
    if(getUser !== undefined){localStorage.setItem('user', JSON.stringify(newGetUser));}
            
    // ------------------------------------------------------
    const logBoolin = userData.some((value)=>{ //回傳true false值
      if(userEmail === value.CustomerMail && userPassword === value.CustomerPassword)
      {
        return true
      }else{
        return false
      }       
    })
    props.sendMe(logBoolin)

    if(logBoolin == false){ setTimeout(() => {
        alert('請輸入正確的帳號密碼')
        props.history.push('/login')
      }, 500)   }
  }}>
  Login
</button>}

  return (
    <>
      <div className="Alllogin">
        <div className="loginBody container">
          <div className="loginfrom">
            <h2>Login</h2>
            <div className="loginput">
              <div className="inputBox">
                <label className="form-label" htmlFor="formBasicEmail">Email address</label>
                <input placeholder="Enter email" type="email" id="formBasicEmail" className="form-control" onChange={(e)=>{
                      setUserEmail(e.target.value);
                      }}/>
                <small className="text-muted form-text">We'll never share your email with anyone else.</small>
              </div>
              <div className="inputBox">
                <label className="form-label" htmlFor="formBasicPassword">Password</label>
                <input placeholder="Password" type="password" id="formBasicPassword" className="form-control" onChange={(e)=>{
                    setUserPassword(e.target.value)
                  }}/>
              </div>
              <div className="inputBox">
                {button}
                <button type="submit" onClick = {()=>{
                  localStorage.removeItem('user');
                }}>Clear</button>
              </div>
            </div>
            <p className="forget">Not a member ? <Link to="/register">Click Here</Link></p>
          </div>
        </div>
      </div>
    </>
  )
  
}

export default withRouter(Login)
