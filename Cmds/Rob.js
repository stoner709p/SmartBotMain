// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    let mentioned = message.mentions.members.first();
    let economyStuff = bot.economy;
    let authorId = message.author.id.toString();
    let mentionedID = mentioned.id.toString();

    if (!bot.lastRobbed[mentionedID]) {
      bot.lastRobbed[mentionedID] = {
        lastRob: 0,
        lastRobbed: 0
      };
    }
    if (!bot.lastRobbed[authorId]) {
      bot.lastRobbed[authorId] = {
        lastRob: 0,
        lastRobbed: 0
      };
    }
    if (
      bot.lastRobbed[authorId].lastRob > Date.now() - 1200000 &&
      bot.lastRobbed[authorId].lastRob !== 0
    ) {
      return message.channel.send(
        "You have robbed too recently, please wait the 20m before attempting to rob again!"
      );
    }
    if (
      bot.lastRobbed[mentionedID].lastRobbed > Date.now() - 1200000 &&
      bot.lastRobbed[mentionedID].lastRobbed !== 0
    ) {
      return message.channel.send(
        "User has been robbed too recently, please wait the 20m before attempting to rob them again!"
      );
    }
    bot.lastRobbed[mentionedID] = {
      lastRob: bot.lastRobbed[mentionedID].lastRob,
      lastRobbed: Date.now()
    };
    bot.lastRobbed[authorId] = {
      lastRob: Date.now(),
      lastRobbed: bot.lastRobbed[authorId].lastRobbed
    };
    if (!economyStuff[mentionedID]) {
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
          return message.channel.send("They don't have enough money($200)!");
        }
      );
    }
    if (!economyStuff[authorId]) {
      bot.economy[authorId] = {
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
          return message.channel.send("You don't have enough money($200)!");
        }
      );
    }
    if (mentionedID === authorId) {
      return message.channel.send("You cannot rob yourself!");
    }
    for (let i in bot.economy) {
      if (economyStuff[i] === economyStuff[mentionedID]) {
        if (economyStuff[i].cashBalance < 200 || !economyStuff[i]) {
          return message.channel.send("They don't have enough money($200)!");
        }
        if (economyStuff[authorId].cashBalance < 200) {
          return message.channel.send(
            "You must have at least $200 in your cash balance!"
          );
        }
        fs.writeFile(
          "./Jsons/LastRobbed.json",
          JSON.stringify(bot.lastRobbed, null, 4),
          err => {
            let errorGuild = bot.guilds.get("643323696693510154");
            let errorChannel = errorGuild.channels.get("651604968729608192");
            if (err) errorChannel.send(err.toString());
          }
        );
        let robAmount = Math.ceil(Math.random() * 100);
        if (robAmount < 20) {
          bot.economy[authorId] = {
            cashBalance: economyStuff[authorId].cashBalance - robAmount,
            bankBalance: economyStuff[authorId].bankBalance
          };
          return message.channel.send("You got caught and lost $200");
        } else {
          message.channel.send(`You robbed $${robAmount} from ${mentioned}`);
          bot.economy[authorId] = {
            cashBalance: economyStuff[authorId].cashBalance + robAmount,
            bankBalance: economyStuff[authorId].bankBalance
          };
          bot.economy[mentionedID] = {
            cashBalance: economyStuff[mentionedID].cashBalance - robAmount,
            bankBalance: economyStuff[mentionedID].bankBalance
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
      }
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
        `Error's server: ${message.guild.name}, Error Command: Rob`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "rob"
};
