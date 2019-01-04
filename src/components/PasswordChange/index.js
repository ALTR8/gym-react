import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    newPassword: '',
    newPasswordConfirmation: '',
    error: null
}

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = e => {
        const { newPassword } = this.state;

        this.props.firebase
            .passwordUpdate(newPassword)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error })
            })
        e.preventDefault()
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { newPassword, newPasswordConfirmation, error } = this.state;

        const isInvalid = newPassword !== newPasswordConfirmation || newPassword === '';

        return(
            <form onSubmit={this.onSubmit}>
                <input
                    name="newPassword"
                    value={newPassword}
                    onChange={this.onChange}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Your New Password"
                />
                <input
                    name="newPasswordConfirmation"
                    value={newPasswordConfirmation}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password Confirmation"
                />
                <button disabled={isInvalid} type="submit">Reset password</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withFirebase(PasswordChangeForm);
