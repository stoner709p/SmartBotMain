const fs = require("fs")
const Discord = require("discord.js")

module.exports.run = async (bot, member) => {
  if (bot.guildSettings[member.guild.id].welcomeChannel !== "null") {
    let welcomeGuild = bot.guilds.get(member.guild.id);
    let welcomeChannel = welcomeGuild.channels.get(
      bot.guildSettings[member.guild.id].welcomeChannel
    );
    welcomeChannel.send(`See you later ${member}!`)
  } else {
    return;
  }
}

module.exports.help = {
  name: "GoodBye"
}