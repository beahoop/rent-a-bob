import React, { Component } from 'react';
import { withRouter } from "react-router-dom";


class Logout extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
    this.handleLogOut = this.handleLogOut.bind(this);
  }


handleLogOut(e, obj){
  console.log("I fire logout");
  this.props.handleLogOut(e, this.state);
  this.props.history.push("/")
}

render(){
  return(
    <>
      <p>Are you sure you want to log out?</p>
      <button className="btn btn-orange" onClick={(e) => this.handleLogOut(e, this.state)}>Logout</button>
    </>
  )
}

}


export default withRouter(Logout);
