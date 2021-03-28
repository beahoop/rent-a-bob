import React, { Component } from 'react';

class Appointments extends Component{
  constructor(props){
    super(props);
    this.state = {
      appointments: [],
      search: "",
    }
    this.handleInput = this.handleInput.bind(this);
  }

componentDidMount() {
    fetch("/google/list")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('response', result)

          this.setState({
            appointments: result
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
  //look up sort



  const clientA = this.state.appointments.map((appointment) => (
    <div key={appointment.id}>
      <a href={`/job/${appointment.job}`}>
        <p>
          <span className="col-6 col-md-8 names">{appointment.dateTime_start}, {appointment.dateTime_end} </span>
          <span className="col-6 col-md-4 location"> {appointment.location} </span>
        </p>
      </a>
    </div>
));


// const search = this.state.clients.filter(client => {
// if(this.state.search === null){
//   return client
// }
// else if(client.last_name.toLowerCase().includes(this.state.search.toLowerCase())){
//   return client
// }else if(client.first_name.toLowerCase().includes(this.state.search.toLowerCase())){
//   return client
// }else if(client.phone_number?.includes(this.state.search)){
//   return client
// }else if(client.email.toLowerCase().includes(this.state.search.toLowerCase())){
//   return client
// }
// return console.log();
// }).map((client) => (
//   <tr  key={client.id} className="listImg">
//     <td onClick={()=>this.chooseClient(client.id)}>
//       <a href={`/client/${client.id}`}>
//         {client.first_name}
//       </a>
//     </td>
//     <td onClick={()=>this.chooseClient(client.id)}>
//       <a href={`/client/${client.id}`}>
//         {client.last_name}
//       </a>
//     </td>
//     <td onClick={()=>this.chooseClient(client.id)}>
//       <a href={`/client/${client.id}`}>
//         {client.location}
//       </a>
//     </td>
//   </tr>
//
// ));


  return(
    <>

    <div class="row">
      <div className="client-name">
        <div className="row m-0">
        <p className="col-6 col-lg-8">Clients</p>
          <div className="col-6 col-lg-4" >
            <div class="my-3 input-group">
                <input id="search-focus" name="search" type="search" className="form-control"
                  value={this.state.search}  onChange={this.handleInput} placeholder="Search for Client"/>
                <button type="button" className="form-control btn btn-primary" onClick={()=> this.setState({search: this.state.search})}>
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="A">
      <div className="header sticky-top"> A </div>
      <div className="client-by-letter">{ clientA }</div>
    </div>


    </>
  )
}

}


export default Appointments;
