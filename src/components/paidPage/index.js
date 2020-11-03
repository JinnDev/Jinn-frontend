import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import { withAuthorization } from '../session';
import { AuthUserContext } from '../session';
import axios from 'axios';

import * as ROLES from '../constants/roles';

const Wrapper = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      <PaidPageContent user={authUser} />
    }
  </AuthUserContext.Consumer>
);

class Wrapped extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // 1. Fetch user payment information from the backend
    const updateUserPaymentStatus = this.props.firebase.updateUserPaymentStatus
    axios.get('http://127.0.0.1:8080/get-payment-status', { params: { client_reference_id: this.props.user.uid }})
      .then(function (response) {
        // 2. Update firebase real time database
        updateUserPaymentStatus(response.data.uid, response.data.payment_status)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  render(){
    return (
      <div>Paid page</div>
    )
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ISPAID];

const PaidPageContent = withFirebase(Wrapped);

const PaidPage = compose(
  withAuthorization(condition)
)(Wrapper);

export default PaidPage
