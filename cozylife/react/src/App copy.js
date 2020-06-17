import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Product from './pages/Product'
import Brand from './pages/Brand'


//匯入每頁都要有的
import RBMenu from './components/RBMenu'
import Footer from './components/Footer'



function App() {
  
  return (
    <Router>
      <>
        <RBMenu />
        <Switch>
        {/* react-router v5之後寫法 */}
          <Route exact path="/">
            <h1>首頁</h1>
          </Route>
          {/* 定義網址上的參數屬性的名字為id */}
          {/* 加問號是可選的(可有可無) */}
          <Route path="/Product/:id?">
            <Product />
          </Route>
          <Route path="/Brand">
            <Brand />
          </Route>

        </Switch>
      </>
    </Router>
  )
}

export default App
