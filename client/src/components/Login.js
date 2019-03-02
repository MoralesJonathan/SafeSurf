import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ParticlesBackground from './mini-components/ParticlesBackground.js';
import HeaderIcon from './mini-components/HeaderIcon.js';

class Login extends Component {

  render() {
    return (
      <div>
        <ParticlesBackground />
        <div id="loginArea" className="container jumbotron loginContainer">
          <form>
            <HeaderIcon />
            <div className="form-group">
              <label>email</label>
              <input type="text" className="form-control" name="email" onChange={this.props.handleInputChange()} placeholder={"pepe@gmail.com"} />
            </div>
            <div className="form-group">
              <label>password</label>
              <input type="password" className="form-control" name="password" onChange={this.props.handleInputChange()} />
            </div>
            {this.props.errMsg && <div style={{marginBottom: '18px'}}><span className='err-msg'>* {this.props.errMsg}</span></div>}
            <button type="submit" onClick={this.props.handleLogin} className="btn btn-primary btn--no-margin">Login</button>
            <p style={{float:'right'}}>
              <Link to='/register'>SignUp</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;