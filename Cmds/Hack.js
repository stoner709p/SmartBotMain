// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    // Get a random string of letters and numbers
    const r = Math.random()
      .toString(36)
      .substring(7);
    const user = message.mentions.users.first();
    // Send a message with the mentioned's username and the random string.
    message.reply(`Username: ${user}  Password: ${r}`);
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
        `Error's server: ${message.guild.name}, Error Command: Hack`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "hack"
};
