import { User } from "../models/User";
import { Vacation } from "../models/Vacation";
import { Register } from "../models/Register";
export class AppState {
    public vacations: Vacation[] = [];
    public users: User[] = [];
    public user: User = null;
    public register: Register = {
        isRegisterSuccess: false,
        registerError: null
    }
}