import React from 'react'
import { withRouter, Link } from 'react-router-dom'

function Breadcrumb(props) {
  console.log(props)
  let path = ''
  const pathname = props.location.pathname
  switch (pathname) {
    case '/product':
      path = '產品'
      break
    case '/about':
      path = '關於我們'
      break
    case '/discount':
      path = '促銷專區'
      break
    case '/layout':
      path = '布置專區'
      break
    case '/member':
      path = '會員中心'
      break
    case '/cart':
      path = '購物車'
      break
    default:
      path = ''
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {path}
          </li>
        </ol>
      </nav>
    </>
  )
}
export default withRouter(Breadcrumb)
