import React, { Component } from 'react';

class Client extends Component{
  constructor(props){
    super(props);
    this.state = {
      clients: [],
    }
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

render(){

  const client = this.state.clients.map((client) => (
    <div key={client.id} className="listImg">
      <a href={`/client/${client.id}`}>
        <p>{client.last_name}, {client.first_name}, {client.location}</p>
      </a>
    </div>
));

  return(
    <>
    <h2> Clients</h2>
    <div>{ client }</div>



    </>
  )
}

}


export default Client;
