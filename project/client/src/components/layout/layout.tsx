import React, { Component } from "react";
import { Provider } from 'react-redux';
import Login from '../../containers/login/login';
import "./layout.css"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Cards from "../cards/cards";
import Vacations from "../../containers/vacations/vacations";
import Register from "../../containers/register/register";
import { PrivateRoute } from "../route-components";
import Home from "../../containers/home/home";
import Admin from "../../containers/admin/admin";
import { store } from "../../redux/store";
import { io } from "socket.io-client";
import upsertVacation from "../../containers/upsert-vacation/upsert-vacation";
import Navbar from 'react-bootstrap/Navbar'


export default class Layout extends Component {
    public componentDidMount() {
        const socket = io('http://localhost:3001/', {
            query: 'userId=1'
        });
        socket.on('vacationUpdated', () => {
            console.log('vacation has beeen updated!!!!!');
        })

        try {

        }
        catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    public render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className='layout'>
                        <main>
                            <Switch>
                                <Route path="/login" className= "loginPath" component={Login} exact />
                                <Route path="/register" component={Register} exact />
                                <PrivateRoute path="/admin" Component={Admin} exact />
                                <PrivateRoute path="/add" Component={upsertVacation} exact />
                                <PrivateRoute path="/edit/:vacationId" Component={upsertVacation} exact />
                                <PrivateRoute path="/vacations" Component={Vacations} exact />
                                <PrivateRoute path="/" Component={Home} exact />
                            </Switch>
                        </main>
                   

                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}