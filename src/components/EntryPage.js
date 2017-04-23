import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

export default class EntryPage extends React.Component {

  render() {
    return(
      <div className="entry-page">
        <div style={{width: "100vw", position: "relative", display:'flex', flexWrap:'wrap', justifyContent:'space-around', background:"#F9A603"}}>
          <span><h1 className="lifecoach">Honey&nbsp;Hole</h1></span>
          <Login/>
        </div>
        <div className="entry-pic">
                <div className="bodyText">
                  <div className="home-text">
                    <h1 className="entry-title">Keep track of your most productive fishing spots</h1>
                    <h2>We help you effortlessly log all the crucial info to help get you back on the lunkers.</h2>
                    <h2>Welcome to <span  style={{color: "#F9A603"}} className="branded">Honey Hole™</span></h2>
                    <br/>
                     <div style= {{display: "flex", justifyContent: "space-around"}}>
                       <div className="entry-feature">
                         <h3 className="entry-title">GPS Coordinates</h3>
                         <h4 className="blurb">Easily get back to the sweet spot.</h4>
                         <i className="fa fa-pie-chart fa-4x icon1" aria-hidden="true"></i>
                       </div>
                       <div className="entry-feature">
                         <h3 className="entry-title">Log all the details</h3>
                         <h4 className="blurb">Weather, field notes, time of year, all in one place.</h4>
                         <br/>
                         <i className="fa fa-heart fa-4x icon2" aria-hidden="true"></i>
                       </div>
                       <div className="entry-feature">
                         <h3 className="entry-title"><strong>Map</strong></h3>
                         <h4 className="blurb">Amazing map showing you how to get back to the honey.</h4>
                         <i className="fa fa-database fa-4x icon3" aria-hidden="true"></i>
                       </div>
                     </div>
                  </div>
                </div>
            <SignUp/>
        </div>
      </div>
    );
  }
}
