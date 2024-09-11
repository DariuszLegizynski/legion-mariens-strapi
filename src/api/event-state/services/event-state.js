'use strict';

/**
 * event-state service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-state.event-state');
