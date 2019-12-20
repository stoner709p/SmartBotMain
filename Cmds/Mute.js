// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    // Set variables equal to the message's guild, the muted role in that guild and the mentioned user.
    let guild = message.guild;
    let mutingRole = guild.roles.find(r => r.name === "Muted");
    let toMute = guild.member(message.mentions.users.first());
    // If the message's author does not have the manage messages permission, return.
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You do not have the correct permission(Manage Messages) to use this command!"
      );
    // If nobody was mentionedm return.
    if (!toMute)
      return message.channel.send(
        "You need to mention someone after the comamnd!"
      );
    //  If the mentioned user has the muterole, return.
    // If the author is muting themselves, return.
    if (toMute.id === message.author.id)
      return message.channel.send("Self-mutes are not allowed!");
    // If the mentioned user has a higher than or equal to role than the author, return.
    if (toMute.highestRole.position >= message.member.highestRole.position)
      return message.channel.send("That person has a higher role than you!");

    // If there is no muting role, try to create one.
    if (!mutingRole) {
      try {
        mutingRole = await message.guild.createRole({
          name: "Muted",
          permissions: []
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    if (toMute.roles.has(mutingRole.id))
      return message.channel.send("They are already muted!");
    // Change the mute role to have no send message or add reactions in any channel.
    message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(mutingRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
    // Setup the mutetime so that the suffix is correct.
    if (!args[1]) {
      return message.channel.send("You need to add a time!");
    }
    let time = args[1];
    let muteTime = parseInt(time.substring(0, time.length - 1));
    let muteSuffix1 = time.substring(time.length - 1, time.length);
    if (muteSuffix1 === "") {
      muteTime = muteTime * 1000;
    }
    if (muteSuffix1 === "s") {
      muteTime = muteTime * 1000;
    }
    if (muteSuffix1 === "m") {
      muteTime = muteTime * 60000;
    }
    if (muteSuffix1 === "d") {
      muteTime = muteTime * 86400000;
    }
    if (muteSuffix1 === "w") {
      muteTime = muteTime * 604800000;
    }
    if (args === "perm") {
      muteTime = "nan";
    }
    // Add the mute time, guild, and member to the mutes json file for later referance.
    bot.mutes[toMute.id] = {
      guild: message.guild.id,
      time: Date.now() + muteTime
    };
    // Wait for the role to be added to the mentioned user.
    await toMute.addRole(mutingRole);
    // Save the new mutes file with the added user.
    fs.writeFile("./Jsons/Mutes.json", JSON.stringify(bot.mutes), err => {
      if (err) throw err;
    });
    // Send in chat that the user has been muted for the time argument.
    message.channel.send(`The user has been muted for ${time}!`);
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
        `Error's server: ${message.guild.name}, Error Command: Mute`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "mute"
};
