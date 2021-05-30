import { connect } from 'react-redux';

import { registerAction } from '../../models/Register';
import Register from '../../components/register/register';
import { AppState } from '../../redux/appState';

const mapStateToProps = (state: AppState /*, ownProps*/) => {
    return {
        isSuccess: state.register.isRegisterSuccess,
        error: state.register.registerError
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        register: async (data: any) => {
            await dispatch(await registerAction(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)