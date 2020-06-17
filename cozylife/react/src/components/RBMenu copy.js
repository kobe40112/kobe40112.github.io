import React,{useState,useEffect,useRef} from 'react'
// import Login from '../components/Login'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Modal,
  Popover,Overlay
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsFillBagFill } from "react-icons/bs"
import { BsFillHeartFill } from "react-icons/bs"

function RBMenu(props) {
  // -------------------------------------------------
  // function aaa() {
  //   console.log(123)
  // }
  const lcsg = localStorage.getItem('user')
  console.log(lcsg)
  // if(lcsg == true && lcsg !==[null]){props.setIsAuth(true)}else{props.setIsAuth(false)}
  let RBbutton;
  if(props.isAuth){ RBbutton = <Button variant="outline-info" className="mr-2" onClick={()=>{
    localStorage.removeItem('user');
    setTimeout(() => {
        alert('成功登出')
      }, 500)
    return props.sendMe(false)
  }}>登出</Button>
  }else{RBbutton = <Button variant="outline-info" as={Link} to="/login" className="mr-2">登入</Button>}
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
      {lcsg ? props.setIsAuth(true):props.setIsAuth(false)}
      <Navbar bg="light" expand="lg" fixed="top" className="ruinav">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              React-Bootstrap
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
                關於我們
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/productDisplay"
              >
                布置靈感
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/member"
              >
                <i className="fa fa-user"></i>
              </Nav.Link>
              {/* <Nav.Link
                as={Link}
                to="/cart"
              >
                <i className="fa fa-cart-arrow-down"></i>
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                <i className="fa fa-search"></i>
              </Nav.Link> */}
              <Nav.Link ref={ref}>
                
                  
                  {/* <BsFillBagFill className="nav-icon1" onClick={handleClick}/> */}
                  <i className="fa fa-cart-arrow-down" onClick={handleClick}></i>
                  <span className="mr-2" >{cartlength}</span>
                  
            
                  <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref.current}
                    containerPadding={20}
                  >
                  <Popover id="popover-contained">
                  <Popover.Title as="h3">購物車清單</Popover.Title>
                  <Popover.Content>
                  <strong>共{cartlength}樣商品</strong>
                  
                  <button><a href ="http://localhost:3000/Cart">前往結帳</a></button>
                  </Popover.Content>
                  </Popover>
                  </Overlay>
                

                
                  {/* <BsFillHeartFill className="nav-icon2"/> */}
                  <i class='fas fa-heart'></i>
                  <span className="mr-2" >{favlength}</span>
                
              </Nav.Link>
              {RBbutton}
              <Button variant="outline-info" as={Link} to="/register" className="mr-2">註冊</Button>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>    
  )
  return (
    <>
    { dataLoading ? loading : display}
    </>
  )
}
export default RBMenu
