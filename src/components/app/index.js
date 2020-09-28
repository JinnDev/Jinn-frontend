import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import Navigation from '../navigation';
import LandingPage from '../landing';
import SignUpPage from '../signUp';
import SignInPage from '../signIn';
import PasswordForgetPage from '../passwordForget';
import HomePage from '../home';
import AccountPage from '../account';
import AdminPage from '../admin';

import { withFirebase } from '../firebase';

import * as ROUTES from '../constants/routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
        },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
        <Navigation authUser={this.state.authUser} />
        <hr/>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
