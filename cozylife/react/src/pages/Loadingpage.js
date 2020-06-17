/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';


function Loadingpage(props) {
  // const [percentage, setPercentage] = useState(20);
  // const [img, setImg] = useState("");

  return (
    <>
      <div className="loadingPage">
        <div className="Mask"></div>
        <div className="bg"></div>
        <h1 className="startH1" onClick={()=>{
          props.history.push('/');
        }}>進入首頁</h1>
        <div className="wavy">
          <span style={{"--i":"1"}}>L</span>
          <span style={{"--i":"2"}}>o</span>
          <span style={{"--i":"3"}}>a</span>
          <span style={{"--i":"4"}}>d</span>
          <span style={{"--i":"5"}}>i</span>
          <span style={{"--i":"6"}}>n</span>
          <span style={{"--i":"7"}}>g</span>
          <span style={{"--i":"8"}}>.</span>
          <span style={{"--i":"9"}}>.</span>
          <span style={{"--i":"10"}}>.</span>
        </div>
      </div>
    </>
  )
}

export default withRouter(Loadingpage);

