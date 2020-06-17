import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

// 每個頁面的元件要匯入
// Ruiyi-------------------------------------
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// Ader--------------------------------------
import Cart from './pages/Cart'
import CheckoutPage from './pages/CheckoutPage'
import OrderDetails from './pages/OrderDetails'
import ProductDisplay from './pages/ProductDisplay'
import Loadingpage from './pages/Loadingpage'

// 天鴻--------------------------------------
import Product from './pages/Product'
import Brand from './pages/Brand'

// 旻旻--------------------------------------
import DiscountMain from './pages/DiscountMain'

// 右昕--------------------------------------
import ProductList from './pages/ProductList'

// 宗訓--------------------------------------
import Member from './pages/Member' 

import NotFoundPage from './pages/NotFoundPage'
// 匯入選單-每頁都有的
import RBMenu from './components/RBMenu'
import Footer from './components/Footer'

function App() {
  const [isAuth,setIsAuth] = useState(false)

  function sendDataToMe(value) {
    console.log(value)
    setIsAuth(value)
  }
  return (
    <Router>
      <>
        <RBMenu isAuth={isAuth} setIsAuth={setIsAuth} sendMe = {sendDataToMe}/>
        
        <Switch>
          {/* react-router v5之後的寫法 */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login            
              isAuth={isAuth}
              sendMe = {sendDataToMe}
              //logoutMethod = {()=>setIsAuth(false)}
              />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          {/* 定義網址上的參數屬性名字為id */}
          {/* 加問號是可選的(可有可無) */}
          <Route path="/product/:pid?/:cid?/:page?">
            <Product />
          </Route>
          <Route path="/brand">
            <Brand />
          </Route>

          <Route path="/cart">
            <Cart isAuth={isAuth} />
          </Route>
          <Route exact path="/CheckoutPage">
            <CheckoutPage />
          </Route>
          <Route exact path="/OrderDetails">
            <OrderDetails />
          </Route>
          <Route exact path="/ProductDisplay">
            <ProductDisplay />
          </Route>
          <Route exact path="/Loadingpage">
            <Loadingpage />
          </Route>
          
          <Route path="/discountMain">
            <DiscountMain />
          </Route>

          <Route path="/productList/:pid?">
            <ProductList />
          </Route>
          
          <Route path="/member">
            <Member isAuth={isAuth}/>
          </Route>
          {/* 找不到網頁，需要放在switch路由表的最後一個 */}
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        
        {/* 頁尾 */}
        <Footer />
      </>
    </Router>
  )
}

export default App
