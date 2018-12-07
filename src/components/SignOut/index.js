import React, { PureComponent } from 'react';

//HOC components
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes'


class SignOutButton extends PureComponent {

    onSubmit = e => {
        this.props.firebase
            .signOutUser()
            this.props.history.push(ROUTES.LANDING)
        e.preventDefault()
    }

    render() {
        return(
             <button type="button" onClick={this.onSubmit}>Sign Out</button>
        )
    }
}


export default withRouter(withFirebase(SignOutButton))
