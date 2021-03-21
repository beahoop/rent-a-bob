import React, { Component } from 'react';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      jobs: [],
      section:"New",
      search: "",
    }
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

render(){
  const newjobs = this.state.jobs.filter(job => {
    if(job.job_status === "New"){
      return job
    }
    return console.log('nope');
  }).map((job) => (
    <tr  key={job.id} className="listImg">
      <td><a href={`/job/${job.id}`}>{job.clientname}   </a></td>
      <td><a href={`/job/${job.id}`}> {job.hardware}  </a></td>
      <td><a href={`/job/${job.id}`}>{job.issue}  </a></td>
    </tr>
));
const openjobs = this.state.jobs.filter(job => {
  if(job.job_status === "Open"){
    return job
  }
  return console.log('nope');
}).map((job) => (
  <tr  key={job.id} className="listImg">
    <td><a href={`/job/${job.id}`}>{job.clientname}   </a></td>
    <td><a href={`/job/${job.id}`}> {job.hardware}  </a></td>
    <td><a href={`/job/${job.id}`}>{job.issue}  </a></td>
  </tr>
));
const alljobs = this.state.jobs.map((job) => (
  <tr  key={job.id} className="listImg">
    <td><a href={`/job/${job.id}`}>{job.clientname}   </a></td>
    <td><a href={`/job/${job.id}`}> {job.hardware}  </a></td>
    <td><a href={`/job/${job.id}`}>{job.issue}  </a></td>
  </tr>
));
const search = this.state.jobs.filter(job => {
if(this.state.search === job.client){
  return job
}
return console.log('nope');
}).map((job) => (
  <tr  key={job.id} className="listImg">
    <td >
      hi
    </td>

  </tr>

));

  return(
    <>
    <div className="row">
      <div className="header-backend">
        <button onClick={()=> this.setState({section:"New"})} className="col-4 btn-add">New Jobs</button>
        <button onClick={()=> this.setState({section:"Open"})} className="col-4 btn-add">Open Jobs</button>
        <button onClick={()=> this.setState({section:"All"})} className="col-4 btn-add">All Jobs</button>
      </div>
    </div>
    {this.state.section === "New"
      ?
    <div class="row">
      <table className="table search-results">
      <thead>
        <tr>
          <th scope="col">Client Name</th>
          <th scope="col">Hardware</th>
          <th scope="col">Issue</th>
        </tr>
      </thead>
      <tbody>
          { newjobs }
      </tbody>
      </table>
    </div>
    : null }

    {this.state.section === "Open"
      ?
    <div class="row">

        <table className="table search-results">
        <thead>
          <tr>
            <th scope="col">Client Name</th>
            <th scope="col">Hardware</th>
            <th scope="col">Issue</th>
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
    <div class="row">
        <table className="table search-results">
        <thead>
          <tr>
            <th scope="col">Client Name</th>
            <th scope="col">Hardware</th>
            <th scope="col">Issue</th>
          </tr>
        </thead>
        <tbody>
          { alljobs }
        </tbody>
        </table>
    </div>
    : null }

    {this.state.search.length === 0
      ?
      null
      :
      <table className="table search-results">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Location</th>
        </tr>
      </thead>
      <tbody>
          {search}
      </tbody>
      </table>

    }
    </>
  )
}

}


export default Dashboard;
