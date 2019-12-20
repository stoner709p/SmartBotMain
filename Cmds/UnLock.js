// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  try {
    // Check if the author has the permissions of Administrator, and if they don't, return.
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You do not have the corrent permission(Administrator) to use this command!"
      );
    }
    // Declares the role as the @everyone role, which is everyone without a role.
    let role1 = message.guild.roles.find(r => r.name === "@everyone");
    // Change the message's channel's permissions to allow people to talk.
    message.channel.overwritePermissions(role1, {
      SEND_MESSAGES: true,
      ADD_REACTIONS: true
    });
    // Announce that the channel has been unlocked.
    message.reply(`This channel has been unlocked!`);
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
        `Error's server: ${message.guild.name}, Error Command: UnLock`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "unlock"
};
