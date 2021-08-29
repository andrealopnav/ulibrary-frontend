import React, { Component } from "react";
import axios from 'axios';

require('dotenv').config();

export default class SignUp extends Component {
    state = {
        form: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
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
        
        const url = process.env.REACT_APP_API_URL + '/api/user';

        const params = { 
            first_name: this.state.form.firstName, 
            last_name: this.state.form.lastName, 
            email: this.state.form.email, 
            password: this.state.form.password,
            role: "student" 
        };
        
        axios.post(url, params, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            console.log(response);
            this.props.history.push('/home');
        })
        .catch(error => {
            alert("We're sorry, something went wrong while creating new user!");
            console.log(error);
        })
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <h3>Create User</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" name="firstName" onChange={this.handleChange} placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" name="lastName" onChange={this.handleChange} placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" onChange={this.handleChange} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue>Select...</option>
                        <option value="1">Student</option>
                        <option value="2">Librarian</option>
                    </select>                    
                </div>

                <br></br>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}