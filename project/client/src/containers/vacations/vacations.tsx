import { connect } from 'react-redux';

import { getVacationsAction, followVacationAction } from '../../models/Vacation';
import Vacations from '../../components/vacations/vacations';
import { AppState } from '../../redux/appState';
// import 

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
        follow: (vacationId: number, isFollowing: boolean) => {
            dispatch(followVacationAction(vacationId, isFollowing))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vacations)