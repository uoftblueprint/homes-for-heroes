require('dotenv').config();
const { createClient } = require('redis');
const logger = require('../logger');

const client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true
});

client.on('connect', () => {
  logger.info('Initiating a connection to redis');
});

client.on('connect', () => {
  logger.info('Successfully connected to redis');
});

client.on('end', () => {
  logger.info('Closed connection to redis');
});

client.on('reconnecting', () => {
  logger.warn('Attempting to reconnect to redis');
});

client.on('error', err => {
  logger.error('%o', err);
});

// TODO: Figure out a better way to do this?
client.connect();

module.exports = client;