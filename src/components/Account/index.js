import React from 'react';

import { AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = ({ authUser }) => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser.authUser ? <AccountAuth /> : <AccountNoAuth />
        }
    </AuthUserContext.Consumer>
)

const AccountAuth = ({ authUser }) => (
    <AuthUserContext.Consumer>
        {authUser =>
            <div>
              <h1>This account belongs to: {authUser.displayName}</h1>
              <h2>The email address associated with this account is: {authUser.email}</h2>
              <PasswordChangeForm />
              <PasswordForgetForm />
            </div>
        }
    </AuthUserContext.Consumer>
)

const AccountNoAuth = () => (
    <div>
        <h1>Please sign in or sign up to access this page.</h1>
            <PasswordForgetForm />
    </div>
);

export default AccountPage;
