import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Alert from 'react-bootstrap/Alert';

require('dotenv').config();

const cookies = new Cookies();

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = { showAlert: false, alertType: '', alertTitle: '', alertText: '' };
    }

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
            if (response.data.code === 200) {
                cookies.set('user', response.data.result);
                this.props.history.push('/home');
            } else {
                this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: 'An error has occurred. Try again!'});
                setTimeout(function() {
                    this.setState({showAlert: false});
                }.bind(this), 5000)
            }
    	})
    	.catch(error => {
            this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: 'You have entered an invalid username or password!'});
    		console.log(error);
            setTimeout(function() {
                this.setState({showAlert: false});
            }.bind(this), 5000)
    	})
    }

    render() {
        const { showAlert, alertType, alertTitle, alertText } = this.state;

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

                <br></br>

                {alertType === 'danger' ? ( 
                    <Alert show={showAlert} variant="danger">
                        <Alert.Heading>{alertTitle}</Alert.Heading>
                        <p>{alertText}</p>
                    </Alert>
                ) : ''}
            </form>
        );
    }
}