import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container,Card,Button,Modal } from 'react-bootstrap'
import {FaStar} from 'react-icons/fa';
import StarRatingComponent from 'react-star-rating-component';
// import './styles/ProductDetail.css'





function ReviewsList(props) {
  const [reviews, setReviews] = useState([])
  const [lgShow, setLgShow] = useState(false);
  const [rating,setRating] = useState("")
  // props.rid
  const urlID = props.urlID * 1;
  const [dataLoading, setDataLoading] = useState(false)
  const [username, setUsername] = useState('username')
  const [stars, setStars] = useState('5')
  const [reviewcontent, setReviewcontent] = useState('reviewcontent')
  const [createdtime, setCreatedtime] = useState('')
  
  //讀取評論START---------------------
  async function getProductReviewFromServer() {
    
      // const cid = props.match.params.cid
      // 連接的伺服器資料網址
      
      const url = 'http://localhost:7777/reviews/'+ urlID
      
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
      
      console.log(data)
      // 設定資料
      setReviews(data)
    }




// 一開始就會開始載入資料
  useEffect(() => {
    getProductReviewFromServer()
  }, [])



  //讀取評論END---------------------

  function addReviewToSever(username, stars, reviewcontent, NewID){
    let newDataArr = {'username': username, 'stars': stars, 'reviewcontent': reviewcontent}
    
    console.log(JSON.stringify(newDataArr));
    const url = 'http://localhost:7777/reviews/'+ NewID
        
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(newDataArr), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }




  //新增評論START-------------------
  async function addReviewToSever(username, stars, reviewcontent, NewID) {
        // 開啟載入指示
        setDataLoading(true)
        const newData = { username, stars, reviewcontent}
        // console.log("aaaa:",{ username, stars, reviewcontent});
        
        
        let newDataArr = [
          {'username': username, 'stars': stars, 'reviewcontent': reviewcontent}
        ]
        // console.log('aa:', newDataArr);
        
        
        const urlID = props.urlID * 1;
        // 連接的伺服器資料網址
        const url = 'http://localhost:7777/reviews/'+ NewID
    
        // 注意資料格式要設定，伺服器才知道是json格式
        const request = new Request(url, {
          method: 'POST',
          body: JSON.stringify(newDataArr),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
    
        console.log(JSON.stringify(newData))
    
        const response = await fetch(request)
        const data = await response.json()
    
        // console.log('伺服器回傳的json資料', data)
        // 要等驗証過，再設定資料(簡單的直接設定)



// -------------------------------






// -------------------------------


    
        //直接在一段x秒關掉指示器
        setTimeout(() => {
          setDataLoading(false)
          alert('儲存完成')
          props.history.push('/productList/'+urlID)
          setLgShow(false)
        }, 500)
      }
    
    
    
    
    
    const loading = (
        <>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      )

//新增評論END-------------------




   const display= (
      <>
      <Container>
      <Button id="writereview" variant="secondary" onClick={() => setLgShow(true)}>寫下評論</Button>
      {reviews.map((value, index) => {
                  return (

          <Card className="reviewcard"  key={value.reviewID}>
          <Card.Body >
          <p　style={{color:"blue"}}>帳號：{value.customerUsername}</p>
          {/* <p className="review-stars"> ⭐ x {value.stars} </p> */}
            <StarRatingComponent 
              className="review-stars"
              name="rate2" 
              editing={false}
              renderStarIcon={() => <span><FaStar /></span>}
              starCount={5}
              value={value.stars}
            />
          <h4>{value.reviewContent}</h4>
          <br/>
          <br/>
          <p style={{color:"grey"}}>{value.createdTime}</p>
          </Card.Body>
          </Card>
      )
      })}


      {reviews.map((value, index) => {
                  return (
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        key={value.reviewID}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
           寫下評論
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="reviews-form-group">
                <label htmlFor="exampleInputText">使用者名稱</label>
                <input
                type="text"
                className="form-control"
                // value={value.customerUsername}
                onChange={(event) => {
                    setUsername(event.target.value)
                }}
                />
            </div>
            <div className="reviews-form-group">
                <label htmlFor="exampleInputNumber">星星數(1~5)</label>
                <input
                type="text"
                className="form-control"
                onChange={(event) => {
                    setStars(event.target.value)
                }}
                />
            </div>
            <div className="reviews-form-group">
                <label htmlFor="exampleInputText">評論內容</label>
                <input
                type="text"
                className="form-control"
                // value={value.reviewContent}
                onChange={(event) => {
                    setReviewcontent(event.target.value)
                }}
                />
            </div>
           
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setLgShow(false)}}>
                    Close
                </Button>
                <button
                  onClick={() => {
                    addReviewToSever(username, stars, reviewcontent, urlID)
                    window.location.reload()
                  }}
                  className="btn btn-primary addreviewbtn"
            >送出評論
            </button>
      </Modal.Footer>   
      </Modal>
      )
      })}
      </Container>
      </> 
      
      )

      return (
          <>
            {dataLoading ? loading : display}
          </>
        )
    
    }
  

  export default withRouter(ReviewsList)
