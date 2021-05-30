import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import './admin.css'

import EditableCard from '../../components/cards/editable-card';

type Props = {
    getVacations: () => void
    vacations: any
    onDelete: any
    history: any
    logout: any
}

export default class Admin extends Component<Props> {
    componentDidMount() {
        this.props.getVacations()
    }
    logout = () => {

        localStorage.clear()
        window.location.reload()
    }

    public render() {

        const { vacations, onDelete, history } = this.props;
        if (!vacations) {
            return <div>Loading...</div>
        }
        const data = {
            labels: vacations.map(({ dest }: { dest: string }) => dest),
            datasets: [
                {
                    label: '# Following',
                    backgroundColor: 'rgba(0,0,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: vacations.map(({ followersCount }: { followersCount: number }) => followersCount)
                }
            ]
        };
        return (
            <div>
                <link onClick={this.logout} href="/" />
                <Button className='logout' onClick={this.logout} >Sign Out</Button>
                <Button onClick={() => this.props.history.push('/add')} variant="warning">Add Vacation</Button>
                <div className="vacations">
                    {vacations.map((vacation: any) => <EditableCard
                        onEdit={() => { history.push(`/edit/${vacation.vacationId}`) }}
                        onDelete={() => onDelete(vacation.vacationId)}
                        key={vacation.vacationId}
                        {...vacation}
                    />)}
                    <br />
                    <div style={{ height: '300px' }}>
                        <Bar
                            data={data}
                            height={50}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Vacation Followers',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}