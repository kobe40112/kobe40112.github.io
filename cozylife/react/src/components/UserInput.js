import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

function UserInput(props) {
  // console.log(props.value);
  const { CustomerName, CustomerAddress, CustomerTel } = props.value;
  const [userN, setUserN] = useState([]);
  const [userA, setUserA] = useState([]);
  const [userM, setUserM] = useState([]);
  const [mergeUser, setMergeUser] = useState([]);
  const user = localStorage.getItem('user') || []
  let oldUser = JSON.parse(user);
  
  
  useEffect(() => {

    let oldUserArr = [
      {
        'CustomerID':oldUser[0].CustomerID,
        'CustomerName':oldUser[0].CustomerName,
        'CustomerAddress':oldUser[0].CustomerAddress,
        'CustomerTel':oldUser[0].CustomerTel,
      }
     ]
    //  console.log(oldUserArr);
     

    setMergeUser(oldUserArr);
    
    // localStorage.setItem('newUser', JSON.stringify(oldUserArr));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  useEffect(() => {
    // let newUserN = {'CustomerName':userN};
    mergeUser.map((value)=>{
      return value.CustomerName = userN;
    })
    
    props.sendUser(mergeUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userN])

  useEffect(() => {
    // let newUserA = {'CustomerAddress':userA};
    mergeUser.map((value)=>{
      return value.CustomerAddress = userA;
    })
    props.sendUser(mergeUser);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userA])

  useEffect(() => {
    // let newUserM = {'CustomerTel':userM};
    mergeUser.map((value)=>{
      return value.CustomerTel = userM;
    })
    props.sendUser(mergeUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userM])


  return (
    <>
      <InputGroup className="mb-2">
          <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">姓名</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder={CustomerName}
            aria-label="Usernamea"
            aria-describedby="basic-addon1"
            onChange={(e)=>{
              setUserN(e.target.value)
            }}
          />
      </InputGroup>

      <InputGroup className="mb-2">
          <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">地址</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
              placeholder={CustomerAddress}
              aria-label="Usernameb"
              aria-describedby="basic-addon1"
              onChange={(e)=>{
                setUserA(e.target.value)
              }}
          />
      </InputGroup>


      <InputGroup className="mb-2">
          <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">手機</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
              placeholder={CustomerTel}
              aria-label="Usernamec"
              aria-describedby="basic-addon1"
              onChange={(e)=>{
                setUserM(e.target.value)
              }}
          />
      </InputGroup>

      
    </>
  )
}

export default withRouter(UserInput)