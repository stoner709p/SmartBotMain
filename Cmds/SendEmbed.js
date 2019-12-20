// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    // If the message's author does not have admin, return.
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply(
        "You do not have the correct permission(Administrator) to use this command!"
      );
    }
    // Set the embed's info
    let title = args[0];
    let embed2 = args;
    embed2 = embed2.toString();
    embed2 = embed2.substring(title.length + 1, embed2.length + 1);
    embed2 = embed2.replace(/,/g, " ");
    // Set the embed equal to the info specified.
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle(title)
      .setDescription(embed2)
      .setTimestamp();
    message.delete();
    // Send the embed into the message's channel.
    return message.channel.send(embed);
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
        `Error's server: ${message.guild.name}, Error Command: SendEmbed`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "sendembed"
};
