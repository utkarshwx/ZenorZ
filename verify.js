exports.canModifyQueue = (member) => {}
     
  let config;
  require('dotenv').config();
  
  try {
    config = require("./config.json");
    
  } catch (error) {
    config = null;
  }
  
  exports.TOKEN = process.env.TOKEN;
  //exports.PREFIX = config ? config.PREFIX : process.env.PREFIX;
  exports.GIFAPI = process.env.GIFAPI;
 // exports.SOUNDCLOUD_CLIENT_ID = config ? config.SOUNDCLOUD_CLIENT_ID : process.env.SOUNDCLOUD_CLIENT_ID;
  //exports.MAX_PLAYLIST_SIZE = config ? config.MAX_PLAYLIST_SIZE : process.env.MAX_PLAYLIST_SIZE;
  //exports.PRUNING = config ? config.PRUNING : process.env.PRUNING;
  exports.mongooseConnectionString = process.env.MONGOOSE;
  //exports.DEFAULT_VOLUME = config ? config.DEFAULT_VOLUME: process.env.DEFAULT_VOLUME;
  exports.LOCALE = config ? config.LOCALE : process.env.LOCALE;