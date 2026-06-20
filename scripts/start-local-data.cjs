const path = require("node:path");

process.env.ZIGBEE2MQTT_DATA = process.env.ZIGBEE2MQTT_DATA || path.resolve(__dirname, "..", "..", "data");

console.log(`Using Zigbee2MQTT data directory: ${process.env.ZIGBEE2MQTT_DATA}`);

const {start} = require("../index.js");

void start();
