import React,{useState,useEffect} from 'react'
// import Form from '../components/Form'
import { Link,withRouter } from 'react-router-dom'
import Acbar from '../components/Acbar'
import Sidebar from '../components/Sidebar'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { useParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'


//import axios from 'axios';
import Pagination from '../components/Pagination'
import Posts from '../components/Posts';

function Product(props){
  //設勾子
  const [productText,setProductText] = useState([])//所有商品
  const [handleChange,sethandleChange]=useState([])//下拉選單



  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);//當前頁面預設為1 
  const [postsPerPage] = useState(9);//每頁數量9筆

   //連線資料
   useEffect(() => {

    
  }, [posts]);
  // Get current posts
  // indexOfLastPost上一頁 = currentPage當前頁 * postsPerPage每頁筆數
  const indexOfLastPost = currentPage * postsPerPage;
  //indexOfFirstPost下一頁 = currentPage當前頁 - postsPerPage每頁筆數
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page 分頁
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //載入下拉選單
  useEffect(()=>{
    
  },[handleChange])

  // 物件值 - 解構賦值 ; 得到的參數一定字串類型 ; 路由值: pid:品牌、cid:類別、page:頁數
  let { pid, cid, page} = useParams()

  //連線node資料庫資料
  function getTotalFromServer() {
    let url = 'http://localhost:7777/product/'+pid+'/'+cid+'/'+page;
    //使用 fetch 透過網路取得 json 然後印出在 console，最簡單的方式只需要一個參數就是資料的 URI，fetch 會回傳一個包含 response 的 promise 。
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson.rows);
      setProductText(myJson.rows);
      //下拉選單
      sethandleChange(myJson.rows);

      setPosts(myJson.rows);//響應數據
    })
  }
  //一開始就會載入資料
  useEffect(() => {
    getTotalFromServer()
    //const newProductText = localStorage.getItem('product') || [] //前面設一個變數代表清單，後面拿出product清單內容
    //setProductText = setProductText(JSON.parse(newProductText)) //把變數轉成json檔，然後傳到setProductText裡
  }, [])


  return (
    <>
    <div id="app">
      <div className="productBody container">
        
        <aside id="asidepro">
        <Sidebar />
        </aside>
        <main id="mainpro">
        {/* 下拉選單 */}
        <div className="producth1">
        <h3>商品</h3>
        <Acbar className="acbar12"/>
            <Dropdown className="Forme" variant="Warning" name="productText">
              <Dropdown.Toggle variant="secondary">
                依價格排序
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) =>{
                  sethandleChange(e.target)
                  productText.sort((a,b) => parseFloat(b.unitPrice) - parseFloat(a.unitPrice)); //高到低
                }}>高到低</Dropdown.Item>
                <Dropdown.Item onClick={(e) =>{
                  sethandleChange(e.target)
                  productText.sort((a,b) => parseFloat(a.unitPrice) - parseFloat(b.unitPrice)); //低到高
                }}>低到高</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="Forme" variant="Warning">
              <Dropdown.Toggle  variant="secondary">
                依時間排序
              </Dropdown.Toggle>

              <Dropdown.Menu >
                <Dropdown.Item onClick={(e) =>{
                  sethandleChange(e.target)
                  productText.sort((a,b)=>{return new Date(a.Addedtime) < new Date(b.Addedtime) ? 1 : -1;})//最新
                }}>最新</Dropdown.Item>
                <Dropdown.Item onClick={(e) =>{
                  sethandleChange(e.target)
                  productText.sort((a,b)=>{return new Date(a.Addedtime) > new Date(b.Addedtime) ? 1 : -1;})//最舊
                }}>最舊</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* 秀出全部資料 */}
          <div className="productContent">
            {productText.map((value,index)=>{
 
            return (
              <div className="Card1" key={index} >
                <CardDeck className="CardDeck12">
                  <Card style={{ width: '18rem' }} border="light" className="Card">
                    <Card.Img variant="top" src={value.Picturepath} className="CardImg"/>
                    <Card.Body>                   
                    <p style={{'cursor':'pointer'}} onClick={()=>{
                          props.history.push('/productList/'+value.productID)
                        }}>
                      <Card.Title>{value.productName}</Card.Title>
                      <Card.Text>NT${value.unitPrice}</Card.Text>
                    </p>                   
                    </Card.Body>
                  </Card>
                </CardDeck>
              </div>  
              )
            })}
          </div>
            {/* 分頁 */}
            <Posts posts={currentPosts}/>
            <Pagination 
            postsPerPage={postsPerPage}//全部筆數
            totalPosts={posts.length}//筆數長度
            paginate={paginate}//分頁
            />
        </main>
      </div>
    </div>  
    </>
  )
}

export default withRouter(Product)
