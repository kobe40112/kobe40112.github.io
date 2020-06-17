import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
//import { withRouter } from 'react-router-dom'
//import { useParams } from 'react-router-dom'

//每頁幾筆     總筆數       
const Pagin = ({ postsPerPage, totalPosts, paginate }) => {
const pageNumbers = [];//頁碼變量
                      
for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  pageNumbers.push(i);
}
                      
return (
  <>
  {/* 傳頁碼 */}
  <div className="pagination">
  {pageNumbers.map(number => (
    <Pagination key={number}>
    <Pagination.Item onClick={() => paginate(number)} href='/product/0/0/1'>{1}</Pagination.Item>
    <Pagination.Item onClick={() => paginate(number)} href='/product/0/0/2'>{2}</Pagination.Item>
    <Pagination.Item onClick={() => paginate(number)} href='/product/0/0/3'>{3}</Pagination.Item>
    <Pagination.Item onClick={() => paginate(number)} href='/product/0/0/4'>{4}</Pagination.Item>
    <Pagination.Item onClick={() => paginate(number)} href='/product/0/0/5'>{5}</Pagination.Item>
    <Pagination.Item onClick={() => paginate(number)} href='/product/0/0/6'>{6}</Pagination.Item>
    <Pagination.Item onClick={() => paginate(number)} href='/product/0/0/7'>{7}</Pagination.Item>
    </Pagination>
    ))}
    </div>
  </>
  );
};
  


export default Pagin;