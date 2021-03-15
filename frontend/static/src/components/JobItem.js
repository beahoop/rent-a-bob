import { Component } from 'react';
import Cookies from 'js-cookie';
import NoteItem from './NoteItem';

class JobItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      body: this.props.job.body,
      title: this.props.job.title
    }
    this.handleInputEdit = this.handleInputEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmitForApp = this.handleSubmitForApp.bind(this);
  }
  handleSubmitForApp(event, id){
    event.preventDefault();
    const job = {
      body: this.state.body,
      title: this.state.title,
      phase: 'Approval',
    }
      fetch(`/api/v1/news/user/jobs/${id.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken' : Cookies.get('csrftoken'),
        },
        body: JSON.stringify(job),
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
          title: "",
          body: "",})
    };

    handleEdit(event, article){
      if(event.keyCode === 13) {
        this.props.editarticle(article, this.state.body);
        this.setState({ isEditing: false });
      }
    }

    handleInputEdit(event) {
    this.setState({ [event.target.name]: event.target.value })
  }


  render(){

    const job = this.props.job;
    const notes = job.notes.map((note, index) => (
        <NoteItem notes={note}/>

 ));
  return(
      <li key={job.id} className="job-item" >
          <div className="left-side-container">
          <p className="jobs-client">Client: {job.client}</p>
          <p className="jobs-hardware">Hardware: {job.hardware} </p>
          <p className="jobs-issue"> Issue: {job.issue}</p>
        <ul>{ notes }</ul>
          </div>
          </li>
      )
    }

  }

  export default JobItem;
