import { Component } from 'react';
import Cookies from 'js-cookie';

class NoteItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      note: this.props.notes,
      text: this.props.notes.text,
    }
    this.handleInputEdit = this.handleInputEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleSubmit(event){
  const id = this.state.note.id
  event.preventDefault();
  const note = {
    text: this.state.text,
    job: this.state.note.job
  }
  event = {
    start : {
      dateTime: this.state.dateTime
    }
  }
    fetch(`/api/v1/note/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : Cookies.get('csrftoken'),
      },
      body: JSON.stringify(note),
    })
    .then(response => {
      if(!response.ok){
        throw new Error ('Bad Post request');
      }
      return response.json()
    })
    .then(data => {//here is where I got back my DJANGO object and
      // this.props.addArticle(data);//here is where I added it to state for react
      //because django gave me the ID and the username to show it on react
      console.log('Success. Message created!', data)})
      .catch(error => console.log('Error:', error))
      .finally('I am always going to fire!');
      this.setState({
        text: note.text})
};

handleEdit(event){
  if(event.keyCode === 13) {
    this.handleSubmit(event);
    this.setState({ isEditing: false,
                    text: this.state.text});
  }
}

handleInputEdit(event) {
  this.setState({ [event.target.name]: event.target.value })
}



  render(){
    const note = this.state.note;
  return(
    <div key={note.id} className="row m-4">

      {!note.image
        ?
        null
        :
        <div className="col-12 col-md-6">
        <img className="pre-img pre-fluid-img" src={note.image} alt="preview"/>
        </div>
      }
      <div className="mt-4 col-12 col-md-6">
        <div className="row">
      {this.state.isEditing
        ?
        <input type="body" name="text"
        value={this.state.text} onChange={this.handleInputEdit}
        onKeyUp={(event) => this.handleEdit(event)}/>
        :
        <div>
        <p className="row jobs-owner header">On  {note.created_date}, {note.owner} said:</p>
        <p className="row jobs-note" name="text" value={this.state.text}>{this.state.text}</p>
        </div>
      }


      {!this.state.isEditing
        ?
      <button className="col-6 col-md-6 btn btn-info" type="button" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
      Edit</button>
      :
      null
      }
    <button className="col-6 col-md-6 btn btn-danger" type="btn" onClick={()=> this.props.removeNote(note)}>Remove</button>
      </div>
    </div>

  </div>

      )
    }

  }

  export default NoteItem;
