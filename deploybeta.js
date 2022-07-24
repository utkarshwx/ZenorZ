const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId} = require('./config.json');
const { TOKEN } = require('./verify.js')

const commands = [];
const commandFiles = fs.readdirSync('./commandsg').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commandsg/${file}`);
	commands.push(command.data.toJSON());
}

const guildId = '807094189752844368';

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();