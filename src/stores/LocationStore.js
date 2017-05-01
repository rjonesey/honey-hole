import React from 'react';
import {extendObservable} from 'mobx';
import { Button, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import config from '../config';

const dateFormat = require('dateformat');

export default class LocationStore {
  constructor(){
    extendObservable(this, {
      center: {
        lat: '',
        lng: ''
      },
      zoom: 11,
      currentLocation: {},
      weather: {
        conditions: '',
        temp: '',
        windSpeed: '',
        windDir:'',
      },
      locations:[],
      defaultTitle: 'New Honey Hole',
      honeyHoleClicked: false
    });

    this.savePosition = this.savePosition.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.saveFieldNotes = this.saveFieldNotes.bind(this);
    this.loadLocationsFromServer = this.loadLocationsFromServer.bind(this);
    this.honeyHoleClick = this.honeyHoleClick.bind(this);
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
    let title = this.defaultTitle;
    fetch(config.SITE + '/location/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: new Date,
        title: title,
        coordinates: coordinates,
        weather: weather,
        owner: ownerId
      })
    })
    .then(result => result.json())
    .then(result => this.currentLocation = result)
    .then(result => this.locations.push(result));
  }

  deleteLocation(locationId) {
    console.log(locationId);
    let newList = this.locations.filter(l => l._id !== locationId);
    this.locations = newList;
    fetch('/location/locations/' + locationId, {
      method: 'DELETE'
    });
  }



  getWeatherInfo() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.center.lat}&lon=${this.center.lng}&APPID=72c2e10afa58ce6e31b103d41b7125b8`)
       .then(result => result.json())
       .then(data => this.weather = {conditions: data.weather[0].description, temp: data.main.temp, windSpeed: data.wind.speed, windDir: data.wind.deg });
  }

  saveFieldNotes(locationId, title, notes){
    if(title == ''){
      title = "New Honey Hole";
    }
    fetch(config.SITE + '/location/locations/' + locationId, {
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
    .then(result => this.currentLocation = result)
    .then(result => this.locations[this.locations.length - 1] = result);
  }

  loadLocationsFromServer(ownerId) {
    fetch(config.SITE + '/location/locations/' + ownerId)
       .then(result => result.json())
       .then(locations => this.locations = locations);
  }

  honeyHoleClick(){
    this.honeyHoleClicked = false;
  }

}
