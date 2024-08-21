'use strict';

/**
 * presidium service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::presidium.presidium');
