import React, { Component } from "react";
import "./App.css";
import "./components/forms.css";
import API from "./utils/API.js"
import extensionBridge from "./utils/extensionBridge.js"
import { PreferencesForm, DisplayForm, UserForm, HomeComponent, AnalyticsForm, ReportsForm } from "./components/side-forms/index.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import { Row, Col, Navbar } from "react-bootstrap";
import SideNav from "./components/SideNav"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const DEFAULT_OPTIONS = {
  blurLevel: 3,
  blankContent: false,
  showContent: true
};
function loadConfig() {
  const options = {};
  var blurLevel = sessionStorage.getItem('blurLevel');
  var blankContent = sessionStorage.getItem('blankContent');
  var showContent = sessionStorage.getItem('showContent');
  if (blurLevel) {
    options.blurLevel = +blurLevel;
  }
  if (blankContent) {
    options.blankContent = blankContent === 'true';
  }
  if (showContent) {
    options.showContent = showContent === 'true';
  }
  return Object.assign({}, DEFAULT_OPTIONS, options);
}
class App extends Component {

  constructor(props) {
    super(props)
    var initialDisplayConfig = loadConfig();
    this.state = {
      isLoggedIn: localStorage.getItem("user"),
      redirect: false,
      email: "",
      password: "",
      name: "",
      errMsg: "",
      profile: {
        
      },
      settings: {
        display: {
          ...initialDisplayConfig
        }
      }
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.onUserAuth = this.onUserAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.changeDisplaySettings = this.changeDisplaySettings.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errMsg: '',
    });
  };

  changeDisplaySettings = changeEvt => {
    const { name, value } = changeEvt;
    this.setState((prevState) => {
      prevState.settings.display[name] = value;
      return prevState;
    });
    extensionBridge.changeVisualSetting({name, value});
  };

  handleLogin = (evt) => {
    evt && evt.preventDefault && evt.preventDefault();
    if (this.state.email && this.state.password) {
      API.login({
        username: this.state.email,
        password: this.state.password,
      }).then(this.onUserAuth).catch(err => {
        console.log(err);
        const errRes = err && err.response;
        if (errRes && err.response.data && err.response.data.user) {
          this.setState({errMsg: err.response.data.user})
        }
        if (errRes && err.response.data && err.response.data.password) {
          this.setState({errMsg: err.response.data.password})
        }
        if(errRes && errRes.status === 400) {
          this.setState({errMsg: "Wrong email or password"});
        }
      });
    }
    else{
      this.setState({errMsg: "Missing email or password"});
    }
  }

  handleRegister = (evt) => {
    evt.preventDefault();
    if (this.state.fullName && this.state.email && this.state.password) {
      API.register({
        fullName: this.state.fullName,
        password: this.state.password,
        email: this.state.email,
        username: this.state.email,
      }).then(this.handleLogin).catch(err => {
        console.log(err);
        if (err && err.response && err.response.data && err.response.data.password) {
          this.setState({errMsg: err.response.data.password})
        }
        if (err && err.response && err.response.data && err.response.data.email) {
          this.setState({errMsg: err.response.data.email})
        }
      });
    }
    else {
      this.setState({errMsg: 'Missing required information'})
    }
  }

  onUserAuth(res) {
    if (res && res.request.status === 200 || res.request.status === 201) {
      localStorage.setItem('user', this.state.email);
      API.setAuthToken(res.data.email);
      this.setState({ redirect: true });
    }
  }

  onUserProfile(res) {
    console.log('res ', res);
    if (res && res.data && res.request && (res.request.status === 200 || res.request.status === 201)) {
      this.setState({ redirect: true, profile: res.data });
      window.location.reload();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" render={(props) => (<Login {...props} errMsg={this.state.errMsg} handleLogin={this.handleLogin} handleInputChange={() => this.handleInputChange} />)} />
          <Route exact path="/register" render={(props) => (<Register {...props} errMsg={this.state.errMsg} handleRegister={this.handleRegister} handleInputChange={() => this.handleInputChange} />)} />
          <Route path="/app" render={(props) => (
            <React.Fragment>
              <Row>
                <Col>
                  <Navbar style={{backgroundColor: '#3367d6', color: 'white'}}>
                    <Navbar.Brand href="#home" style={{color: 'white', fontSize:'1.2em'}}>
                      SAFE SURF configurations
                    </Navbar.Brand>
                    <a style={{fontSize:'1.2em', position: 'absolute', right: '20px'}}><i style={{verticalAlign:'text-bottom'}} className="material-icons">power_settings_new</i></a>
                  </Navbar>
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <SideNav></SideNav>
                </Col>
                <Col xs={9}>
                  <Switch>
                    <Route exact path="/app" render={(props) => (<HomeComponent {...props} {...this.state.settings} />)} />
                    <Route exact path="/app/preferences" render={(props) => (<PreferencesForm {...props} {...this.state.settings} />)} />
                    <Route exact path="/app/display" render={(props) => (<DisplayForm {...props} {...this.state.settings} changeDisplaySettings={this.changeDisplaySettings} />)} />
                    <Route exact path="/app/users" render={(props) => (<UserForm {...props} {...this.state.settings} />)} />
                    <Route exact path="/app/analytics" render={(props) => (<AnalyticsForm {...props} {...this.state.settings} />)} />
                    <Route exact path="/app/reports" render={(props) => (<ReportsForm {...props} {...this.state.settings} />)} />
                  </Switch>
                </Col>
              </Row>
            </React.Fragment>
          )}>
          </Route>
          <Switch>
            {(this.state.isLoggedIn && this.state.redirect) && <Redirect to="/app" />}
            {!this.state.isLoggedIn && <Redirect to="/" />}
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;
