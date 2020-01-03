const fs = require('fs')
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    try {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply(
        "You do not have the correct permission(Administrator) to use this command!"
      );
    }
        let question = message.content
        question = question.substring(6, question.indexOf("?") + 1)
        let answer = message.content
        answer = answer.substring(answer.indexOf("?") + 1, answer.length + 1)
        answer = answer.slice(0)
        let answers = answer.split(" ");
        answers.splice(0, 1)
        if (answers.length > 4) {
            message.channel.send("The max amount of answers is 4!")
        }
        if (answers.length === 0) {
            message.channel.send("You need to have at least one answer!")
        }
        let embed = new Discord.RichEmbed()
            .setTitle(question);
        let description = "";
        for (let i = 0; i < answers.length; i++) {
            description = description + `| ${i+1}. ${answers[i]} `
        }
        description = description + "|"
        await embed.setDescription(description);
        await message.channel.send(embed).then(async reactMessage => {
            if (answers.lenth === 4) {
                await reactMessage.react("1️⃣")
                await reactMessage.react("2️⃣")
                await reactMessage.react("3️⃣")
                await reactMessage.react("4️⃣")
            }
            if (answers.length === 3) {
                await reactMessage.react("1️⃣")
                await reactMessage.react("2️⃣")
                await reactMessage.react("3️⃣")
            }
            if (answers.length === 2) {
                await reactMessage.react("1️⃣")
                await reactMessage.react("2️⃣")
            }
            if (answers.lenght === 1) {
                await reactMessage.react("1️⃣")
            }
        })
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
                `Error's server: ${message.guild.name}, Error Command: 8ball`
            );
            await errorChannel.sendFile("./Error.txt");
            fs.unlink("./Error.txt", error => {
                if (error) console.log(error);
            });
        }
    }
}

module.exports.help = {
    name: "poll"
}