module.exports = {
  async afterCreate(event) {
    const { result } = event;

    console.log({ result });

    const populatedEvent = await strapi.db.query("api::event.event").findOne({
      where: { id: result.id },
      populate: {
        applicant: true,
      },
    });

    const applicant = populatedEvent.applicant;

    // email to the customer
    try {
      await strapi.plugins["email"].services.email.send({
        to: `${applicant.email}`,
        from: process.env.EMAIL_LEGION_MARIENS,
        template_id: process.env.TEMPLATE_CREATE_NEW_REQUEST,
        dynamic_template_data: {
          title: result.title,
          description: result.description,
          startDate: result.startTime.split("T")[0],
          startTime: result.startTime.split("T")[1].split(".")[0],
          name: applicant.name,
          surname: applicant.surname,
          email: applicant.email,
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
        template_id: process.env.TEMPLATE_CREATE_NEW_REQUEST,
        dynamic_template_data: {
          title: result.title,
          description: result.description,
          startDate: result.startTime.split("T")[0],
          startTime: result.startTime.split("T")[1].split(".")[0],
          name: applicant.name,
          surname: applicant.surname,
          email: applicant.email,
        },
      });
    } catch (err) {
      strapi.log.error(err);
    }
  },

  ////////////////////////////////////////////////
  // Lifecycle for updating an event
  async beforeUpdate(event) {
    const { data, where } = event.params;

    const populatedEvent = await strapi.db.query("api::event.event").findOne({
      where: { id: where.id },
      populate: {
        applicant: true,
      },
    });

    const applicant = populatedEvent.applicant;

    if (data.isAccepted === true) {
      // Send email to user
      try {
        await strapi.plugins["email"].services.email.send({
          to: applicant.email,
          from: process.env.EMAIL_LEGION_MARIENS,
          template_id: process.env.TEMPLATE_CREATE_NEW_REQUEST_APPROVE,
          dynamic_template_data: {
            title: data.title,
            startDate: data.startTime.split("T")[0],
            startTime: data.startTime.split("T")[1].split(".")[0],
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
          template_id: process.env.TEMPLATE_CREATE_NEW_REQUEST_APPROVE,
          dynamic_template_data: {
            title: data.title,
            startDate: data.startTime.split("T")[0],
            startTime: data.startTime.split("T")[1].split(".")[0],
          },
        });
      } catch (err) {
        strapi.log.error("Error sending email to admin", err);
      }
    }

    // Check if the event request is rejected
    if (data.isRejected === true) {
      // Send email to user
      try {
        await strapi.plugins["email"].services.email.send({
          to: applicant.email,
          from: process.env.EMAIL_LEGION_MARIENS,
          template_id: process.env.TEMPLATE_CREATE_NEW_REQUEST_REJECT,
          dynamic_template_data: {
            title: data.title,
            startDate: data.startTime.split("T")[0],
            startTime: data.startTime.split("T")[1].split(".")[0],
            rejectionDescription: data.rejectionDescription,
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
          template_id: process.env.TEMPLATE_CREATE_NEW_REQUEST_REJECT,
          dynamic_template_data: {
            title: data.title,
            startDate: data.startTime.split("T")[0],
            startTime: data.startTime.split("T")[1].split(".")[0],
            rejectionDescription: data.rejectionDescription,
          },
        });
      } catch (err) {
        strapi.log.error("Error sending email to admin", err);
      }
    }
  },
};
