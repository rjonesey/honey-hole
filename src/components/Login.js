import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserAuth = this.handleUserAuth.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleUserAuth(event){
    event.preventDefault();
    let user = {email: this.state.email, password: this.state.password};
    this.props.userStore.authUser(user);
    this.props.userStore.setUser(user);
    this.setState({email: "", password: ""});

  }
  render(){
    let invalidUser = <h3 className="invalidUser">Please enter valid username and password.</h3>;
    let loginForm = (
      <div >
        <form method="" role="form">
          <div className="form-group" style={{marginBottom: '0px', display: 'flex', flexDirection: 'row', alignItems:'center', height:'15vh'}}>
            <input style={{margin:'1vw'}} onChange={this.handleEmailChange} value={this.state.email} type="text" className="form-control" id="email" placeholder="email"/>
            <input onChange={this.handlePasswordChange} value={this.state.password} type="password" className="form-control" id="password" placeholder="password"/>
            <button onClick={this.handleUserAuth} type="submit" className="submitForm2"><strong>Log In</strong></button>
          </div>
        </form>
        {this.props.userStore.failedLogin ? invalidUser : ""}
    </div>);
    return(
        <div>
          {loginForm}
        </div>
    );
  }
}
Login.propTypes = {
  userStore: PropTypes.object
};
export default inject('userStore')(observer(Login));
