import React from 'react';
import {Link} from 'react-router-dom'
import classes from '../styles/BackgroundVideo.module.css';

const BackgroundVideo = () => {
    const videoSource = require('../img/homeVideo.mp4');
    return (
        <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                    <h1 className={classes.homePageH1}>Cozy Life</h1>
                    <p>Welcome to the place of leisure</p>
                    <button type="button" className="btn btn-outline-light"><Link to="/product/0/0/1">View the product</Link></button>
                    {/* <img
                        src={require('../img/homelogo.png')}
                        alt="profile" /> */}
                </div>
            </div>
        </div>
    )
}

export default BackgroundVideo