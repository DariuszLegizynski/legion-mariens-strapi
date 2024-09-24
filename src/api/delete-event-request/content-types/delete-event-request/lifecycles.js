module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    console.log({ result, params });

    const deleteEventRequest = await strapi.entityService.findOne(
      "api::delete-event-request.delete-event-request",
      result.id,
      {
        populate: { events: true },
      }
    );

    const eventCreatedDate = deleteEventRequest.createdAt.toString();

    // email to the customer
    try {
      await strapi.plugins["email"].services.email.send({
        to: `${result.userEmail}`,
        from: process.env.EMAIL_LEGION_MARIENS,
        template_id: process.env.TEMPLATE_DELETE_REQUEST,
        dynamic_template_data: {
          title: deleteEventRequest.events[0].title,
          eventDate: eventCreatedDate.split("T")[0],
          name: result.name,
          surname: result.surname,
          email: result.userEmail,
          reason: result.reason,
        },
      });
    } catch (err) {
      strapi.log.error(err);
    }

    // Send email to admin
    try {
      await strapi.plugins["email"].services.email.send({
        to: process.env.EMAIL_LEGION_MARIENS,
        from: process.env.EMAIL_LEGION_MARIENS,
        template_id: process.env.TEMPLATE_DELETE_REQUEST,
        dynamic_template_data: {
          title: deleteEventRequest.events[0].title,
          eventDate: eventCreatedDate.split("T")[0],
          name: result.name,
          surname: result.surname,
          email: result.userEmail,
          reason: result.reason,
        },
      });
    } catch (err) {
      strapi.log.error(err);
    }
  },

  ////////////////////////////////////////////////
  // Lifecycle for updating a delete-event-request
  async beforeUpdate(event) {
    const { data, where } = event.params;

    console.log({ data, where });

    // Fetch the current delete-event-request
    const deleteEventRequest = await strapi.entityService.findOne(
      "api::delete-event-request.delete-event-request",
      where.id,
      {
        populate: { events: true },
      }
    );

    console.log({ deleteEventRequest });

    const eventCreatedDate = new Date(
      deleteEventRequest.createdAt
    ).toDateString();

    // Check if the delete request is being approved
    if (data.isApproved === true && !deleteEventRequest.isApproved) {
      // Unpublish the related event
      const relatedEventId = deleteEventRequest.events[0].id;
      await strapi.entityService.update("api::event.event", relatedEventId, {
        data: {
          publishedAt: null, // Unpublish the event
        },
      });

      // Send email to user
      try {
        await strapi.plugins["email"].services.email.send({
          to: data.userEmail,
          from: process.env.EMAIL_LEGION_MARIENS,
          template_id: process.env.TEMPLATE_ORDER_MEMBER,
          dynamic_template_data: {
            title: deleteEventRequest.events[0].title,
            eventDate: eventCreatedDate.split("T")[0],
            reason: data.reason,
          },
        });
      } catch (err) {
        strapi.log.error("Error sending email to user", err);
      }

      // Send email to admin
      try {
        await strapi.plugins["email"].services.email.send({
          to: process.env.EMAIL_LEGION_MARIENS,
          from: process.env.EMAIL_LEGION_MARIENS,
          template_id: process.env.TEMPLATE_ORDER_MEMBER,
          dynamic_template_data: {
            title: deleteEventRequest.events[0].title,
            eventDate: eventCreatedDate.split("T")[0],
            reason: data.reason,
          },
        });
      } catch (err) {
        strapi.log.error("Error sending email to admin", err);
      }
    }

    // Check if the delete request is being rejected
    if (data.isRejected === true && !deleteEventRequest.isRejected) {
      // Send email to user
      try {
        await strapi.plugins["email"].services.email.send({
          to: data.userEmail,
          from: process.env.EMAIL_LEGION_MARIENS,
          template_id: process.env.TEMPLATE_ORDER_MEMBER,
          dynamic_template_data: {
            title: deleteEventRequest.events[0].title,
          },
        });
      } catch (err) {
        strapi.log.error("Error sending email to user", err);
      }

      // Send email to admin
      try {
        await strapi.plugins["email"].services.email.send({
          to: process.env.EMAIL_LEGION_MARIENS,
          from: process.env.EMAIL_LEGION_MARIENS,
          subject: "Event Deletion Request Rejected",
          text: `The request to delete the event '${deleteEventRequest.events[0].title}' has been approved.`,
        });
      } catch (err) {
        strapi.log.error("Error sending email to admin", err);
      }
    }
  },
};
