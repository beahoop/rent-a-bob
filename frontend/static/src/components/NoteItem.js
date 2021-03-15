import { Component } from 'react';
import Cookies from 'js-cookie';

class NoteItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      note: this.props.notes,
      text: '',
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
        this.props.addArticle(data);//here is where I added it to state for react
        //because django gave me the ID and the username to show it on react
        console.log('Success. Message created!', data)})
        .catch(error => console.log('Error:', error))
        .finally('I am always going to fire!');
        this.setState({
          text: "",})
    };

    handleEdit(event){
      if(event.keyCode === 13) {
        this.handleSubmit(event);
        this.setState({ isEditing: false });
      }
    }

    handleInputEdit(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render(){
    const note = this.state.note;
  return(
    <li key={note.id}>
      {this.state.isEditing
        ?
        <input type="body" name="text"
        value={this.state.text} onChange={this.handleInputEdit}
        onKeyUp={(event) => this.handleEdit(event)}/>
        :
        <div>
        <p className="jobs-note" name="text" value={this.state.text}>Note: {note.text}</p>
        <button class="btn" type="button" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
        Edit</button>
        </div>
      }
      <span className="jobs-createdDate"> {note.created_date}</span>
      <span className="jobs-owner">by: {note.owner}</span>

    </li>

      )
    }

  }

  export default NoteItem;
