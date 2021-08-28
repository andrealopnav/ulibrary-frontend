
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SignUp from "./signup.component";
import Book from "./book.component";


export default class Home extends Component {
	render() {
        return (
        	<Router>
    
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/home"}></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/books"}>Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>New User</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div>
          <h3>University Library System</h3>
          <Switch>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/books" component={Book} />
          </Switch>
        </div>
      </div>
    </Router>
        );
	}
}