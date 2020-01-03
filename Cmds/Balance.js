// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");
let userFound = false;
let currentUser;

module.exports.run = async (bot, message, args) => {
  try {
    let nameInput = message.mentions.users.first() || message.author;
    let nameInputID = nameInput.id;
    if (!bot.economy[nameInputID]) {
      bot.economy[nameInputID] = {
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
    let embed = new Discord.RichEmbed()
      .setAuthor(nameInput.username + "#" + nameInput.discriminator)
      .setDescription("Your Balance")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/585925294334935093/10aee3210232a18607bfb27e511061da.png?size=2048"
      )
      .setColor("#ffffff")
      .addField("Bank Balance", bot.economy[nameInputID].bankBalance)
      .addField("Cash Balance", bot.economy[nameInputID].cashBalance)
      .setTimestamp()
      .setFooter(
        bot.owner.username,
        `https://cdn.discordapp.com/avatars/444644760322572297/${bot.owner.avatar}.png?size=2048`
      )
      .addField(
        "For help:",
        "Join the [discord](https://discordapp.com/invite/SnXrnva)!"
      );
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
        `Error's server: ${message.guild.name}, Error Command: Balance`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "balance"
};
