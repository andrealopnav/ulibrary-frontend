import React, { Component } from "react";
import axios from 'axios';

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

    login() {
    	console.log('entra al login');
    	/*const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.state.form.email, password: this.state.form.password })
    };
    fetch('http://localhost:3001/api/users/login', requestOptions)
        .then(response => console.log(response.json()))
        .then(data => console.log(data));*/
    	/*e.preventDefault();
    	axios.post('http://localhost:3001/api/users/login', {
  				email: this.state.form.email,
  				password: this.state.form.password
		})
		.then((response) => {
		  console.log('exito :D');
		  console.log(response);
		}, (error) => {
		  console.log(error);
		});*/
    }

    submitHandler = e => {
    	e.preventDefault()
    	
    	axios.post('http://localhost:3001/api/users/login', { email: this.state.form.email, password: this.state.form.password })
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

                <div className="form-group">
                	<button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>
        );
    }
}