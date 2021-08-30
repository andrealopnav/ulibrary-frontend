import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Alert from 'react-bootstrap/Alert';

require('dotenv').config();

const cookies = new Cookies();

export default class NewBook extends Component {
    
    constructor(props) {
        super(props);
        this.state = { showAlert: false, alertType: '', alertTitle: '', alertText: '' };
    }

    state = {
        form: {
            title: '',
            author: '',
            publishedYear: '',
            genre: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    submitHandler = e => {
        e.preventDefault();
        const token = cookies.get('user').token;
        const url = process.env.REACT_APP_API_URL + '/api/book';
        
        const params = { 
            title: this.state.form.title, 
            author: this.state.form.author, 
            published_year: this.state.form.publishedYear, 
            genre: this.state.form.genre
        };
        
        axios.post(url, params, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            if (response.data.code === 200) {
                this.setState({ show: false, showAlert: true, alertType: 'success', alertTitle: 'Success', alertText: 'Successful book addition!'});
                setTimeout(function() {
                  this.setState({showAlert: false});
                  this.props.history.push('/home');
                }.bind(this), 4000);
            } else {
                this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: 'An error has occurred. Try again!'});
                setTimeout(function() {
                    this.setState({showAlert: false});
                }.bind(this), 5000)
            }
        })
        .catch(error => {
            this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: "We're sorry, something went wrong while adding new book!"});
            console.log(error);
            setTimeout(function() {
                this.setState({showAlert: false});
            }.bind(this), 5000);
        })
    }

    render() {
        const { showAlert, alertType, alertTitle, alertText } = this.state;

        return (
            <form onSubmit={this.submitHandler}>
                <h3>New Book</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" onChange={this.handleChange} placeholder="Title" />
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" name="author" onChange={this.handleChange} placeholder="Author" />
                </div>

                <div className="form-group">
                    <label>Published Year</label>
                    <input type="number" className="form-control" name="publishedYear" onChange={this.handleChange} placeholder="2001" />
                </div>

                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" className="form-control" name="genre" onChange={this.handleChange} placeholder="Genre" />
                </div>                

                <br></br>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>

                <br></br>

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
            </form>
        );
    }
}