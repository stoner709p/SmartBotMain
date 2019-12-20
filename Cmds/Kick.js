// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    // If the author of the message does not have ban members permission in target server, return that they can't
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "You do not have the correct permission(Ban Members) to use this command!"
      );
    // If there was nobody mentioned return that.
    let toKick = message.guild.member(message.mentions.users.first());
    if (!toKick)
      return message.channel.send(
        "You need to mention someone after the comamnd!"
      );
    // If the author tries to kick themselves, return no.
    if (toKick.id === message.author.id)
      return message.channel.send("Self-kicks are not allowed!");
    // If the mentioned user has a higher role than the author, return.
    if (toKick.highestRole.position >= message.member.highestRole.position)
      return message.channel.send("That person has a higher role than you!");
    message.channel.send(`I am kicking ${toKick}!`);
    // Kick the mentioned user.
    toKick.kick();
  } catch (e) {
    if (e) {
      fs.writeFile("./Error.txt", e, err => {
        if (err) console.log(err);
      });
      message.channel.send(
        "There was an error, and It has been logged for the bot's owner to evaluate later."
      );
      let errorGuild = bot.guilds.get("643323696693510154");
      let errorChannel = errorGuild.channels.get("651604968729608192");
      errorChannel.send(
        `Error's server: ${message.guild.name}, Error Command: Kick`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "kick"
};
