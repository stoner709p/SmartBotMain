// Require things and stuff.
const fs = require("fs");
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  try {
    if (!message.guild.owner.ownerID === message.author.id) {
      return message.channel.send(
        "You must be the server owner to use this command!"
      );
    }
    if (!bot.guildSettings[message.guild.id]) {
      bot.guildSettings[message.guild.id] = {
        logChannel: null,
        prefix: null
      };
    }
    if (args[0] === "logs") {
      if (args[1] !== "none") {
        console.log("Testings");
        if (!message.mentions.channels.first()) {
          return message.channel.send("That channel does not exist!");
        }
      }
      let logChannel;
      if (message.mentions.channels.first()) {
        logChannel = message.mentions.channels.first().id;
      } else {
        logChannel = null;
      }
      bot.guildSettings[message.guild.id] = {
        logChannel: logChannel,
        prefix: bot.guildSettings[message.guild.id].prefix
      };
      message.channel.send(`The logs channel is now ${args[1]}`);
      return fs.writeFile(
        "./Jsons/ServerSettings.json",
        JSON.stringify(bot.guildSettings, null, 4),
        err => {
          let errorGuild = bot.guilds.get("643323696693510154");
          let errorChannel = errorGuild.channels.get("651604968729608192");
          if (err)
            errorChannel.send(
              err.toString() + ":" + message.guild.name + ":" + subreddit
            );
        }
      );
    }
    if (args[0] === "prefix") {
      if (args[1].length > 4) {
        return message.channel.send(
          "That prefix is too long! The max length is 4."
        );
      }
      if (args[1] === "none") {
        args[1] = null;
      }
      bot.guildSettings[message.guild.id] = {
        logChannel: bot.guildSettings[message.guild.id].logChannel,
        prefix: args[1]
      };
      message.channel.send(`The prefix is now ${args[1]}`);
      return fs.writeFile(
        "./Jsons/ServerSettings.json",
        JSON.stringify(bot.guildSettings, null, 4),
        err => {
          let errorGuild = bot.guilds.get("643323696693510154");
          let errorChannel = errorGuild.channels.get("651604968729608192");
          if (err)
            errorChannel.send(
              err.toString() + ":" + message.guild.name + ":" + subreddit
            );
        }
      );
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
      errorChannel.send(`Error's server: ${message.guild.name}, Error Command: Settings`)
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "settings"
};
