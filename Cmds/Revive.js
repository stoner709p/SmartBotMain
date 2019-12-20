// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    // Set revived equal to the first mentioned person, or the author.
    let revived = message.mentions.users.first() || message.author.username;
    // Sets guildRevived equal to the mentioned person's guild member.
    let guildRevived = message.mentions.members.first();
    // If revived is the message author, then change their nickname and send a message about it in the message's channel.
    if (revived === message.author.username) {
      return (
        message.member.setNickname(`${message.author.username}`),
        message.reply("you had a raygun so you were revived!")
      );
    } else {
      //
      guildRevived.setNickname(`${revived.username}`);
      message.channel.send(`${revived} had a raygun so you revived him!`);
    }
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
        `Error's server: ${message.guild.name}, Error Command: Revive`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "revive"
};
