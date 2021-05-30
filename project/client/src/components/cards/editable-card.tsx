import React, { Component } from 'react'
import { Vacation } from '../../models/Vacation';
// import Vacations from '../vacations/vacations';
import './cards.css'
import Button from 'react-bootstrap/Button';

interface CardsProps {
    vacationId: number,
    dest: string,
    picture: string,
    description: string,
    price: number,
    startDate: Date,
    endDate: Date,
    follow: any,
    isFollowing: boolean,
    onEdit: any,
    onDelete: any
}

export default class EditableCard extends Component<CardsProps>{

    constructor(props: CardsProps) {
        super(props);

    }

    public render() {
        const { dest, description, picture, price, startDate, endDate, onEdit, onDelete } = this.props;
        return (

            <div className="cards">
                <div className="card-title">{dest}</div>
                <p>{description}</p>
                <img width="250px" src={`http://localhost:3001/images/${picture}`} alt="image" />
                <h6>{price}$</h6>
                <h6>{startDate ? new Date(startDate).toLocaleDateString() : '?'} - {endDate ? new Date(endDate).toLocaleDateString() : '?'} </h6>
                <Button className='editButton' onClick={onEdit} variant="warning ">Edit</Button>
                <Button className='editButton' variant="danger" onClick={()=>{
                    if (window.confirm(`Do you really want to delete ${dest}?`)) {
                        onDelete()
                    }
                }  }>Delete</Button>

            </div>
        );
    }
}