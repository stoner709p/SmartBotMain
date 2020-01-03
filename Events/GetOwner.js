const fs = require('fs')
const Discord = require('discord.js')

module.exports.run = async (bot) => {
  const botSettings = require("../Jsons/BotSettings.json");
  let ownerGuild = bot.guilds.get(botSettings['ownerGuildID'])
  let ownerMemeber = ownerGuild.members.get(botSettings['ownerID'])
  bot.owner = ownerMemeber.user
}

module.exports.help = {
  name: "GetOwner"
}