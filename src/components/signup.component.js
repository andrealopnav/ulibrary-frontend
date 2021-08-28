import React, { Component } from "react";
import axios from 'axios';

export default class SignUp extends Component {
    state = {
        form: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
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
        e.preventDefault()
        
        axios.post('http://localhost:3001/api/user', { 
            first_name: this.state.form.firstName, 
            last_name: this.state.form.lastName, 
            email: this.state.form.email, 
            password: this.state.form.password,
            role: "student" })
        .then(response => {
            console.log(response)
            this.props.history.push('/sign-in');
        })
        .catch(error => {
            alert("We're sorry, something went wrong when attempting to sign up!");
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

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}