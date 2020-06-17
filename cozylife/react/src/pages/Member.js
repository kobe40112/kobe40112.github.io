import React, { useState, useEffect }  from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
  withRouter,
  Redirect,
} from 'react-router-dom'
import MemberMyFiles from './MemberMyFiles'
import MemberMyCollection from './MemberMyCollection'
import MemberMyDiscount from './MemberMyDiscount'
import MemberInquire from './MemberInquire'
// import '../styles/custom.scss'
import { Container, Row, Col } from 'react-bootstrap'

function Member(props) {
  // const [loading, setLoading] = useState(false)
  const [UserID, setUserID] = useState('')

  function getUserIDFromLocalstorage(){
    // setLoading(true)

    const newUser = JSON.parse(localStorage.getItem('user')) || []
    setUserID(newUser[0].CustomerID)

  }

  useEffect(() => {
    getUserIDFromLocalstorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500)
  // }, [])

  // const userid = props.match.params.userid
  // const userid = 76

  // const url = props.match.url
  // const path = props.match.path
  // console.log(url)
  // console.log(userid)
  return (
    <>
      <Router>
        <Container>
          <Row>
            <Col md="2">
              {/* <ul id="paddingbottom">
                <li>
                  <h4>
                    <NavLink to="/member">會員中心</NavLink>
                  </h4>
                </li>
                <br />
                <li id="list1">
                  <h5>
                    <Link to={`/Member/MemberMyFiles/` + userid}>個人資料</Link>
                  </h5>
                </li>
                <li id="list1">
                  <h5>
                    <Link to={`/Member/MemberMyDiscount/page/1`}>我的優惠</Link>
                  </h5>
                </li>
                <li id="list1">
                  <h5>
                    <Link to={`/Member/MemberMyCollection/page/1`}>
                      我的收藏
                    </Link>
                  </h5>
                </li>
                <li id="list1">
                  <h5>
                    <Link to={`/Member/MemberInquire`}>訂單查詢</Link>
                  </h5>
                </li>
              </ul> */}
              <div className="memsidebar container" style={{height:'13.5rem'}}>
                <h6>會員中心</h6>
                <div className="checklist categories">
                  <ul>
                    <li>
                      <Link to={`/Member/MemberMyFiles/` + UserID}>個人資料修改</Link>
                    </li>
                    <li>
                      <Link to={`/Member/MemberInquire`}>訂單查詢</Link>
                    </li>
                    <li>
                      <Link to={`/Member/MemberMyDiscount/page/1`}>我的優惠</Link>
                    </li>
                    <li>
                      <Link to={`/Member/MemberMyCollection/page/1`}>我的收藏</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md="10">
              <Switch>
                <Route path={`/Member/MemberMyFiles/` + UserID}>
                  <MemberMyFiles userid={UserID} />
                </Route>
                <Route path={`/Member/MemberMyDiscount/page/:page`}>
                  <MemberMyDiscount />
                </Route>
                <Route path={`/Member/MemberMyCollection/page/:page`}>
                  <MemberMyCollection />
                </Route>
                <Route path={`/Member/MemberInquire`}>
                  <MemberInquire userid={UserID}/>
                </Route>
                <Route path={`/Member/`}>
                  <h2 id="memberWord">歡迎來到COZYLIFE會員中心，請點擊功能以查詢或修改。</h2>
                </Route>

                {/* <Route path="/Member/*">
                  <NotFoundPage />
                </Route> */}
                {/* <Route path="/Member/MemberMyFiles/*">
                  <NotFoundPage />
                </Route>
                <Route path="/Member/MemberMyCollection/*">
                  <NotFoundPage />
                </Route>
                <Route path="/Member/MemberMyDiscount/*">
                  <NotFoundPage />
                </Route>
                <Route path="/Member/MemberInquire/*">
                  <NotFoundPage />
                </Route> */}
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  )
}

export default withRouter(Member)
