// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    let owner;
    // Creates the embed with the server's info.
    try {
      owner = `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`;
    } catch(e){
      if(e){
        owner = "Error"
      }
    }
    let embed = new Discord.RichEmbed()
      .setTitle("Brain Bot Discord")
      .setURL("https://discord.gg/7zhErZ3")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription("This is the info for " + message.guild.name)
      .addField("Server owner:", owner)
      .addField("Server's region:", message.guild.region)
      .addField("Server's creation date:", message.guild.createdAt)
      .addField("Server ID:", message.guild.id)
      .addField("Server's Member Count", message.guild.memberCount)
      .addField("Server's Icon", "VVVVVVVVVVV")
      .setImage(message.guild.iconURL)
      .setTimestamp()
      .setFooter(
        bot.owner.username,
        `https://cdn.discordapp.com/avatars/444644760322572297/${bot.owner.avatar}.png?size=2048`
      );
    // Send the embed into the message's channel.
    message.channel.send(embed);
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
        `Error's server: ${message.guild.name}, Error Command: Help`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};
module.exports.help = {
  name: "serverinfo"
};
