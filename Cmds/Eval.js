// Require things and stuff.
const fs = require("fs");
const Discord = require("discord.js");

function fixUp(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "444644760322572297") return;
    try {
        const toRun = args.join(" ");
        let evaluated = eval(toRun);

        if (typeof evaluated !== "string")
            evaluated = require("util").inspect(evaluated);

        let embed = new Discord.RichEmbed()
            .setTitle("Evaluated: ")
            .addField("Requested: ", toRun)
            .addField("Output: ", fixUp(evaluated))
            .setTimestamp(message.createdAt)
            .setFooter(message.author.username, message.author.avatarURL);
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
        `Error's server: ${message.guild.name}, Error Command: Eval`
      );
      await errorChannel.sendFile("./Error.txt");
      fs.unlink("./Error.txt", error => {
        if (error) console.log(error);
      });
    }
  }
};

module.exports.help = {
    name: "eval"
};
