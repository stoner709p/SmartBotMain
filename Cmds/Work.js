// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");
let userFound = false;
let currentUser;

module.exports.run = async (bot, message, args) => {
  try {
    let lastWorkedFile = bot.lastWorked;
    if (!bot.economy[message.author.id]) {
      bot.economy[message.author.id] = {
        cashBalance: 0,
        bankBalance: 0
      };
    }
    if (bot.lastWorked[message.author.id]) {
      if (bot.lastWorked[message.author.id].lastworkdate > Date.now() - 5000) {
        return message.channel.send("You are working again too soon!");
      }
    } else {
      bot.lastWorked[message.author.id] = {
        lastworkdate: Date.now()
      };
    }
    bot.lastWorked[message.author.id] = {
      lastworkdate: Date.now()
    };
    fs.writeFile(
      "./Jsons/LastWorked.json",
      JSON.stringify(bot.lastWorked, null, 4),
      err => {
        let errorGuild = bot.guilds.get("643323696693510154");
        let errorChannel = errorGuild.channels.get("651604968729608192");
        if (err) errorChannel.send(err.toString());
      }
    );
    let nameInput = message.author.id;
    let mademoney = Math.ceil(Math.random() * 40);
    message.reply(`You made ${mademoney} from working!`);
    bot.economy[nameInput] = {
      cashBalance: bot.economy[nameInput].cashBalance + mademoney,
      bankBalance: bot.economy[nameInput].bankBalance
    };
    return fs.writeFile(
      "./Jsons/Economy.json",
      JSON.stringify(bot.economy, null, 4),
      err => {
        let errorGuild = bot.guilds.get("643323696693510154");
        let errorChannel = errorGuild.channels.get("651604968729608192");
        if (err) errorChannel.send(err.toString());
      }
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
  name: "work"
};
