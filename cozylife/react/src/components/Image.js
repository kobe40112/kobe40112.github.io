import React from 'react'
import { 
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap'


function Img(props) {
  console.log(props.img);
  
  return (
    <>
      <Container>
        <Row> 
          <Col xs={6} md={4}>
            <Image src={props.img} roundedCircle />
          </Col>
        </Row>
      </Container>
    </>
  )
}
  
  export default Img