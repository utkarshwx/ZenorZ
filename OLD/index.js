
const ZENORZ = require('./Structures/ZENORZ.js');

const client = new ZENORZ(require('dotenv').config());
client.start();