import React from 'react';
import Navigation from './Navigation';
import PropTypes from 'prop-types';

class App extends React.Component{
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <Navigation/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App;
