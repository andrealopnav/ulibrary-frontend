import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Alert from 'react-bootstrap/Alert';

require('dotenv').config();

const cookies = new Cookies();

export default class MyBooks extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, booksList: undefined,
    showAlert: false, alertType: '', alertTitle: '', alertText: '' };
  }
  
  componentDidMount() {
    const token = cookies.get('user').token;

    const url = process.env.REACT_APP_API_URL + '/api/book/re/user';

    const params = {
      user_id: cookies.get('user').id
    };

    axios.post(url, params, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        if (response.data.code === 200) {
          this.setState({ booksList: response.data.result });
          this.setState({ isLoading: false });
        } else {
          this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: 'An error has occurred. Try again!'});
          setTimeout(function() {
            this.setState({showAlert: false});
          }.bind(this), 5000)
        }
      }).catch(error => {
        this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: 'An error has occurred on an attempt to load data!'});
        console.log(error);
        setTimeout(function() {
          this.setState({showAlert: false});
        }.bind(this), 5000);
      });
  }

  render() {
    const { isLoading, booksList,
    showAlert, alertType, alertTitle, alertText } = this.state;
    
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

    const renderBook = (book, index) => {
      return (
        <tr key={index}>
          <td>{book.stock_id}</td>
          <td>{book.book_info}</td>
          <td>{book.status}</td>
          <td>{book.date}</td>
        </tr>
      )
    };  

    return (
      <>
        <table className="table table-hover">
          <thead className="table-info">
            <tr>
              <th>Stock code</th>
              <th>Book</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {booksList.map(renderBook)}
          </tbody>
        </table>

        {alertType === 'success' ? ( 
          <Alert show={showAlert} variant="success">
            <Alert.Heading>{alertTitle}</Alert.Heading>
            <p>{alertText}</p>
          </Alert>
        ) : (
          <Alert show={showAlert} variant="danger">
            <Alert.Heading>{alertTitle}</Alert.Heading>
            <p>{alertText}</p>
          </Alert>
        )}
      </>
    );
	}
}