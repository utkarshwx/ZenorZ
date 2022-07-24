const Command = require('../../Structures/Command.js');
const ms = require('ms');

module.exports = class extends Command {

    async run(message, client) {
        message.channel.send(` **Uptime** - \`${ms(this.client.uptime, { long: true })}\``);
    }
};