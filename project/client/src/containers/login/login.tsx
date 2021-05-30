import React, { Component, ChangeEvent } from 'react'

import LoginView from '../../components/login/login'

import { User, loginAction } from '../../models/User';
import { SuccessfulLoginServerResponse } from '../../models/SuccessfulLoginServerResponse';
import axios from 'axios';

interface LoginState {
    userName: string,
    password: string,
    userType?: any
}

export default class Login extends Component<any, LoginState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
    }

    public setUserName = (args: ChangeEvent<HTMLInputElement>) => {

        const userName = args.target.value;
        this.setState({ userName });
    }

    public setPassword = (args: ChangeEvent<HTMLInputElement>) => {
        const password = args.target.value;
        this.setState({ password });
    }

    public login = async () => {

        if (this.state.userName === "") {
            alert("please insert user name");
        }

        if (this.state.userName !== "" && this.state.password !== "") {
            let user_type;

            try {
                const res = await axios.post('http://localhost:3001/users/login', { userName: this.state.userName, password: this.state.password, userType: this.state.userType })
                let typeUser = res.data.user.userType;
                if (typeUser == null) {
                    typeUser = "USER"
                }
            


                const user = { token: res.data.token, userType: typeUser, username: this.state.userName };
                user_type = typeUser
                console.log( user_type);
                
                localStorage.setItem('userInfo', JSON.stringify(user))
                localStorage.setItem('token', res.data.token)
                await console.log("Entered login");


            }
            catch (err) {
                alert(err.response.data.error);
            }
            if (user_type ==="ADMIN") {
                await this.props.history.push('/admin');
            }
            else {
                await this.props.history.push('/vacations');
            }
        }
    }


    public render() {
        return (
            <LoginView
                username={this.state.userName}
                password={this.state.password}
                setUserName={this.setUserName}
                setPassword={this.setPassword}
                login={this.login}
            />
        );
    }
}