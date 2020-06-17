import React,{useState,useEffect,useRef} from 'react'
import {
  Navbar,
  Nav,
  Container,
  Button,
} from 'react-bootstrap'
import { Link,withRouter } from 'react-router-dom'
import CartNotLoging from './CartNotLoging'

function RBMenu(props) {
// -------------------------------------------------
// function aaa() {
//   console.log(123)
// }

  const [userData, setUserData] = useState([])
  useEffect(() => {
    fetch('http://localhost:7777/myserver')
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        setUserData(myJson)
      })
  }, []) 

  const lcsg = localStorage.getItem('user')
  
  let RBbutton;
  if(props.isAuth){ RBbutton = <Link  className=" mr-2" onClick={()=>{
    localStorage.removeItem('user');
    setTimeout(() => {
        alert('成功登出')
        props.history.push('/')
      }, 500)
    return props.sendMe(false)
  }}><button className="ruilogbtn">登出</button></Link>
  }else{RBbutton = <Link to="/login"><button className="ruilogbtn mr-2">登入</button></Link>}
  const isAuthTrueMenu = () =>{
    const userNameLogin = localStorage.getItem('user') || []
    const parseuserNameLogin = JSON.parse(userNameLogin)
    const nameParseuserNameLogin = parseuserNameLogin[0].CustomerName
    // alert(nameParseuserNameLogin) 陳芮以
    return(
    <>
      <Navbar bg="light" expand="lg" fixed="top" className="ruinav">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              <img src={require('../img/Logo1.png')}/>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="active"
                onMouseMove={() => {
                  aaa()
                }}
              >
                首頁
              </NavLink> */}
              <Nav.Link as={Link} to="/product/0/0/1">產品</Nav.Link>
              <Nav.Link
                as={Link}
                to="/discountMain"
              >
                促銷專區
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/brand"
              >
                品牌理念
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/productDisplay"
              >
                佈置靈感
              </Nav.Link>
              <Nav.Link ref={ref}  as={Link}
                to="/cart">                 
                  <i className="fa fa-cart-arrow-down"></i>
                  <span  >{cartlength}</span>
              </Nav.Link>                    
              <Nav.Link as={Link}
                to="/Member/MemberMyCollection/page/1"><i class='fas fa-heart'></i>
                  <span>{favlength}</span>
              </Nav.Link>              
              <Nav.Link
                as={Link}
                to="/member"
                className="mr-2"
              >
                <i className="fa fa-user"></i>
                <sapn className="welcomeText">{nameParseuserNameLogin}你好</sapn>
              </Nav.Link>
              {RBbutton}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    )
  }
  const isAuthFalseMenu = () =>{
    return(
    <>
        <Navbar bg="light" expand="lg" fixed="top" className="ruinav">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              <img src={require('../img/Logo1.png')}/>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/product/0/0/1">產品</Nav.Link>
              <Nav.Link
                as={Link}
                to="/discountMain"
              >
                促銷專區
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/brand"
              >
                品牌理念
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/productDisplay"
              >
                布置靈感
              </Nav.Link>
              


              <Nav.Link ref={ref}
                as={Link}
                >                 
                  <CartNotLoging />
              </Nav.Link> 



              <Nav.Link as={Link}
                >
                <i class='fas fa-heart'></i>
              </Nav.Link>              
              <Nav.Link
                as={Link}
                className="mr-2"
              >
                <i className="fa fa-user"></i>
              </Nav.Link>
              {RBbutton}
              <Link to="/register"><button className="ruilogbtn">註冊</button></Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </>
      )
  }
// if(lcsg == true && lcsg !==[null]){props.setIsAuth(true)}else{props.setIsAuth(false)}

// -------------------------------------------------
// 右昕
  const [cartlength,setcartlength] = useState(0)
  const [favlength,setFavlength] = useState(0)
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [dataLoading, setDataLoading] = useState(false)
  const ref = useRef(null);
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
// 統計購物車--------------------------------

  async function getTotalFromLocalStorage(value) {

  const currentCart = JSON.parse(localStorage.getItem('cart')) || []
  var cartlength = currentCart.length;
  setcartlength(cartlength)
  // console.log('currentCart', currentCart)
  // console.log('localStorage', cartlength) 
}

// 一開始就會開始載入資料
 useEffect(() => {
  getTotalFromLocalStorage()
}, [])

useEffect(() => {
  setTimeout(() => {
    setDataLoading(false)
  }, 500)
}, [])

// 統計收藏--------------------------------

async function getFavTotalFromLocalStorage(value) {
  
  const currentFav = JSON.parse(localStorage.getItem('fav')) || []
  var favlength = currentFav.length;
  setFavlength(favlength)
  // console.log('currentFav', currentFav)
  // console.log('localStorage', favlength) 
}

// 一開始就會開始載入資料
useEffect(() => {
getFavTotalFromLocalStorage()
}, [])


useEffect(() => {
  setTimeout(() => {
    setDataLoading(false)
  }, 5000)
}, [favlength])

//資料讀取spinner-----------------------------

const loading = (
  <>
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </>
)
// -------------------------------------------------
const display = (
    <>
      {lcsg ? props.sendMe(true):props.sendMe(false)}
      {props.isAuth ? isAuthTrueMenu() : isAuthFalseMenu()}
    </>    
  )
  return (
    <>
    { dataLoading ? loading : display}
    </>
  )
}
export default withRouter(RBMenu)
