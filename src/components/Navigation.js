import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

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
  userStore: PropTypes.object,
  logUserOut: PropTypes.func,
  locationStore: PropTypes.object
};

export default inject('userStore', 'locationStore')(observer(Navigation));
