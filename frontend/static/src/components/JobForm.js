import React, { Component } from 'react';
import Cookies from 'js-cookie';

class JobForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      section: 'Job',
      clients: [],
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
      search: '',
    }
    this.filterHardware = this.filterHardware.bind(this);
    this.handleClientSubmit = this.handleClientSubmit.bind(this);
    this.handleJobSubmit = this.handleJobSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.chooseClient = this.chooseClient.bind(this);
  }

componentDidMount() {
    fetch("/api/v1/clients")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('response', result)
          this.setState({
            clients: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
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
  chooseClient(id){
    fetch(`/api/v1/clients/${id}/`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log('response', result)
            this.setState({
              client: result,
              jobs: result.jobs,
              first_name: result.first_name,
              last_name: result.last_name,
              email: result.email,
              phone_number:result.phone_number,
              location: result.location,
              client_id: result.id,
              search: "",
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }

  // if clicked on then set that clients values to the state.


render(){

  const search = this.state.clients.filter(client => {
  if(this.state.search === client.last_name){
    return client
  }
  else if(this.state.search === client.first_name){
    return client
  }
  else if(this.state.search === client.phone_number){
    return client
  }
  else if(this.state.search === client.email){
    return client
  }
  return console.log('nope');
  }).map((client) => (
  <div key={client.id} className="listImg">
      <p onClick={()=>this.chooseClient(client.id)}> Name:{client.last_name}, {client.first_name} Location:{client.location}</p>
  </div>
  ));
//   Buttons for
//     add new client
//     add new job ->
//       search for existing client to add job too.
//       the add the new job.

  return(
    <>
    <div className="row">
      <div className="header-backend">
        <button onClick={()=> this.setState({section:"Client"})} className="col-6 btn-add">Add New Client </button>
        <button onClick={()=> this.setState({section:"Job"})} className="col-6 btn-add">Add New Job</button></div>
    </div>
    {this.state.section === "Client"
      ?
      <form onSubmit={this.handleClientSubmit}>
          <div className="row">
              <div className="col-10 mx-auto">
          <div class="my-3 col-4">
            <label for="exampleInputEmail1" class="form-label">First Name</label>
            <input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleInput} required/>
            <label for="exampleInputEmail1" class="form-label">Last Name</label>
            <input type="text" className="form-control" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleInput} required/>
          </div>

          <div class="mb-3 col-8">
            <label for="InputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleInput} placeholder="username@example.com" required/>
          </div>

          <div class="mb-3 col-8">
            <label for="exampleInputEmail1" class="form-label">Phone Number</label>
            <input type="tel"  className="form-control" id="phone" name="phone_number" value={this.state.phone_number} onChange={this.handleInput} placeholder="8438888888" required/>
            <div id="emailHelp" class="form-text">We'll never share your phone number with anyone else.</div>
          </div>

          <div class="mb-3 col-8">
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
        <div>
        <form onSubmit={this.handleJobSubmit}>
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row" >
                <div class="my-3 input-group">
                    <input id="search-focus" name="search" type="search" class="form-control"
                      value={this.state.search}  onChange={this.handleInput} placeholder="Search for Client"/>
                  <button type="button" class="btn btn-primary" onClick={()=> this.setState({search: this.state.search})}>
                    <i class="fas fa-search"></i>
                  </button>
                </div>
                <div className="search-results">
                  {search}
                </div>
              </div>

              <label for="exampleInputEmail1" class="form-label">First Name</label>
              <input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleInput} required/>
              <label for="exampleInputEmail1" class="form-label">Last Name</label>
              <input type="text" className="mb-3 form-control" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleInput} required/>


            <div class="mb-3">
              <label for="InputEmail1" class="mr-3 form-label">Hardware</label>
                <select className="col-3 custom-select custom-select-sm"  id="hardware" name="hardware" value={this.state.hardware} onChange={this.handleInput} required>
                   <option value="Computer">Computer</option>
                   <option value="Printer">Printer</option>
                   <option value="Other">Other</option>
                 </select>
            </div>

              <div class="mb-3">
              <label for="InputEmail1" class="mr-3 form-label">Issue</label>
                <select className=" col-3 custom-select custom-select-sm"  id="issue" name="issue" value={this.state.issue} onChange={this.handleInput} required>
                   <option value="Not">Not Turning on</option>
                   <option value="Unknown">I don't know</option>
                 </select>
              </div>

              <div class="mb-3">
                <label for="InputEmail1" class="mr-3 form-label">OS</label>
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
              <button className="col-4 btn btn-orange" type="submit">Submit</button>

              </div>
            </div>
          </form>

    </div>
    }


    </>
  )
}

}


export default JobForm;
