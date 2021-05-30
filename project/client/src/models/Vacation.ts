import axios from "axios";
import { ActionType } from "../redux/actionType";

export class Vacation {
    public constructor(
        public vacationId: number,
        public dest: string,
        public picture: string,
        public description: string,
        public price: number,
        public startDate: Date,
        public endDate: Date,
        public isFollowing: boolean,
    ) { }
}



function setVacations(vacations: any) {
    return {
        type: ActionType.setVacations,
        vacations
    }
}

async function getVacationsFromServer() {
    const token = localStorage.getItem('token')

    return await axios.get('http://localhost:3001/vacations', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

async function writeFollowingStateToServer(vacationId: number, isFollowing: boolean) {
    return await axios.put(`http://localhost:3001/vacations/follow/${vacationId}`, { isFollowing })
}

async function sendDeleteToServer(vacationId: number) {
    return await axios.delete(`http://localhost:3001/vacations/${vacationId}`)
}

async function addVacationToServer(data: any) {
    return await axios.post(`http://localhost:3001/vacations`, data)
}

async function updateVacationToServer(vacationId: number, ...data: any[]) {
    return await axios.put(`http://localhost:3001/vacations/${vacationId}`, data)
}

export function getVacationsAction() {
    return function (dispatch: any) {
        return getVacationsFromServer().then(
            (vacations) => {
                dispatch(setVacations(vacations.data))
            },
            //(error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
        );
    };
}

export function followVacationAction(vacationId: number, isFollowing: boolean) {
    return async function (dispatch: any) {
        await writeFollowingStateToServer(vacationId, isFollowing);
        dispatch(getVacationsAction());
    };
}

export function deleteVacationAction(vacationId: number) {
    return async function (dispatch: any) {
        await sendDeleteToServer(vacationId);
        dispatch(getVacationsAction());
    };
}

export function addVacationAction(data: any) {
    return async function (dispatch: any) {
        await addVacationToServer(data);
        dispatch(getVacationsAction());
    };
}

export function editVacationAction(vacationId: number, data: any) {
    return async function (dispatch: any) {
        await updateVacationToServer(vacationId, data);
        dispatch(getVacationsAction());
    };
}