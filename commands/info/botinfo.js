const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed} = require('discord.js');

const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Returns the stats of the bot!"),
  options: {
    guildOnly: false,
  },
  async execute(interaction, client)  {
    // eslint-disable-line no-unused-vars
    
     
      let cpuLol;
      cpuStat.usagePercent(function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D [days], H [hrs], m [mins], s [secs]");
        const RynEmb = new MessageEmbed()
          .setColor("RED")
         
          .addField(
            ":floppy_disk: Memory usage",
            `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(
              os.totalmem() /
              1024 /
              1024
            ).toFixed(2)} MB`,
            true
          )
          .addField(":minidisc: CPU usage", `\`${percent.toFixed(2)}%\``)
          .addField("CPU",`\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
          .addField(":computer: System", `\`${os.arch()}\``)
          .addField(":desktop: Platform", `\`\`${os.platform()}\`\``)
          .addField("👥 Users", `${client.users.cache.size}`)
          .addField("Servers", `${client.guilds.cache.size}`)
          .addField("Library", `\`Discord.js\``)
          .addField("Library Version", `v${version}`)
          .addField(":book: Node Version", `${process.version}`)
          
        interaction.reply({ embeds: [RynEmb] });
      });
    
  }
};