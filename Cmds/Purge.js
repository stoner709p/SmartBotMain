// Require things and stuff.
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    // If the author does not have the manage messages permission, return.
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You do not have the correct permission(Manage Messages) to use this command!"
      );
    // Set amount equal to the argument + 1.
    const amount = parseInt(args[0]) + 1;
    if (!amount) {
      return message.channel.send("You need to specify an amount!");
    }
    if (amount >= 101) {
      return message.channel.send("Your amount needs to be less than 100!");
    }
    // Delete the argumented amount of messages.
    message.channel
      .bulkDelete(amount)
      .then(messages =>
        message.reply(`${messages.size - 1} message(s) have been deleted!`)
      )
      .catch(console.error);
    setTimeout(function() {
      let botMember = message.guild.members.get("585925294334935093");
      botMember.lastMessage.delete();
    }, 5000);
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
        `Error's server: ${message.guild.name}, Error Command: Purge`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "purge"
};
