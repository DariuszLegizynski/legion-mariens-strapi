module.exports = {
  async afterCreate(event) {
    const { result } = event;

    const populatedOrder = await strapi.entityService.findOne(
      "api::order.order",
      result.id,
      {
        populate: {
          orderItemList: {
            populate: "product",
          },
        },
      }
    );

    const listedItems = populatedOrder.orderItemList.map((item) => {
      return {
        amount: item.amount,
        price: item.price,
        title: item.product.title,
        productId: item.product.article_code,
      };
    });

    const finalPrice = listedItems
      .map((cartItem) => cartItem?.price * cartItem.amount)
      .reduce((acc, curr) => acc + curr, 0);

    // email to the customer
    try {
      await strapi.plugins["email"].services.email.send({
        to: `${result.email}`,
        from: process.env.EMAIL_LEGION_MARIENS,
        template_id: process.env.TEMPLATE_ORDER_MEMBER,
        dynamic_template_data: {
          orderId: result.id,
          name: result.name,
          surname: result.surname,
          items: listedItems,
          date: result.createdAt.split("T")[0],
          legion: result.legion,
          address: result.address,
          place: result.place,
          zip: result.zip,
          land: result.land,
          finalPrice,
        },
      });
    } catch (err) {
      strapi.log.error(err);
    }

    // email to the admin
    try {
      await strapi.plugins["email"].services.email.send({
        to: process.env.EMAIL_LEGION_MARIENS,
        from: process.env.EMAIL_LEGION_MARIENS,
        template_id: process.env.TEMPLATE_ORDER_MEMBER,
        dynamic_template_data: {
          orderId: result.id,
          name: result.name,
          surname: result.surname,
          items: listedItems,
          date: result.createdAt.split("T")[0],
          legion: result.legion,
          address: result.address,
          place: result.place,
          zip: result.zip,
          land: result.land,
          finalPrice,
        },
      });
    } catch (err) {
      strapi.log.error(err);
    }
  },
};
