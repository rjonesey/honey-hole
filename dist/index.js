import React from 'react';
import { render } from 'react-dom';
import indexRoute from '../../src/indexroute';

let app = {
    // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
  onDeviceReady: function() {
    render(indexRoute(), document.getElementById('app'));
  }
};

app.initialize();
