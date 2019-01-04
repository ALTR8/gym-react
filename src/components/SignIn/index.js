import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PassForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>Sign In!</h1>
    <SignInForm />
    <SignUpLink />
    <PassForgetLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormPage extends Component {
    constructor(props) {
         super(props)

         this.state = { ...INITIAL_STATE };

    }


    onSubmit = e => {
    const { email, password } = this.state;
    this.props.firebase
        .signInWithEmailAndPassword(email, password)
        .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({ error })
            })
        e.preventDefault();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        const isInvalid = password === '' || email === '';

        return(
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    autoComplete="username"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                />
                 <button disabled={isInvalid} type="submit">Sign In</button>
                 {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignInForm = withRouter(withFirebase(SignInFormPage));

const SignInLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.SIGN_UP}>Sign In</Link>
  </p>
);

export default SignInPage;

export { SignInForm, SignInLink }
