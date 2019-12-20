// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");
const yiff = require("yiff");

module.exports.run = async (bot, message, args) => {
  try {
    // Set payme equal to the random shibe's link
    var shiba = await yiff.shibe.shibes();
    // Create the embed with the image as the shibe. And setting the here button as the link to the shibe.
    let embed = new Discord.RichEmbed()
      .setTitle("Your random shiba!")
      .setDescription(`If the image doesn't show up, click [here](${shiba})`)
      .setImage(shiba);
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
        `Error's server: ${message.guild.name}, Error Command: Shiba`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "shiba"
};
