const fs = require('fs')
const Discord = require('discord.js')

module.exports.run = async (bot, message) => {
    if (bot.guildSettings[message.guild.id].logChannel !== "null") {
    let logsGuild = bot.guilds.get(message.guild.id);
    let logsChannel = logsGuild.channels.get(
      bot.guildSettings[message.guild.id].logChannel
    );
    let logs = message.guild.fetchAuditLogs().then(logs => {
      let embed = new Discord.RichEmbed()
        .setTitle("Message Edited!")
        .addField("Channel", message.channel.name)
        .addField("Author:", message.author)
        .addField("Starting Content", message.content)
        .addField("Ending Content", message.member.lastMessage.content )
      logsChannel.send({embed});
    });
  } else {
    return;
  }
}

module.exports.help = {
  name: "EditedMessage"
}