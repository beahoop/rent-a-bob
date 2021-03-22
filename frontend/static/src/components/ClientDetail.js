import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class ClientDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      client: [],
      jobs: [],
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
  const client = this.state.client;
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
        <span className="bold">   Issue: </span>
        {job.issue}</p>
        <div className="client-job-link">
          <a href={`/job/${job.id}`}>
          <p className="btn btn-info">See Details</p>
          </a>
        </div>
      </div>
    </div>
));

  return(
    <>

    <div className="row client-container">
      <p className="client-name">{client.last_name}, {client.first_name}</p>
      <div className="client-info">
        <p className="client-location"> Location: {client.location}</p>
        <p className="client-location"> Address: {client.address_street} </p>
        <p className="client-location"> Phone: {client.phone}</p>
        <p className="client-location"> Email: {client.email}</p>
      </div>
    </div>
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
