// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");
const snoowrap = require("snoowrap");
// Provide the snoowrap API with the needed info to login to reddit.
const r = new snoowrap({
  userAgent: "Smart-Bot-V2",
  clientId: "THEbh7MluL3ZDA",
  clientSecret: "w9-DyRI3a9GQQWmYNVgTMaO2Sbw",
  refreshToken: "215783887748-MJ64xXWRBLHSnAY2GkNF6PLIzU8"
});

module.exports.run = async (bot, message, args) => {
  try {
    // Declares the subreddit as whatever the user said after the command.
    let subreddit = args[0];
    // Get a random post from whatever the specified subreddit was.
    let randPost = await r.getRandomSubmission(subreddit).catch(err => {
      if (err)
        message.channel.send(
          "Something went wrong fetching a post, the requested subreddit may not exist!"
        );
      if (err) {
        let errorGuild = bot.guilds.get("643323696693510154");
        let errorChannel = errorGuild.channels.get("651604968729608192");
        if (err)
          errorChannel.send(
            err.toString() + ":" + message.guild.name + ":" + subreddit
          );
      }
    });

    // Sets thumbnail equal to the thumbnail link of the random post.
    let thumbnail = randPost.url;
    console.log(randPost.url);
    let description = `If the image doesn't show up, click [here](${thumbnail})!`;
    let type = "image";
    if (
      thumbnail
        .toString()
        .substring(
          thumbnail.toString().length - 3,
          thumbnail.toString().length + 1
        ) !== "jpg"
    ) {
      thumbnail = randPost.thumbnail;
      description = `Click [here](${randPost.url}) to go to the link!`;
      type = "post";
    }
    // Create the embed with the image as the thumbnail, and you can click to open the thumbnail in your browser.
    let avatarEmbed = new Discord.RichEmbed()
      .setColor(0x333333)
      .setAuthor(`Your random reddit ${type}.`)
      .setDescription(description)
      .setImage(thumbnail);
    // Send the embed into the channel of the original message.
    message.channel.send(avatarEmbed);
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
        `Error's server: ${message.guild.name}, Error Command: SubReddit`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
  name: "subreddit"
};
