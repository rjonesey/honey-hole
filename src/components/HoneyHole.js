import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormControl, ControlLabel, FormGroup, Button, Col } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import dateFormat from 'dateformat';

class HoneyHole extends React.Component{
  constructor(){
    super();
  }
  render(){
    const position = [this.props.locationStore.location.coordinates.latitude, this.props.locationStore.location.coordinates.longitude];
    return(
      <div className="parent">
        <div className="container">
          <Col md={2}/>
          <Col md={8}>
            <h1 className="welcome-header">{this.props.locationStore.location.title}!</h1>
            <h2>Date: {dateFormat(this.props.locationStore.location.date,
                         "dddd, mmmm dS, yyyy, h:MM TT")}</h2>
            <Map style={{width:'100%', height:'400px'}} center={position} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              <Marker position={position}>
                <Popup>
                  <span style={{textAlign:'center'}}>{this.props.locationStore.location.title}</span>
                </Popup>
              </Marker>
            </Map>

            <h3>Latitude: {Math.round(this.props.locationStore.location.coordinates.latitude * 1000000)/1000000}</h3>
            <h3>Longitude: {Math.round(this.props.locationStore.location.coordinates.longitude * 1000000)/1000000}</h3>
            <h3>Weather Conditions: {this.props.locationStore.location.weather.conditions}</h3>
            <h3>Temperature: {Math.floor((this.props.locationStore.location.weather.temp)* (9/5) - 459.67)} degrees</h3>
            <h3>Wind: {Math.floor((this.props.locationStore.location.weather.windSpeed) * 2.2369)} mph, {this.props.locationStore.location.weather.windDir} degrees</h3>
            <h3>Notes: {this.props.locationStore.location.notes} </h3>
          </Col>
          <Col md={2}/>
        </div>
      </div>
    );
  }
}

HoneyHole.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(HoneyHole));
