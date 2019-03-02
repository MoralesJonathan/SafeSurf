import React, { Component } from "react";
import "./App.css";
import AdForm from "./components/AdForm.js"
import { Row, Col, Navbar } from "react-bootstrap";
import SideNav from "./components/SideNav"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Row>
            <Col>
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                  {'airDEM'}
                </Navbar.Brand>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <SideNav></SideNav>
            </Col>
            <Col xs={9}>
              <Switch>
                <Route exact path="/" component={AdForm} />
              </Switch>
            </Col>
          </Row>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;
