import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isLoggedin = () => {
    return !!localStorage.getItem('userInfo')
}


export const PrivateRoute = ({Component, ...rest}: any) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};


