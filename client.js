const {Client, Collection, Intents, Message} = require('discord.js');

module.exports = class extends Client {
  constructor(config) {
    super({
      intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES],
      partials: ['MESSAGE', 'USER', 'GUILD_MEMBER', 'REACTION']
      
    });

    const client = new Client({
      intents:[
        "GUILDS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_INVITES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "GUILD_PRESENCES",
        "GUILD_VOICE_STATES",
        "GUILD_WEBHOOKS"
      ]
    })

    module.exports = client;

    this.commands = new Collection();

    this.config = config;
  }
};