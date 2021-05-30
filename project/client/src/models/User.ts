import axios from "axios";
import { ActionType } from "../redux/actionType";

export class User{
    public constructor(
        public username: string,
        public password: string,
        public firstName?: string,
        public lastName?:string,
        // public userName: string,
        // public password: string,
        
    ){}

}

function setUser(user: any) {
    return {
        type: ActionType.setUser,
        user
    }
}

async function getMe() {
    return await axios.post('/me', { token: JSON.parse(localStorage.getItem('user')).token })
}

async function postLogin(username: string, password: string) {
    return await axios.post('/login', { username, password })
}

export function loginAction(username: string, password: string) {
    return function(dispatch: any) {
      return postLogin(username, password).then(
        (user) => dispatch(setUser(user)),
        //(error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
      );
    };
}
  
function me() {
    return function(dispatch: any) {
      return getMe().then(
        (user) => dispatch(setUser(user)),
        //(error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
      );
    };
  }