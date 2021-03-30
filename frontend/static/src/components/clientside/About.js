import React, { Component } from 'react';
// import AboutPhoto from "./AboutPhoto.jpg";


class About extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //   }
  //
  // }


render(){
  return(
    <>
    <div className="row  mx-0">
      <p className="col-12 about-title"> About Rent-A-Bob</p>
      <div className="row">
        <div className="col-10 col-md-5 mx-auto about-photo">
          <p className=" about-img" ></p>
        </div>
    
        <div className="col-10 col-md-6 col-lg-5 mx-auto about-text">
          <p>Rent-A-Bob computers was started in 2005 in response to a need on the Isle of Palms for direct computer help to residents and small businesses. We offere in persone or remote help for your home or office.  We can assist with all computer, network, or printer issues as needed.
          </p>

    <p>Bob Hooper is the owner and, with part-time help he keeps the islands humming on the internet, solving hardware and software problems, network demons and keeping crazy printers online and working.</p>

    <p>With more than 30 years in the IT field, we can help with anything.  </p>
          </div>
          </div>
        </div>

    </>
  )
}

}


export default About;
