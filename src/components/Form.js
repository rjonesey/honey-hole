import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormControl, ControlLabel, FormGroup, Button, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';
import { browserHistory } from 'react-router';
import HoneyHole from './HoneyHole'
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      notes: '',
      honeyHole: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSaveFieldNotes = this.handleSaveFieldNotes.bind(this);
  }



  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }


  handleNotesChange(e) {
    this.setState({notes: e.target.value});
  }

  handleSaveFieldNotes(){
    this.props.locationStore.saveFieldNotes(this.props.locationStore.currentLocation._id, this.state.title, this.state.notes);
    this.setState({title: '', notes: '', honeyHole: true});

  }

  render(){
    let form = (
      <div className="parent">
        <div className="container">
          <h1 className="welcome-header">Honey Hole Info!</h1>
          <Col md={2}/>
          <Col md={8}>
            <form>
              <h2 className="addfont">Field Notes </h2>
              <FormGroup controlId="formBasicText">
                <ControlLabel className="addfont">Title</ControlLabel>
                <FormControl
                type="text"
                onChange={this.handleTitleChange}
                value={this.state.title}
                placeholder="Enter title"
                className="addfont"
                />
              </FormGroup>

              <FormGroup controlId="formControlsTextarea">
                <ControlLabel className="addfont">Notes</ControlLabel>
                <FormControl className="addfont" componentClass="textarea" value={this.state.notes} onChange={this.handleNotesChange} placeholder="My notes.." />
              </FormGroup>
            </form>
            <Button className="addfont" bsStyle="danger" bsSize="large" block style={{marginTop: "20px"}} onClick={this.handleSaveFieldNotes}>
              Save Your Notes</Button>
          </Col>
          <Col md={2}/>
        </div>
      </div>
    );

    return(

          <div>
            {!this.state.honeyHole ? form : <HoneyHole
            location={this.props.locationStore.locations[this.props.locationStore.locations.length - 1]}/>}
          </div>

    );
  }
}

Form.propTypes = {
  locationStore: PropTypes.object
};

export default inject('locationStore')(observer(Form));
