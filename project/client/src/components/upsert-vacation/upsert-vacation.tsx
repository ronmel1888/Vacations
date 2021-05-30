import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { getVacationsAction, Vacation } from '../../models/Vacation';
import Cards from '../cards/cards';

type Props = {
    vacations: Array<Vacation>
    getVacations: any
    updateVacation: any
    addVacation: any
    match: any
}

export default class Vacations extends Component<Props> {
    componentDidMount() {
        this.props.getVacations()
    }

    public render() {
        const { vacations, match: { params }, updateVacation, addVacation } = this.props;
        if (!vacations) {
            return <div>Loading...</div>
        }

        const vacation = vacations.find(({ vacationId }) => vacationId.toString() === params.vacationId)
        return (

            <div className="upsert-form">
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    const data = {
                        dest: ((event.target) as any)[0].value,
                        description: ((event.target) as any)[1].value,
                        price: ((event.target) as any)[2].value,
                        picture: ((event.target) as any)[3].value,
                        startDate: ((event.target) as any)[4].value,
                        endDate: ((event.target) as any)[5].value,
                    }
                    if (vacation) {
                        updateVacation(params.vacationId, data)
                    } else {
                        addVacation(data)
                    }
                }}>
                    <Form.Group controlId="dest">
                        <Form.Label> Destination</Form.Label>
                        <Form.Control type="text" placeholder="Destination" defaultValue={vacation?.dest} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label> Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" defaultValue={vacation?.description} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label> Price</Form.Label>
                        <Form.Control type="number" placeholder="Price" defaultValue={vacation?.price} />
                    </Form.Group>
                    <Form.Group controlId="picture">
                        <Form.Label>Picture</Form.Label>
                        <Form.Control type="text" placeholder="Picture" defaultValue={vacation?.picture} />
                    </Form.Group>
                    <Form.Group controlId="startDate">
                        <Form.Label> Start date</Form.Label>
                        <Form.Control type="date" placeholder="Start date (dd/mm/yyyy)"  />
                    </Form.Group>
                    <Form.Group controlId="endDate">
                        <Form.Label> End date</Form.Label>
                        <Form.Control type="date" placeholder="End date (dd/mm/yyyy)"  />
                    </Form.Group>
                    <Button variant="primary" type="submit">Save</Button>

                </Form>
            </div>
        );
    }
}