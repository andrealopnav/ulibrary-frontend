import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Alert from 'react-bootstrap/Alert';

require('dotenv').config();

const cookies = new Cookies();

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = { showAlert: false, alertType: '', alertTitle: '', alertText: '' };
    }

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
        const token = cookies.get('user').token;
        
        const url = process.env.REACT_APP_API_URL + '/api/user';

        const params = { 
            first_name: this.state.form.firstName, 
            last_name: this.state.form.lastName, 
            email: this.state.form.email, 
            password: this.state.form.password,
            role: (this.state.form.role === 1) ? 'student' : 'librarian' 
        };
        
        axios.post(url, params, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            this.setState({ show: false, showAlert: true, alertType: 'success', alertTitle: 'Success', alertText: 'Successful user creation!'});
            setTimeout(function() {
              this.setState({showAlert: false});
              this.props.history.push('/home');
            }.bind(this), 4000);
        })
        .catch(error => {
            this.setState({ showAlert: true, alertType: 'danger', alertTitle: 'Error', alertText: "We're sorry, something went wrong while creating new user!"});
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
                    <select className="form-select">
                        <option defaultValue>Select...</option>
                        <option value="1">Student</option>
                        <option value="2">Librarian</option>
                    </select>                    
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