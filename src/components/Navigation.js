import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { NavbarHeader, NavbarToggle, NavbarCollapse, NavbarBrand } from 'react-bootstrap/lib/NavbarHeader';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="navigationBar">
        <Navbar collapseOnSelect style={{backgroundColor:'white'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home" className="lifecoach-header" style={{color:'#90afc5'}}>Honey Hole</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer onClick={this.props.locationStore.honeyHoleClick} to={{pathname: '/library'}}>
                <NavItem>
                  <i style={{color:'#d9534f'}} className="fa fa-map-marker fa-lg" aria-hidden="true"></i>
                </NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight className="nav-bar-right">
              <Navbar.Text className="addfont" style={{color: "black"}}>
                <i className="fa fa-user fa-lg" aria-hidden="true"></i> Welcome, {this.props.userStore.firstName}!
              </Navbar.Text>
              <LinkContainer onClick={this.props.userStore.logUserOut} to={{pathname: '/'}}>
                <NavItem>
                  <i style={{color: "black"}} className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
