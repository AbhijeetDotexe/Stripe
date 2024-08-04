const stripe = Stripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');
// Use the form that already exists on the web page.
const paymentMethodForm = document.getElementById('payment-method-form');
const confirmationForm = document.getElementById('confirmation-form');

paymentMethodForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const accountHolderNameField = document.getElementById('account-holder-name-field');
  const emailField = document.getElementById('email-field');

  // Calling this method will open the instant verification dialog.
  stripe.collectBankAccountForSetup({
    clientSecret: clientSecret,
    params: {
      payment_method_type: 'us_bank_account',
      payment_method_data: {
        billing_details: {
          name: accountHolderNameField.value,
          email: emailField.value,
        },
      },
    },
    expand: ['payment_method'],
  })
  .then(({setupIntent, error}) => {
    if (error) {
      console.error(error.message);
      // PaymentMethod collection failed for some reason.
    } else if (setupIntent.status === 'requires_payment_method') {
      // Customer canceled the hosted verification modal. Present them with other
      // payment method type options.
    } else if (setupIntent.status === 'requires_confirmation') {
      // We collected an account - possibly instantly verified, but possibly
      // manually-entered. Display payment method details and mandate text
      // to the customer and confirm the intent once they accept
      // the mandate.
      confirmationForm.show();
    }
  });
});