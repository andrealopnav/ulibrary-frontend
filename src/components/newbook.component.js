import React, { Component } from "react";
import axios from 'axios';

require('dotenv').config();

export default class NewBook extends Component {
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
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI4MGI5MDUwMWUwYTkyMmFmMmE0MjgiLCJpYXQiOjE2MzAyMDYzNjZ9.268ZdDtS0HCTJVoeiayHzhbm03xLoV3zsowwP3L9DFE';
        const url = process.env.REACT_APP_API_URL + '/api/book';
        
        const params = { 
            title: this.state.form.title, 
            author: this.state.form.author, 
            published_year: this.state.form.publishedYear, 
            genre: this.state.form.genre
        };
        
        axios.post(url, params, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            console.log(response);
            this.props.history.push('/home');
        })
        .catch(error => {
            alert("We're sorry, something went wrong while adding new book!");
            console.log(error);
        })
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <h3>New Book</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" onChange={this.handleChange} placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" name="author" onChange={this.handleChange} placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Published Year</label>
                    <input type="number" className="form-control" name="publishedYear" onChange={this.handleChange} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" className="form-control" name="genre" onChange={this.handleChange} placeholder="Last name" />
                </div>                

                <br></br>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}