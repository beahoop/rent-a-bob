import React, { Component } from 'react';
import Form from "./Form";
import Reviews from "./Reviews";
import Products from "./Products";
import About from "./About";
import ContactUs from "./ContactUs";




class Home extends Component{


render(){
  return(
    <>
    <div className="sticky-top homepage-nav navbar-dark row px-0">
    <div className="navbar ">
      <a href="#top">
        <span className="navbar-1 navbar-brand" >Rent-a-bob</span>
      </a>
      <a href="#reviews">
        <span className="navbar-1 navbar-brand">Reviews</span>
      </a>
      <a href="#about">
        <span className="navbar-1 navbar-brand">About Us</span>
      </a>
      <a href="#form">
        <span className="navbar-1 navbar-brand">Help!</span>
      </a>
    </div>
    </div>
    <div className="row">
      <div id="top" className="divider-container col-12">
        <div className="divider-top">
          <div className="divider-words">
          <img src="https://i.imgur.com/N3xq7E3.png" alt="logo" />
          </div>
          <div className="divider-button px-4">
            <a href="#form">
              <button className="btn  help-btn">Get Help!</button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
    <div className="blue-divider"></div>
    <div id="products"><Products/></div>
      </div>
      <div className="row">
    <div className="blue-divider"></div>
    <div id="reviews"><Reviews/></div>
    </div>
    <div className="row">
      <div id="about"><About/></div>
      </div>
      <div className="row">
    <div className="blue-divider"></div>
    <div id="form"><Form/></div>
    </div>
    <div className="row">
      <div id="contact"><ContactUs/></div>
      </div>


    </>
  )
}

}


export default Home;
