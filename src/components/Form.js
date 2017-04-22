import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { browserHistory } from 'react-router';

class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      notes: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSaveFieldNotes = this.handleSaveFieldNotes.bind(this);
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
    console.log(this.state.title);
  }


  handleNotesChange(e) {
    this.setState({notes: e.target.value});
    console.log(this.state.notes);
  }

  handleSaveFieldNotes(){
    this.props.locationStore.saveFieldNotes(this.props.locationStore.location._id, this.state.title, this.state.notes);
    this.setState({title: '', notes: ''});
    browserHistory.replace("/honeyhole");

  }

  render(){
    return(
      <div className="parent">
        <div className="container">
          <h1 className="welcome-header">Fill out your Honey Hole Info!</h1>
          <form>
            <h2>Field Notes </h2>
            <FormGroup controlId="formBasicText">
              <ControlLabel>Title</ControlLabel>
              <FormControl
              type="text"
              onChange={this.handleTitleChange}
              value={this.state.title}
              placeholder="Enter title"
              />
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Notes</ControlLabel>
              <FormControl componentClass="textarea" value={this.state.notes} onChange={this.handleNotesChange} placeholder="My notes.." />
            </FormGroup>

          </form>
          <Button bsStyle="danger" bsSize="large" block style={{marginTop: "20px"}} onClick={this.handleSaveFieldNotes}>
          Save Your Notes</Button>

        </div>
      </div>
    );
  }
}

Form.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(Form));
