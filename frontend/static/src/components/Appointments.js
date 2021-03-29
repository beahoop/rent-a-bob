import React, { Component } from 'react';
import moment from 'moment';

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
            appointments: result,
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
    <div className="" key={appointment.id}>
      <a href={`/job/${appointment.job}`}>
        <p>
          <span className="col-2 col-md-4 location-2"> { moment(appointment.dateTime_start).format('ddd, MMMM Do @ h:mm a')} </span>
            <span className="col-2 col-md-4 names">{appointment.attendee_name} </span>

        </p>
      </a>
    </div>
));
//
// const search = this.state.appointments.filter(appointment => {
//  if(appointment.attendee_name.toLowerCase().includes(this.state.search.toLowerCase())){
//   return appointment
// }
// else if(appointment.attendee_email.toLowerCase().includes(this.state.search.toLowerCase())){
//   return appointment
// }
// return console.log();
// }).map((appointment) => (
//   <a href={`/job/${appointment.job}`}>
//     <p>
//       <span className="col-6 col-md-8 names">{appointment.dateTime_start}, {appointment.dateTime_end} </span>
//       <span className="col-6 col-md-4 location"> {appointment.location} </span>
//     </p>
//   </a>
//
// ));
// {this.state.search.length === 0
//   ?
//   null
//   :
//       {search}
// }
//
// <div class="my-3 input-group">
//     <input id="search-focus" name="search" type="search" className="form-control"
//       value={this.state.search}  onChange={this.handleInput} placeholder="Search for Client"/>
//     <button type="button" className="form-control btn btn-primary" onClick={()=> this.setState({search: this.state.search})}>
//     <i class="fas fa-search"></i>
//   </button>
// </div>


  return(
    <>

    <div class="row">
      <div className="client-name">
        <div className="row m-0">
        <p className="col-6 col-lg-8">Appointments</p>
          <div className="col-6 col-lg-4" >

          </div>
        </div>
      </div>
    </div>


    <div className="A">
      <div className="header sticky-top"> Upcoming appointments </div>
      <div className="client-by-letter">{ clientA }</div>
    </div>


    </>
  )
}

}


export default Appointments;
