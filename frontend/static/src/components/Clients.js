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
  //look up sort
  const clientA = this.state.clients.filter(client => {
    if(client.last_name[0] === "A" || client.last_name[0] ===  "a"){
      console.log(client.last_name[0]);
      return client
    }
    return console.log('nope');
  }).map((client) => (
    <div key={client.id} className="listImg">
      <a href={`/client/${client.id}`}>
        <p>{client.last_name}, {client.first_name}, {client.location}</p>
      </a>
    </div>
));


const clientB = this.state.clients.filter(client => {
  if(client.last_name[0] === "B" || client.last_name[0] ===  "b"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientC = this.state.clients.filter(client => {
  if(client.last_name[0] === "C" || client.last_name[0] === "c"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientD = this.state.clients.filter(client => {
  if(client.last_name[0] === "D" || client.last_name[0] === "d"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientE = this.state.clients.filter(client => {
if(client.last_name[0] === "E" || client.last_name[0] === "e"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientF = this.state.clients.filter(client => {
if(client.last_name[0] === "F" || client.last_name[0] === "f"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientG = this.state.clients.filter(client => {
  if(client.last_name[0] === "G" || client.last_name[0] === "g"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientH = this.state.clients.filter(client => {
if(client.last_name[0] === "H" || client.last_name[0] === "h"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientI = this.state.clients.filter(client => {
if(client.last_name[0] === "I" || client.last_name[0] === "i"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientJ = this.state.clients.filter(client => {
  if(client.last_name[0] === "J" || client.last_name[0] === "j"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientK = this.state.clients.filter(client => {
if(client.last_name[0] === "K" || client.last_name[0] === "k"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientL = this.state.clients.filter(client => {
if(client.last_name[0] === "L" || client.last_name[0] === "l"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientM = this.state.clients.filter(client => {
  if(client.last_name[0] === "M" || client.last_name[0] === "m"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientN = this.state.clients.filter(client => {
if(client.last_name[0] === "N" || client.last_name[0] === "n"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientO = this.state.clients.filter(client => {
if(client.last_name[0] === "O" || client.last_name[0] === "o"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientP = this.state.clients.filter(client => {
  if(client.last_name[0] === "P" || client.last_name[0] === "o"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientQ = this.state.clients.filter(client => {
if(client.last_name[0] === "Q" || client.last_name[0] === "q"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientR = this.state.clients.filter(client => {
if(client.last_name[0] === "R" || client.last_name[0] === "r"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientS = this.state.clients.filter(client => {
  if(client.last_name[0] === "S" || client.last_name[0] === "s"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientT = this.state.clients.filter(client => {
if(client.last_name[0] === "T" || client.last_name[0] === "t"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientU = this.state.clients.filter(client => {
if(client.last_name[0] === "U" || client.last_name[0] === "u"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientV = this.state.clients.filter(client => {
  if(client.last_name[0] === "V" || client.last_name[0] === "v"){
    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientW = this.state.clients.filter(client => {
if(client.last_name[0] === "W" || client.last_name[0] === "w"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientX = this.state.clients.filter(client => {
if(client.last_name[0] === "X" || client.last_name[0] === "x"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));


const clientY = this.state.clients.filter(client => {
  if(client.last_name[0] === "Y" || client.last_name[0] === "y"){

    return client
  }
  return console.log('nope');
}).map((client) => (
  <div key={client.id} className="listImg">
    <a href={`/client/${client.id}`}>
      <p>{client.last_name}, {client.first_name}, {client.location}</p>
    </a>
  </div>
));


const clientZ = this.state.clients.filter(client => {
if(client.last_name[0] === "Z" || client.last_name[0] === "z"){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>
));

const letters = ["A", "B", "C"]
const clientOther = this.state.clients.filter(client => {
if(client.last_name[0] in letters){
  return client
}
return console.log('nope');
}).map((client) => (
<div key={client.id} className="listImg">
  <a href={`/client/${client.id}`}>
    <p>{client.last_name}, {client.first_name}, {client.location}</p>
  </a>
</div>

));

const search = this.state.clients.filter(client => {
if(this.state.search === client.last_name){
  return client
}
else if(this.state.search === client.first_name){
  return client
}
else if(this.state.search === client.phone_number){
  return client
}
else if(this.state.search === client.email){
  return client
}
return console.log('nope');
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
                <input id="search-focus" name="search" type="search" class="form-control"
                  value={this.state.search}  onChange={this.handleInput} placeholder="Search for Client"/>
              <button type="button" class="btn btn-primary" onClick={()=> this.setState({search: this.state.search})}>
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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

    <div className="A">
      <div className="header sticky-top"> A </div>
      <div>{ clientA }</div>
    </div>
    <div className="B">
      <div className="header sticky-top"> B</div>
      <div>{ clientB }</div>
    </div>
    <div className="C">
      <div className="header sticky-top"> C</div>
      <div>{ clientC }</div>
    </div>
    <div className="D">
      <div className="header sticky-top"> D </div>
      <div>{ clientD }</div>
    </div>
    <div className="E">
      <div className="header sticky-top"> E</div>
      <div>{ clientE }</div>
    </div>
    <div className="F">
      <div className="header sticky-top"> F</div>
      <div>{ clientF }</div>
    </div>
    <div className="G">
      <div className="header sticky-top"> G </div>
      <div>{ clientG }</div>
    </div>
    <div className="H">
      <div className="header sticky-top"> H</div>
      <div>{ clientH }</div>
    </div>
    <div className="I">
      <div className="header sticky-top"> I</div>
      <div>{ clientI }</div>
    </div>
    <div className="J">
      <div className="header sticky-top"> J </div>
      <div>{ clientJ }</div>
    </div>
    <div className="K">
      <div className="header sticky-top"> K</div>
      <div>{ clientK }</div>
    </div>
    <div className="L">
      <div className="header sticky-top"> L</div>
      <div>{ clientL }</div>
    </div>
    <div className="M">
      <div className="header sticky-top"> M </div>
      <div>{ clientM }</div>
    </div>
    <div className="N">
      <div className="header sticky-top"> N</div>
      <div>{ clientN }</div>
    </div>
    <div className="O">
      <div className="header sticky-top"> O</div>
      <div>{ clientO }</div>
    </div>
    <div className="P">
      <div className="header sticky-top"> P </div>
      <div>{ clientP }</div>
    </div>
    <div className="Q">
      <div className="header sticky-top"> Q</div>
      <div>{ clientQ }</div>
    </div>
    <div className="R">
      <div className="header sticky-top"> R</div>
      <div>{ clientR }</div>
    </div>
    <div className="S">
      <div className="header sticky-top"> S</div>
      <div>{ clientS }</div>
    </div>
    <div className="T">
      <div className="header sticky-top"> T</div>
      <div>{ clientT }</div>
    </div>
    <div className="U">
      <div className="header sticky-top"> U </div>
      <div>{ clientU }</div>
    </div>
    <div className="V">
      <div className="header sticky-top"> V</div>
      <div>{ clientV }</div>
    </div>
    <div className="W">
      <div className="header sticky-top"> W</div>
      <div>{ clientW }</div>
    </div>
    <div className="X">
      <div className="header sticky-top"> X </div>
      <div>{ clientX }</div>
    </div>
    <div className="Y">
      <div className="header sticky-top"> Y</div>
      <div>{ clientY }</div>
    </div>
    <div className="Z">
      <div className="header sticky-top"> Z</div>
      <div>{ clientZ }</div>
    </div>
    <div className="Other">
      <div className="header sticky-top"> Other</div>
      <div>{ clientOther }</div>
    </div>



    </>
  )
}

}


export default Client;
