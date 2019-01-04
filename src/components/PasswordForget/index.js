import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div>
        <h1>Change your password!</h1>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormPage extends Component {
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
            <div>
            <h5>Forgot your password?</h5>
                <form onSubmit= {this.onSubmit}>
                    <label>
                    Input your email address here -
                    <br />
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        autoComplete="username"
                        placeholder="Email Address"
                    />
                    </label>
                    <button disabled={isInvalid} type="submit">
                        Reset Password
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

const PassForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forget your password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormPage));

export { PasswordForgetForm, PassForgetLink }
