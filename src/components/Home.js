import React from 'react';
import { Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import SimpleMap from './SimpleMap';
import SimpleExample from './SimpleExample';

class Home extends React.Component{
  constructor(){
    super();
  }

  componentDidMount() {
    this.props.locationStore.loadLocationsFromServer(this.props.userStore.userId);
  }


  render(){
    return (
      <div className="parent">
        <div className="container">
          <h2 className="welcome-header">Welcome, {this.props.userStore.firstName}! </h2>
          <Col md={2}/>
          <Col md={8}>
            <SimpleExample />
          </Col>
          <Col md={2}/>
        </div>
      </div>
    );
  }
}
Home.propTypes={
  userStore: React.PropTypes.object,
  locationStore: React.PropTypes.object
};

export default inject('userStore', 'locationStore')(observer(Home));
