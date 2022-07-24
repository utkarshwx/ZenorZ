const Command = require('../../Structures/Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
		super(...args, {
			
		});
	}

    async run(message, client) {
        const embed = new MessageEmbed()
        .setTitle('ZENORZ Commands Interface')
        .setAuthor("ZENORZ", "")
        .setColor('#000000')
        .setDescription('These are the commands which are executable in the **ZENORZ**')
        .setThumbnail(this.client.user.displayAvatarURL(), `dynamic` , true)
        .setFooter(`Prefix: z | Powered By: ZENORZ`)
        .addField(' Fun commands' , [
           ' `coinflip` , `weather`, `8ball`'
        ])
        .addField(':tools: Admin-Mod:' , [
            '`ban` , `prune` , `kick`, `say`, `embed`, `nick`, `slowmode`, `membercount`'
        ])
        //.addField(':wrench: Settings:', [
        //    '`setwlc` , `welcome-test`'
        //])
        .addField(':information_source: Information:' , [
            '`avatar` , `serverinfo` , `whois`'
        ])
        //.addField('<:hypesquadevents:780263122862080022> Fun:' , [
        //    '`8ball` , `cat` , `dog` , `enlarge` , `meme` , `neko` , `rps` , `waifu`'
        //])
        //.addField(':performing_arts: Reactions-Expressions:' , [
        //    '`cuddle` , `highfive` , `hug` , `pat` , `poke` , `slap` , `tickle` , `angry` , `blush` , `bored` , `confused` , `happy` , `sad`'
       // ])
        //.addField(':cd: Music:' , [
         //   '`play` , `pause` , `skip` , `stop` , `np` , `queue` , `resume` , `volume`'
        //])
        .addField(':gear: Utilities:' , [
            ' `invite` , `ping` , `uptime`, `help` '
        ])
        .addField(':inbox_tray: Quick Links' , [
           /* '[GitHub](https://github.com/Exynos-Discord)・[Vote](https://top.gg/bot/764726231891312670/vote)・*/
           '[Support](https://discord.gg/xmf3kx5bYk)'
        ]);
        
        message.channel.send(embed);
    }
};