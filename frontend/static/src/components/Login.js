import React, { Component } from 'react';
import { withRouter } from "react-router-dom";


class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',

    }
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleWrongUser = this.handleWrongUser.bind(this);
  }

handleInput(event) {
  this.setState({[event.target.name]: event.target.value});
}
handleWrongUser(){
  this.props.history.push("/")
}

handleLogin(e, obj){
  this.props.handleLogin(e, this.state);
  this.props.history.push("/dashboard")
}

render(){
  return(
    <>
    <div className="row  mx-0">
      <p className="col-12 login-title"> Admin Login</p>

        <div className="col-11  login-text">
          <p>Hello there! If you are not the owner of Rent-a-Bob but have reached this page on accident..
            We have to say, thanks for visiting and you can return to the homepage by clicking <span onClick={this.handleWrongUser}>here.</span>
          </p>
          </div>
      <form className="loginform" onSubmit={(e) => this.handleLogin(e, this.state)}>
      <input type="text" name="username" value={this.state?.username} placeholder="username" onChange={this.handleInput} required/><br/>
      <input type="password" name="password" value={this.state?.password} placeholder="password" onChange={this.handleInput} required/><br/>
      <button className="btn btn-orange" type="submit">Login</button>
      </form>
  </div>
    </>
  )
}

}


export default withRouter(Login);
