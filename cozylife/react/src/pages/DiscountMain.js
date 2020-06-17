import React,{useState,useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import Conupon from '../components/Conupon'
import {Button,Image,ListGroup,Dropdown } from 'react-bootstrap'

function DiscountMain() {
  
  let newCouponArr = [];
  // const [dataLoading, setDataLoading] = useState(false)
  const [coupon, setcoupon] = useState([])
  // const [couponID, setcouponID] = useState([])
  // const [couponName, setcouponName] = useState([])
  
  async function getTotalFromServer() {
    // 開啟載入指示
    // setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:7777/discount/total'
    console.log(url)
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request(url, {  
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    // console.log(data)
    setcoupon(data)
  }


  // 一開始就會開始載入資料
  useEffect(()=>{
    getTotalFromServer()
  },[])

  // 每次資料有變動就會X秒後關掉載入指示
  // useEffect(() => {
  //   setTimeout(() => {
  //     setDataLoading(false)
  //   }, 1000)
  // }, [coupon])



  // useEffect(()=>{
  //   updateDiscountToLocalStorage()
  // },[])


  // // 每次資料有變動就會3秒後關掉載入指示
  // useEffect(() => {
  //   setTimeout(() => {
  //     setDataLoading(false)
  //   }, 500)
  // }, [coupon])


  
// //資料讀取spinner-----------------------------

//   const loading = (
//     <>
//       <div className="d-flex justify-content-center">
//         <div className="spinner-border" role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     </>
//   )




  const display = (
    <>
          <div className="main1 container">
            <h5>優惠券專區</h5><hr />
            <div className="cgroup">


            {coupon.map((value, index) => {
            return (
              <div className="c" id='c' key={value.coupon_id}>
                <div className="dispic">
                  {/* <Image src={value.coupon_pic} fluid /> */}
                  <h5>SALE</h5>
            
                </div>
                {/* <div className="disword">
                  <h5>{value.coupon_id}</h5>
                  <p>{value.coupon_name}</p>
                </div> */}
                <div className="disword">
                  <p className="disno">優惠碼:{value.coupon_no}</p>
                  <p className="disname">{value.coupon_name}</p>
                  <p className="distime">開始時間 : {value.coupon_start_time}</p>
                  <p className="distime">結束時間 : {value.coupon_end_time}</p>
                </div>
                  <Conupon value={value}/>
                {/* <Button className="disbutton" variant="dark">領取</Button>{' '} */}
              </div>
            )
          })}

              
              </div>
          </div>



      
    </>
  )

return (
  <>
    {/* {dataLoading ? loading : display} */}
    {display}

  </>
)

}
// export default withRouter(Discount)


export default DiscountMain
