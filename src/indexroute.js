import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import App from './components/App';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Form from './components/Form';
import { Provider } from 'mobx-react';
import UserStore from './stores/UserStore';
import LocationStore from './stores/LocationStore';
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer';
import EntryPage from './components/EntryPage';
import HoneyHole from './components/HoneyHole';
import HoneyHoleLibrary from './components/HoneyHoleLibrary';
const locationStore = new LocationStore();
const userStore = new UserStore();

export default function indexroute(){
  return(
    <Provider userStore={userStore} locationStore={locationStore}>
      <Router history={browserHistory}>
      <Route path="/" component={EntryPage}/>
        <Route component={EnsureLoggedInContainer}>
          <Route path="/home" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/form" component={Form}/>
            <Route path="/honeyhole" component={HoneyHole}/>
            <Route path="/library" component={HoneyHoleLibrary}/>
          </Route>
        </Route>
        <Route path="*" component={EntryPage}/>
      </Router>
    </Provider>
  );
}
