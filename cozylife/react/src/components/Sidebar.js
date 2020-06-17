import React from 'react'


function Sidebar() {
  return (
    <>
    
      <div className="sidebar container">
        <h6>CATEGORY</h6>
        <div className="checklist categories">
          <ul>
            <li>
              <a href="/product/0/001/1">餐具</a>
            </li>
            <li>
              <a href="/product/0/002/1">家飾品</a>
            </li>
            <li>
              <a href="/product/0/003/1">文具</a>
            </li>
            <li>
              <a href="/product/0/004/1">衣料品</a>
            </li>
            <li>
              <a href="/product/0/005/1">廚具</a>
            </li>
          </ul>
        </div>
        <h6>BRAND</h6>
        <div className="checklist brand">
          <ul>
            <li>
              <a href="/product/01/0/1">生活工場</a>
            </li>
            <li>
              <a href="/product/02/0/1">Crate&Barral</a>
            </li>
            <li>
              <a href="/product/03/0/1">無印良品</a>
            </li>
            <li>
              <a href="/product/04/0/1">ZARA HOME</a>
            </li>
            <li>
              <a href="/product/05/0/1">HOLA</a>
            </li>
            <li>
              <a href="/product/06/0/1">宜得利</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default Sidebar
