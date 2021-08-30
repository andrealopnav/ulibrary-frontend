import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import SignUp from "./signup.component";
import Book from "./book.component";
import NewBook from "./newbook.component";
import MyBooks from "./mybooks.component";
import AllBooks from "./allbooks.component";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

require('dotenv').config();

const cookies = new Cookies();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false, alertType: '', alertTitle: '', alertText: '' };
  }

	render() {
    const { showAlert, alertType, alertTitle, alertText } = this.state;
    const name = cookies.get('user').name;
    const role = cookies.get('user').role;

    const logout = () => {
      const token = cookies.get('user').token;
        
      const url = process.env.REACT_APP_API_URL + '/api/users/me/logout';

      this.props.history.push('/');
      
      /*axios.post(url, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            if (response.data.code === 200) {
                this.props.history.push('/');
            } else {
                this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: 'An error has occurred. Try again!'});
                setTimeout(function() {
                    this.setState({showAlert: false});
                }.bind(this), 5000)
            }
        })
        .catch(error => {
            this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: "We're sorry, something went wrong while logging out!"});
            console.log(error);
            setTimeout(function() {
                this.setState({showAlert: false});
            }.bind(this), 5000);
        })*/
    }

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
              {role === 'librarian' ? ( 
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>New User</Link>
                </li>
              ) : ''}
              {role === 'librarian' ? ( 
                <li className="nav-item">
                  <Link className="nav-link" to={"/new-book"}>New Book</Link>
                </li>
              ) : ''}
              <li className="nav-item">
                <Link className="nav-link" to={"/my-books"}>My Books</Link>
              </li>
              {role === 'librarian' ? ( 
                <li className="nav-item">
                  <Link className="nav-link" to={"/all-re"}>All Rents/Reservations</Link>
                </li>
              ) : ''}
            </ul>
          </div>
          <Dropdown as={ButtonGroup}>
            <Button variant="primary">{name}</Button>
            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div>
          <h3>University Library System</h3>
          <Switch>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/books" component={Book} />
            <Route path="/new-book" component={NewBook} />
            <Route path="/my-books" component={MyBooks} />
            <Route path="/all-re" component={AllBooks} />
          </Switch>
        </div>
      </div>

      {alertType === 'danger' ? ( 
        <Alert show={showAlert} variant="danger">
          <Alert.Heading>{alertTitle}</Alert.Heading>
          <p>{alertText}</p>
        </Alert>
      ) : ''}
    </Router>
        );
	}
}