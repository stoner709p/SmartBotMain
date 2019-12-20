// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  try {
    // If the author does not have admin privlages, return.
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You do not have the correct permission(Administrator) to use this command!"
      );
    }
    // Set the role1 variable equal to the @everyone role in the message's server.
    let role1 = message.guild.roles.find(r => r.name === "@everyone");
    // Change the permissions for @everyone to not be able to send messages or add reactions in the channel of the message.
    message.channel.overwritePermissions(role1, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    });
    // Reply to the user that the channel was locked.
    message.reply(`This channel has been locked!`);
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
        `Error's server: ${message.guild.name}, Error Command: Lock`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "lock"
};
