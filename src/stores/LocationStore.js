import React from 'react';
import {extendObservable} from 'mobx';
import { Button, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
const dateFormat = require('dateformat');

export default class LocationStore {
  constructor(){
    extendObservable(this, {
      coordinates:
        {latitude: '', longitude: ''},

      center: {
        lat: '',
        lng: ''
      },
      zoom: 11,
      location: {},
      weather: {
        conditions: '',
        temp: '',
        windSpeed: '',
        windDir:''
      }
    });

    this.loadMap = this.loadMap.bind(this);
    this.showMap = this.showMap.bind(this);
    this.savePosition = this.savePosition.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.saveFieldNotes = this.saveFieldNotes.bind(this);
  }

  savePosition(ownerId) {
    let coordinates = {
      latitude: this.center.lat,
      longitude: this.center.lng
    };
    let weather = {
      temp: this.weather.temp,
      conditions: this.weather.conditions,
      windSpeed: this.weather.windSpeed,
      windDir: this.weather.windDir
    };
    fetch('/location/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: new Date,
        coordinates: coordinates,
        weather: weather,
        owner: ownerId
      })
    })
    .then(result => result.json())
    .then(result => this.location = result);
  }

  getWeatherInfo() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.center.lat}&lon=${this.center.lng}&APPID=72c2e10afa58ce6e31b103d41b7125b8`)
       .then(result => result.json())
       .then(data => this.weather = {conditions: data.weather[0].description, temp: data.main.temp, windSpeed: data.wind.speed, windDir: data.wind.deg });
  }

  saveFieldNotes(locationId, title, notes){
    fetch('/location/locations/' + locationId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        notes: notes
      })
    })
    .then(result => result.json())
    .then(result => this.location = result)
  }

  loadLastWheel(){
    if(this.wheels.length > 0){
      for(let i = 0; i < this.segs.length; i++) {
        this.segs[i].score = this.wheels[this.wheels.length - 1].segs[i].score;
      }
      this.newWheel = false;
    }
  }

  resetWheel(){
    for(let i = 0; i < this.segs.length; i++) {
      this.segs[i].score = 0;
    }
    this.newWheel = true;
    this.loadCanvas();
  }

  loadWheelsFromServer(ownerId) {
    fetch('/wheel/wheels/' + ownerId)
       .then(result => result.json())
       .then(wheels => this.wheels = wheels)
       .then(wheels => this.loadLastWheel());
  }

  loadMap(){
    // Check to see if the browser supports the GeoLocation API.
    if (navigator.geolocation) {
      // Get the location
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        console.log(lat, lon);

        // Show the map
        this.showMap(lat, lon);
      });
    } else {
      // Print out a message to the user.
      document.write('Your browser does not support GeoLocation :(');
    }

  }

  // Show the user's position on a Google map.
  showMap(lat, lon) {
    // Create a LatLng object with the GPS coordinates.
    let myLatLng = new this.props.google.maps.LatLng(lat, lon);

    // Create the Map Options
    let mapOptions = {
      zoom: 8,
      center: myLatLng,
      mapTypeId: this.props.google.maps.MapTypeId.TERRAIN
    };

    // Generate the Map
    let map = new this.props.google.maps.Map(document.getElementById('map'), mapOptions);

    // Add a Marker to the Map
    let marker = new this.props.google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Found you!'
    });
  }

  loadHistoryCanvas(){
    let theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
      let ctx = theCanvas.getContext("2d");
      if (ctx) {
        let x = 250;
        let y = 250;
        let r = 240;
        let a = 360/this.segs.length;
        let rad = a * (Math.PI / 180);
        let colorArr = ["#FF3251", "#FF7A32", "#3251FF", "#32FF7A", "#7A32FF", "#E032FF", "#FFE032", "#32B7FF"];
        let backgroundColorArr = ["#FFB2BC", "#FFCEB2", "#B2E2FF", "#BCFFB2", "#CEB2FF", "#F4B2FF", "#FFF4B2", "#B2FFF4"];
        let symbolArr = [
          '\uf0b1',
          ' \uf155',
          '\uf29a',
          '\uf21e',
          '\uf02d',
          '\uf0c0',
          '\uf2b5',
          '\uf0ac'
        ];

        for(let i = 0; i < this.segs.length; i++){
          ctx.strokeStyle = 'grey';
          ctx.lineWidth = 3;
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x,y,r,(i * -rad), (i * -rad) - rad, true);
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x, y, this.wheels[this.historyIndex].segs[i].score * (r / 10), (i * -rad), (i * -rad) - rad, true);
          ctx.fillStyle = backgroundColorArr[i];
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.lineTo(x + (r * Math.cos(i * -rad)), y + (r * Math.sin(i * -rad)));
          ctx.stroke();
          ctx.strokeStyle = colorArr[i];
          ctx.lineWidth = 7;
          ctx.beginPath();
          ctx.moveTo(x + (this.wheels[this.wheels.length - 1].segs[i].score * (r / 10) * Math.cos(i * -rad)), y + (this.wheels[this.wheels.length - 1].segs[i].score * (r/10) * Math.sin(i * -rad)));
          ctx.arc(x, y, this.wheels[this.wheels.length - 1].segs[i].score * (r / 10), (i * -rad), (i * -rad) - rad, true);
          ctx.stroke();
          ctx.strokeStyle = 'grey';
          ctx.lineWidth = 3;
          ctx.fillStyle = "rgb(70,70,70)";
          ctx.font='50px FontAwesome';
          ctx.fillText(symbolArr[i], x - 28 + ((r * 0.75) * Math.cos((i * -rad) - (rad/2))), y + 15 + ((r * 0.75) * Math.sin((i * -rad) - (rad/2))));
        }
      }
    }
    return theCanvas;
  }
}
