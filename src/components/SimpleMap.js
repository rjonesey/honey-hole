import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { inject, observer } from 'mobx-react';

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: '#3d8ae2', border:'3px solid white',
    height: 20, width: 20, borderRadius:'50%', textAlign:'center'
  }}>
    {text}
  </div>
);

class SimpleMap extends React.Component {
  constructor(){
    super();
    this.state = {
      center: {
        lat: 0,
        lng: 50
      },
      zoom: 11
    };
    this.loadMap = this.loadMap.bind(this);
  }
  componentDidMount(){
    // this.props.locationStore.getWeatherInfo();
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
        this.setState({center: {lat: lat, lng: lon}});
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

    let markers = this.props.locationStore.locations.map((location, index) =>
      (
        <Marker key={index} position={location.coordinates.latitude, location.coordinates.longitude}>
          <Popup>
            <span style={{textAlign:'center'}}>{location.title}</span>
          </Popup>
        </Marker>
      ));



    return (
         <GoogleMap
          center={this.state.center}
          zoom={this.state.zoom}
        >
          <AnyReactComponent
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text={''}
          />
        </GoogleMap>
    );
  }
}

SimpleMap.propTypes = {
  locationStore: React.PropTypes.object
};

export default inject('locationStore')(observer(SimpleMap));
