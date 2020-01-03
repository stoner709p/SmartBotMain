// Require all the modules used by the bot, and the settings for the bot.
const botSettings = require("./Jsons/BotSettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const yiff = require("yiff");
let token;
let prefix;
let mode = "Testing";
if (mode === "Testing") {
  console.log("Testing ran!");
  token = botSettings.TestingToken;
  prefix = botSettings.TestingPrefix;
}
if (mode === "Main") {
  token = botSettings.MainToken;
  prefix = botSettings.MainPrefix;
}

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();
bot.mutes = require("./Jsons/Mutes.json");
bot.economy = require("./Jsons/Economy");
bot.lastWorked = require("./Jsons/LastWorked.json");
bot.lastRobbed = require("./Jsons/LastRobbed.json");
bot.guildSettings = require("./Jsons/ServerSettings.json");


fs.readdir("./Cmds/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  jsfiles.forEach((f, i) => {
    let props = require(`./Cmds/${f}`);
    console.log(`Loaded ${jsfiles[i].substring(0, jsfiles[i].length-3)}!`);
    i++;
    bot.commands.set(props.help.name, props);
  });
});
fs.readdir("./Events/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  jsfiles.forEach((f, i) => {
    let Events = require(`./Events/${f}`);
    i++;
    bot.events.set(Events.help.name, Events);
  });
});

bot.on("ready", () => {
  // Checks through the mutes file to see if a person should be unmuted.
  let checkMutes = bot.events.get('CheckMutes')
  checkMutes.run(bot)
  let setPresence = bot.events.get('SetPresence')
  setPresence.run(bot, prefix)
  let getOwner = bot.events.get('GetOwner')
  getOwner.run(bot)
});

bot.on("guildCreate", async guild => {
  let newGuild = bot.events.get('NewGuild')
  newGuild.run(bot, guild)
});
bot.on("guildDelete", async guild => {
  let leaveGuild = bot.events.get('LeaveGuild')
  leaveGuild.run(bot, guild)
});

bot.on("messageDelete", async message => {
  let deletedMessage = bot.events.get('DeletedMessage')
  deletedMessage.run(bot, message)
});
bot.on("messageUpdate", async message =>{
  let EditedMessage = bot.events.get('EditedMessage')
  EditedMessage.run(bot, message)
})
bot.on("guildMemberAdd", async member => {
  let welcome = bot.events.get('Welcome')
  welcome.run(bot, member)
})
bot.on("guildMemberRemove", async member => {
  let GoodBye = bot.events.get('GoodBye')
  GoodBye.run(bot, member)
})
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
