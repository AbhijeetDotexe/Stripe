const processPayment = async function () {
  let response = await fetch("http://localhost:3001/");
  console.log("response", response);
  if (!response.ok) {
    console.log("Failed to get secret key");
    return;
  }
  response = await response.json();
  console.log("response", response);
  const stripe = Stripe(
    "testing"
  );
  const appearance = {
    /* appearance */
  };
  const options = {
    /* options */
  };
  const elements = stripe.elements({
    clientSecret: response.clientSecret,
    appearance,
  });
  const paymentElement = elements.create("payment", options);
  paymentElement.mount("#payment-element");
};