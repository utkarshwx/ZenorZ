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
	
    setInterval(() => client.user.setActivity(`zhelp `, {type: 'LISTENING'}), 10000);
    
    //client.user.setActivity('<activity>', { type: 'LISTENING' });
	
});

client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.cache.find(ch => ch.id === '846118443601362965');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Welcome to the server, ${member} make sure that you read rules in <#846117256987148411> and react too so that you can get access for other channels`);
  });



client.on('message', async  message => {
    if(!message.content.startsWith(prefix) || message.author.bot ) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

	if (command === 'teambots' ){
		if (message.author.id === '710336522196353045' || message.author.id === '746628803559817306' || message.author.id === '848094499619864586') {
	    const embed = new Discord.MessageEmbed()
		.setDescription(` Included bots :\n   [Dyno](https://discord.com/oauth2/authorize?client_id=161660517914509312&scope=bot%20identify%20guilds%20applications.commands&response_type=code&permissions=2134207679)
		 [Skyra](https://discord.com/oauth2/authorize?client_id=266624760782258186&permissions=491121748&response_type=code&scope=bot)  
		 [Koya](https://discord.com/oauth2/authorize?client_id=276060004262477825&scope=bot%20applications.commands&permissions=2146954359&response_type=code) 
		 [carl](https://discord.com/oauth2/authorize?&client_id=235148962103951360&scope=applications.commands+bot&permissions=2088234230&response_type=code) 
		[Owo](https://discordapp.com/oauth2/authorize?client_id=408785106942164992&permissions=1074120776&scope=bot) 
		[Dank](https://discord.com/oauth2/authorize?client_id=270904126974590976&scope=bot%20applications.commands&permissions=105227086912) 
		[Karuta](https://discord.com/oauth2/authorize?client_id=646937666251915264&permissions=379969&scope=bot) 
		[Unbleivaboat](https://discord.com/oauth2/authorize?client_id=292953664492929025&scope=bot%20applications.commands&permissions=829811966&response_type=code) 
		[Rythm](https://discord.com/oauth2/authorize?client_id=235088799074484224&permissions=3457096&scope=bot+applications.commands+identify+guilds+email&response_type=code) 
		[Fred](https://discord.com/oauth2/authorize?client_id=184405253028970496&scope=bot+identify&redirect_uri=https%3A%2F%2Ffredboat.com%2Fcallback%2Fmusic&response_type=code) 
		[Groovy](https://discord.com/oauth2/authorize?scope=bot+applications.commands+identify+guilds+email&client_id=234395307759108106&response_type=code&permissions=8) 
		[Arcane](https://discord.com/oauth2/authorize?client_id=437808476106784770&scope=bot%20applications.commands&permissions=2146958847) `)
		message.channel.send(embed);}
		else return;
	}



	if (command === 'roleinfo'){
        let role = args[0];
        if (!role) return message.reply(`**HOW TO USE**\`:- ${prefix}roleinfo <Developers || 808245641254928414>\``);

        let role1 = message.guild.roles.cache.find(roles => roles.name === args.slice(0).join(" ")) || message.guild.roles.cache.find(roles => roles.id === args.slice(0).join(" "))  ;
        if(!role1) return message.channel.send('there is no such role');

		let role2 = role1.permissions.toArray();
        let embed = new Discord.MessageEmbed()
        .setTitle(`Information about **__${role1.name}__**`)
        .setDescription(`**RoleID:** ${role1.id}\n**Hoisted:** ${role1.hoist}\n**Mentionable:** ${role1.mentionable}\n**Created:** ${role1.createdAt.toDateString()}\n**ColorCode:** ${role1.hexColor}\n**Position:** ${role1.position}\n**Members: [${role1.members.size}]** ${role1.members.map(m => m.user)}\n**Permissions:** ${role2.slice(0, 10).join(', ')}`)
        .setColor(role1.hexColor)
        message.reply(embed);
    }

	if (command === 'deleterole'){
		let role = args.slice(0).join(" ");
        if (!role) return message.reply(`**HOW TO USE**\` ${prefix}delrole <@ || >\``);

        let role1 = message.guild.roles.cache.find(roles => roles.name === args.slice(0).join(" ")) || message.guild.roles.cache.find(roles => roles.id === args.slice(0).join(" "));
        if(!role1) return message.channel.send('there is no such role');

		
		else{
			let Reason = args.slice(1).join(" ");
			role1.delete({reason : `${Reason || `No reason provided`} `})
			try {
				message.channel.send(`Role has been deleted **${role1}**`);
			}
			catch (e) {
				console.log(e.stack);
			}
		}
	}

	if (command === 'createrole'){		

		if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Missing perms of manage roles');

		
			let nameii = args[0];
			if (!nameii) return message.channel.send('Specify a name');
			else {
				let namei = args.slice(0).join(" ");
				await message.guild.roles.create({
                    name: `${namei}`,
                reason: "Role needed for Support System"
            })
			message.reply(`Role created with name ${namei}`);
		}
		
	}

	if (command === 'addrole'){
		{
			let userinfoget =
				message.mentions.members.first() ||
				message.guild.members.cache.get(args[0]) ||
				message.guild.member(message.author);
	
			let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
	
			if (!message.member.hasPermission("MANAGE_ROLES")) {
				message.channel.send("You don't have the permissions to use this command!");
			}
	
			else {
	
				if (!rMember)
					return message.channel.send("Couldn't find that user.");
	
				let role = args.join(" ").slice(23);
				if (!role)
					return message.channel.send("Specify a role!");
	
				let gRole = message.guild.roles.cache.find(roles => roles.name === role) || message.guild.roles.cache.find(roles => roles.id === role);
				if (!gRole)
					return message.channel.send("Couldn't find that role.");
	
				if (rMember.roles.cache.has(gRole.id))
					return message.channel.send("They already have that role.");
	
				else {
					rMember.roles.add(gRole.id).catch(console.error);
					const sembed = new Discord.MessageEmbed();
					sembed
						.addField(`Added Role!`, `Sucessfully added role <@&${gRole.id}> to ${rMember}`)
						.setFooter(message.author.tag + ` • Thanks for using!`, message.author.displayAvatarURL({ dynamic: true }))
						.setTimestamp()
						.setColor(userinfoget.displayHexColor);
	
					try {
						message.channel.send(`Added Role!`, `Sucessfully added role <@&${gRole.id}> to ${rMember}`);
					}
					catch (e) {
						console.log(e.stack);
					}
				}
			}}
	}

	if (command === 'color'){
		let color = args[0];
		if(!color) return message.reply(`**HOW TO USE** ${prefix}color #da0214`);

		else {
			let embed = new Discord.MessageEmbed()
			.setDescription(`**Hex:** ${color}`)
			.setColor(color)
			message.channel.send(embed);
		}
	}

	if(command === 'removerole'){
			let userinfoget =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.member(message.author);
	
			let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
	
			if (!message.member.hasPermission("MANAGE_ROLES")) {
				message.reply("You don't have the permissions to use this command!");
			}
	
			else {
	
				if (!rMember)
					return message.channel.send("Couldn't find that user, yo.");
	
				let role = args.join(" ").slice(23);
				if (!role)
					return message.channel.send("Specify a role!");
	
				let gRole = message.guild.roles.cache.find(roles => roles.name === role) || message.guild.roles.cache.find(roles => roles.id === role);
				if (!gRole)
					return message.channel.send("Couldn't find that role.");
	
				if (!rMember.roles.cache.has(gRole.id))
					return message.reply("They don't have that role.");
	
				else {
					rMember.roles.remove(gRole.id).catch(console.error);
					try {
						message.channel.send(`Removed Role!`, `Sucessfully Removed role <@&${gRole.id}> to ${rMember}`);
					}
					catch (e) {
						console.log(e.stack);
					}
				}}
	}

    if (command === 'serverroles'){

		const role2 = message.guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, 25);

		let embed = new Discord.MessageEmbed()
		.setDescription(role2)		
		.setColor(colors.red)
		await message.channel.send(embed)
	}
	if (command === 'servers'){
		message.reply(`**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()} `);
	}

	if (command === 'userinfo' || command === 'whois')
	{ 
		const flags = {
			DISCORD_EMPLOYEE: '<:discordstaff:869933025025200208>',
			DISCORD_PARTNER: '<:Partner:869933024605777982>',
			BUGHUNTER_LEVEL_1: '<:bughunterlvl1:869933025432076298>',
			BUGHUNTER_LEVEL_2: '<:bughunterlvl2:869933025167818753>',
			HYPESQUAD_EVENTS: '<:hypesquadevent:869933025071362098>',
			HOUSE_BRAVERY: '<:bravery:869933024945512530>',
			HOUSE_BRILLIANCE: '<:brilliance:869933024781950986>',
			HOUSE_BALANCE: '<:balance:869933024886816799>',
			EARLY_SUPPORTER: '<:earlysupporter:869933025369145344>',
			TEAM_USER: 'Team User',
			SYSTEM: 'System',
			VERIFIED_BOT: 'Verified Bot',
			VERIFIED_DEVELOPER: '<:BotDeveloper:869933025033596928>',
		};

		const premiumtypes = {
			0 : '',
			1 : '',
			2 : ''
		};

		const statuso = {
			online : `online (<:online:869933025130078278>)`,
			idle : `idle (<:idle:869933025046183977>)`,
			dnd : `dnd (<:dnd:869933025180401675>)`,
			offline : `offline (<:invincible:869933024651935776>)`
		}
		let target = args[0];
				
				let info;
				const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
				const roles = member.roles.cache
					.sort((a, b) => b.position - a.position)
					.map(role => role.toString())
					.slice(0, -1);
				const userFlags = member.user.flags.toArray();

				if (member.hasPermission('BAN_MEMBERS') || member.hasPermission('MUTE_MEMBERS') || member.hasPermission('DEAFEN_MEMBERS')){
					info = 'MODERATOR'
				}
				if (member.hasPermission('ADMINISTRATOR')){
					info = 'ADMINISTRATOR'
				}
				if (member.id === message.guild.ownerID){
					info = 'OWNER'
				}



				const embed = new Discord.MessageEmbed()
					.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
					.setColor(member.displayHexColor || 'RED')
					.setTitle(` ${member.user.username}#${member.user.discriminator}`)
					.setFooter(`ID: ${member.id} || Acknowledgement: ${info || 'MEMBER'}`)
					.addField(`**__USER__** `, [
						`** BADGES** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
						//`** NITRO STATUS:** ${premiumtypes ? premiumTier.map(premiumTier => premiumtypes[premiumTier]) : 'NONE' }`
						`** Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
						`** Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} (${moment(member.user.createdTimestamp).fromNow()})`,
						`** Status:** ${statuso[member.user.presence.status]}`,
						`\u200b`
					])
					.addField('**__MEMBER__**', [
						`** Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
						`** Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
						`** Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
						`** Roles [${roles.length}]:** ${roles.join(', ')}`
					]);
					try{
				return message.channel.send(embed);}
				catch{
				}message.channel.send('error');
	}
	if (command === 'membercount'){
		const mcembed = new Discord.MessageEmbed()

			.addField('Member',[
		` ${message.guild.memberCount}`])
			.setFooter(message.guild.name)
			message.channel.send(mcembed)
	}
    if(command === "serverinfo"|| command === 'guild'){
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

		const premiumtypes = {
			0 : ' ',
			1 : '<:serverlevel1:871438307362500698>',
			2 : '<:serverlevel2:871438307106639893>',
			3 : '<:serverlevel3:871438307001790515>'
		};

		const flags = {
			DISCORD_PARTNER: '<:Partner:869933024605777982>'
		};

		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
		const member = message.guild.owner;
		const userFlags = member.user.flags.toArray();

		const embed = new Discord.MessageEmbed()
			.setTitle(`**Guild information for __${message.guild.name}__**`)
			.setColor('#00000')
			.setImage(message.guild.splashURL({ dynamic : true, size : 4096}))
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setFooter(`ID: ${message.guild.id} || Region: ${regions[message.guild.region]}`)
			.addField('**__General__**', [
				`** Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID}) <:owner:869933024417050636>${userFlags.length ? userFlags.map(flag => flags[flag]) : " "}`,
				`${message.guild.premiumTier ? `** Boost Tier:**Level ${message.guild.premiumTier}(Boosts ${message.guild.premiumSubscriptionCount}) ${premiumtypes[message.guild.premiumTier]}` : ' '}`,
				`** Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`** Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`** Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})`,
				'\u200b'
			])
			.addField('**__Statistics__**', [
				`${message.guild.partnered ? `partnered: <:partneredserverowner:869933025004240976>` : " "}`,
				`${message.guild.verified ? 'verified: <:verifiedserver:870114960473194536>' : " "}`,
				`maximum joins: ${message.guild.maximumMembers}`,				
				`Role Count: ${roles.length}`,
				`Emoji Count: ${emojis.size}`,
				`Regular Emoji Count: ${emojis.filter(emoji => !emoji.animated).size}`,
				`Animated Emoji Count: ${emojis.filter(emoji => emoji.animated).size}`,
				`Member Count: ${message.guild.memberCount}`,
				`Humans: ${members.filter(member => !member.user.bot).size}`,
				`Bots: ${members.filter(member => member.user.bot).size}`,
			],true)
			.addField('**__Channels__**',[
				`${message.guild.afkChannel ? `AFK channel: ${message.guild.afkChannelID}` : ' '} `,
				`Text Channels: ${channels.filter(channel => channel.type === 'text').size} <:textchannel:869933024714846290>`,
				`Voice Channels: ${channels.filter(channel => channel.type === 'voice').size} <:voicechannel:869933024895189012>`,
				'\u200b',
			    '**__Presence__**',  
				`<:online:869933025130078278> ${members.filter(members => members.presence.status === 'online').size}`,
				`<:idle:869933025046183977> ${members.filter(members => members.presence.status === 'idle').size}`,
				`<:dnd:869933025180401675> ${members.filter(members => members.presence.status === 'dnd').size}`,
				`<:invincible:869933024651935776> ${members.filter(members => members.presence.status === 'offline').size}`,
			],true)
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
	if(command === 'avatar' || command === 'av'){
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
		message.channel.send('🔰 SLASH COMMANDS COMING SOON')
		
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
            '`ban` , `prune` , `kick`, `say`,`embed`, `deleterole`, `createrole`, `addrole`, `removerole`'
        ])
        //.addField(':wrench: Settings:', [
        //    '`setwlc` , `welcome-test`'
        //])
        .addField(':information_source: Information:' , [
            '`avatar` , `serverinfo` , `userinfo`, `roleinfo`'
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