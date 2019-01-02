import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { SignInLink } from '../SignIn';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes'

const SignUpPage = () => (
  <div>
    <h1>Sign Up!</h1>
    <SignUpForm />
    <SignInLink />
  </div>
);

const INITIAL_STATE = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: null
};

//only component on this page because must handle state

class SignUpFormComp extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = e => {
        const { email, password } = this.state;
        this.props.firebase
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error =>  {
                this.setState({ error })
            });

        e.preventDefault();
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const {
          firstName,
          lastName,
          email,
          password,
          passwordConfirmation,
          error
        } = this.state;

        const isInvalid =
            password !== passwordConfirmation ||
            password === '' ||
            email === '' ||
            firstName === '' ||
            lastName === '';

        return(
            <form onSubmit={this.onSubmit}>
                <input
                    name="firstName"
                    value={firstName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="First Name"
                />
                <input
                    name="lastName"
                    value={lastName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Last Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />

                 <button disabled={isInvalid} type="submit">Sign Up</button>
                 {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormComp));

export default SignUpPage;

export { SignUpForm, SignUpLink }
