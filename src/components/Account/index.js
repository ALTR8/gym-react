import React, {Component} from 'react';

import { AuthUserContext, withAuth } from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
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

export default AccountPage;
