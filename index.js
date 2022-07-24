const fs = require('fs');
const { Collection, Intents, MessageEmbed, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { TOKEN } = require('./verify.js');
const Client = require('./client.js');
const ms = require('ms');
/*const { mongoose } = require("mongoose");
const uri =
  "mongodb+srv://lavanox:<password>@cluster0.brhbq.mongodb.net/";
  mongoose.connect('mongodb+srv://lavanox:webx@1234@cluster0.brhbq.mongodb.net/test').
  catch(error => handleError(error));
  /*try { mongoose.connect('mongodb+srv://lavanox:<password>@cluster0.brhbq.mongodb.net/test')}
  catch(error){
	  handleError(error);
  }*/

const client = new Client();
client.commands = new Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles){
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.data.name, command);
	}	
}

   client.once('ready', () => {
		console.log('Ready!');
	
		const statuses = [ // status bot
			"/help",
			
		]
		let index = 0
		setInterval(() => {
			if (index === statuses.length) index = 0
			const status = statuses[index]
			client.user.setActivity(`${status}`, {
				type: "LISTENING",
			})
			index++
		}, 60000)
	});
	
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on("messageCreate", async message => {
    if(message.author.bot) return;
	const prefix = 'z';
	if(!message.content.startsWith(prefix)) return
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
    
    //if(message.mentions.has(client.user)) return message.reply(`Il mio prefisso è **\`${prefix}\`**, usa **\`${prefix}help\`** per la lista dei comandi`);
    
    if(message.content === 'zemojiID' && message.guild.id === "807094189752844368"){
        message.channel.send('hello');
    }	
		
		if(command === 'report')
		{
			const reportc = client.channels.cache.get('925323955131285534');
			const report = args.join(" ");
			if(!report){
				return message.channel.send('enter the description of the bug')
			}
			message.reply(`Your report has been registered team will try to fix as soon as possible`)
			const embed = new MessageEmbed()
			.setTitle("new report")
			.setDescription(`${message.author}(${message.author.id}) reported - ${report}`)
			.setColor('DARK_RED')

			reportc.send({ embeds : [embed], ephemeral: true});

		}
		if(msg.channel.id === '954587609714262036'){
			const supportmessage= message.content;
			await client.users.fetch(message.author.id).send('Moderators will soon respond to you have a good day');
			await bot.deleteMessage(message.channel.id, message.id, "Support Message");
			
			
			 
			
			bot.createMessage( bot.createChannel(msg.guildID, msg.author.username, 0, '977948187111358464').id , supportmessage);
		}
		if (command === 'teambots' ){
			if (message.author.id === '710336522196353045' || message.author.id === '746628803559817306' || message.author.id === '848094499619864586') {
			const embed = new MessageEmbed()
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
		
});

client.on("messageCreate", async message => {
if ((
  message.content.match("discord.gg") ||
  message.content.match("www.")) &&
  (message.guild.id == '807094189752844368' || message.guild.id === '930062939040387103'|| message.guild.id === '790461963577720852' || message.guild.id === '925774439382134785' || message.guild.id === '901672008557928458' || message.guild.id === '774866113888256004' || message.guild.id === '795024125214851112')&&
	
	(!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || !message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS]) || !message.member.permissions.has([Permissions.FLAGS.EMBED_LINKS]))
) {
  message.delete();
  let msg = message.channel.send("No links allowed while anti-invite is active!").then((msg) => {
	  let time = "15s";
	  setTimeout(function () {
		msg.delete();
	  }, ms(time));
	});
}


});
const whitelisted = [
	'807094189752844368',
	'790461963577720852'
]

client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = client.channels.cache.get('902386745281228833');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Welcome to the server, ${member} make sure that you read rules`)
	

	let msg = channel.send(`Welcome to the server, ${member} make sure that you read rules`).then((msg) => {
		let time = "90s";
		setTimeout(function () {
		  msg.delete();
		}, ms(time));
  });
});

client.on("guildCreate", guildi => {
	
    const embed = new MessageEmbed()
        .setTitle("I'm added to a new server")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`I'm added to ${guildi.name},with ${guildi.memberCount}\nTotal server: ${client.guilds.cache.size}\nTotal users: ${client.users.cache.size}`)
        .setTimestamp()
		.setFooter(`${guildi.id}`)
    const logchannel = client.channels.cache.get('929592014171955250');
    logchannel.send({ embeds: [embed] })

	/*async function run() {
		try {
		  await clientmg.connect();
		  const database = clientmg.db("Lavanox");
		  const haiku = database.collection("guild_data");
		  // create a document to insert
		  const doc = {
			guildID: `${guildi.id}`,
			antilink: "false",
			modlog: "false",
			memberlog: "false"
		  }
		  const result = await haiku.insertOne(doc);
		  console.log(`A document was inserted with the _id: ${result.insertedId}`);
		} finally {
		  await clientmg.close();
		}
	  }
	  run().catch(console.dir);*/
})
client.on("guildDelete", guildi => {

    const embed = new MessageEmbed()
        .setTitle("I'm left a new server")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`I'm left to ${guildi.name},that had ${guildi.memberCount}\nTotal server: ${client.guilds.cache.size}\nTotal users: ${client.users.cache.size}`)
        .setTimestamp()
		const logchannel = client.channels.cache.get('929592014171955250');
    logchannel.send({ embeds: [embed] })

	
});

/*async function run() {
  try {
    await clienti.connect();
    const database = clienti.db("insertDB");
    const foods = database.collection("foods");
    // create an array of documents to insert
    const docs = [
      { name: "cake", healthy: false },
      { name: "lettuce", healthy: true },
      { name: "donut", healthy: false }
    ];
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await foods.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    // Ensures that the client will close when you finish/error
    await clienti.close();
  }
}
run().catch(console.dir);*/


client.login(TOKEN);