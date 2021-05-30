import React, { Component } from 'react'
import "./vacations.css"
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';

import { getVacationsAction, Vacation } from '../../models/Vacation';
import Cards from '../cards/cards';
import Button from 'react-bootstrap/Button';

type Props = {
    vacations: Array<Vacation>
    getVacations: any
    follow: any
    Logout: any
}


export default class Vacations extends Component<Props,any> {
    logout = () => {
        
        localStorage.clear()
        window.location.reload()
      }

    componentDidMount() {
        this.props.getVacations()
    }

    // public logout() { 
    //     localStorage.clear()
     

    // }
 
    public render() {
        const { vacations } = this.props;
        if (!vacations) {
            return <div>Loading...</div>
        }

        return (
            <div className="vacationsPage">
                <div className= "logoutButton">
                <link onClick={this.logout} href="/" />
                <Button type="button"  variant="primary" onClick={this.logout}>Sign Out</Button>
                    {/* <button  onClick={this.logout} >Sign Out</button> */}
                    </div>
                 <div className="vacations">     
                {vacations.sort((v1, v2) => v1.isFollowing ? -1 : 1).map((vacation) => <Cards
                    key={vacation.vacationId}
                    follow={() => this.props.follow(vacation.vacationId, !vacation.isFollowing)}
                    {...vacation} />)}  </div>
            </div>
        );
    }
}