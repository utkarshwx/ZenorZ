const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');

module.exports = class ZENORZ extends Client {

    constructor(options = {}) {
        super({
            disableMentions : 'everyone'
        });

        this.commands = new Collection()

        this.aliases = new Collection()

        this.utils = new Util(this)

        this.commands = new Collection()

        this.once('ready', ()=>{
            console.log('ready!');
        });

        this.on('message', async (message) => {
        const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!${this.user.id}>`);

        if(!message.guild || message.author.bot) return;

        if(message.content.match(mentionRegex)) message.reply(`My prefix for guild ${message.guild.name} is \`${this.prefix}\`and \`zhelp\``);
            
        const prefix= message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.prefix;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
        if(command) {
            command.run(message, args);
        }
    });

    }
    /*validate(options) {
        /*if(typeof options !=='object') throw new TypeError('options should be a type of object');

        if(!options.token) throw new Error('you must pass the token');
        this.token = options.token;

        if(!options.prefix) throw new Error('You must pass a prefix for the client');
        if(typeof options.prefix !== 'string') throw new TypeError('prefix should be type of String');

        this.prefix = options.prefix;
    }*/

    async start(token = this.token) {
        this.utils.loadCommands();
        super.login();
    }
};