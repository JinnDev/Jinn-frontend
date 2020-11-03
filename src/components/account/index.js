import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext, withAuthorization } from '../session';
import { PasswordForgetForm } from '../passwordForget';
import PasswordChangeForm from '../passwordChange';
import * as ROUTES from '../constants/routes';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <p>
          <Link to={ROUTES.PASSWORD_CHANGE}>Change Password</Link>
        </p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
