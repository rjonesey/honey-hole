import React from 'react';
import { observer, inject } from 'mobx-react';
import config from '../config';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  addUserToDatabase(e){
    this.props.userStore.userCreated = false;
    this.props.userStore.failedEmailPassword = false;
    e.preventDefault();
    fetch(config.SITE + '/newuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })
    });
    if(this.state.email && this.state.password){
      this.props.userStore.displayWelcome();
      this.setState({firstName: "", lastName: "", email: "", password: "",});
    } else {
      this.props.userStore.failedEmailPassword = true;
    }
  }


  render() {
    let logInMessage = (
      <h3 className="signup-message2">
      Welcome to Honey Hole!  Go ahead and log in!
      </h3>
    );

    let noEmail = (
      <h3 className="signup-message">
        Please enter a valid e-mail and password.
      </h3>
    );

    let signUpForm = (
      <div className="signup-form">
        <h1 className="bodyText">Sign Up</h1>
        <form method="" role="form">
            <div className="form-group">
              <input
                onChange={this.handleFirstNameChange}
                value={this.state.firstName}
                type="text"
                className="form-control"
                id="first-name"
                placeholder="first name"/>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleLastNameChange}
                value={this.state.lastName}
                type="text"
                className="form-control"
                id="last-name"
                placeholder="last name"/>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleEmailChange}
                value={this.state.email}
                type="text"
                className="form-control"
                id="email"
                placeholder="email"/>
            </div>
            <div className="form-group">
              <input
                onChange={this.handlePasswordChange}
                value={this.state.password}
                type="password"
                className="form-control"
                id="password"
                placeholder="password"/>
            </div>
            <button
              onClick={this.addUserToDatabase}
              type="submit"
              className="submitForm"
              style={{textAlign: 'center'}}>
              <strong>
                Sign Up
              </strong>
            </button>
         </form>
         {this.props.userStore.userCreated ? logInMessage: ""}
         {this.props.userStore.failedEmailPassword ? noEmail: ""}
      </div>
    );
    return(
        <div>
          {signUpForm}
        </div>
    );
  }
}


SignUp.propTypes = {
  userStore: React.PropTypes.object
};

export default inject('userStore')(observer(SignUp));
