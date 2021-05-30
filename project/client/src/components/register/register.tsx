import React, { Component, ChangeEvent } from 'react';

import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { User } from "../../models/User"




interface RegisterState {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    isRegisterInProgress: boolean,
    isRegistrationFailed: boolean
}

export default class Register extends Component<any, RegisterState>{
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            isRegisterInProgress: false,
            isRegistrationFailed: false
        }
    }       

    private setFirstName = (args: ChangeEvent<HTMLInputElement>) => {
        const firstName = args.target.value;
        this.setState({ firstName });
    }
    private setLastName = (args: ChangeEvent<HTMLInputElement>) => {
        const lastName = args.target.value;
        this.setState({ lastName });
    }

    private setUserName = (args: ChangeEvent<HTMLInputElement>) => {
        const userName = args.target.value;
        this.setState({ userName });
    }

    private setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password });
    }

    public async onRegisterClicked() {
        const { register } = this.props;
        const { firstName, lastName, userName, password } = this.state;
        this.setState({ isRegisterInProgress: true });
        try {
            await register({ firstName, lastName, userName, password });
            await this.props.history.push('/');
        } catch (err) {
            alert(err.response.data.error);
        }
        this.setState({ isRegisterInProgress: false });
     
    }

    render() {
        const { isSuccess, error } = this.props;
        const { isRegisterInProgress } = this.state;
        return (
            <div>
                {
                    error && (
                        <div style={{ backgroundColor: 'red', color: 'white' }}>Registration Failed: {error || ''}</div>
                    )
                }
                {
                    isSuccess && (
                        <div>Success!</div>
                    )
                }

                <Form>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" onChange={this.setFirstName} />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" onChange={this.setLastName} />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="User Name" onChange={this.setUserName} />
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.setPassword} />
                    </Form.Group>
                    <Button disabled={isRegisterInProgress} onClick={this.onRegisterClicked.bind(this)}>
                        {isRegisterInProgress ? 'Registaring...' : 'Register'}
                    </Button>
                    <Link to={'login'}> Already have a user?</Link>
                   
                </Form>

      
            </div>
        )
    }
}