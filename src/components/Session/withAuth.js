import React from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import AccountPage from '../Account';

const withAuth = Component => {
    class WithAuth extends Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null,
                email: '',
                displayName: '',

            };
        }

        componentDidMount() {

            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser ? this.setState({
                    authUser: this.props.firebase.auth.currentUser,
                    email: this.props.firebase.auth.currentUser.email,
                }) : this.setState({ authUser: null });
            });
        }

        componentWillUnmount() {
            this.listener()
        }

        render() {
            console.log(this.state);
            return (
                <AuthUserContext.Provider value={this.state}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            )
        }
    }
    return withFirebase(WithAuth);
}

export default withAuth;
