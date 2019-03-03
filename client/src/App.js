import React, { Component } from "react";
import "./App.css";
import "./components/forms.css";
import API from "./utils/API.js"
import { PreferencesForm, DisplayForm, UserForm, HomeComponent, AnalyticsForm, ReportsForm } from "./components/side-forms/index.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import { Row, Col, Navbar } from "react-bootstrap";
import SideNav from "./components/SideNav"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.getItem("user"),
      redirect: false,
      email: "",
      password: "",
      name: "",
      errMsg: "",
      profile: {}
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.onUserAuth = this.onUserAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errMsg: '',
    });
  };

  handleLogin = (evt) => {
    evt && evt.preventDefault && evt.preventDefault();
    if (this.state.email && this.state.password) {
      API.login({
        username: this.state.email,
        password: this.state.password,
      }).then(this.onUserAuth).catch(err => {
        console.log(err);
        if (err && err.response && err.response.data && err.response.data.user) {
          this.setState({errMsg: err.response.data.user})
        }
        if (err && err.response && err.response.data && err.response.data.password) {
          this.setState({errMsg: err.response.data.password})
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
      // API.setAuthToken(res.data.token);
    //   API.getProfile().then(this.onUserProfile).catch(e => {
    //     console.log('error on user Login');
        this.setState({ redirect: true });
    //   });
    // } else if (res.request.status === 401) {
    //   console.log("BAD");
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
          <Route exact path="/" render={(props) => (<Login {...props} errMsg={this.state.errMsg} translate={this.translate} handleLogin={this.handleLogin} handleInputChange={() => this.handleInputChange} />)} />
          <Route exact path="/register" render={(props) => (<Register {...props} errMsg={this.state.errMsg} translate={this.translate} handleRegister={this.handleRegister} handleInputChange={() => this.handleInputChange} />)} />
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
                    <Route exact path="/app" component={HomeComponent} />
                    <Route exact path="/app/preferences" component={PreferencesForm} />
                    <Route exact path="/app/display" component={DisplayForm} />
                    <Route exact path="/app/users" component={UserForm} />
                    <Route exact path="/app/analytics" component={AnalyticsForm} />
                    <Route exact path="/app/reports" component={ReportsForm} />
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
