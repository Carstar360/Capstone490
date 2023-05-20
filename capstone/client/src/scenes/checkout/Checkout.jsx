//https://redux-toolkit.js.org/tutorials/quick-start
import { useSelector } from "react-redux";
//https://mui.com/material-ui/react-box/
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
//https://formik.org/docs/overview#installation
import { Formik } from "formik"; //Form library that simplifies validation for checkout
import { useState } from "react";
//https://github.com/jquense/yup
import * as yup from "yup"; //Validation library for validating the checkout form
import { shades } from "../../theme";
import Shipping from "./Shipping";
import Payment from "./Payment";
//https://www.npmjs.com/package/@stripe/stripe-js
import { loadStripe } from "@stripe/stripe-js";

//Public key from stripe account
const stripePromise = loadStripe(
  "pk_test_51N5LTzKXo8AEfsujrSg6uNBVHIkoC7njD1XHbfDBtBq8ZHdOz3sDXYnGuoOE2e05EAmjFqKot4fLhtvfjkzcT8q6001MHyQvNc"
);

const initialValues = {
    //Initialize billingAddress values to empty
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  //Initialize shippingAddress values to empty as well
  //isSameAddress initialized to true as well, auto checked
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  //Email and phone number in next step initialized to empty as well
  email: "",
  phoneNumber: "",
};

//Array that holds 2 object.shapes
//First being the address of the customer
//Second being the email and phone number
const checkoutSchema = [
  //Yup grabs the initial values shape obove
  yup.object().shape({
    //Updates the above billing address object.shape so that each field is required to
    //Have a string inside the field
    billingAddress: yup.object().shape({
      //Yup validates you have to input a string and if a string isn't
      //entered then you will recieve the msg "required"
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      //Second street isn't required so no required
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      //Checks to see if the billing adress is same as
      //Shipping
      //If true then not required and opposite if false
      isSameAddress: yup.boolean(),
      //If yup.string is isSameAddress true = not required
      //If false = required
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      //If yup.string is isSameAddress true = not required
      //If false = required
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  //Second step in validation which
  //Requires email and phone number everytime
  //Allows Formik and yup to work together for validation
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0); //Initialize the step to 0
  const cart = useSelector((state) => state.cart.cart);
  //The first step is the billing address validation
  //It's intialized to when active step is 0
  const isFirstStep = activeStep === 0;
  //The second step is the email and phone number validation
  //It's intialized to when active step is 1
  const isSecondStep = activeStep === 1;

  //When you submit the form for billing address the
  //Active step is incremented so we know to move on
  //To email and phone number validation step
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      //Copy everything in the billing address into the shippingAddress Value
      //When isSameAddress is true
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    if (isSecondStep) {
      makePayment(values);
    }
    //Reset the validation each time we move to next step
    actions.setTouched({});
  };

  //Stripe Integration
  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
        //Combine firstName and lastname into one userName
      userName: [values.firstName, values.lastName].join(" "),
      //email is assigned the values.email 
      email: values.email,
      //Grab everything in the current cart as well as the count
      //Return the id and count as properties
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };
    //API Call to backend
    //Orders model created in Strapi
    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    //Format the response
    const session = await response.json();
    //Grab sessionID from back end and direct it to checkout
    //Redirect user to checkout
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            //Pass in the handleSubmit we get from Formik above
            <form onSubmit={handleSubmit}>
              {/**Pass in the values above into the shipping component
               * which is the first step in the checkout process
               */}
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {/** Pass in the values above into the payment page if we're 
               * on the shipping page
               */}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    //If were on second step then we show this button and move to
                    //previous step
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                {/**The submit button for formik */}
                <Button
                  fullWidth
                  //This lets formik know to use the handleFormSubmit
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {/** Show "next" if first step and "Place order" if second step */}
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
