import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext, withAuthorization } from '../session';
import { withFirebase } from '../firebase';
import { PasswordForgetForm } from '../passwordForget';
import PasswordChangeForm from '../passwordChange';
import { Button, message, Row, Card, Typography } from 'antd';
import axios from 'axios';

import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

const { Text } = Typography;

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div style={{ background: '#fff', padding: 28, minHeight: '70vh'}}>
        <Row justify="center" type="flex">
          <h2>Account Management</h2>
        </Row>
        <br/>
        <Row justify="center" type="flex">
          <Text><b>Username: </b> {authUser.username}</Text>
        </Row>
        <br/>
        <Row justify="center" type="flex">
          <Text><b>Email: </b> {authUser.email}</Text>
        </Row>
        <br/>
        <Row justify="center" type="flex">
          <Link to={ROUTES.PASSWORD_CHANGE}>Change Password</Link>
        </Row>
        <br/>
        {!!(authUser.roles[ROLES.ISPAID] == "paid") && (
          <Row justify="center" type="flex" >
            <SubscriptionDelete user={authUser} />
          </Row>
        )}

      </div>
    )}
  </AuthUserContext.Consumer>
);

class Wrapped extends React.Component {
  constructor(props){
    super(props);
    this.state = {disableButton: false}
  }

  // Need the client_reference_id
  onSubmit = () => {
    const f = this.fetchAndUpdateUserPaymentStatus
    axios.post('http://127.0.0.1:8080/cancel-subscription', { client_reference_id: this.props.user.uid })
      .then( response => {
        this.setState({ disableButton: true });
        message.success("Successfully deleted premium subscription");
      })
      .catch(function (error) {
        console.log(error)
        message.error("Failed to cancel subscription, please reach out to customer support");
      });
  }

  render(){
    const { disableButton } = this.state;
    return (
      <Button danger disabled={disableButton} onClick={this.onSubmit}>Cancel Subscription</Button>
    )
  }

}


const condition = authUser => !!authUser;

const SubscriptionDelete = withFirebase(Wrapped)
export default withAuthorization(condition)(AccountPage);
