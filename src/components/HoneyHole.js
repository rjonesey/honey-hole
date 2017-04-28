import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormControl, ControlLabel, FormGroup, Button, Col } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer, ScaleControl } from 'react-leaflet';
import dateFormat from 'dateformat';
import { browserHistory } from 'react-router';

class HoneyHole extends React.Component{
  constructor(){
    super();
    this.backToLibrary = this.backToLibrary.bind(this);
  }


  backToLibrary(){
    this.props.locationStore.honeyHoleClick();
    browserHistory.replace("/library");
  }


  render(){
    const button = (
      <Button style={{position: 'relative', float: 'left'}} href="" onClick={this.backToLibrary}>
      Back</Button>
    );
    const position = [this.props.location.coordinates.latitude,
      this.props.location.coordinates.longitude];
    return(
      <div className="parent">
        <div className="container">
          <Col md={2}/>
            <Col md={8}>
              <div>
                {this.props.backButton ? button : ''}
                <h1 className="welcome-header"> {this.props.location.title}!</h1>
              </div>
              <h2 className="addfont">Date: {dateFormat(this.props.location.date,
                           "dddd, mmmm dS, yyyy, h:MM TT")}</h2>
              <Map style={{width:'100%', height:'400px'}} center={position} zoom={13}>
                <ScaleControl position="bottomright" />
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    <span style={{textAlign:'center'}}>{this.props.location.title}</span>
                  </Popup>
                </Marker>
              </Map>

              <h3 className="addfont">Latitude: {Math.round(this.props.location.coordinates.latitude * 1000000)/1000000}</h3>
              <h3 className="addfont">Longitude: {Math.round(this.props.location.coordinates.longitude * 1000000)/1000000}</h3>
              <h3 className="addfont">Weather Conditions: {this.props.location.weather.conditions}</h3>
              <h3 className="addfont">Temperature: {Math.floor((this.props.location.weather.temp)* (9/5) - 459.67)} degrees</h3>
              <h3 className="addfont">Wind: {Math.floor((this.props.location.weather.windSpeed) * 2.2369)} mph, {this.props.location.weather.windDir} degrees</h3>
              <h3 className="addfont">Notes: {this.props.location.notes} </h3>
              <Button onClick={this.props.locationStore} className="btn btn-danger deleteButton">Delete</Button>
            </Col>
          <Col/>
        </div>
      </div>
    );
  }
}

HoneyHole.propTypes = {
  locationStore: React.PropTypes.object,
  location: React.PropTypes.object,
  backButton: React.PropTypes.boolean
};

export default inject('locationStore')(observer(HoneyHole));
