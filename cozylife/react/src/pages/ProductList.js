import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { withRouter,Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Breadcrumb,Container,Row,Col,Tab,Tabs,Button,Modal} from 'react-bootstrap'
import '../styles/ProductDetail.css'
import { BsFillBagFill } from "react-icons/bs"
import { BsFillHeartFill } from "react-icons/bs"
import ReviewsList from '../components/ReviewsList'
import Otherproduct from '../components/Otherproduct'
// import FavButton from '../FavButton'

function ProductList(props) {
  // console.log(document.location.search)
  // const searchParams = new URLSearchParams(props.location.search)




  const productID = props.match.params.pid 
  // console.log(productID);
  
  const [dataLoading, setDataLoading] = useState(false)
  const [product, setproduct] = useState([])
  const [total, setTotal] = useState(0)
  const [mycart, setMycart] = useState([]) 
  const [myfav, setMyfav] = useState([])
  const [show, setShow] = useState(false)
  const [showFav, setShowFav] = useState(false)
  // 連接SQL資料庫--------------------------------

  async function getProductFromServer(pid) {
    // 開啟載入指示
    setDataLoading(true)

    // 連接的伺服器資料網址
    const url = 'http://localhost:7777/productlist/' + pid

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
    // 設定資料
    console.log("aa:",data);
    
    setproduct(data)
    // setproductName(data.productName)
    // setunitPrice(data.unitPrice)
 
  }

  // 一開始就會開始載入資料
  useEffect(() => {
    getProductFromServer(productID)
  }, [productID])

  // 每次users資料有變動就會X秒後關掉載入指示
  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [product])



// 商品圖展示--------------------------------
function changeimg(image) {
  
  let container = document.getElementById("image-container");
  container.src = image.src;
}


//收藏按鈕-------------------------------------

function changefavbtn(){
  document.getElementById('fav-btn').addEventListener('click', function(event){
      // event.preventDefault();
      // event.stopImmediatePropagation();

      var text = this.querySelector('.text');
      if(text.textContent === "加入收藏"){
          text.textContent = "已收藏 ✓";     
      // }else{
      //     text.textContent = "加入收藏";
      }
  });
}

// 加入收藏--------------------------------

async function updateFavToLocalStorage(value) {
  // 開啟載入指示
  setDataLoading(true)

  const currentFav = JSON.parse(localStorage.getItem('fav')) || []
  console.log('currentFav', currentFav)

  const newFav = [...currentFav, value]
  localStorage.setItem('fav', JSON.stringify(newFav))
  console.log('newFav', newFav)
  // 設定資料
  setMyfav(newFav)
  window.location.reload()
}


useEffect(() => {
  setTimeout(() => {
    setDataLoading(false)
  }, 500)
}, [myfav])


// 加入購物車--------------------------------

async function updateCartToLocalStorage(value) {
  // 開啟載入指示
  setDataLoading(true)
  
  const currentCart = JSON.parse(localStorage.getItem('cart')) || []
  console.log('currentCart', currentCart)

  const newCart = [...currentCart, value]
  localStorage.setItem('cart', JSON.stringify(newCart))
  console.log('newCart', newCart)
  // 設定資料
  setMycart(newCart)
}

 // 一開始就會開始載入資料
//  useEffect(() => {
//   getTotalFromLocalStorage()
// }, [])
// 每次total資料有變動就會3秒後關掉載入指示
useEffect(() => {
  setTimeout(() => {
    setDataLoading(false)
  }, 500)
}, [mycart])


//資料讀取spinner-----------------------------

  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border loadspinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

//頁面內容-----------------------------

  const display = (
    <>
    {/* {product.map((value, index) => {
            return (
    <Breadcrumb className="breadcrumb" key={value.productID}>
    <Breadcrumb.Item href="/">首頁</Breadcrumb.Item>
    <Breadcrumb.Item href="/product">商品頁</Breadcrumb.Item>
    <Breadcrumb.Item active>{value.productName}</Breadcrumb.Item>
    </Breadcrumb>
            )
          })} */}

  {product.map((value, index) => {
            return (
  <Container className="plcontainer" key={value.productID}>
     <Row className="row" key={value.productID}>
       <Col className="col-6 galleryphoto">
      
      <section className="plSection">
        <div className="gallery">
          <img id="image-container" src={value.Picturepath} className="img-fluid" alt="主圖"></img>
        </div>
        <div className="thumb img-fluid">
        <img
          onClick={(e)=>{
            changeimg(e.target)
          }}
          src={value.Picturepath2}
          alt="圖一"
        />
        <img
          onClick={(e)=>{
            changeimg(e.target)
          }}
          src={value.Picturepath3}
          alt="圖二"
        />
        <img
          onClick={(e)=>{
            changeimg(e.target)
          }}
          src={value.Picturepath4}
          alt="圖三"
        />
      </div>        
      </section>
      
      
      </Col>
      <Col className="col-6 detail">
            <div className=" productName"><h1>{value.productName}</h1></div>       
            <div className="productPrice"><h2>NT${value.unitPrice}</h2></div>
            <p className="ldesc mt-3">{value.shortlnfo}</p>
            <hr />
            <p style={{color: 'crimson'}}>庫存量：{value.productStock}</p>
            <div className="counter">
            <button className="minusatc"
              onClick={() => {  
                if (total>0){
                  setTotal (total - 1)
                }
              }}>
              -
            </button>
            <h3 className="countertotal">{total}</h3>
            <button className="addatc"
              onClick={() => {
                setTotal(total + 1)
              }}>
              +
            </button>
            </div>

            <div className="addbtn">
            <Button 
            onClick={() => {
                
                updateCartToLocalStorage({
                  id: value.productID,
                  name: value.productName,
                  amount: total,
                  price: value.unitPrice,
                  picture: value.Picturepath
                })
                setShow(true) 
              }}
            className="btn btn-warning mt-3" ><BsFillBagFill />加入購物車</Button>

            {/* <Router><FavButton /></Router> */}
            <Button onClick={(e)=>{
              changefavbtn(e.target)
              updateFavToLocalStorage({
                  id: value.productID,
                  name: value.productName,
                  price: value.unitPrice,
                  picture: value.Picturepath,
                  loninfo: value.longlnfo
                })
                setShowFav(true) 
              }} 
            id="fav-btn" className="btn btn-danger mt-3 ml-2">
            <BsFillHeartFill/>
            <span className="text">加入收藏</span>
            </Button>
            </div>
            
            <p className="ldesc mt-3">{value.longlnfo}</p>
    </Col>
    </Row>

    <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton onClick={()=>window.location.reload()} >
          <Modal.Title id="example-custom-modal-styling-title">
            加入商品 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          已加入「{total}件」<br />
          「{value.productName}」至購物車
          </p>
        </Modal.Body>
      </Modal>


      <Modal
        show={showFav}
        onHide={() => setShowFav(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton onClick={()=>window.location.reload()}>   
          <Modal.Title id="example-custom-modal-styling-title">
            加入收藏
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          已加入「{value.productName}」至收藏清單
          </p>
        </Modal.Body>
      </Modal>

      <hr />
      <Tabs className="nav-pills-outline-primary mt-3 mb-3" defaultActiveKey="info" id="uncontrolled-tab-example">
    <Tab className="nav-item1" eventKey="info" title="商品資訊">
    <div className="detail-content">
              <h4>{value.productName}</h4>
              <h6>{value.longlnfo}</h6>
      <img src={value.Picturepath3} style={{width: '50%', margin:'1rem'}} className="img-fluid"  alt="內圖1"></img>
      <img src={value.Picturepath4} style={{width: '50%'}} className="img-fluid" alt="內圖2"></img>
      </div>
    </Tab>
    <Tab className="nav-item2" eventKey="reviews" title="購買評價">
    <ReviewsList urlID = { productID } />
    <br/><Link to="/ReviewsList/1">查看評價</Link>
    {/* {//網址參數取到PID = RID} */}
    </Tab>
    <Tab className="nav-item3 " eventKey="otherinfo" title="注意事項" >
1. 本網站所提供之商品數量有限，放入購物車不代表您已完成訂購，若有其他使用者在您完成訂購程序前已經完成訂購程序，商品數量即已售完。<br/><br/>
2. 您得依據本網站所提供的庫存數量及價格進行下單。下單後3個工作日內除正當理由為拒絕外。已付款者將視為交易成立。<br/><br/>
3. 本網站得就特定商品訂定個別消費者每次訂購的數量上限。訂購逾數量上限或同一消費者以複數帳號重覆、多次下單時，本網站僅依該產品購買上限出貨。<br/><br/>
4. 本網站商品之運送依您訂購時選擇及指定的方式為之，商品訂價不含運費。唯若您符合一定活動優惠條件時，將依您選擇的商品運送方式，由本網站負擔運費。若您因部分商品退貨導致不符合運費優惠條件時，本網站將自您解約退款之金額中收取該筆訂單之原始運送費用。<br/><br/>
5. 依消費者保護法第19條規定，7日猶豫期內得以行使解除契約的權利。請注意猶豫期間並非試用期，僅供您評估是否購買該商品之用，若您實際使用該商品，可能影響您解約退款的權利。<br/><br/>
6. 更多購物相關事宜，請參閱本網站購物說明。  
    </Tab>
  </Tabs>
{/* <Carousel className="carousel slide container-fluid" >
    <Carousel.Item className="carousel-item"> */}

    {/* </Carousel.Item>
</Carousel> */}
<hr/>
<h3 className="relatedtitle">其他商品</h3>
  <div className="otherproduct">
      <Otherproduct />
    </div>
</Container>

    )
    
    })}
   
    </>
  )


  return (
    <>
    {dataLoading ? loading : display}
    </>
  )
}

export default withRouter(ProductList)