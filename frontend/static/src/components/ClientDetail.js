import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class ClientDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      client: [],
    }
  }

componentDidMount() {
  fetch(`/api/v1/clients/${this.props.match.params.id}/`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('response', result)
          this.setState({
            client: result
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
    <div key={job.id} className="listImg">
      <div className="job-container">
      <p className="jobs-client">Client: {job.client}</p>
      <p className="jobs-hardware">Hardware: {job.hardware} </p>
      <p className="jobs-issue"> Issue: {job.issue}</p>
      </div>
    </div>
));

  return(
    <>
        <h2>Clients</h2>
          <div key={client.id} className="listImg">
            <p className="client-name">Name: {client.last_name}, {client.first_name}</p>
            <p className="client-location"> Location: {client.location}</p>
            <p>{ clientJobs }</p>
          </div>

    </>
  )
}

}


export default withRouter(ClientDetail);
