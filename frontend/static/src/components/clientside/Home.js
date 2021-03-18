import React, { Component } from 'react';
import Form from "./Form";
import Reviews from "./Reviews";
import Products from "./Products";




class Home extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //   }
  //
  // }


render(){
  return(
    <>
    <div className="navbar navbar-dark homepage-nav">
    <span className="navbar-1 navbar-brand" >Home</span>
      <a href="#form">
    <span className="navbar-1 navbar-brand">Help!</span>
    </a>
    </div>


    <div className="row">
      <div className="divider-container col-12">
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
    <div id="form"><Form/></div>

    </>
  )
}

}


export default Home;
