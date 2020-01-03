// Require things and stuff
const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot) => { 
bot.setInterval(() => {
    for (let i in bot.mutes) {
      let time = bot.mutes[i].time;
      let guildId = bot.mutes[i].guild;
      let guild = bot.guilds.get(guildId);
      let member = guild.members.get(i);
      let mutedRole = guild.roles.find(r => r.name === "Muted");
      if (!mutedRole) continue;
      if(!member){
        return;
      }
      if(!member.roles.has(mutedRole.id)){
        member.addRole(mutedRole);
      }
      if (Date.now() > time ) {
        member.removeRole(mutedRole);
        delete bot.mutes[i];
        fs.writeFile("./Cmds/Mutes.json", JSON.stringify(bot.mutes), err => {
          if (err) throw err;
        });
      }
    }
  }, 5000);
}
module.exports.help = {
  name: "CheckMutes"
};