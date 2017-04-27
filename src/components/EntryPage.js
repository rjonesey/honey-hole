import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Col } from 'react-bootstrap';

export default class EntryPage extends React.Component {

  render() {
    return(
      <div className="entry-page">
        <div style={{width: "100vw", position: "relative", display:'flex', flexWrap:'nowrap', flexDirection: 'column', alignItems: 'center', justifyContent:'space-around', background:"#90afc5"}}>
          <span><h2 className="lifecoach">Honey&nbsp;Hole</h2></span>
          <h3 className= "addfontwhite"> Find Your Way Back!</h3>
          <Login/>
        </div>
        <div className="parent">
          <div style={{position: "relative", display:'flex', flexWrap:'nowrap', flexDirection: 'column', alignItems: 'center', justifyContent:'space-around'}}>
            <Col md={2}/>
            <Col md={8} style={{position: "relative", display:'flex', flexWrap:'nowrap', flexDirection: 'column', alignItems: 'center', justifyContent:'space-around'}}>
              <SignUp />
            </Col>
            <Col md={2}/>
          </div>
        </div>

      </div>
    );
  }
}
