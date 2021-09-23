import React from 'react';
import { useFlutterwave, FlutterWaveButton } from 'react-flutterwave'


export default function App() {
    const config = {
      public_key: 'YOUR_FW_PUBLIC_KEY',
      tx_ref: Date.now(),
      amount: `${totlPrice}`,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: 'user@gmail.com',
        phonenumber: '08102909304',
        name: 'yemi desola',
      },
      customizations: {
        title: 'My store',
        description: 'Payment for items in cart',
        logo: 'https://assets.piedpiper.com/logo.png',
      },
    };
   
    
   
    const fwConfig = {
      ...config,
      text: 'Pay with Flutterwave!',
      callback: (response) => {
        console.log(response);
      },
      onClose: () => {},
    };
 
}

const MomoPayment = () => {
    const flutterwave = useFlutterwave();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
 
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
            },
            onClose: () => {},
          });
        }}
      >
        Testing FW Payment
      </button>
 
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}

export default MomoPayment
