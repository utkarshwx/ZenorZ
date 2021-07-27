const Discord = require('discord.js');
const { prefix } = require('./config.json');
const colors = require('./colors.json');
const client = new Discord.Client();
const weather = require("weather-js");
const ms = require('ms');
const moment = require('moment');
require('dotenv').config();

client.once('ready', () => {
	console.log('Ready!');
	
    const activities =[
        `servers:- ${client.guilds.cache.size}`,
        `users:- ${client.guilds.cache.reduce((a, b) => a+b.memberCount, 0)}`

    ];

    var i=0;
    setInterval(() => client.user.setActivity(`zhelp | ${activities[i++ % activities.length]}`, {type: 'LISTENING'}), 15000);
    
    //client.user.setActivity('<activity>', { type: 'LISTENING' });
	
});



client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot ) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

	if (command === 'userinfo')
	{ 
		const flags = {
			DISCORD_EMPLOYEE: 'Discord Employee',
			DISCORD_PARTNER: 'Discord Partner',
			BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
			BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
			HYPESQUAD_EVENTS: 'HypeSquad Events',
			HOUSE_BRAVERY: 'House of Bravery',
			HOUSE_BRILLIANCE: 'House of Brilliance',
			HOUSE_BALANCE: 'House of Balance',
			EARLY_SUPPORTER: 'Early Supporter',
			TEAM_USER: 'Team User',
			SYSTEM: 'System',
			VERIFIED_BOT: 'Verified Bot',
			VERIFIED_DEVELOPER: 'Verified Bot Developer'
		};
		const member = message.mentions.members.last() || message.member;
		const roles = member.roles.cache.sort((a, b)=> b.position - a.position).map(role => role.toString()).slice(0, -1);
		const userFlags = member.user.flags.toArray();

		const uembed = new Discord.MessageEmbed()
		.setThumbnail(member.user.displayAvatarURL({ dynamic : true}))
		.setColor(colors.red)
		.addField('User:-', [
			`**Username:- ** ${member.user.username}#${member.user.discriminator}`,
			`**ID:- ** ${member.id}`,
			`**Flags:- ** ${userFlags.length ?  userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
			`**CreatedAt:- ** ${moment(member.user.createdTimestamp).format('LT')}${moment(member.user.createdAt).format('LL')}(${moment(member.user.createdTimestamp).fromNow()})`,
			`\u200b`
		])
		.addField('member:-',[
			`**Highest:- ** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
			`**Joined server:- ** ${moment(member.joinedAt).format('LL LTS')}`,
			`**Hoisted role:- ** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
			`**Roles [${roles.length}]:- ** ${member.roles.name}`
		])
	message.channel.send(uembed);
	}
	if (command === 'membercount'){
		const mcembed = new Discord.MessageEmbed()

			.addField('Member',[
		` ${message.guild.memberCount}`])
			.setFooter(message.guild.name)
			message.channel.send(mcembed)
	}
    if(command === "serverinfo"){
        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            VERY_HIGH: 'Unbreakable'
        };
        
        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };

		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new Discord.MessageEmbed()
			.setDescription(`**Guild information for __${message.guild.name}__**`)
			.setColor('#00000')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('**__General__**', [
				`** Name:** ${message.guild.name}`,
				`** ID:** ${message.guild.id}`,
				`** Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`** Region:** ${regions[message.guild.region]}`,
				`** Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`** Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`** Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`** Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`,
				'\u200b'
			])
			.addField('**__Statistics__**', [
				`Role Count: ${roles.length}`,
				`Emoji Count: ${emojis.size}`,
				`Regular Emoji Count: ${emojis.filter(emoji => !emoji.animated).size}`,
				`Animated Emoji Count: ${emojis.filter(emoji => emoji.animated).size}`,
				`Member Count: ${message.guild.memberCount}`,
				`Humans: ${members.filter(member => !member.user.bot).size}`,
				`Bots: ${members.filter(member => member.user.bot).size}`,
				`Text Channels: ${channels.filter(channel => channel.type === 'text').size}`,
				`Voice Channels: ${channels.filter(channel => channel.type === 'voice').size}`,
				`Boost Count: ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('**__Presence__**', [
				`Online: ${members.filter(members => members.presence.status === 'online').size}`,
				`Idle: ${members.filter(members => members.presence.status === 'idle').size}`,
				`Do Not Disturb: ${members.filter(members => members.presence.status === 'dnd').size}`,
				`Offline: ${members.filter(members => members.presence.status === 'offline').size}`,
			])
			//.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
			//.setTimestamp();
		message.channel.send(embed);
	}
	if(command ==='prune'){
		if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("you are missing with permission of managing messages")
	const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}	
	if(command === 'ping') {
		message.channel.send(`Is it doing fine?  ${client.ws.ping}ms || zhelp`);
	}
	if (command === 'say'){
		if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("**You Dont Have Permissions To USE! - [MANAGE_MESSAGES]**");

	let mChannel = message.mentions.channels.first();
	if(!args[0]) return message.channel.send("MESSAGE MISSING");
	else{
	if(mChannel){
		mChannel.send(args.slice(1).join(" "))
	}else{
		message.channel.send(args.join(" "))
	}
	}
}
	if(command === 'avatar'){
		let userinfoget =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.member(message.author);

 let        target = message.mentions.users.first();

        if (!target)
            target = message.author;
        let avatarURL = target.displayAvatarURL({
            size: 4096,
            dynamic: true
			
        });
		//av2 = target.displayAvatarURL({
          //  size: 512,
            //dynamic: true,
			//format: 'png'
		//});
	let	av3 = target.displayAvatarURL({
            size: 512,
            dynamic: true,
			format: 'gif'
		});

		const embed = new Discord.MessageEmbed()
			.setImage(avatarURL)
			.setColor(`#00000`)
			.setTitle(`**Avatar of ${target.username} **`)
			.setFooter(`Powered by Zenorz`)
			.setDescription("[**WEBP**](" + avatarURL + ")" + " | [**GIF**](" + av3 + ")");

		message.channel.send(embed);
	}
    if (command === 'av'){
		let userinfoget =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.member(message.author);

 let        target = message.mentions.users.first();

        if (!target)
            target = message.author;
        let avatarURL = target.displayAvatarURL({
            size: 4096,
            dynamic: true
			
        });
		//av2 = target.displayAvatarURL({
          //  size: 512,
            //dynamic: true,
			//format: 'png'
		//});
	let	av3 = target.displayAvatarURL({
            size: 512,
            dynamic: true,
			format: 'gif'
		});

		const embed = new Discord.MessageEmbed()
			.setImage(avatarURL)
			.setColor(`#00000`)
			.setTitle(`**Avatar of ${target.username} **`)
			.setFooter(`Powered by Zenorz`)
			.setDescription("[**WEBP**](" + avatarURL + ")" + " | [**GIF**](" + av3 + ")");

		message.channel.send(embed);
	}
    if (command === 'embed'){
	if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("**You Dont Have Permissions To USE! - [MANAGE_MESSAGES]**");
        let color = args[0];
        if (!color) return message.channel.send("No color provided! like (#da0214)");
        let msg = message.content.slice(message.content.indexOf(args[1]), message.content.length);

        if (!msg) return message.channel.send("No message provided!");


        let emb = new Discord.MessageEmbed()

            .setColor(color)
            .setDescription(msg)
            //.setTimestamp()
            .setThumbnail(message.author.displayAvatarURL)
        message.channel.send(emb);}
	if(command === 'kick'){
		{
			//Start
			if (!message.member.hasPermission("KICK_MEMBERS"))
			  return message.channel.send(
				`You Don't Have Permission To Use This Command!`
			  );
		
			let Member = message.mentions.users.first();
		
			if (!Member)
			  return message.channel.send(
				`Please Mention A Member That You Want To Kick!`
			  );
		
			if (!message.guild.members.cache.get(Member.id))
			  return message.channel.send(`Please Mention A Valid Member!`);
		
			if (Member.id === message.author.id)
			  return message.channel.send(`You Can't Kick Your Self!`);
		
			if (Member.id === client.user.id)
			  return message.channel.send(`Please Don't Kick Me ;-;`);
		
			if (Member.id === message.guild.owner.user.id)
			  return message.channel.send(`You Can't Kick Owner Of Server!`);
		
			let Reason = args.slice(1).join(" ");
		
			let User = message.guild.member(Member);
		
			if (!User.kickable)
			  return message.channel.send(`I Can't Kick That Member!`);
		
			try {
			  console.log(`Member Is Going To Get Kick!`);
		
			  setTimeout(function() {
				User.kick({ reason: `${Reason || "No Reason Provided!"}` });
			  }, 2000);
			  const kembed = new Discord.MessageEmbed()
				.setColor(colors.red)
				.setTitle(`Member Kicked!`)
				.addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
				.addField(`Kicked Member`, `${Member.tag} (${Member.id})`)
				.addField(`Reason`, `${Reason || "No Reason Provided!"}`)
				.setFooter(`Requested by ${message.author.username}`)
				.setTimestamp();
			  if (User && Member.bot === false)
				Member.send(
				  `You Have Been Kicked From **${message.guild.name}** For ${Reason ||
					"No Reason Provided!"}`
				);
			  message.channel.send(kembed);
			  console.log(
				`User: ${Member.tag} (${Member.id}) Just Got Kicked From ${
				  message.guild.name
				} For ${Reason || "No Reason Provided!"}`
			  );
			} catch (error) {
			  return message.channel
				.send(
				  `I Can't Kick That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`
				)
				.then(() => console.log(error));
			}
		
			//End
		  }
	}
	if(command === 'ban'){
		{
			//Start
			if (!message.member.hasPermission("BAN_MEMBERS"))
			  return message.channel.send(
				`You Don't Have Permission To Use This Command!`
			  );
		
			let Member = message.mentions.users.first();
		
			if (!Member)
			  return message.channel.send(
				`Please Mention A Member That You Want To Ban!`
			  );
		
			if (!message.guild.members.cache.get(Member.id))
			  return message.channel.send(`Please Mention A Valid Member!`);
		
			if (Member.id === message.author.id)
			  return message.channel.send(`You Can't Ban Your Self!`);
		
			if (Member.id === client.user.id)
			  return message.channel.send(`Please Don't Ban Me ;-;`);
		
			if (Member.id === message.guild.owner.user.id)
			  return message.channel.send(`You Can't Ban Owner Of Server!`);
		
			let Reason = args.slice(1).join(" ");
		
			let User = message.guild.member(Member);
		
			if (!User.bannable) return message.channel.send(`I Can't Ban That Member!`);
		
			try {
			  console.log(`Member Is Going To Get Ban!`);
			  setTimeout(function() {
				User.ban({ reason: `${Reason || "No Reason Provided!"}` });
			  }, 2000);
			  let bembed = new Discord.MessageEmbed()
				.setColor(colors.red)
				.setTitle(`Member Banned!`)
				.addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
				.addField(`Banned Member`, `${Member.tag} (${Member.id})`)
				.addField(`Reason`, `${Reason || "No Reason Provided!"}`)
				.setFooter(`Requested by ${message.author.username}`)
				.setTimestamp();
			  if (User && Member.bot === false)
				Member.send(
				  `You Have Been Banned From **${message.guild.name}** For ${Reason ||
					"No Reason Provided!"}`
				);
			  message.channel.send(bembed);
			  console.log(
				`User: ${Member.tag} (${Member.id}) Just Got Banned From ${
				  message.guild.name
				} For ${Reason || "No Reason Provided!"}`
			  );
			} catch (error) {
			  return message.channel
				.send(
				  `I Can't Ban That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`
				)
				.then(() => console.log(error));
			}
		
			//End
		  }
	}
	
	if(command === 'coinflip'){
		{
			//Start
			message.delete();
			const coins = ["Heads", "Tails"];
		
			let result = Math.floor(Math.random() * coins.length);
		
			const cembed = new Discord.MessageEmbed()
			  .setColor(colors.red)
			  .setTitle(`Coin Is`)
			  .setDescription(coins[result])
			  .setFooter(`Fliped by ${message.author.username}`)
			  .setTimestamp();
		
			message.channel.send(cembed);
		
			//End
		  }
	}
	if(command === 'invite'){
		let iembed = new Discord.MessageEmbed()
		  .setColor(colors.red)
		  .setTitle(`**INVITE LINK**`)
		  .setDescription('[**LINK TO INVITE**](https://discord.com/oauth2/authorize?client_id=807153847708811274&scope=bot&permissions=8)')
		  .setFooter(`Powered by Zenorz`);
		  message.channel.send(iembed);
	}
	if (command === 'help') {
		
        const embed = new Discord.MessageEmbed()
        .setTitle('ZENORZ Commands Interface')
        .setAuthor("ZENORZ", "")
        .setColor(colors.red)
        .setDescription('These are the commands which are executable in the **ZENORZ**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Prefix: z | Powered By: ZENORZ`)
        .addField(' Fun commands' , [
           '`coinflip` , `weather`'
        ])
        .addField(':tools: Admin-Mod:' , [
            '`ban` , `prune` , `kick`, `say`,`embed`'
        ])
        //.addField(':wrench: Settings:', [
        //    '`setwlc` , `welcome-test`'
        //])
        .addField(':information_source: Information:' , [
            '`avatar` , `serverinfo` , `userinfo`'
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
            ' `invite` , `ping` , `uptime`,`support` '
        ]);
        //.addField('<a:Right_arrow:806860260237246465> __Quick Links__' , [
        //    '[GitHub](https://github.com/Exynos-Discord)・[Vote](https://top.gg/bot/764726231891312670/vote)・[Support](https://discord.gg/yZKzUxu)'
        //]);
      message.channel.send(embed);
     }
	 if (command === 'weather')
		{
			//Start
			if (!args[0]) return message.channel.send("Please Give Location!");
		
			weather.find({ search: args.join(" ") }, function(error, result) {
			  if (error) return message.channel.send(`Something Went Wrong, Try Again Later!`);
		
			  if (result === undefined || result.length === 0)
				return message.channel.send(
				  `Invalid Location, Please Give Valid Location!`
				);
		
			  var current = result[0].current;
			  var location = result[0].location;
		
			  const Weather = new Discord.MessageEmbed()
				.setColor(colors.red)
				.setTitle(`${location.name} Weather!`)
				.setDescription(`${current.skytext}`)
				.addField("Temperature", `${current.temperature}°${location.degreetype}`, true)
				.addField("Humidity", `${current.humidity}%`, true)
				.addField("Wind", current.winddisplay, true)
				.addField("Feels Like", `${current.feelslike}°`, true)
				.addField("Timezone", `UTC${location.timezone}`, true)
				.setFooter("Powered by : ZENORZ");
		
			  message.channel.send(Weather);
			});
		
			//End
		  
	 }
	 if(command === 'uptime'){
		message.channel.send(` **Uptime** - \`${ms(client.uptime, { long: true })}\``);
	 }
	 
  	//if (command === 'meme'){
	//		const subreddits = ['memes', 'DeepFriedMemes', 'bonehurtingjuice', 'surrealmemes', 'meirl', 'funny'];
	//		const data = fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
	//		.then(response => response.json())
	//		.then(body => body.data);
	//		const selected = data[Math.floor(Math.random() * data.length)];
	//		return message.channel.send(new Discord.MessageEmbed().setImage(`https://imgur.com/${selected}${selected.ex(/\?.*/, '')}`));
	  //}
	if(command === 'support'){
		let iembed = new Discord.MessageEmbed()
		  .setColor(colors.red)
		  .setTitle(`**Support server**`)
		  .setDescription('[**LINK TO INVITE**](https://discord.gg/xmf3kx5bYk)')
		  .setFooter(`Powered by Team DYNAMIC`);
		  message.channel.send(iembed);
	}
});

client.login(process.env.DISCORD_TOKEN);