const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      name: "Abhijeet Rana",
      email: "abhijeet@gmail.com",
    });

    const customerId = customer.id;
    console.log("customer_ID: ", customer);

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['us_bank_account'],
      payment_method_options: {
        us_bank_account: {
          financial_connections: {
            permissions: ['payment_method', 'balances'],
          },
        },
      },
    });

    res.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("Error creating customer: ", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.renderTestPage = (req, res) => {
  res.render('index');
};
