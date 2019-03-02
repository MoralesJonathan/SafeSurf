import React, { Component } from 'react';
import ParticlesBackground from './mini-components/ParticlesBackground.js';
import HeaderIcon from './mini-components/HeaderIcon.js';

class Register extends Component {

  render() {
    return (
      <div>
        <ParticlesBackground />
        <div id="RegisterArea" className="container jumbotron registerContainer">
          <form>
            <HeaderIcon />
            <div className="form-group">
              <label>name</label>
              <input type="text" className="form-control" name="fullName" onChange={this.props.handleInputChange()} placeholder={"Pepito Perez"} />
            </div>
            <div className="form-group">
              <label>email</label>
              <input type="text" className="form-control" name="email" onChange={this.props.handleInputChange()} placeholder={"pepe@gmail.com"} />
            </div>
            <div className="form-group">
              <label>password</label>
              <input type="password" className="form-control" name="password" onChange={this.props.handleInputChange()} />
            </div>
            {this.props.errMsg && <div style={{marginBottom: '18px'}}><span className='err-msg'>* {this.props.errMsg}</span></div>}
            <button type="submit" onClick={this.props.handleRegister} className="btn btn-primary btn--no-margin">register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;