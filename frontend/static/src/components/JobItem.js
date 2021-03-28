import { Component } from 'react';
import Cookies from 'js-cookie';
import NoteItem from './NoteItem';
import { withRouter } from "react-router-dom";

class JobItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isAdding: false,
      notes: [],
      text: '',
      image: null,
      job: [],
      job_status: '',
      hardware: '',
      os: '',
      issue: '',
      issue_speical: '',
      created_date: '',
      clientId: 0,
      client: [],
      preview: '',
      showNotes: false,
    }
    this.handleImage = this.handleImage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleInputEdit = this.handleInputEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          job_status: result.job_status,
          hardware: result.hardware,
          os: result.os,
          issue: result.issue,
          issue_speical: result.issue_speical,
          notes: result.notes,
          image: result.image,
          clientId: result.client,
          created_date: result.created_date,
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

handleInputEdit(event) {
  this.setState({ [event.target.name]: event.target.value })
}
handleInput(event) {
  this.setState({ [event.target.name]: event.target.value })
}

handleSubmit(event){
  event.preventDefault();
  const job = {
    job_status: this.state.job_status,
    hardware: this.state.hardware,
    os: this.state.os,
    issue: this.state.issue,
    issue_speical: this.state.issue_speical,
    client: this.state.clientId,
  }
    fetch(`/api/v1/edit/${this.props.match.params.id}`, {
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
      //here is where I added it to state for react
      //because django gave me the ID and the username to show it on react
      console.log('Success. Message created!', data)})
      .catch(error => console.log('Error:', error))
      .finally('I am always going to fire!');
};

handleEdit(event){
  if(event.keyCode === 13) {
    this.handleSubmit(event);
    this.setState({ isEditing: false });
  }
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
      let formData = new FormData();
      // const obj = {...this.state}//this is an objects
      // https://developer.mozilla.org/en-US/docs/Web/API/FormData
      if (this.state.image === null ){
        formData.append('text', this.state.text)
        formData.append('job', this.state.job.id)}
      else if(this.state.image !==  null){
        formData.append('text', this.state.text)
        formData.append('job', this.state.job.id)
        formData.append('image', this.state.image)
      }
      // delete obj.image
      // formData.append('image', this.state.image);
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
          this.setState({text: "", isAdding: false, image: null,})
  };


  render(){

    const job = this.state
    const notes = this.state.notes.map((note, index) => (

        <NoteItem key={note.id} removeNote={this.removeNote} notes={note} image={note.image} />

 ));
 const client = this.state.client
  return(
          <>
            <div className="row client-container">
              <p className="client-name">{client.last_name}, {client.first_name}</p>
              <div className="client-info">
                <p className="client-location"> <span className="bold">Location:</span> {client.location}</p>
                <p className="client-location"> <span className="bold">Address:</span>  {client.address_street} </p>
                <p className="client-location"> <span className="bold">Phone:</span>  {client.phone_number}</p>
                <p className="client-location"> <span className="bold">Email:</span>  {client.email}</p>
                <a href={`/client/${job.client}`}>
                  <p>{`See or Edit ${client.first_name} ${client.last_name}'s profile`}</p>
                </a>
              </div>
            </div>
            {this.state.isEditing
              ?
              <div className="row client-container">
                <div className="client-jobs-header">Jobs</div>
                  <div className="client-info">


                      <div className="mb-3">
                        <label className="mr-3 form-label bold">Job Status:</label>
                          <select className="col-3 custom-select custom-select-sm"  id="job_status" name="job_status" value={this.state.job_status} onChange={this.handleInput} onKeyUp={(event) => this.handleEdit(event)} required>
                             <option value="New">New</option>
                             <option value="Open">Open</option>
                             <option value="Closed">Closed</option>
                           </select>
                      </div>

                    <div className="mb-3">
                      <label htmlFor="InputEmail1" className="mr-3 form-label bold">Hardware: </label>
                        <select className="col-3 custom-select custom-select-sm"  id="hardware" name="hardware" value={this.state.hardware} onChange={this.handleInput} onKeyUp={(event) => this.handleEdit(event)} required>
                           <option value="Computer">Computer</option>
                           <option value="Printer">Printer</option>
                           <option value="Other">Other</option>
                         </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="InputEmail1" className="mr-3 form-label bold">OS: </label>
                        <select className=" col-3 custom-select custom-select-sm"  id="os" name="os" value={this.state.os} onChange={this.handleInput} onKeyUp={(event) => this.handleEdit(event)} required>
                           <option value="Mac">Mac</option>
                           <option value="PC">PC</option>
                           <option value="Unknown">I don't know</option>
                         </select>
                    </div>


                    <label htmlFor="Issue" className="mr-3 form-label bold">Issue</label>
                      <select className=" col-3 custom-select custom-select-sm"  id="issue" name="issue" value={this.state.issue} onChange={this.handleInput} onKeyUp={(event) => this.handleEdit(event)} required>
                         <option value="Not">Not Turning on</option>
                         <option value="Unknown">I don't know</option>
                          <option value="Other">Other</option>
                       </select>
                       <div>
                       <label htmlFor="Number" className="form-label">Issue Description </label>
                           <input type="text" className="form-control" id="issue_speical" name="issue_speical" value={this.state.issue_speical} onChange={this.handleInput} onKeyUp={(event) => this.handleEdit(event)} />
                        </div>
                </div>
              </div>
              :
              <div className="row client-container">
                <div className="client-jobs-header">Jobs</div>
                  <div className="client-info">
                    <p className="jobs-status"> <span className="bold">Job Status: </span> {job.job_status} </p>
                    <p className="jobs-hardware"> <span className="bold"> Hardware:  </span> {job.hardware} </p>
                    <p className="jobs-os"> <span className="bold"> OS:  </span>{job.os} </p>
                    <p className="jobs-issue"> <span className="bold"> Issue:  </span>{job.issue}</p>
                    <p className="jobs-issueNote"> <span className="bold"> Issue Details:  </span>{job.issue_speical}</p>
                    <p className="jobs-issueNote"> <span className="bold"> Reported date:  </span>{job.created_date}</p>
                  </div>
              </div>
            }
            {!this.state.isEditing
              ?
            <button className="col-12 col-md-4 m-3 btn btn-orange" type="button" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
            Edit</button>
            :
            null
            }



                <div className=" client-container">
                <div className="row client-notes-header">
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
                <form className="file-form row" onSubmit={this.handleCreatingNote}>
                  {!this.state.image && this.state.isAdding
                    ?
                  <span>
                    <label htmlFor="file-upload" className="col-4 custom-file-upload">
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
                  <div className="col-6 note-addNote">
                    <input type="text" id="note-text" name="text"
                      value={this.state.text} onChange={this.handleInput}
                      placeholder="Note" required/>
                    <label htmlFor="note-text"></label><br/>
                    <button className="btn btn-info" type="submit">Submit Note</button>
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
