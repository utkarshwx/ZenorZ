const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			
		});
	}

	async run(message) {
		const latency = message.createdTimestamp - message.createdTimestamp;
		const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!','Is it doing fine?'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		message.channel.send(`${response} - API Latency: \`${Math.round(this.client.ws.ping)}ms\` || zhelp`);
	}

};