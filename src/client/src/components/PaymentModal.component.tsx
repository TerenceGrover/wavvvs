import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import type { Stripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm.component';

export default function Payment(props : {money : Number}) {
  const [stripePromise, setStripePromise] = React.useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = React.useState('');

  React.useEffect(() => {
    fetch('http://localhost:3001/checkout',
    {method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }}
    )
    .then( async (res : any) => {
      const { publishableKey } = await res.json();
      if (res !== null){
        console.log(publishableKey)
      setStripePromise(await loadStripe(publishableKey));
      }
    });
  }, []);

  React.useEffect(() => {
    fetch('http://localhost:3001/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({amount: props.money}),
    })
    .then(async (res : any) => {
      const { client_secret } = await res.json();
      setClientSecret(client_secret);
    });
  })

  return (
    <div>
      {
        stripePromise && clientSecret && (
      <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>)
      }
    </div>
  );

}