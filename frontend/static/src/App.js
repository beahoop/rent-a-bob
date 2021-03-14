import {Component} from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    jobs: [],
    isLoggedIn: !!Cookies.get('Authorization'),
  }

this.handleLogin = this.handleLogin.bind(this);
this.handleLogOut = this.handleLogOut.bind(this);
this.handleRegistration = this.handleRegistration.bind(this);

}


componentDidMount() {
    fetch("/api/v1/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('response', result)
          this.setState({
            jobs: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }




async handleLogin(e, obj){
  e.preventDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
    },
    body: JSON.stringify(obj),
  };
  const handleError = (err) => console.warn(err);
  const response = await fetch('/rest-auth/login/', options);
  const data = await response.json().catch(handleError);
  console.log("data",data);

  if(data.key){
    Cookies.set('Authorization', `Token ${data.key}`);
    const user = {username: data.username}
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({isLoggedIn: true })
  }
}

async handleLogOut(e){
  console.log(this.state.isLoggedIn);
  e.preventDefault();

  alert('logging out');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
    },
  };
  const handleError = (err) => console.warn(err);
  const response = await fetch('/rest-auth/logout/', options);
  const data = await response.json().catch(handleError);
  console.log(data);
  Cookies.remove('Authorization');
  this.setState({isLoggedIn: false });
  localStorage.removeItem('user');
}

async handleRegistration(e, obj) {
  e.preventDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    },
    body: JSON.stringify(obj)
  };
  const handleError = (err) => console.warn(err);
  const response = await fetch('/rest-auth/registration/', options);
  const data = await response.json().catch(handleError);
  console.log(data);

  if (data.key) {
    Cookies.set('Authorization', `Token ${data.key}`);
    const user = {username: data.username}
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({isLoggedIn: true})
  }
}



  render(){
    return (
      <div className="container">
        <div className="row flex-nowrap">
          <div className="nav-bar">
        <BrowserRouter>
          <Header   handleLogOut={this.handleLogOut}
            isLoggedIn={this.state.isLoggedIn}/>
        <Switch>

          <div className="row flex-nowrap">

            <div className="col-6 col-md">
              <Route path="/login" children={
                  <Login
                    isLoggedIn={this.state.isLoggedIn}
                    handleLogin={this.handleLogin}
                  />
                }></Route>
                <Route path="/register" children={
                  <Register
                    isLoggedIn={this.state.isLoggedIn}
                    handleRegistration ={this.handleRegistration}
                  />
                }></Route>

            </div>

          </div>


      </Switch>
      </BrowserRouter>


      </div>



       </div>
      </div>
    );
  }

}

      // <Route path="/recipe/:id" children={<RecipeDetail
      //       setClickedId={this.setClickedId}/>}

export default App;
