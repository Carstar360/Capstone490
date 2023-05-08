"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  //Allow us to modify API endpoint
  async create(ctx) {
    //Products,user,and email are sent to the backend in makePayment using the fetch function
    // ./Checkout
    const { products, userName, email } = ctx.request.body;

    try {
      //Grab price information from backend
      //For security so no one can alter price
      //Promise lets use multiple async calls
      const lineItems = await Promise.all(
        //Cycle through each product, grab info, send to stripe
        products.map(async (product) => {
          const item = await strapi
            //Grab items stored
            .service("api::item.item")
            //Gives the items
            .findOne(product.id);

            //https://stripe.com/docs/checkout/quickstart
          return {
            price_data: {
                //Price initialized to dollars
              currency: "usd",
              //Grab product name and initialize the name data
              //Formatting data to be an object for stripe
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      // This creates a unique stripe session
      const session = await stripe.checkout.sessions.create({
        //Specify payment type allowed
        payment_method_types: ["card"],
        //The entered email becomes the customemr email
        customer_email: email,
        mode: "payment",
        //Page you get sent to when the payment is successful
        success_url: "http://localhost:3000/checkout/success",
        //If unsuccessful
        cancel_url: "http://localhost:3000",
        //This holds the objects we created above on line 30 for stripe
        line_items: lineItems,
      });

      // This creates the order on Strapi
      await strapi.service("api::order.order").create({ 
        data: { userName, products, stripeSessionId: session.id } 
    });

      // Return the session id after everything finishes
      return { id: session.id };
    } catch (error) {
        //If there is an error when creating the charge
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  },
}));
