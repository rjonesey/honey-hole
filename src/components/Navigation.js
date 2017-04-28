import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="navigationBar">
        <Link to="/home" className="lifecoach-header" style={{color:'#90afc5', textDecoration:"none"}}>
          Honey Hole
        </Link>
        <Link to="/library"  activeClassName="activeLibrary" style={{color:"#d9534f", textDecoration:"none"}} className="fa fa-map-marker fa-2x locationLibrary" aria-hidden="true"/>
      </div>
    );
  }
}
Navigation.propTypes = {
  userStore: React.PropTypes.object,
  logUserOut: React.PropTypes.func,
  locationStore: React.PropTypes.object
};

export default inject('userStore', 'locationStore')(observer(Navigation));
