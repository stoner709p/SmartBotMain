// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");
let userFound = false;
let currentUser;

module.exports.run = async (bot, message, args) => {
  try {
    let nameInput = message.author.id;
    if (!bot.economy[nameInput]) {
      bot.economy[nameInput] = {
        cashBalance: 0,
        bankBalance: 0
      };
    }

    if (bot.economy[nameInput].bankBalance <= 0) {
      return message.channel.send("You have no money to withdraw!");
    }
    let moneyAmount = args[0];
    if (moneyAmount === "all") {
      moneyAmount = bot.economy[nameInput].bankBalance;
    } else {
      moneyAmount = parseInt(moneyAmount);
    }
    let newBankBalance =
      parseInt(bot.economy[nameInput].bankBalance) - moneyAmount;

    if (isNaN(newBankBalance) === true) {
      return message.channel.send(
        "Please Provide a numerical amount or 'all'!"
      );
    }
    let newCashBalance =
      parseInt(bot.economy[nameInput].cashBalance) + moneyAmount;
    if (newBankBalance < 0) {
      return message.channel.send("Thats too much money!");
    }

    bot.economy[nameInput] = {
      cashBalance: newCashBalance,
      bankBalance: newBankBalance
    };
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username + "#" + message.author.discriminator)
      .setDescription("Your New Balance")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/585925294334935093/10aee3210232a18607bfb27e511061da.png?size=2048"
      )
      .setColor("#ffffff")
      .addField("Bank Balance", bot.economy[nameInput].bankBalance)
      .addField("Cash Balance", bot.economy[nameInput].cashBalance)
      .setFooter(
        bot.owner.username,
        `https://cdn.discordapp.com/avatars/444644760322572297/${bot.owner.avatar}.png?size=2048`
      )
      .addField(
        "For help:",
        "Join the [discord](https://discordapp.com/invite/SnXrnva!)"
      )
      .setTimestamp();
    message.channel.send(embed);
    return fs.writeFile(
      "./Jsons/Economy.json",
      JSON.stringify(bot.economy, null, 4),
      err => {
        if (err) throw err;
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
  name: "withdraw"
};
