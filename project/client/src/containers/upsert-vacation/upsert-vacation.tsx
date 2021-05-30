import { connect } from 'react-redux';

import { getVacationsAction, followVacationAction, Vacation, addVacationAction, editVacationAction } from '../../models/Vacation';
import Vacations from '../../components/vacations/vacations';
import { AppState } from '../../redux/appState';
import upsertVacation from '../../components/upsert-vacation/upsert-vacation';

const mapStateToProps = (state: AppState /*, ownProps*/) => {
    return {
        vacations: state.vacations,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getVacations: () => {
            dispatch(getVacationsAction())
        },
        addVacation: (data: any) => {
            dispatch(addVacationAction(data))
        },
        updateVacation: (vacationId: number, data: any) => {
            dispatch(editVacationAction(vacationId, data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(upsertVacation)