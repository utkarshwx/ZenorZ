module.exports = {
    config: {
        name: "vckick",
        description: "kicks a member from voice channel",
        usage: "vckick <user>",
        aliases: ['vcdisconnect', 'voicekick'],
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("MOVE_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("<:redCross:796258564640866374> | **You Dont Have The Permissions To VoiceKick Users!**");
        
         let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0]);

        if(!member) return message.channel.send("<:redCross:796258564640866374> | Unable to find the mentioned user in this guild.")

        if(!member.voice.channel) return message.channel.send('<:redCross:796258564640866374> | **User needs to connected in a voice channel to be disconnected.**')

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Reason Provided"

        try {
            member.voice.kick(reason);
            message.channel.send("<:zep_check:860115416952995850> | Member Disconnected/Voice Kicked!")
        } 
        
        catch(error) {
            console.log(error);
            message.channel.send("<:redCross:796258564640866374> | Oops! An unknown error occured. Please try again later.")
        }

    }
}