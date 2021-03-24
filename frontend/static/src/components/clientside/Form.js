import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Form extends Component{
  constructor(props){
    super(props);
    this.state = {
      hardwareSelection: "None",
      clientAdded: false,
      jobAdded: false,
      spinnerDone:false,
      job_status: 'New',
      issue_speical: '',
      spinner: false,
      call_time: '',
      hardware: '',
      issue: '',
      os: '',
      address_street: " ",
      model: '',
      client: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      location: 'Remote',
      client_id: '',
      show: 'hide',
    }
    this.goBack = this.goBack.bind(this);
    this.filterHardware = this.filterHardware.bind(this);
    this.handleClientSubmit = this.handleClientSubmit.bind(this);
    this.handleJobSubmit = this.handleJobSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleShowIssue = this.handleShowIssue.bind(this);
    this.handleshow = this.handleshow.bind(this);
  }
goBack(){
  this.setState({
    hardwareSelection: "None",
    clientAdded: false,
    jobAdded: false,
    job_status: 'New',
    issue_speical: '',
    spinner: false,
    call_time: '',
    hardware: '',
    issue: '',
    os: '',
    address_street: ' ',
    model: '',
    client: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    location: 'Remote',
    client_id: '',
    show: 'hide',
  })
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
    address_street: this.state.address_street,
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
        this.setState({first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        location: "", })
        alert("Successful")
        };

handleJobSubmit(event){
  event.preventDefault();
  this.setState({jobAdded: true,
                spinner:true})
  const client = {
    job_status: "New",
    issue_speical: this.state.issue_speical,
    call_time:  this.state.call_time,
    hardware: this.state.hardware,
    issue: this.state.issue,
    os: this.state.os,
    client: this.state.client_id,
     }
    setTimeout(() => {this.setState({spinner:false, spinnerDone:true})}, 5000);
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
  // fetch("/send/broadcast", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken' : Cookies.get('csrftoken'),
  //       },
  //     })
  //       .then(response => {
  //       if(!response.ok){
  //         throw new Error ('Bad Post request');
  //       }
  //       return response.json()
  //       })
  //     .then(data => {
  //       this.setState({client_id : data.id})
  //       console.log('Success. Message created!', data)
  //     } )
  //     .catch(error => console.log('Error:', error))
  //     .finally('I am always going to fire!');
  //     this.setState({text: ""})
};

handleshow(event){
  console.log("HI");
  this.setState({ [event.target.name]: event.target.value });
  if(this.state.location !== "Remote"){
    this.setState({show: "hide"})
  }
  else if(this.state.location === "Remote")
  this.setState({show:"show"})
}

handleShowIssue(event){
  console.log("HI");
  this.setState({ [event.target.name]: event.target.value });
  if(this.state.issue !== "Other"){
    this.setState({show: "show"})
  }
  else if(this.state.issue === "Other")
  this.setState({show:"hide"})
}

render(){
  return(
    <>
    <div className="row form" >
      {this.state.hardwareSelection === "None"
        ?
        <div className="col-11 mx-auto">
          <p id="form" className="form-title">I need help with: </p>
            <div className="row">
              <button data-type="Computer" onClick={this.filterHardware} className="col-12 col-md-8 mx-auto btn btn-orange hardware-btn">
                COMPUTER </button>
                </div>
                  <div className="row">
              <button data-type="Printer" onClick={this.filterHardware}  className="mt-5 col-12 col-md-8 mx-auto btn btn-orange hardware-btn">
                PRINTER </button>
              </div>
                <div className="row">
              <button data-type="Other" onClick={this.filterHardware}className="my-5 col-12 col-md-8 mx-auto btn btn-orange hardware-btn">
                NETWORK/OTHER </button>
            </div>
        </div>
        :
        <button data-type="None" onClick={this.goBack}className="my-5 col-12 col-md-8 mx-auto btn btn-orange hardware-btn">
          Go Back</button>
      }
      {this.state.hardwareSelection !== "None" && !this.state.clientAdded
        ?
        <form onSubmit={this.handleClientSubmit}>
            <div className="row">
            <p id="form" className="col-8  mx-auto form-title">We’re sorry you are experincing computer
              issues. Please, fill out the form below and
              we will be in contact with you shortly. </p>
            <div className="col-10 mx-auto">
                <div className="row">
                  <div className="mb-3  col-12 ">
                    <label for="exampleInputEmail1" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleInput} required/>
                  </div>

                  <div className="mb-3  col-12 ">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleInput} required/>
                  </div>
                </div>

                <div className="mb-3 p-0  col">
                  <label for="InputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleInput} placeholder="username@example.com" required/>
                </div>

                <div className="mb-3 p-0  col">
                  <label for="exampleInputEmail1" className="form-label">Phone Number</label>
                  <input type="tel"  className="form-control" id="phone" name="phone_number" value={this.state.phone_number} onChange={this.handleInput} placeholder="8438888888" required/>
                  <div id="emailHelp" className="form-text">We'll never share your phone number with anyone else.</div>
                </div>
                <div className="mb-3 p-0   col">
                <label for="InputEmail1" className="mr-4 form-label">Best Time to Call:</label>
                  <select className="col-4 custom-select custom-select-sm"  id="call_time" name="call_time" value={this.state.call_time} onChange={this.handleInput} required>
                     <option value="Moring">Moring</option>
                     <option value="MidDay">Mid-Day</option>
                     <option value="Evening">Evening</option>
                   </select>
                 </div>

                <div className="mb-3 p-0   col">
                <label for="InputEmail1" className="mr-4 form-label">Location</label>
                  <select className="col-6 custom-select custom-select-sm"  id="location" name="location" value={this.state.location} onChange={this.handleshow} required>
                     <option value="IOP">IOP</option>
                     <option value="Sullivan">Sullivan's</option>
                     <option value="Kiawah">Kiawah</option>
                     <option value="Seabrook">Seabrook</option>
                     <option value="MtPleasant">Mt. Pleasant</option>
                     <option value="NorthCharleston">North Charleston</option>
                     <option value="WestAshely">West Ashely</option>
                     <option value="JamesIsland">James Island</option>
                     <option value="GooseCreek">Goose Creek</option>
                     <option value="Summerville">Summerville</option>
                     <option value="Charleston">Charleston</option>
                     <option value="Remote">Remote</option>
                     <option value="Vacationer">I'm vacation here.</option>
                   </select>
                   <div className={this.state.show}>
                     <div className="mb-3 p-0 col" >
                       <label for="Street" className="form-label">Street address</label>
                       <input type="tel"  className="form-control" id="address_street" name="address_street" value={this.state.address_street} onChange={this.handleInput} placeholder="123 Island Drive" />
                       <div id="street" className="form-text">We'll never share your address with anyone else.</div>
                     </div>
                   </div>

                     <button className=" col-4 btn  btn-orange" type="submit">Submit</button>
                </div>

            </div>
        </div>
        </form>
        :
        null
      }
      {this.state.clientAdded && !this.state.jobAdded
        ?
        <form onSubmit={this.handleJobSubmit}>
        <div className="col-10 mx-auto">
          <p id="form" className="form-title">Let us know more about the issue.
            If you don’t know the anwser,
            choose or write I don’t know. </p>
          <div className="row">
            <div className="mb-3 col-8">
            <label for="Issue" className="form-label">Issue</label>
              <select className=" col-3 custom-select custom-select-sm"  id="issue" name="issue" value={this.state.issue} onChange={this.handleShowIssue} required>
                 <option value="Not">Not Turning on</option>
                 <option value="Unknown">I don't know</option>
                  <option value="Other">Other</option>
               </select>

              <div className={this.state.show}>
              <label for="Number" className="form-label">Issue Description </label>
                  <input type="text" className="form-control" id="issue_speical" name="issue_speical" value={this.state.issue_speical} onChange={this.handleInput}/>
            </div>
            </div>
            <div className="mb-3">
            <label for="InputEmail1" className="form-label">OS</label>
              <select className=" col-3 custom-select custom-select-sm"  id="os" name="os" value={this.state.os} onChange={this.handleInput} required>
                 <option value="Mac">Mac</option>
                 <option value="PC">PC</option>
                 <option value="Unknown">I don't know</option>
               </select>
            </div>

            <div className="mb-3 col-8">
              <label for="InputEmail1" className="form-label">Model Number</label>
                  <input type="text" className="form-control" id="model_number" name="model_number" value={this.state.model_number} onChange={this.handleInput} required/>
            </div>

            </div>
            <button className="btn btn-orange" type="submit">Submit</button>
        </div>
        </form>
        :
        null
      }
      {this.state.spinner ?
        <div className="row">
          <div className="col-2 mx-auto">
        <div className="spinner-border"  role="status">
          <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
          :
          null
      }
      {this.state.clientAdded && this.state.jobAdded && this.state.spinnerDone ?
        <div className="row">
          <div className="col-10 mx-auto">
            <p id="form" className="form-title">
              Thank you for time! We have received your request and
              will be in touch soon. </p>
          </div>
        </div>
        :
        null
      }
    </div>
    </>
  )
}

}


export default Form;
