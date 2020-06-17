import React from 'react'
import {
  FaAccessibleIcon,
  FaRegPaperPlane,
  FaFacebookSquare,
  FaFacebookF,
  FaCheck,
  FaTwitter,
  FaGooglePlusG,
  FaQuestion,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="pt-5 pb-4" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 mt-2 mb-4">
              <h5 className="mb-4 ">ABOUT US</h5>

              <ul className="f-address">
                <li>
                  <div className="row">
                    <div className="col-1">
                      <FaRegPaperPlane />
                    </div>
                    <div className="col-10">
                      <h6 className="mb-0">Blog</h6>
                      <p>
                        <a href="#">ohya721@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-1">
                      <FaFacebookSquare />
                    </div>
                    <div className="col-10">
                      <h6 className=" mb-0">粉絲專頁</h6>
                      <p>
                        <a href="#">ohya721@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-1">
                      <FaQuestion />
                    </div>
                    <div className="col-10">
                      <h6 className=" mb-0">常見問題</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt-2 mb-4">
              <h5 className="mb-4 ">FRESH NEWS</h5>
              <ul className="f-address">
                <li>
                  <div className="row">
                    <div className="col-10">
                      <h6 className="mb-0">網站公告</h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-10">
                      <h6 className="mb-0">最新優惠資訊</h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-10">
                      <h6 className="mb-0">當月促銷活動</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt-2 mb-4">
              <h5 className="mb-4 ">PRODUCT</h5>
              <ul className="f-address">
                <li>
                  <div className="row">
                    <div className="col-10">
                      <h6 className=" mb-0">餐具</h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-10">
                      <h6 className=" mb-0">家飾品</h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-10">
                      <h6 className="mb-0">文具</h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-10">
                      <h6 className=" mb-0">衣料品</h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    {/* <div className="col-1"></div> */}
                    <div className="col-10">
                      <h6 className="mb-0">廚具</h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt-2 mb-4">
              <h5 className="mb-4">CONNECT WITH US</h5>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Email Address"
                />
                <span className="input-group-addon" id="basic-addon2">
                  <FaCheck />
                </span>
              </div>
              <ul className="social-pet mt-4">
                <li>
                  <a href="#" title="facebook">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="#" title="twitter">
                    <FaTwitter />
                  </a>
                </li>

                <li>
                  <a href="#" title="instagram">
                    <FaGooglePlusG />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
