import React from 'react';
import { Map, Marker, Popup, TileLayer, ScaleControl } from 'react-leaflet';
import { inject, observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

class SimpleExample extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: '',
      lng: '',
      zoom: 13,
      currentLocation: false
    };
    this.handleSavePosition = this.handleSavePosition.bind(this);

  }

  componentDidMount(){
    this.loadMap();
  }

  loadMap(){
    // Check to see if the browser supports the GeoLocation API.
    if (navigator.geolocation) {
      // Get the location
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        console.log(lat, lon);
        this.setState({lat: lat, lng: lon, currentLocation: true});
        this.props.locationStore.center.lat = lat;
        this.props.locationStore.center.lng = lon;
        this.props.locationStore.getWeatherInfo();
      });
    } else {
      // Print out a message to the user.
      document.write('Your browser does not support GeoLocation :(');
    }

  }

  handleSavePosition() {
    this.props.locationStore.savePosition(this.props.userStore.userId);
    browserHistory.replace("/form");

  }



  render() {
    const position = [this.state.lat, this.state.lng];
    const marker = (this.state.currentLocation ?
      (<Marker position={position}>
        <Popup>
          <span className="addfont" style={{textAlign:'center'}}>Current Location.</span>
        </Popup>
      </Marker>)
      : null
    );
    const button = (
      <Button className="addfont" bsStyle="danger" bsSize="large" block style={{marginTop: "20px"}} onClick={this.handleSavePosition}>
      Save the Honey</Button>
    );
    return (
      <div>
        <Map style={{width:'100%', height:'400px'}} center={position} zoom={this.state.zoom}>
          <ScaleControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {marker}
        </Map>
        {this.state.currentLocation ? button : ''}
      </div>

    );
  }
}

SimpleExample.propTypes = {
  locationStore: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject('locationStore', 'userStore')(observer(SimpleExample));
