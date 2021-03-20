import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Form extends Component{
  constructor(props){
    super(props);
    this.state = {
      hardwareSelection: "None",
      clientAdded: false,
      job_status: 'New',
      hardware: '',
      issue: '',
      os: '',
      model: '',
      client: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      location: 'Remote',
      client_id: '',
    }
    this.filterHardware = this.filterHardware.bind(this);
    this.handleClientSubmit = this.handleClientSubmit.bind(this);
    this.handleJobSubmit = this.handleJobSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

filterHardware(event){
  console.log("I'm firing");
  const hardwareType = event.target.dataset.type;
  this.setState({hardwareSelection: hardwareType,
                  hardware: hardwareType })
  }

handleInput(event){
  this.setState({ [event.target.name]: event.target.value });
}

handleClientSubmit(event){
  event.preventDefault();
  this.setState({clientAdded: true})
  const last_name = this.state.last_name[0].uppercase
  const first_name = this.state.first_name[0].uppercase
  const client = {
    first_name: first_name,
    last_name: last_name,
    email: this.state.email,
    phone_number: this.state.phone_number,
    location: this.state.location,
     }
    fetch("/api/v1/clients/match/", {
      // no begining slash mean from where I'm at add this to interval
      // with a slash mean this excatly
          method: 'POST',
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
        .then(data => {
          this.setState({client_id : data.id})
          console.log('Success. Message created!', data)
        } )
        .catch(error => console.log('Error:', error))
        .finally('I am always going to fire!');
        this.setState({text: ""})
        };

handleJobSubmit(event){
  event.preventDefault();
  const client = {
    job_status: "New",
    hardware: this.state.hardware,
    issue: this.state.issue,
    os: this.state.os,
    client: this.state.client_id,
     }
    fetch("/api/v1/", {
      // no begining slash mean from where I'm at add this to interval
      // with a slash mean this excatly
          method: 'POST',
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
        .then(data => {
          this.setState({client_id : data.id})
          console.log('Success. Message created!', data)
        } )
        .catch(error => console.log('Error:', error))
        .finally('I am always going to fire!');
        this.setState({text: ""})
  };

render(){


  return(
    <>
    <div className="row form" >
      {this.state.hardwareSelection === "None"
        ?
        <div className="col-11 mx-auto">
          <p id="form" className="form-title">I need help with: </p>
            <div className="row">
              <button data-type="Computer" onClick={this.filterHardware} className="col-8 mx-auto btn btn-orange hardware-btn">
                COMPUTER </button>
              <button data-type="Printer" onClick={this.filterHardware}  className="mt-5 col-8 mx-auto btn btn-orange hardware-btn">
                PRINTER </button>
              <button data-type="Other" onClick={this.filterHardware}className="my-5 col-8 mx-auto btn btn-orange hardware-btn">
                NETWORK/OTHER </button>
            </div>
        </div>
        :
        <button data-type="None" onClick={this.filterHardware}className="my-5 col-8 mx-auto btn btn-orange hardware-btn">
          Go Back</button>
      }
      {this.state.hardwareSelection !== "None" && !this.state.clientAdded
        ?
        <form onSubmit={this.handleClientSubmit}>

            <div className="row">
            <p id="form" className="form-title">We’re sorry you are experincing computer
              issues. Please, fill out the form below and
              we will be in contact with you shortly. </p>
                <div className="col-10 mx-auto">
            <div className="row">
              <div class="mb-3 col-4">
                <label for="exampleInputEmail1" class="form-label">First Name</label>
                <input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleInput} required/>
              </div>

              <div class="mb-3 col-4">
                <label class="form-label">Last Name</label>
                <input type="text" className="form-control" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleInput} required/>
              </div>
            </div>

            <div class="mb-3 p-0 col-8">
              <label for="InputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleInput} placeholder="username@example.com" required/>
            </div>

            <div class="mb-3 p-0 col-8">
              <label for="exampleInputEmail1" class="form-label">Phone Number</label>
              <input type="tel"  className="form-control" id="phone" name="phone_number" value={this.state.phone_number} onChange={this.handleInput} placeholder="8438888888" required/>
              <div id="emailHelp" class="form-text">We'll never share your phone number with anyone else.</div>
            </div>

            <div class="mb-3 p-0 col-8">
            <label for="InputEmail1" class="mr-4 form-label">Location</label>
              <select className="col-4 custom-select custom-select-sm"  id="location" name="location" value={this.state.location} onChange={this.handleInput} required>
                 <option value="IOP">IOP</option>
                 <option value="Remote">Remote</option>
                 <option value="Vacationer">Vacationer</option>
               </select>
            </div>
          <button className="m-3 col-2 btn  btn-orange" type="submit">Submit</button>
            </div>
        </div>
        </form>
        :
        null
      }
      {this.state.clientAdded
        ?
        <form onSubmit={this.handleJobSubmit}>
        <div className="col-10 mx-auto">
          <p id="form" className="form-title">Let us know more about the issue.
            If you don’t know the anwser,
            choose or write I don’t know. </p>
          <div className="row">
            <div class="mb-3">
            <label for="InputEmail1" class="form-label">Issue</label>
              <select className=" col-3 custom-select custom-select-sm"  id="issue" name="issue" value={this.state.issue} onChange={this.handleInput} required>
                 <option value="Not">Not Turning on</option>
                 <option value="Unknown">I don't know</option>
               </select>
            </div>
            <div class="mb-3">
            <label for="InputEmail1" class="form-label">OS</label>
              <select className=" col-3 custom-select custom-select-sm"  id="os" name="os" value={this.state.os} onChange={this.handleInput} required>
                 <option value="Mac">Mac</option>
                 <option value="PC">PC</option>
                 <option value="Unknown">I don't know</option>
               </select>
            </div>

            <div class="mb-3 col-8">
              <label for="InputEmail1" class="form-label">Model Number</label>
                  <input type="text" className="form-control" id="model_number" name="model_number" value={this.state.model_number} onChange={this.handleInput} required/>
            </div>

            </div>
            <button className="btn btn-orange" type="submit">Submit</button>
        </div>
        </form>
        :
        null
      }
    </div>
    </>
  )
}

}


export default Form;
