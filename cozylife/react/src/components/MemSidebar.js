import React from 'react'
import { Link } from 'react-router-dom'

function MemSidebar() {
  return (
    <>
      <div className="memsidebar container">
        <h6>會員中心</h6>
        <div className="checklist categories">
          <ul>
            <li>
              <Link to="#">個人資料及修改</Link>
            </li>
            <li>
              <Link to="#">訂單/問答/退貨查詢</Link>
            </li>
            <li>
              <Link to="#">我的優惠</Link>
            </li>
            <li>
              <Link to="#">我的收藏</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default MemSidebar
