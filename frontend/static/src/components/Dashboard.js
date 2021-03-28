import React, { Component } from 'react';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      jobs: [],
      section:"New",
      search: "",
    }
    this.handleInput = this.handleInput.bind(this);
  }

componentDidMount() {
    fetch("/api/v1/")
      .then(res => res.json())
      .then(
        (result) => {
          // console.log('response', result)
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

handleInput(event){
  this.setState({ [event.target.name]: event.target.value });
}


render(){
  const newjobs = this.state.jobs.filter(job => {
    if(job.job_status === "New"){
      return job
    }
    return console.log();
  }).map((job) => (
    <tr  key={job.id} className="listImg">
      <td><a href={`/job/${job.id}`}>{job.clientname}   </a></td>
      <td><a href={`/job/${job.id}`}> {job.hardware}  </a></td>
      <td><a href={`/job/${job.id}`}>{job.issue}  </a></td>
        <td><a href={`/job/${job.id}`}>{job.created_date}  </a></td>
        <td><a href={`/job/${job.id}`}><button className="btn  btn-job">View Job</button> </a></td>
    </tr>
));
const openjobs = this.state.jobs.filter(job => {
  if(job.job_status === "Open"){
    return job
  }
  return console.log();
}).map((job) => (
  <tr  key={job.id} className="listImg">
    <td><a href={`/job/${job.id}`}>{job.clientname}   </a></td>
    <td><a href={`/job/${job.id}`}> {job.hardware}  </a></td>
    <td><a href={`/job/${job.id}`}>{job.issue}  </a></td>
      <td><a href={`/job/${job.id}`}>{job.created_date}  </a></td>
      <td><a href={`/job/${job.id}`}><button className="btn  btn-job">View Job</button> </a></td>
  </tr>
));
const alljobs = this.state.jobs.map((job) => (
  <tr  key={job.id} className="listImg">
    <td><a href={`/job/${job.id}`}>{job.clientname}   </a></td>
    <td><a href={`/job/${job.id}`}> {job.hardware}  </a></td>
    <td><a href={`/job/${job.id}`}>{job.issue}  </a></td>
      <td><a href={`/job/${job.id}`}>{job.created_date}  </a></td>
      <td><a href={`/job/${job.id}`}><button className="btn  btn-job">View Job</button> </a></td>
  </tr>
));

const search = this.state.jobs.filter(job => {
if(this.state.search === job.clientname){
  return job
}else if(job.clientname.toLowerCase().includes(this.state.search.toLowerCase())){
  return job
}else if(job.clientemail.toLowerCase().includes(this.state.search.toLowerCase())){
  return job
}else if(job.hardware.toLowerCase().includes(this.state.search.toLowerCase())){
  return job
}else if(job.issue.toLowerCase().includes(this.state.search.toLowerCase())){
  return job
}
return console.log();
}).map((job) => (
  <tr  key={job.id} className="listImg">
    <td><a href={`/job/${job.id}`}>{job.clientname}   </a></td>
    <td><a href={`/job/${job.id}`}> {job.hardware}  </a></td>
    <td><a href={`/job/${job.id}`}>{job.issue}  </a></td>
    <td><a href={`/job/${job.id}`}>{job.created_date}  </a></td>
    <td><a href={`/job/${job.id}`}><button className="btn  btn-job">View Job</button> </a></td>
  </tr>
));

  return(
    <>
    <div className="row">
      <div className="col-12 header-backend">
        <div className="row">
          <button onClick={()=> this.setState({section:"New"})} className="col-2 col-md-3 btn-add">New Jobs</button>
          <button onClick={()=> this.setState({section:"Open"})} className="col-2 col-md-3  btn-add">Open Jobs</button>
          <button onClick={()=> this.setState({section:"All"})} className="col-2 col-md-3  btn-add">All Jobs</button>
            <div className="col-5 col-md-3  my-3 input-group">
                <input id="search-focus" name="search" type="search" class="form-control"
                  value={this.state.search}  onChange={this.handleInput} placeholder="Search"/>
                <button type="button" className="form-control btn btn-primary" onClick={()=> this.setState({search: this.state.search, section: "Search"})}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
      </div>
    </div>
    {this.state.section === "New"
      ?
    <div class="row dashboard">
      <table className="table search-results">
      <thead>
        <tr>
          <th scope="col">Client Name</th>
          <th scope="col">Hardware</th>
          <th scope="col">Issue</th>
          <th scope="col">Date Reported</th>
          <th scope="col">View Job</th>
        </tr>
      </thead>
      <tbody>
          { newjobs }
      </tbody>
      </table>
    </div>
    : null }
    {this.state.jobs.length === 0
      ?
      <div className="row mx-auto">
        <div className="col-2 m-5 mx-auto">
      <div className="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      </div>
      </div>
      :
      null
    }

    {this.state.section === "Open"
      ?
    <div class="row dashboard">

        <table className="table search-results">
        <thead>
          <tr>
            <th scope="col">Client Name</th>
            <th scope="col">Hardware</th>
            <th scope="col">Issue</th>
            <th scope="col">Date Reported</th>
            <th scope="col">View Job</th>
          </tr>
        </thead>
        <tbody>
          { openjobs }
        </tbody>
        </table>
    </div>
    : null }
    {this.state.section === "All"
      ?
    <div class="row dashboard">
        <table className="table search-results">
        <thead>
          <tr>
            <th scope="col">Client Name</th>
            <th scope="col">Hardware</th>
            <th scope="col">Issue</th>
            <th scope="col">Date Reported</th>
            <th scope="col">View Job</th>
          </tr>
        </thead>
        <tbody>
          { alljobs }
        </tbody>
        </table>
    </div>
    : null }
    {this.state.section === "Search"
      ?
      <table className="table search-results">
      <thead>
        <tr>
          <th scope="col">Client Name</th>
          <th scope="col">Hardware</th>
          <th scope="col">Issue</th>
          <th scope="col">Date Reported</th>
          <th scope="col">View Job</th>
        </tr>
      </thead>
      <tbody>
          {search}
      </tbody>
    </table>
      :
      null

    }

    </>
  )
}

}


export default Dashboard;
