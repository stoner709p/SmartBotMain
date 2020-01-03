const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, guild) => {
  let memberscount = 0;
  bot.guilds.map(a => {
    memberscount = memberscount + a.memberCount;
  });
  let sendGuild = bot.guilds.get("643323696693510154");
  let sendChannel = sendGuild.channels.get("652650623635816464");

  let serverEmbed = new Discord.RichEmbed()
    .setTitle("New server joined!")
    .setDescription(`Server Name: ${guild.name}`)
    .addField("Member Count", guild.memberCount)
    .addField("Owner", guild.owner)
    .addField("Guild ID", guild.id)
    .addField("New Server Count", bot.guilds.size)
    .addField("New User Count", memberscount);
  sendChannel.send(serverEmbed);
}
module.exports.help = {
  name: "NewGuild"
}