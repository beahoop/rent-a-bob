import React, { Component } from 'react';

class Client extends Component{
  constructor(props){
    super(props);
    this.state = {
      clients: [],
      search: "",
    }
    this.handleInput = this.handleInput.bind(this);
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

handleInput(event){
  this.setState({ [event.target.name]: event.target.value });
}


render(){
  //A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.
const abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I"
, "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
 "U", "V", "W", "X", "Y", "Z"]


 const sections = abc.map((letter, index) => {

   const names = this.state.clients
   .filter(client => client.last_name[0].toUpperCase() === letter.toUpperCase())
   .map(client => (
     <div key={client.id}>
      <a href={`/client/${client.id}`}>
        <p>
          <span className="col-6 col-md-8 names">{client.last_name}, {client.first_name} </span>
          <span className="col-6 col-md-4 location"> {client.location} </span>
        </p>
      </a>
    </div>
  ));
   return(
       <div className={letter} key={index}>
         <div className="header sticky-top">{letter}</div>
         <div className="client-by-letter">
           {names}
         </div>
         </div>
   )
 });

 // const alphaHeader = abc.map((letter ) => {
 //   <div className={letter}>
 //     <div className="header sticky-top"> letter </div>
 //     <div className="client-by-letter">
 //       const clientLetter = this.state.clients
 //       .filter(client => client.last_name[0] === letter)
 //       .map(client => (
 //         <div key={client.id}>
 //           <a href={`/client/${client.id}`}>
 //             <p>
 //               <span className="col-6 col-md-8 names">{client.last_name}, {client.first_name} </span>
 //               <span className="col-6 col-md-4 location"> {client.location} </span>
 //             </p>
 //           </a>
 //         </div>
 //     ))
 //
 //     </div>
 //   </div>
 // })


const search = this.state.clients.filter(client => {
if(this.state.search === null){
  return client
}
else if(client.last_name.toLowerCase().includes(this.state.search.toLowerCase())){
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
    <td onClick={()=>this.chooseClient(client.id)}>
      <a href={`/client/${client.id}`}>
        {client.first_name}
      </a>
    </td>
    <td onClick={()=>this.chooseClient(client.id)}>
      <a href={`/client/${client.id}`}>
        {client.last_name}
      </a>
    </td>
    <td onClick={()=>this.chooseClient(client.id)}>
      <a href={`/client/${client.id}`}>
        {client.location}
      </a>
    </td>
  </tr>

));


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
    {this.state.clients.length === 0
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
    {sections}


    </>
  )
}

}


export default Client;
