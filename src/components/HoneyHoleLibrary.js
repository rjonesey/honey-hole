import React from 'react';
import { Button, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Map, Marker, Popup, TileLayer, ScaleControl } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import dateFormat from 'dateformat';
import HoneyHole from './HoneyHole';


class HoneyHoleLibrary extends React.Component{
  constructor(){
    super();
    this.state = {
      location: {}
    };
    this.handleHoneyDetails = this.handleHoneyDetails.bind(this);
    this.resetLibrary = this.resetLibrary.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.resetLibrary();
  }

  resetLibrary(){
    this.props.locationStore.honeyHoleClicked = false;
  }

  handleHoneyDetails(location, e){
    this.props.locationStore.honeyHoleClicked = true;
    this.setState({location: location});
  }

  handleDelete(location, e){
    if (confirm('Are you sure you want to delete the honey?')) {
      this.props.locationStore.deleteLocation(location._id);
    } else {
      return null;
    }    
  }


  render(){
    const position = (this.props.locationStore.center.lat == '' && this.props.locationStore.locations.length > 0 ?
    [this.props.locationStore.locations[0].coordinates.latitude, this.props.locationStore.locations[0].coordinates.longitude] :
    [this.props.locationStore.center.lat, this.props.locationStore.center.lng]);
    const bounds = latLngBounds([position[0] - 0.01, position[1] - 0.01], [position[0] + 0.01, position[1] + 0.01]);
    let latsLongs = [];
    this.props.locationStore.locations.forEach(location =>
      latsLongs.push({latLng: [location.coordinates.latitude, location.coordinates.longitude]}));
    latsLongs.forEach((data) => {
      bounds.extend(data.latLng);
    });
    let locations = this.props.locationStore.locations.map((location, index) =>
      (
        <div key={index} style={{display:'flex', flexDirection:'row'}}>
          <ListGroupItem  onClick={this.handleHoneyDetails.bind(null, location)} href="">
          {dateFormat(location.date, "mm/dd/yy")} - <strong>{location.title}</strong>
          </ListGroupItem>
          <Button bsStyle="danger" onClick={this.handleDelete.bind(null, location)} style={{float:'right'}}>Delete</Button>
        </div>
      ));

    let markers = this.props.locationStore.locations.map((location, index) =>
      (
        <Marker key={index} position={[location.coordinates.latitude, location.coordinates.longitude]}>
          <Popup>
            <span className="addfont" style={{textAlign:'center'}}>{location.title}</span>
          </Popup>
        </Marker>
      ));

    let library = (
        <div className="parent">
          <div className="container">
            <h2 className="welcome-header">Honey Hole Library</h2>
            <Col md={2}/>
            <Col md={8}>
              <Map style={{width:'100%', height:'400px'}} bounds={bounds} >
                <ScaleControl position="bottomright" />
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {markers}
                <Marker position={position}>
                  <Popup>
                    <span className="addfont" style={{textAlign:'center'}}>Current Location.</span>
                  </Popup>
                </Marker>
              </Map>
              <ListGroup>
                {locations}
              </ListGroup>
            </Col>
            <Col md={2}/>
          </div>
        </div>
      );

    return(
      <div>
        {!this.props.locationStore.honeyHoleClicked ? library : <HoneyHole backButton location={this.state.location}/>}
      </div>
    );
  }
}

HoneyHoleLibrary.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(HoneyHoleLibrary));
