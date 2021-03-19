import React, { Component } from 'react';

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      jobs: [],
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
    <div key={job.id} className="listImg">
      <a href={`/job/${job.id}`}>
      <p>{job.clientname}, Hardware: {job.hardware}, Issue: {job.issue}</p>
      </a>
    </div>
));
const openjobs = this.state.jobs.filter(job => {
  if(job.job_status === "Open"){
    return job
  }
  return console.log('nope');
}).map((job) => (
  <div key={job.id} className="listImg">
    <a href={`/job/${job.id}`}>
    <p>{job.client}{job.hardware}{job.issue}</p>
    </a>
  </div>
));
  return(
    <>
    <h2> New Jobs</h2>
    <div>{ newjobs }</div>
    <h2> Open Jobs</h2>
    <div>{ openjobs }</div>


    </>
  )
}

}


export default Dashboard;
