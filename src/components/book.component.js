import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Alert from 'react-bootstrap/Alert';

require('dotenv').config();

const cookies = new Cookies();

export default class Book extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, booksList: undefined, show: false, stockList: [], modalTitle: '', bookId: '',
    showAlert: false, alertType: '', alertTitle: '', alertText: '' };
  }
  
  componentDidMount() {
    const token = cookies.get('user').token;

    const url = process.env.REACT_APP_API_URL + '/api/books';

    axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        this.setState({ booksList: response.data });
        this.setState({ isLoading: false });
      }).catch(error => {
        this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: 'An error has occurred on an attempt to load data!'});
        console.log(error);
        setTimeout(function() {
          this.setState({showAlert: false});
        }.bind(this), 5000);
      });
  }

  render() {
    const { isLoading, booksList, show, stockList, modalTitle, bookId,
    showAlert, alertType, alertTitle, alertText } = this.state;
    const token = cookies.get('user').token;
    
    const handleClose = () => {
      this.setState({ show: false });
    };

    const handleShow = (book) => {
      if (book.stock !== undefined)
        this.setState({ stockList: book.stock });
      else
        this.setState({ stockList: [] });
      this.setState({ modalTitle: book.title + ' - ' + book.author });
      this.setState({ bookId: book.id });
      this.setState({ show: true });
    };

    const rent = (stockId, status) => {
      const url = process.env.REACT_APP_API_URL + '/api/book/stock';

      const params = {
        book_id: bookId,
        stock_id: stockId,
        user_id: cookies.get('user').id,
        status: status
      };

      axios.patch(url, params, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        this.setState({ show: false, showAlert: true, alertType: 'success', alertTitle: 'Success', alertText: 'You have rented/reserved the book successfully!'});
        setTimeout(function() {
          this.setState({showAlert: false});
        }.bind(this), 5000);
      }).catch(error => {
        this.setState({ show: false, showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: 'An error has occurred on an attempt to update data!'});
        console.log(error);
        setTimeout(function() {
          this.setState({showAlert: false});
        }.bind(this), 5000);
      });
    }
    
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

    const renderBook = (book, index) => {
      return (
        <tr key={index}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.published_year}</td>
          <td>{book.genre}</td>
          <td>{book.stock_qty}</td>
          <td>{book.available}</td>
          <td><button type="button" className="btn btn-primary" onClick={() => handleShow(book)}>Details</button></td>
        </tr>
      )
    };

    const renderStock = (stock, index) => {
      return (
        <tr key={index}>
          <td>{stock._id}</td>
          <td>{stock.status}</td>
          {stock.status === 'available' ? ( 
            <td>
              <button type="button" className="btn btn-primary" onClick={() => rent(stock._id, 'rented')}>Rent</button>
              &nbsp;
              <button type="button" className="btn btn-primary" onClick={() => rent(stock._id, 'reserved')}>Reserve</button>
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      )
    };  

    return (
      <>
        <table className="table table-hover">
          <thead className="table-info">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published Year</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Availability</th>
              <th></th>
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
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-hover">
              <thead className="table-info">
                <tr>
                  <th>Code</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stockList.map(renderStock)}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
      </Modal>
      </>
      
    );
	}
}