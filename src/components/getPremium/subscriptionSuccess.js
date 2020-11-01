import React from 'react';
import { AuthUserContext } from '../session';
import axios from 'axios';
import { withFirebase } from '../firebase';

const SubscriptionSuccess = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      <SuccessPage user={authUser} />
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
      <div>
        <h1>Thanks for your order!</h1>
        <p>
          We appreciate your business!
          If you have any questions, please email
          <a href="mailto:orders@example.com"> orders@example.com</a>.
        </p>
      </div>
    )
  }
}

const SuccessPage = withFirebase(Wrapped);

export default SubscriptionSuccess;
