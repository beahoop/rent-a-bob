import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Form extends Component{
  constructor(props){
    super(props);
    this.state = {
      hardwareSelection: "None",
      isComputer: false,
      isPrinter: false,
      isOther: false,
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      location: '',
    }
    this.filterHardware = this.filterHardware.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

filterHardware(event){
  console.log("I'm firing");
  const hardwareType = event.target.dataset.type;
  this.setState({hardwareSelection: hardwareType})
}

handleInput(event){
  this.setState({ [event.target.name]: event.target.value });
}

handleSubmit(event){
  event.preventDefault();
  const client = {
    first_name: this.state.first_name,
    last_name: this.state.last_name,
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
          console.log('Success. Message created!', data)})
        .catch(error => console.log('Error:', error))
        .finally('I am always going to fire!');
        this.setState({text: ""})
        };

render(){


  return(
    <>
    <div className="container">
    <div className="row form" >
      {this.state.hardwareSelection === "None"
        ?
        <div className="col-11 mx-auto">
          <p id="form" className="form-title">I need help with: </p>
            <div className="row">
              <button data-type="Computer" onClick={this.filterHardware} className="col-8 mx-auto btn btn-info hardware-btn">
                COMPUTER </button>
              <button data-type="Printer" onClick={this.filterHardware}  className="mt-5 col-8 mx-auto btn btn-info hardware-btn">
                PRINTER </button>
              <button data-type="Other" onClick={this.filterHardware}className="my-5 col-8 mx-auto btn btn-info hardware-btn">
                NETWORK/OTHER </button>
            </div>
        </div>
        :
        <button data-type="None" onClick={this.filterHardware}className="my-5 col-8 mx-auto btn btn-info hardware-btn">
          Go Back</button>
      }
      {this.state.hardwareSelection !== "None"
        ?
        <form onSubmit={this.handleSubmit}>
        <div className="col-10 mx-auto">
          <p id="form" className="form-title">We’re sorry you are experincing computer
            issues. Please, fill out the form below and
            we will be in contact with you shortly. </p>
          <div className="row">
                <div class="col-5 input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">First Name</span>
                  </div>
                  <input type="text" className="form-control" id="recipe-title" name="first_name" value={this.state.first_name} onChange={this.handleInput} required/><br/>
                </div>
                <div class="col-5 input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Last Name</span>
                  </div>
                  <input type="text" className="form-control" id="recipe-title" name="last_name" value={this.state.last_name} onChange={this.handleInput} required/><br/>
                </div>
                <div class="col-10 input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                  </div>
                  <input type="email" className="form-control" id="recipe-title" name="email" value={this.state.email} onChange={this.handleInput} required/><br/>
                </div>
                <div class="col-10 input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Phone</span>
                  </div>
                  <input type="tel"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-control" id="phone" name="phone_number" value={this.state.phone_number} onChange={this.handleInput} required/><br/>
                </div>
            </div>
            <div className="row sp mx-auto">
             <select className=" col-3 custom-select custom-select-sm"  id="location" name="location" value={this.state.location} onChange={this.handleInput} required>
                <option value="IOP">IOP</option>
                <option value="Remote">Remote</option>
                <option value="Vacationer">Vacationer</option>
              </select>
              </div>
            <button className="btn btn-outline-info" type="submit">Submit</button>
        </div>
        </form>
        :
        null
      }
    </div>
  </div>
    </>
  )
}

}


export default Form;
