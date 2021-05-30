import { AppState } from "./appState";
import { AnyAction } from "redux";
import { ActionType } from "./actionType";
export function reducer(oldAppState: AppState | undefined, action: AnyAction): AppState {
    if (!oldAppState) {
        return new AppState();
    }
    const newAppState = { ...oldAppState };
    switch (action.type) {
        case ActionType.getAllUsersNames:
            newAppState.users = action.payload;
            break;
        case ActionType.getOneUser:
            newAppState.user = action.payload;
            break;
        case ActionType.setVacations:
            newAppState.vacations = action.vacations;
            break;
        case ActionType.setUser:
            newAppState.user = action.payload;
            break;
        case ActionType.setRegisterSuccess:
            newAppState.register.isRegisterSuccess = true;
            newAppState.register.registerError = null;
            break;
        case ActionType.setRegisterError:
            newAppState.register.isRegisterSuccess = false;
            newAppState.register.registerError = action.error;
            break;

    }
    return newAppState;
}