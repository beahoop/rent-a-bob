import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { withRouter } from "react-router-dom";

class ClientDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      client: [],
      jobs: [],
      address_street: "",
      email: "",
      call_time: "",
      first_name: "",
      last_name: "",
      location: "",
      phone_number: 0,
      zipcode: 0,
    }
  }

componentDidMount() {
  fetch(`/api/v1/clients/${this.props.match.params.id}/`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('response', result)
          this.setState({
            client: result,
            jobs: result.jobs,
            address_street: result.address_street,
            email: result.email,
            call_time: result.call_time,
            first_name: result.first_name,
            last_name: result.last_name,
            location: result.location,
            phone_number: result.phone_number,
            zipcode: result.zipcode,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

handleSubmit(event){
  event.preventDefault();
  const client = {
    address_street: this.state.address_street,
    email: this.state.email,
    call_time: this.state.call_time,
    first_name: this.state.first_name,
    last_name: this.state.last_name,
    location: this.state.location,
    phone_number: this.state.phone_number,
    zipcode: this.state.zipcode,
  }
    fetch(`/api/v1/clients/${this.props.match.params.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : Cookies.get('csrftoken'),
      },
      body: JSON.stringify(client),
    })
    .then(response => {
      if(!response.ok){
        throw new Error ('Bad Post request');
      }
      return response.json()
    })
    .then(data => {//here is where I got back my DJANGO object and
      //here is where I added it to state for react
      //because django gave me the ID and the username to show it on react
      console.log('Success. Message created!', data)})
      .catch(error => console.log('Error:', error))
      .finally('I am always going to fire!');
      this.setState({
       address_street: this.state.address_street,
       email: this.state.email,
       call_time: this.state.call_time,
       first_name: this.state.first_name,
       last_name: this.state.last_name,
       location: this.state.location,
       phone_number: this.state.phone_number,
       zipcode: this.state.zipcode,
     })
};

handleEdit(event){
  if(event.keyCode === 13) {
    this.handleSubmit(event);
    this.setState({ isEditing: false });
  }
}

handleInputEdit(event) {
  this.setState({ [event.target.name]: event.target.value })
}

render(){

  const clientJobs = this.state.client.jobs?.map((job) => (
    <div key={job.id} className="client-job-listImg">
      <div className="client-job-container">
      <span className="client-jobs-status">
        <span className="bold"> Status: </span>{job.job_status}
        </span>
      <span className="client-jobs-hardware">
        <span className="bold"> Hardware: </span>
          {job.hardware} </span>
      <span className="client-jobs-os">
        <span className="bold">  Operating System: </span>
         {job.os} </span>
      <p className="client-jobs-issue">
        <span className="bold">  Issue: </span>
        {job.issue}</p>
        <div className="client-job-link">
          <a href={`/job/${job.id}`}>
          <p className="btn btn-info">See Details</p>
          </a>
        </div>
      </div>
    </div>
));
const client = this.state;
  return(
    <>
    {this.state.isEditing
      ?
      <div className="row client-container">
        <p className="client-name">  <input type="last_name" name="last_name"
          value={this.state.last_name} onChange={(event) => this.handleInputEdit(event)}
          onKeyUp={(event) => this.handleEdit(event)}/>  <input type="first_name" name="first_name"
            value={this.state.first_name} onChange={(event) => this.handleInputEdit(event)}
            onKeyUp={(event) => this.handleEdit(event)}/>
          </p>
        <div className="client-info">
          <p className="client-location"> Location: <input type="location" name="location"
            value={this.state.location} onChange={(event) => this.handleInputEdit(event)}
            onKeyUp={(event) => this.handleEdit(event)}/> </p>
          <p className="client-address"> Address: <input type="address_street" name="address_street"
            value={this.state.address_street} onChange={(event) => this.handleInputEdit(event)}
            onKeyUp={(event) => this.handleEdit(event)}/></p>
          <p className="client-phone"> Phone: <input type="phone" name="phone"
            value={this.state.phone} onChange={(event) => this.handleInputEdit(event)}
            onKeyUp={(event) => this.handleEdit(event)}/></p>
          <p className="client-phone"> Email: <input type="email" name="email"
              value={this.state.email} onChange={(event) => this.handleInputEdit(event)}
              onKeyUp={(event) => this.handleEdit(event)}/></p>
        </div>
      </div>

      :
      <div className="row client-container">
        <p className="client-name">{client.last_name}, {client.first_name}</p>
        <div className="client-info">
          <p className="client-location"> Location: {client.location}</p>
          <p className="client-location"> Address: {client.address_street} </p>
          <p className="client-location"> Phone: {client.phone}</p>
          <p className="client-location"> Email: {client.email}</p>
        </div>
      </div>
    }


    {!this.state.isEditing
      ?
    <button className="col-12 col-md-6 btn btn-orange" type="button" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
    Edit</button>
    :
    null
    }
    {this.state.jobs.length === 0
    ?
    null
    :
    <div className="row client-container">
    <div className="client-jobs-header">Jobs</div>
    <div className="client-info">
      <p>{ clientJobs }</p>
    </div>
    </div>
    }
    </>
  )
}

}


export default withRouter(ClientDetail);
