require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', async (req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.create({
            payment_method_types: ['card'],
            attach_to_self: true,
            payment_method_options: {
                acss_debit: {
                    verification_method: 'instant',
                },
                us_bank_account: {
                    verification_method: 'instant',
                },
            },
        });
        console.log(setupIntent);
        res.json(setupIntent);
    } catch (error) {
        console.error('Error creating SetupIntent:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/paymentMethod', async (req, res) => {
    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: '4242424242424242',
                exp_month: 8,
                exp_year: 2026,
                cvc: '314',
            },
        });
        console.log(paymentMethod);
        res.json(paymentMethod);
    } catch (error) {
        console.error('Error creating PaymentMethod:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/connectPaymentMethod', async (req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.create({
            // payment_method_types: ['card'],
            payment_method_types: ['us_bank_account'],
            // payment_method_types: ['us_bank_account'],`
            attach_to_self: true,
            payment_method_options: {
                acss_debit: {
                    verification_method: 'instant',
                },
                us_bank_account: {
                    verification_method: 'instant',
                },
            },
        });

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: '4242424242424242',
                exp_month: 8,
                exp_year: 2026,
                cvc: '314',
            },
        });

        const confirmedSetupIntent = await stripe.setupIntents.confirm(
            setupIntent.id,
            { payment_method: paymentMethod.id }
        );

        console.log('Connected SetupIntent:', confirmedSetupIntent);
        res.json(confirmedSetupIntent);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }

        // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 4000,
    //     currency: 'usd',
    //     customer: customerId,
    //     automatic_payment_methods: {
    //       enabled: true,
    //     },
    //     payment_method_options: {
    //       us_bank_account: {
    //         financial_connections: {
    //           permissions: ['payment_method', 'balances', 'ownership', 'transactions'],
    //         },
    //       },
    //     },
    //   });


    //   const paymentIntentNext = await stripe.paymentIntents.retrieve(
    //     "pi_3PjGQPD3lyOqLu9P17ZyWywA",
    //     {
    //       expand: ['payment_method'],
    //     }
    //   );
    // // res.json(paymentIntent);
    // res.json({
    //     paymentIntent,
    //     paymentIntentNext
    //   });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
