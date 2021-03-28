import React, { Component } from 'react';
import Cookies from 'js-cookie';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

class JobForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      section: 'Appointment',
      clients: [],
      jobs: [],
      job_id: '',
      job_name: '',
      job_email: '',
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
      show: 'hide',
      showSearch: "hide",
    }
    this.search = this.search.bind(this);
    this.filterHardware = this.filterHardware.bind(this);
    this.handleClientSubmit = this.handleClientSubmit.bind(this);
    this.handleJobSubmit = this.handleJobSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleshow = this.handleshow.bind(this);
    this.handleShowIssue = this.handleShowIssue.bind(this);
    this.chooseClient = this.chooseClient.bind(this);
    this.chooseJob = this.chooseJob.bind(this);
  }

componentDidMount() {
    fetch("/api/v1/clients")
      .then(res => res.json())
      .then(
        (result) => {
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
      fetch("/api/v1")
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
filterHardware(event){
  console.log("I'm firing");
  const hardwareType = event.target.dataset.type;
  this.setState({hardwareSelection: hardwareType,
                  hardware: hardwareType })
}

handleInput(event){
  this.setState({ [event.target.name]: event.target.value });
}

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
  this.setState({ [event.target.name]: event.target.value });
  if(this.state.issue !== "Other"){
    this.setState({show: "show"})
  }
  else if(this.state.issue === "Other")
  this.setState({show:"hide"})
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
    this.setState({first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    location: "", })
    alert("Successful")
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
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            phone_number:result.phone_number,
            location: result.location,
            client_id: result.id,
            search: "",
            showSearch: "hide",
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
chooseJob(id){
  console.log("hitting me");
  fetch(`/api/v1/edit/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('response', result)
          this.setState({
            client: result,
            job_id: result.id,
            job_name: result.clientname,
            job_email: result.clientemail,
            search: "",
            showSearch: "hide",
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

search(){
  this.setState({search: this.state.search})
  if(this.state.search.length === 0){
    this.setState({showSearch: "hide"})
  }
  else if(this.state.search.length > 0){
    this.setState({showSearch: "show"})
  }
}

  // if clicked on then set that clients values to the state.


render(){

  const search = this.state.clients.filter(client => {
  if(client.last_name.toLowerCase().includes(this.state.search.toLowerCase())){
    return client
  }else if(client.first_name.toLowerCase().includes(this.state.search.toLowerCase())){
    return client
  }else if(client.phone_number?.includes(this.state.search)){
    return client
  }else if(client.email.toLowerCase().includes(this.state.search.toLowerCase())){
    return client
  }
  return console.log();
  }).map((client) => (
    <tr  key={client.id} className="listImg">
      <td onClick={()=>this.chooseClient(client.id)}>{client.first_name} </td>
      <td onClick={()=>this.chooseClient(client.id)}>{client.last_name}</td>
      <td onClick={()=>this.chooseClient(client.id)}>{client.location}</td>
      <td onClick={()=>this.chooseClient(client.id)}><button className="btn  btn-orange" >Add Client</button></td>
    </tr>

  ));
  const searchJobs = this.state.jobs.filter(job => {
  if(this.state.search === job.clientname){
    return job
  }else if(job.clientname.toLowerCase().includes(this.state.search.toLowerCase())){
    return job
  }else if(job.hardware.toLowerCase().includes(this.state.search.toLowerCase())){
    return job
  }else if(job.issue.toLowerCase().includes(this.state.search.toLowerCase())){
    return job
  }
  return console.log();
  }).map((job) => (
    <tr  key={job.id} className="listImg">
        <td onClick={()=>this.chooseJob(job.id)}>{job.clientname}  </td>
        <td onClick={()=>this.chooseJob(job.id)}> {job.hardware} </td>
        <td onClick={()=>this.chooseJob(job.id)}>{job.issue} </td>
        <td onClick={()=>this.chooseJob(job.id)}>{job.created_date} </td>
        <td onClick={()=>this.chooseJob(job.id)}><button className="btn  btn-orange">Add Job</button></td>
    </tr>
  ));

  return(
    <>
    <div className="row">
      <div className="header-backend">
        <button onClick={()=> this.setState({section:"Client"})} className="col-4 btn-add">+ Client </button>
        <button onClick={()=> this.setState({section:"Job"})} className="col-4 btn-add">+ Job</button>
        <button onClick={()=> this.setState({section:"Appointment"})} className="col-4 btn-add">+ Appointment</button>
        </div>
    </div>
    {this.state.section === "Client"
      ?
      <form onSubmit={this.handleClientSubmit}>
          <div className="row">
              <div className="col-10 mx-auto">
          <div className="my-3 col-4">
            <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
            <input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleInput} required/>
            <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleInput} required/>
          </div>

          <div className="mb-3 col-8">
            <label htmlFor="InputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleInput} placeholder="username@example.com" required/>
          </div>

          <div className="mb-3 col-8">
            <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
            <input type="tel"  className="form-control" id="phone" name="phone_number" value={this.state.phone_number} onChange={this.handleInput} placeholder="8438888888" required/>
        </div>

          <div className="mb-3 col-8">
          <label htmlFor="InputEmail1" className="mr-4 form-label">Best Time to Call:</label>
            <select className="col-4 custom-select custom-select-sm"  id="call_time" name="call_time" value={this.state.call_time} onChange={this.handleInput} required>
               <option value="Moring">Moring</option>
               <option value="MidDay">Mid-Day</option>
               <option value="Evening">Evening</option>
             </select>
           </div>


          <label htmlFor="InputEmail1" className="mb-3 col-2 form-label">Location</label>
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
           <div className="mb-3 col-10" >
             <label htmlFor="Street" className="form-label">Street address</label>
             <input type="tel"  className="form-control" id="address_street" name="address_street" value={this.state.address_street} onChange={this.handleInput} placeholder="123 Island Drive" />
           </div>
         </div>
        <button className="m-3 col-2 btn  btn-orange" type="submit">Submit</button>
          </div>
      </div>
    </form>
      :
      null
    }

    {this.state.section === "Job"
    ?
    <form onSubmit={this.handleJobSubmit}>
      <div className="row">
        <div className="col-10 mx-auto">
          <div className="row" >
            <div className="my-3 input-group">
                <input id="search-focus" name="search" type="search" className="form-control"
                  value={this.state.search}  onChange={this.handleInput} placeholder="Search for Client"/>
                <button type="button" className="btn btn-primary" onClick={this.search}>
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className={this.state.showSearch}>
            <table className="table search-results">
            <thead>
              <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Location</th>
                <th scope="col">Add Client</th>
              </tr>
            </thead>
            <tbody>
                {search}
            </tbody>
            </table>
          </div>
          </div>

          <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
          <input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleInput} required/>
          <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
          <input type="text" className="mb-3 form-control" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleInput} required/>


        <div className="mb-3">
          <label htmlFor="InputEmail1" className="mr-3 form-label">Hardware</label>
            <select className="col-3 custom-select custom-select-sm"  id="hardware" name="hardware" value={this.state.hardware} onChange={this.handleInput} required>
               <option value="Computer">Computer</option>
               <option value="Printer">Printer</option>
               <option value="Other">Other</option>
             </select>
        </div>

        <div className="mb-3">
        <label htmlFor="Issue" className="mr-3 form-label">Issue</label>
          <select className=" col-3 custom-select custom-select-sm"  id="issue" name="issue" value={this.state.issue} onChange={this.handleShowIssue} required>
             <option value="Not">Not Turning on</option>
             <option value="Unknown">I don't know</option>
              <option value="Other">Other</option>
           </select>

          <div className={this.state.show}>
          <label htmlFor="Number" className="form-label">Issue Description </label>
              <input type="text" className="form-control" id="issue_speical" name="issue_speical" value={this.state.issue_speical} onChange={this.handleInput} />
        </div>
        </div>

          <div className="mb-3">
            <label htmlFor="InputEmail1" className="mr-3 form-label">OS</label>
              <select className=" col-3 custom-select custom-select-sm"  id="os" name="os" value={this.state.os} onChange={this.handleInput} required>
                 <option value="Mac">Mac</option>
                 <option value="PC">PC</option>
                 <option value="Unknown">I don't know</option>
               </select>
          </div>

          <div className="mb-3">
            <label htmlFor="InputEmail1" className="form-label">Model Number</label>
              <input type="text" className="form-control" id="model_number" name="model_number" value={this.state.model_number} onChange={this.handleInput} required/>
          </div>
          <button className="col-4 btn btn-orange" type="submit">Submit</button>
          </div>
        </div>
      </form>
      :
      null }


      {this.state.section === "Appointment"
      ?
          <form onSubmit={this.handleJobSubmit}>
            <div className="row">
              <div className="col-10 mx-auto">
                <div className="row" >
                  <div className="my-3 input-group">
                      <input id="search-focus" name="search" type="search" className="form-control"
                        value={this.state.search}  onChange={this.handleInput} placeholder="Search for Job"/>
                      <button type="button" className="btn btn-primary" onClick={this.search}>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                  <div className={this.state.showSearch}>
                      <table className="table search-results">
                      <thead>
                        <tr>
                          <th scope="col">Client Name</th>
                          <th scope="col">Hardware</th>
                          <th scope="col">Issue</th>
                          <th scope="col">Date Reported</th>
                          <th scope="col">Add Job</th>
                        </tr>
                      </thead>
                      <tbody>
                          { searchJobs }
                      </tbody>
                      </table>

                </div>
                </div>


                <label htmlFor="exampleInputEmail1" className="form-label">Client Last Name</label>
                <input type="text" className="form-control" id="first_name" name="first_name" value={this.state.job_name} onChange={this.handleInput} required/>
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input type="text" className="mb-3 form-control" id="last_name" name="last_name" value={this.state.job_email} onChange={this.handleInput} required/>
                <Datetime/>


                <button className="col-4 btn btn-orange" type="submit">Submit</button>
                </div>
              </div>
            </form>
            :
            null }






    </>
  )
}

}


export default JobForm;
