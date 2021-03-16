import { Component } from 'react';
import Cookies from 'js-cookie';
import NoteItem from './NoteItem';

class JobItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      notes: this.props.job.notes
    }
    this.handleInputEdit = this.handleInputEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }


    handleEdit(event, article){
      if(event.keyCode === 13) {
        this.props.editarticle(article, this.state.body);
        this.setState({ isEditing: false });
      }
    }

    handleInputEdit(event) {
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


  render(){

    const job = this.props.job;
    const notes = this.state.notes.map((note, index) => (
      <div>
        <NoteItem notes={note}/>
        <button className="btn btn-danger" type="btn" onClick={()=> this.removeNote(note)}>Remove</button>
        </div>
 ));
  return(
      <li key={job.id} className="job-item" >
          <div className="left-side-container">
          <p className="jobs-client">Client: {job.client}</p>
          <p className="jobs-hardware">Hardware: {job.hardware} </p>
          <p className="jobs-issue"> Issue: {job.issue}</p>
        <ul>{ notes }
        </ul>
          </div>
          </li>
      )
    }

  }

  export default JobItem;
