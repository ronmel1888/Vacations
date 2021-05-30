import axios from "axios";
import { ActionType } from "../redux/actionType";


export class Register{
    public constructor(
        public isRegisterSuccess: boolean,
        public registerError: string,
    ){}

}

function setRegisterSuccess() {
    return {
        type: ActionType.setRegisterSuccess
    }
}

function setRegisterError(error: any) {
    return {
        type: ActionType.setRegisterError,
        error
    }
}

async function registerExternal(data: any) {
    return await axios.post('http://localhost:3001/users/register', data)
}

export async function registerAction(data: any) {
    return async function (dispatch: any) {
        await registerExternal(data).then(
            (res) => {
                dispatch(setRegisterSuccess())
            },
            (error) => dispatch(setRegisterError(error.response.data.error)),
        );
    };
}