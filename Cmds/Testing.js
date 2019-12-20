// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(message.author.id !== "444644760322572297"){
    return;
  }
  message.delete()
let logs = message.guild.fetchAuditLogs()
  .then(logs =>{console.log(logs.entries.first())})

};

module.exports.help = {
  name: "test"
};
