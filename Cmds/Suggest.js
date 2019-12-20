// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    let suggestionGuild = bot.guilds.get("643323696693510154");
    let suggestionChannel = suggestionGuild.channels.get("643327560612184094");
    let author = message.author.username + "#" + message.author.discriminator;
    let server = message.guild.name;
    let suggestion = args.toString();
    if (!suggestion) {
      return message.channel.send("You have to have a suggestion!");
    }

    suggestion = suggestion.replace(/,/g, " ");
    let embed = new Discord.RichEmbed()
      .setTitle(author)
      .setDescription(`Server: ${server}`)
      .addField("Suggestion: ", suggestion)
      .setTimestamp();
    suggestionChannel.send(embed);
    message.channel.send("Success! Your suggestion has been submitted!");
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
        `Error's server: ${message.guild.name}, Error Command: Suggest`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "suggest"
};
