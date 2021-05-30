import { connect } from 'react-redux';

import { deleteVacationAction, getVacationsAction, Vacation } from '../../models/Vacation';
import Admin from '../../components/admin/admin';
import { AppState } from '../../redux/appState';

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
        onDelete: (vacationId: number) => {
            dispatch(deleteVacationAction(vacationId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)