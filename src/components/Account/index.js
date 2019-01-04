import React, {Component} from 'react';

import { AuthUserContext, withAuth } from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

class AccountPage extends Component {

    render() {
        console.log();
        return(
            <AuthUserContext.Consumer>
                {authUser =>
                  <div>
                    <h1>Account: {authUser.email}</h1>
                    <PasswordForgetForm />
                    <PasswordChangeForm />
                  </div>
                }
            </AuthUserContext.Consumer>
        )
    }
}

export default AccountPage;
