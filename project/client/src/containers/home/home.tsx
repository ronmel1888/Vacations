import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Home extends Component {
    public render() {
        const user = localStorage.getItem('userInfo')

        const userType = user ? JSON.parse(user).userType : null
         return userType === 'USER' ? <Redirect to="/vacations" /> : <Redirect to="/admin" />
    }
}