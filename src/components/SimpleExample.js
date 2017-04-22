import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { inject, observer } from 'mobx-react';

class SimpleExample extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: '',
      lng: '',
      zoom: 13,
    };
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
        this.setState({lat: lat, lng: lon});
        this.props.locationStore.center.lat = lat;
        this.props.locationStore.center.lng = lon;
        // this.props.locationStore.getWeatherInfo();
      });
    } else {
      // Print out a message to the user.
      document.write('Your browser does not support GeoLocation :(');
    }

  }


  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map style={{width:'100%', height:'400px'}} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span style={{textAlign:'center'}}>Current Location.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

SimpleExample.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(SimpleExample));
