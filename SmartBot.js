// Require all the modules used by the bot, and the settings for the bot.
const botSettings = require("./Jsons/BotSettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const yiff = require("yiff");
let token;
let prefix;
let mode = "Main";
if (mode === "Testing") {
  console.log("Testing ran!");
  token = botSettings.TestingToken;
  prefix = botSettings.TestingPrefix;
}
if (mode === "Main") {
  token = botSettings.MainToken;
  prefix = botSettings.MainPrefix;
}
// Declare that if you use bot, it is the discord client
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
// Declare the mutes for the bot is the mutes json.
bot.mutes = require("./Jsons/Mutes.json");
bot.economy = require("./Jsons/Economy");
bot.lastWorked = require("./Jsons/LastWorked.json");
bot.lastRobbed = require("./Jsons/LastRobbed.json");
bot.guildSettings = require("./Jsons/ServerSettings.json");
// Checks all the files in ./Cmds/ and loads them
fs.readdir("./Cmds/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  jsfiles.forEach((f, i) => {
    let props = require(`./Cmds/${f}`);
    console.log(`${jsfiles[i]} is starting! `);
    i++;
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", () => {
  // Checks through the mutes file to see if a person should be unmuted.
  bot.setInterval(() => {
    for (let i in bot.mutes) {
      let time = bot.mutes[i].time;
      let guildId = bot.mutes[i].guild;
      let guild = bot.guilds.get(guildId);
      let member = guild.members.get(i);
      let mutedRole = guild.roles.find(r => r.name === "Muted");
      if (!mutedRole) continue;
      if (Date.now() > time) {
        member.removeRole(mutedRole);
        delete bot.mutes[i];
        fs.writeFile("./Cmds/Mutes.json", JSON.stringify(bot.mutes), err => {
          if (err) throw err;
        });
      }
    }
  }, 5000);
  bot.user.setPresence({
    game: {
      name: `Prefix is ${prefix}`
    }
  });
});

bot.on("guildCreate", async guild => {
  let memberscount = 0;
  bot.guilds.map(a => {
    memberscount = memberscount + a.memberCount;
  });
  let sendGuild = bot.guilds.get("643323696693510154");
  let sendChannel = sendGuild.channels.get("652650623635816464");

  let serverEmbed = new Discord.RichEmbed()
    .setTitle("New server joined!")
    .setDescription(`Server Name: ${guild.name}`)
    .addField("Member Count", guild.memberCount)
    .addField("Owner", guild.owner)
    .addField("Guild ID", guild.id)
    .addField("New Server Count", bot.guilds.size)
    .addField("New User Count", memberscount);
  sendChannel.send(serverEmbed);
});
bot.on("guildDelete", async guild => {
  let memberscount = 0;
  bot.guilds.map(a => {
    memberscount = memberscount + a.memberCount;
  });
  let sendGuild = bot.guilds.get("643323696693510154");
  let sendChannel = sendGuild.channels.get("652650623635816464");

  let serverEmbed = new Discord.RichEmbed()
    .setTitle("Left a server.")
    .setDescription(`Server Name: ${guild.name}`)
    .addField("Member Count", guild.memberCount)
    .addField("Owner", guild.owner)
    .addField("Guild ID", guild.id)
    .addField("New Server Count", bot.guilds.size)
    .addField("New User Count", memberscount);
  sendChannel.send(serverEmbed);
});

bot.on("messageDelete", async message => {
  if (bot.guildSettings[message.guild.id].logChannel !== "null") {
    let logsGuild = bot.guilds.get(message.guild.id);
    let logsChannel = logsGuild.channels.get(
      bot.guildSettings[message.guild.id].logChannel
    );
    let logs = message.guild.fetchAuditLogs().then(logs => {
      let embed = new Discord.RichEmbed()
        .setTitle("Message Deleted!")
      .addField("Author:", message.author)
      .addField("Executor/Deleter:", logs.entries.first().executor)
      .addField("Content", message.content)
      logsChannel.send(embed);
    });
  } else {
    return;
  }
});
// Take any message, and if it starts with the prefix then it checks the name of the command and runs it through the file.
bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let content = message.content;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  if (!bot.guildSettings[message.guild.id]) {
    bot.guildSettings[message.guild.id] = {
      logChannel: null,
      prefix: null
    };
  }
  if (bot.guildSettings[message.guild.id].prefix !== null) {
    prefix = bot.guildSettings[message.guild.id].prefix;
  } else {
    prefix = botSettings.MainPrefix;
  }
  if (!command.toLowerCase().startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length).toLowerCase());

  if (cmd) cmd.run(bot, message, args);
});
// The bot logs into the discord API.
bot.login(token).catch(err => {
  if (err) console.log(err);
});
