"use strict";

const { default: Stripe } = require("stripe");

/**
 * order service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::order.order");
