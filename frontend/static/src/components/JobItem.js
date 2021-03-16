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
        });
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
    // const note = {
    //   text: this.state.text,
    //   job: this.state.job.id,
    //   image: this.state.image,
    //    }
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
      <div>
        <NoteItem key={note.id} notes={note} image={note.image} />
        <button className="btn btn-danger" type="btn" onClick={()=> this.removeNote(note)}>Remove</button>
        </div>
 ));
  return(


      <li key={job.id} className="job-item" >
          <div className="job-container">
          <p className="jobs-client">Client: {job.client}</p>
          <p className="jobs-hardware">Hardware: {job.hardware} </p>
          <p className="jobs-issue"> Issue: {job.issue}</p>

          {!this.state.image && this.state.isAdding
            ?
            <span>
            <label for="file-upload" className="custom-file-upload">
          <p className="imagePlus"> + </p>
          <p className="imageText"> Add photo</p>
          </label> <input id="file-upload" type="file" name='image'  onChange={this.handleImage}/>
          </span>
          :
          null
        }
          {this.state.image &&
          <img className="pre-img" src={this.state.preview} alt="preview"/>}
          {!this.state.isAdding
            ?
          <button className="btn btn-info" type="button" onClick={() => this.setState({ isAdding: !this.state.isAdding })}>
          Add Note</button>
          :
          <div className="note-addNote">
          <form className="form"onSubmit={this.handleCreatingNote}>
          <input type="text" id="note-text" name="text"
            value={this.state.text} onChange={this.handleInput}
            placeholder="Note" required/>
          <label htmlFor="note-text"></label><br/>
          <button className="btn btn-info" type="submit">Add Note</button>
        </form>
          </div>
        }
        {!this.state.showNotes
          ?
            <button className="btn btn-info" onClick={() => this.setState({ showNotes: !this.state.showNotes })} type="button">Show Notes</button>
            :
            <div>
            <button className="btn btn-info" onClick={() => this.setState({ showNotes: !this.state.showNotes })} type="button">Hide Notes</button>
            <ul>{ notes }</ul>
            </div>
        }
          </div>
          </li>
      )
    }

  }

  export default withRouter(JobItem);
