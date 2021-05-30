import React, { Component, ChangeEvent } from 'react'
// import axios from "axios";
import "./login.css";
import { User } from '../../models/User';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import Register from '../register/register';
import { Link } from 'react-router-dom';
import { debounce } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

interface LoginState {
    userName: string,
    password: string
}

export default class Login extends Component<any, LoginState>{
    public render() {
        const { setUserName, setPassword, username, password, login } = this.props;

        return (
            <div className="loginPath">
            <Form>

                <div className="loginForm">
                    <Form.Label className="formHeader">Vacations</Form.Label>
                    <br/>
                    <Form.Label className="formHeader">Tracker</Form.Label>
                
                <Form.Group controlId="formBasicLogin">
                   
                    <Form.Control type="text" placeholder="Enter User Name" value={username} onChange={setUserName} />
                    {/* <Form.Label> </Form.Label> */}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label></Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={setPassword} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    {/* <Form.Check type="checkbox" label="Check me out" /> */}
                </Form.Group>
                <Button type="button" variant="warning" onClick={login}>Login</Button>
                <Link to={'register'} className="registerLink"> Not Register yet?</Link>               
                </div>
                </Form>
                </div>
            
        );
    }
}