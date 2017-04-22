import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import SimpleMap from './SimpleMap';
import SimpleExample from './SimpleExample';

class Home extends React.Component{
  constructor(){
    super();
    this.handleSavePosition = this.handleSavePosition.bind(this);
  }

  componentDidMount() {
  }

  handleSavePosition() {
    this.props.locationStore.savePosition(this.props.userStore.userId);
    browserHistory.replace("/form");

  }

  render(){
    return (
      <div className="parent">
        <div className="container">
          <h2 className="welcome-header">Welcome, {this.props.userStore.firstName}! </h2>
          <Col md={2}/>
          <Col md={8}>
              <SimpleExample />
                <Button bsStyle="danger" bsSize="large" block style={{marginTop: "20px"}} onClick={this.handleSavePosition}>
                Save the Honey</Button>
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
