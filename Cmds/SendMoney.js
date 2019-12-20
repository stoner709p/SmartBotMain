// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");
let userFound = false;
let currentUser;

module.exports.run = async (bot, message, args) => {
  try {
    let authorID = message.author.id;
    let mentionedID = message.mentions.users.first().id;
    if (!mentionedID) {
      return message.channel.send("You must mention someone!");
    }
    if (!bot.economy[authorID]) {
      bot.economy[authorID] = {
        cashBalance: 0,
        bankBalance: 0
      };
      fs.writeFile(
        "./Jsons/Economy.json",
        JSON.stringify(bot.economy, null, 4),
        err => {
          let errorGuild = bot.guilds.get("643323696693510154");
          let errorChannel = errorGuild.channels.get("651604968729608192");
          if (err) errorChannel.send(err.toString());
        }
      );
      return message.channel.send("You have no money to send!");
    }
    if (bot.economy[authorID].cashBalance < args[0]) {
      return message.channel.send(
        "You must have the correct amount of money in your account!"
      );
    }
    if (args[0] <= 0) {
      return message.channel.send("You must give at least $1!");
    }
    if (!bot.economy[mentionedID]) {
      bot.economy[mentionedID] = {
        cashBalance: 0,
        bankBalance: 0
      };
      fs.writeFile(
        "./Jsons/Economy.json",
        JSON.stringify(bot.economy, null, 4),
        err => {
          let errorGuild = bot.guilds.get("643323696693510154");
          let errorChannel = errorGuild.channels.get("651604968729608192");
          if (err) errorChannel.send(err.toString());
        }
      );
    }
    if (
      isNaN(
        parseInt(bot.economy[mentionedID].cashBalance) - parseInt(args[0])
      ) === true
    ) {
      return message.channel.send("Please provide a numerical value!");
    }
    bot.economy[authorID] = {
      cashBalance:
        parseInt(bot.economy[authorID].cashBalance) - parseInt(args[0]),
      bankBalance: parseInt(bot.economy[authorID].bankBalance)
    };
    bot.economy[mentionedID] = {
      cashBalance:
        parseInt(bot.economy[mentionedID].cashBalance) + parseInt(args[0]),
      bankBalance: parseInt(bot.economy[mentionedID].bankBalance)
    };
    fs.writeFile(
      "./Jsons/Economy.json",
      JSON.stringify(bot.economy, null, 4),
      err => {
        let errorGuild = bot.guilds.get("643323696693510154");
        let errorChannel = errorGuild.channels.get("651604968729608192");
        if (err) errorChannel.send(err.toString());
      }
    );
    return message.channel.send(
      `You gave $${args[0]} to ${message.mentions.users.first().username}!`
    );
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
        `Error's server: ${message.guild.name}, Error Command: SendMoney`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};
module.exports.help = {
  name: "sendmoney"
};
