import React from 'react';
import createMollieClient from '@mollie/api-client';
const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

const Parrainage = async () => {
    const payment = await mollieClient.payments.create({
        amount: {
            value:    '10.00',
            currency: 'EUR'
        },
        description: 'My first API payment',
        redirectUrl: 'https://yourwebshop.example.org/order/123456',
        webhookUrl:  'https://yourwebshop.example.org/webhook'
    });

    return (
        <div>
            <button onClick={this.payment}>Parrainage</button>
        </div>
    );
};

export default Parrainage;