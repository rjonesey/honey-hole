import {extendObservable} from 'mobx';
import {browserHistory} from 'react-router';
import React from 'react';
import config from '../config';
const PROD = process.env.NODE_ENV === "production";
const FORCE_AUTH = process.env.FORCE_AUTH || false;

export default class UserStore {
  constructor(){
    extendObservable(this, {
      firstName: "",
      email: "",
      password: "",
      token: "",
      admin: false,
      isLoggedIn: false,
      failedLogin: false,
      userId: "",
      userCreated: false,
      failedEmailPassword: false
    });
    this.authUser = this.authUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.displayWelcome = this.displayWelcome.bind(this);
    this.logUser = this.logUser.bind(this);

  }

  authUser(user) {
    if(FORCE_AUTH) {
      this.logUser({token: "asdfkjhsadlfkjh", userId: "teasdkjdfskjh;", firstName: "testUser"});
      return;
    }
    fetch(config.SITE + '/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
    .then(result => result.json())
    .then(res => this.logUser(res));
  }

  logUser(res) {
    this.token = res.token;
    this.userId = res.userId;
    this.firstName = res.firstName;
    if(res.token){
      this.isLoggedIn = true;
      browserHistory.replace("/home");
    } else {
      this.failedLogin = true;
    }
  }

  setUser(user) {
    this.email = user.email;
    this.password = user.password;
  }

  displayWelcome(){
    this.userCreated = true;
  }

  logUserOut() {
    this.token = "";
    this.isLoggedIn = false;
    this.admin = false;
    this.firstName= "";
    this.email= "";
    this.password= "";
    this.failedLogin= false;
    this.userId= "";
    browserHistory.replace("/");
    location.reload();
  }
}
