import React, { Component } from 'react';
import HeaderLogin from '../HeaderLogin';




class ContactUs extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //   }
  //
  // }


render(){
  return(
    <>
    <div className="row flex-column  flex-md-row mx-0">
      <p className="col contact-title"> <i class="fas fa-phone-square-alt"></i> (843)822-7794</p>
      <p className="col contact-title"> <i class="fas fa-envelope"></i> rentabob@live.com</p>
      <p className="col contact-title"> <i class="fas fa-pencil-ruler"></i> Designed by Sarah Bea</p>
      <p className="col contact-title login-btn"> <HeaderLogin/></p>
    </div>

    </>
  )
}

}


export default ContactUs;
