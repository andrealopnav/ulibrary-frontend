import React, { Component } from "react";
import axios from 'axios';

export default class Book extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, booksList: undefined };
  }
  
  componentDidMount() {
    console.debug("After mount! Let's load data from API...");
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI4MDE3OTU4MDAzMmNlOGY3YjllYzEiLCJpYXQiOjE2MzAwMTI5ODR9.Cptk0dYgf-bHg3wLGEadQitoQLqJ-ofrBAJ5c-qfqU4';

    axios.get('http://localhost:3001/api/books', { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        this.setState({ booksList: response.data });
        this.setState({ isLoading: false });      })
      .catch(error => {
        alert("An error has occurred on an attempt to load data!");
        console.log(error);
      });

  }
	
  render() {
    const { isLoading, booksList } = this.state;

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

      console.log('imprimiendo datooooooooos');
      console.log(booksList);

    const renderBook = (book, index) => {
    return (
      <tr key={index}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.published_year}</td>
        <td>{book.genre}</td>
        <td>{book.stock}</td>
        <td>{book.available}</td>
        <td><button type="button" className="btn btn-primary">Details</button></td>
      </tr>
    )
  };

    return (
      
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
      
    );
	}
}