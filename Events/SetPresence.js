// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, prefix) => { 
  console.log("Setting presence")
  bot.user.setPresence({
      game: {
        name: `Prefix is ${prefix}`
      }
    });
}
module.exports.help = {
  name: "SetPresence"
  
}