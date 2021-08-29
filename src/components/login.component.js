import React, { Component } from "react";
import axios from 'axios';

require('dotenv').config();

export default class Login extends Component {
    state = {
    	form: {
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
    	e.preventDefault();

        const url = process.env.REACT_APP_API_URL + '/api/users/login';
    	
        const params = {
            email: this.state.form.email, 
            password: this.state.form.password
        };

    	axios.post(url, params)
    	.then(response => {
    		console.log(response)
    		this.props.history.push('/home');
    	})
    	.catch(error => {
    		alert("You have entered an invalid username or password!");
    		console.log(error);
    	})
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" onChange={this.handleChange} placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Enter password" />
                </div>

                <br></br>

                <div className="form-group">
                	<button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>
        );
    }
}