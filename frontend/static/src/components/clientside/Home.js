import React, { Component } from 'react';
import Form from "./Form";
import Reviews from "./Reviews";
import Products from "./Products";
import About from "./About";




class Home extends Component{


render(){
  return(
    <>
    <div className="navbar sticky-top navbar-dark homepage-nav">
      <a href="#top">
        <span className="navbar-1 navbar-brand" >Home</span>
      </a>
      <a href="#reviews">
        <span className="navbar-1 navbar-brand">Reviews</span>
      </a>
      <a href="#form">
        <span className="navbar-1 navbar-brand">Help!</span>
      </a>
    </div>


    <div className="row">
      <div id="top" className="divider-container col-12">
        <div className="divider-top">
          <div className="divider-words">Rent-A-Bob
          </div>
          <div className="divider-button">
            <a href="#form">
              <button className="btn  flex-nowrap help-btn">Get Help!</button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="blue-divider"></div>
    <div id="products"><Products/></div>
    <div className="blue-divider"></div>
    <div id="reviews"><Reviews/></div>
      <div className="blue-divider"></div>
      <div id="products"><About/></div>
    <div className="blue-divider"></div>
    <div id="form"><Form/></div>
    </>
  )
}

}


export default Home;
