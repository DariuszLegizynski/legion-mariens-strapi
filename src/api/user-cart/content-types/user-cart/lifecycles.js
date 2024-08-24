// path: src/api/user-cart/content-types/user-cart/lifecycles.js

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;

    // Set the expiration date to one week from now
    const now = new Date();
    const expiration_date = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days

    data.expiration_date = expiration_date;
  },
};
