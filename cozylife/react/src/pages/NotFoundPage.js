import React from 'react'
import Banner from '../components/Banner'
import { withRouter } from 'react-router-dom'

function NotFoundPage(props) {
  return (
    <>
      <Banner pagename="頁面不存在" />
      <button
        onClick={() => {
          props.history.push('/product')
        }}
      >
        到產品頁
      </button>
      <button
        onClick={() => {
          props.history.goBack()
        }}
      >
        回上一頁
      </button>
    </>
  )
}

export default withRouter(NotFoundPage)
