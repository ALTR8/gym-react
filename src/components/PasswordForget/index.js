import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PassForgetPage = () => (
    <div>
        <h1>Change your password!</h1>
        <PassForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PassForgetFormPage extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = e => {
        const {email} = this.state

        this.props.firebase
            .passwordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push(ROUTES.RESET_EMAIL_SENT)
            })
            .catch(error => {
                this.setState({ error });
            })
        e.preventDefault()
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    };

    render() {

        const { email, error } = this.state;
        const isInvalid = email === '';

        return(
            <form onSubmit= {this.onSubmit}>
                <input
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    autoComplete="username"
                    placeholder="Email Address"
                />
                <button disabled={isInvalid} type="submit">
                    Reset Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const PassForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forget your password?</Link>
    </p>
);

export default PassForgetPage;

const PassForgetForm = withRouter(withFirebase(PassForgetFormPage));

export { PassForgetForm, PassForgetLink }
