import { Component } from 'react';
import Cookies from 'js-cookie';
import NoteItem from './NoteItem';
import { withRouter } from "react-router-dom";

class JobItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      notes: [],
      text: '',
      image: null,
      job: [],
      clientId: 0,
      client: [],
      preview: "",
      showNotes: false,
    }
    this.handleImage = this.handleImage.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.handleCreatingNote = this.handleCreatingNote.bind(this);
    this.addNote = this.addNote.bind(this);
  }
componentDidMount() {
  fetch(`/api/v1/edit/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log('response', result)
        this.setState({
          job: result,
          notes: result.notes,
          image: result.image,
          clientId: result.client,
        });
        fetch(`/api/v1/clients/${result.client}`)
          .then(res => res.json())
          .then(
            (client) => {
              console.log('response', client)
              this.setState({
                client: client,
              });
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
}


handleImage(event) {
  let file = event.target.files[0];
  this.setState({image: file});
  let reader = new FileReader()
  //FileReader is a built in method async-ness
  reader.onloadend = () => {
  this.setState({preview: reader.result})
  }
  reader.readAsDataURL(file);
  //this is where we tell the filereader to actually read the file
}


    handleInput(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  removeNote(note){
  const id = note.id
  const notes = [...this.state.notes];
  const index = notes.indexOf(note);
  notes.splice(index, 1);
  fetch(`/api/v1/note/edit/${id}`, {//type these out line by line some need more than others
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken' : Cookies.get('csrftoken'),
        },
      })
        .then(response => {
        if(!response.ok){
          throw new Error ('Bad Post request');
        }
        })
      .catch(error => console.log('Error:', error))
      .finally('I am always going to fire!');
      this.setState({ notes });
  };
  addNote(note){
  const notes = [...this.state.notes]
  console.log("NOTE", note)
  notes.push(note);
  this.setState({ notes })
  }

handleCreatingNote(event){
    event.preventDefault();
      let formData = new FormData();//this is an objects
      // https://developer.mozilla.org/en-US/docs/Web/API/FormData
      formData.append('text', this.state.text);
      formData.append('job', this.state.job.id);
      formData.append('image', this.state.image);
      fetch('/api/v1/note/', {
            method: 'POST',
            headers: {
              'X-CSRFToken' : Cookies.get('csrftoken'),
            },
            body: formData,
          })
            .then(response => {
            if(!response.ok){
              throw new Error ('Bad Post request');
            }
            return response.json()
            })
          .then(data => {//here is where I got back my DJANGO object and
            this.addNote(data);//here is where I added it to state for react
            //because django gave me the ID and the username to show it on react
            console.log('Success. Message created!', data)})
          .catch(error => console.log('Error:', error))
          .finally('I am always going to fire!');
          this.setState({text: ""})
  };


  render(){

    const job = this.state.job
    const notes = this.state.notes.map((note, index) => (

        <NoteItem key={note.id} removeNote={this.removeNote} notes={note} image={note.image} />

 ));
 const client = this.state.client
  return(
          <>
            <div className="row client-container">
              <p className="client-name">{client.last_name}, {client.first_name}</p>
              <div className="client-info">
                <p className="client-location"> Location: {client.location}</p>
                <p className="client-location"> Address: {client.address_street} </p>
                <p className="client-location"> Phone: {client.phone}</p>
                <p className="client-location"> Email: {client.email}</p>
                <a href={`/client/${job.client}`}>
                  <p>{`See ${client.first_name} ${client.last_name}'s profile`}</p>
                </a>
              </div>
            </div>
                <div className="row client-container">
                  <div className="client-jobs-header">Jobs</div>
                    <div className="client-info">
                      <p className="jobs-hardware">Hardware: {job.hardware} </p>
                      <p className="jobs-issue"> Issue: {job.issue}</p>
                    </div>
                </div>
                <div className=" client-container">
                <div className="row client-jobs-header">
                  <p className="col-3"> Notes </p>
                  <button className="col-3 btn" type="button" onClick={() => this.setState({ isAdding: !this.state.isAdding })}>
                  Add Note</button>
                  {!this.state.showNotes
                    ?
                      <button className="col-3 btn" onClick={() => this.setState({ showNotes: !this.state.showNotes })} type="button">Show Notes</button>
                      :
                      <button className="col-3 btn" onClick={() => this.setState({ showNotes: !this.state.showNotes })} type="button">Hide Notes</button>
                  }
                </div>
                </div>
                <form className="form"onSubmit={this.handleCreatingNote}>
                  {!this.state.image && this.state.isAdding
                    ?
                  <span>
                    <label for="file-upload" className="custom-file-upload">
                      <p className="imagePlus"> + </p>
                      <p className="imageText"> Add photo</p>
                    </label>
                    <input id="file-upload" type="file" name='image'  onChange={this.handleImage}/>
                  </span>
                  :
                  null
                }
                {this.state.image && <img className="pre-img" src={this.state.preview} alt="preview"/>}
                {!this.state.isAdding
                  ?
                  null
                  :
                  <div className="note-addNote">
                    <input type="text" id="note-text" name="text"
                      value={this.state.text} onChange={this.handleInput}
                      placeholder="Note" required/>
                    <label htmlFor="note-text"></label><br/>
                    <button className="btn btn-info" type="submit">Add Note</button>
                  </div>
                }
            </form>
              {!this.state.showNotes
                ?
                null
                  :
                  <ul>{ notes }</ul>
              }
          </>
      )
    }

  }

  export default withRouter(JobItem);
