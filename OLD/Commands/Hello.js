const Command = require('../Structures/Command.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args,{
            aliases: ['hey'] 
        })
    }
    async run(message, args){
        message.reply('hello');
    }
};