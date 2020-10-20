import React from 'react';
import { Button } from 'antd';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_51HeN8eH4w9X1EWMYxnaSgG8okdMBncFEWpvX1XCceLGv1CyyiSEXZdzMx57xUqNAfJqBeeR0jLBInF4RsOqu5KDv00eiNcQ9hQ");


const handleClick = async (event) => {
  // Get Stripe.js instance
  const stripe = await stripePromise;

  // Call your backend to create the Checkout Session
  const response = await fetch('http://127.0.0.1:8080/create-checkout-session', { method: 'POST' });

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

const GetPremium = () => (
  <Button role="link" onClick={handleClick}>
    Get Premium
  </Button>
);

export default GetPremium;

// What do I need to do next
// When a subscription is successfully created put it into a database
// need to decide whether this should be the firestore or another database because I guess the backend gets told whether this is succesfull or not through some webhook
// Maybe I can access the same firestore through the backend which I am using from the frontend

// Need to combine this information in the frontend somehow --> It would be good if both were from the firestore

// Need be able to cancel a subscription

// I guess some more stuff that is required here
