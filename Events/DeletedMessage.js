const fs = require('fs')
const Discord = require('discord.js')

module.exports.run = async (bot, message) => {
    if (bot.guildSettings[message.guild.id].logChannel !== "null") {
    let logsGuild = bot.guilds.get(message.guild.id);
    let logsChannel = logsGuild.channels.get(
      bot.guildSettings[message.guild.id].logChannel
    );
    let logs = message.guild.fetchAuditLogs().then(logs => {
      let messageContent = message.content;
      if(messageContent.length >= 1000){
        messageContent = messageContent.substring(0, 993);
        messageContent = messageContent + "..."
      }
      let embed = new Discord.RichEmbed()
        .setTitle("Message Deleted!")
        .addField("Channel", message.channel.name)
        .addField("Author:", message.author)
        .addField("Executor/Deleter:", logs.entries.first().executor)
        .addField("Content", messageContent);
      logsChannel.send({embed});
    });
  } else {
    return;
  }
}

module.exports.help = {
  name: "DeletedMessage"
}