// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");
let memberscount = 0;
let currentGuild = "";

module.exports.run = async (bot, message, args) => {
  try {
    memberscount = 0;
    bot.guilds.map(a => {
      memberscount = memberscount + a.memberCount;
    });

    // Set the embed equal to the commands of the bot.
    let embed = new Discord.RichEmbed()
      .setAuthor("Sanic The (Real) Hedgehog#0461")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/585925294334935093/10aee3210232a18607bfb27e511061da.png?size=2048"
      )
      .setColor("#ffffff")
      .addField("Bot Uptime", `${bot.uptime / 1000}s`)
      .addField("Server Amount", `${bot.guilds.size}`)
      .addField("Member Amount", `${memberscount}`)
      .setTimestamp()
      .setFooter(
        "Sanic The (Real) Hedgehog",
        "https://cdn.discordapp.com/avatars/444644760322572297/795c7e14ef90d0ee49183823a383a263.png?size=2048"
      )
      .addField(
        "For more info:",
        "Join the [discord](https://discordapp.com/invite/SnXrnva)!"
      );
    // Send the embed.
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
        `Error's server: ${message.guild.name}, Error Command: BotInfo`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "botinfo"
};
