// Requrie things and stuff
const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  try {
    // If the person does not have manage messages permissions, return.
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You do not have the correct permissions(Manage Messages) to use this command."
      );
    // If nobody is mentioned, return.
    let toMute = message.guild.member(message.mentions.users.first());
    if (!toMute) return message.channel.sendMessage("You need a user boi!");
    // Set role equal to the muted role of the message's guild.
    let role = message.guild.roles.find(r => r.name === "Muted");
    // If the muted person does not have the muted role, return.
    if (!role || !toMute.roles.has(role.id))
      return message.channel.sendMessage("They are not muted");
    // Wait for the bot to remove the mentioned user's muted role.
    toMute.removeRole(role);

    // Remove the mute from the mutes json.
    let toMuteUser = message.mentions.users.first().toString();
    toMuteUser = toMuteUser.substring(2, 20);
    delete bot.mutes[toMuteUser];
    fs.writeFile("./Jsons/Mutes.json", JSON.stringify(bot.mutes), err => {
      let errorGuild = bot.guilds.get("643323696693510154");
      let errorChannel = errorGuild.channels.get("651604968729608192");
      if (err) errorChannel.send(err.toString());
    });
    // Say that the person has been unmuted.
    message.channel.send("I have unmuted them!");
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
        `Error's server: ${message.guild.name}, Error Command: UnMute`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "unmute"
};
