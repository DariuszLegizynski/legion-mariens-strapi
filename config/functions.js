// path: config/functions/cron.js

module.exports = {
  "0 0 * * *": async () => {
    // This job will run every day at midnight
    const now = new Date();

    // Find all expired cart items
    const expiredCarts = await strapi.db
      .query("api::user-cart.user-cart")
      .findMany({
        where: { expiration_date: { $lt: now } },
      });

    // Delete the expired cart items
    for (const cart of expiredCarts) {
      await strapi.db
        .query("api::user-cart.user-cart")
        .delete({ where: { id: cart.id } });
    }
  },
};
