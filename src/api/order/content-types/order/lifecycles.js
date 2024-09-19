module.exports = {
  async afterCreate(event) {
    const { result } = event;
    console.log(
      "result: ",
      `${result.email}`,
      "EMAIL Legion: ",
      process.env.EMAIL_LEGION_MARIENS
    );
    // email to the customer
    try {
      await strapi.plugins["email"].services.email.send({
        to: `${result.email}`,
        from: process.env.EMAIL_LEGION_MARIENS,
        subject: "Order Confirmation",
        text: `Your order has been confirmed. Order ID: ${result.id}.`,
      });
    } catch (err) {
      strapi.log.error(err);
    }

    // email to the admin
    try {
      await strapi.plugins["email"].services.email.send({
        to: process.env.EMAIL_LEGION_MARIENS,
        from: process.env.EMAIL_LEGION_MARIENS,
        subject: "Order Confirmation",
        text: `Your order has been confirmed. Order ID: ${result.id}.`,
      });
    } catch (err) {
      strapi.log.error(err);
    }
  },
};
