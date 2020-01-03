// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    let embed = new Discord.RichEmbed()
      .setAuthor("Sanic The (Real) Hedgehog#0461")
      .setDescription("Current Commands- Lower Case only")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/585925294334935093/10aee3210232a18607bfb27e511061da.png?size=2048"
      )
      .setColor("#ffffff")
      .addField("[Bot] Owner Commands:", "Eval")
      .addField("[Guild] Owner Commands:", "Settings, Announce")
      .addField(
        "Admin Commands:",
        "Mute/Unmute, Ban, Kick, Purge, Lock/Unlock, SendEmbed, Poll"
      )
      .addField(
        "User Commands:",
        "Userinfo, Shiba, Subreddit, Kill, ServerInfo, Revive, 8ball, BotInfo, Suggest"
      )
      .addField(
        "Economy Commands:",
        "Work, Rob, Balance, Deposit, Withdraw, SendMoney"
      )
      .addField(
        "Settings(Arguments)",
        "Types: Prefix(String less than 4 numbers or 'none'), Logs(Mention logs channel or 'none'), Welcome(Mention welcome/goodbye channel or 'none')"
      )
      .setTimestamp()
      .setFooter(
        bot.owner.username,
        `https://cdn.discordapp.com/avatars/444644760322572297/${bot.owner.avatar}.png?size=2048`
      )
      .addField(
        "For more help:",
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
  name: "help"
};
