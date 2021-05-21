import {Component} from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import JobForm from './components/JobForm';
import JobItem from './components/JobItem';
import Clients from './components/Clients';
import ClientDetail from './components/ClientDetail';
import Home from './components/clientside/Home';
import Dashboard from './components/Dashboard';
import Header from "./components/Header";
import Appointments from "./components/Appointments";
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Logout from './components/Logout';
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

      <div className="container-fluid no-padding">
<div className="above">Above the navbar</div>
        <BrowserRouter>

          <Header   handleLogOut={this.handleLogOut}
            isLoggedIn={this.state.isLoggedIn}/>
        <Switch>


              <Route path="/login" children={
                  <Login
                    isLoggedIn={this.state.isLoggedIn}
                    handleLogin={this.handleLogin}
                  />
                }></Route>
              <Route path="/logout" children={
                    <Logout
                      isLoggedIn={this.state.isLoggedIn}
                      handleLogOut={this.handleLogOut}
                    />
                  }></Route>

                <Route path="/dashboard" children={
                        <Dashboard
                          jobs ={this.state.jobs}
                        />
                      }></Route>
                <Route path="/register" children={
                  <Register
                    isLoggedIn={this.state.isLoggedIn}
                    handleRegistration ={this.handleRegistration}
                  />
                }></Route>
                <Route exact path="/job/:id" children={
                  <JobItem
                    jobs ={this.state.jobs}
                  />
                }></Route>
              <Route exact path="/clients" children={
                  <Clients
                  />
                }></Route>
              <Route exact path="/appointments" children={
                    <Appointments
                    />
                  }></Route>
              <Route exact path="/client/:id" children={
                <ClientDetail/>}/>

              <Route exact path="/" children={
              <Home/>}/>
                <Route exact path="/createjob/" children={
                <JobForm/>}/>

      </Switch>
      </BrowserRouter>
      <div>


          </div>

       </div>

    );
  }

}

      // <Route path="/recipe/:id" children={<RecipeDetail
      //       setClickedId={this.setClickedId}/>}

export default App;
