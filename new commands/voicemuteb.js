const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
        name: "voicemute",
        description: "vcmutes a member in voice channel",
        usage: "voicemute <member>",
        aliases: ['vcmute'],
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("MUTE_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("<:redCross:796258564640866374> | **You Dont Have The Permissions To VoiceMute Users!**");
        
         let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0]);

        if(!member) return message.channel.send("<:redCross:796258564640866374> | Unable to find the mentioned user in this guild.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Reason Provided"

        try {
            member.voice.setMute(true, reason);
            message.channel.send("<:zep_check:860115416952995850> | Member was Voice Muted!")
        } 
        
        catch(error) {
            console.log(error);
            message.channel.send("<:redCross:796258564640866374> | Oops! An unknown error occured. Please try again later.")
        }

    }
} 