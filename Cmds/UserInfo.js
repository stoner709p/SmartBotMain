// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    // Declare that the user is the person that is mentioned by the message author, or is the author.
    let user = message.mentions.users.first() || message.author;
    let game = user.presence.game;
    if (game === null) {
      game = "None";
    } else {
      game = game.name;
    }
    // Creates an embed with all the user's information
    let embed = new Discord.RichEmbed()
      .setTitle("Brain Bot Discord")
      .setURL("https://discordapp.com/invite/SnXrnva")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription("This is the info for " + user.username)
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/585925294334935093/10aee3210232a18607bfb27e511061da.png?size=2048"
      )
      .addField(
        "Username with discriminator",
        `${user.username}#${user.discriminator}`
      )
      .addField("User's ID", user.id)
      .addField("User's creation date", user.createdAt)
      .addField("User's Current Game", game)
      .addField("User's avatar", "vvvvvvvv")
      .setImage(user.avatarURL)
      .setTimestamp()
      .setFooter(
        bot.owner.username,
        `https://cdn.discordapp.com/avatars/444644760322572297/${bot.owner.avatar}.png?size=2048`
      );
    // Sends the embed into the channel where the message is sent.
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
        `Error's server: ${message.guild.name}, Error Command: UserInfo`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "userinfo"
};
