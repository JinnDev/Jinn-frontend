import React from 'react';
import { Button } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { compose } from 'recompose';

const stripePromise = loadStripe("pk_test_51HeN8eH4w9X1EWMYxnaSgG8okdMBncFEWpvX1XCceLGv1CyyiSEXZdzMx57xUqNAfJqBeeR0jLBInF4RsOqu5KDv00eiNcQ9hQ");

class GetPremium extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  handleClick = async (event) => {

    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const request = {
      method: 'POST',
      body: JSON.stringify({client_reference_id : this.props.user.uid})
    }

    const response = await fetch('http://127.0.0.1:8080/create-checkout-session', request);

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  render(){
    return(
      <Button role="link" onClick={this.handleClick}>
        Get Premium
      </Button>
    )
  }
}

export default GetPremium;
