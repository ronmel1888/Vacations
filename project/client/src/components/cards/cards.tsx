import React, { Component } from 'react'
import { Vacation } from '../../models/Vacation';
import Button from 'react-bootstrap/Button';
import './cards.css'

//success
interface CardsProps {
    vacationId: number,
    dest: string,
    picture: string,
    description: string,
    price: number,
    startDate: Date,
    endDate: Date,
    follow: any,
    isFollowing: boolean
}

export default class Cards extends Component<CardsProps>{

    constructor(props: CardsProps) {
        super(props);

    }

    public render() {
        const { dest, description, picture, price, startDate, endDate, isFollowing, follow } = this.props;
        return (

            <div className="cards">
                 <img  src={`http://localhost:3001/images/${picture}`} alt="image" />
                <div className="card-title">{dest}</div>
                <p>{description}</p>
                <h6 className="price-card">{price}$</h6>
                <div className="under-line"></div>
                <h6 className= "date-card">{startDate ? new Date(startDate).toLocaleDateString() : '?'} - {endDate ? new Date(endDate).toLocaleDateString() : '?'} </h6>
                <Button onClick={follow} variant="info">{isFollowing ? 'Unfollow' : 'Follow'}</Button>
            </div>
        );
    }
}