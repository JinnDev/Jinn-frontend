import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext, withAuthorization } from '../session';
import { PasswordForgetForm } from '../passwordForget';
import PasswordChangeForm from '../passwordChange';
import { Button, message } from 'antd';
import axios from 'axios';

import * as ROUTES from '../constants/routes';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <p>
          <Link to={ROUTES.PASSWORD_CHANGE}>Change Password</Link>
        </p>
        <p>
          <Wrapped user={authUser} />
        </p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

class Wrapped extends React.Component {
  constructor(props){
    super(props);
  }

  // Need the client_reference_id
  onSubmit = () => {
    axios.post('http://127.0.0.1:8080/cancel-subscription', { client_reference_id: this.props.user.uid })
      .then(function (response) {
        message.success("Successfully deleted premium subscription");

      })
      .catch(function (error) {
        message.error("Failed to cancel subscription, please reach out to customer support");
      });
  }

  render(){
    return (
      <Button onClick={this.onSubmit}> Delete Subscription</Button>
    )
  }

}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
