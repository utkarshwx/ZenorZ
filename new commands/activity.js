if (cmd === "activity") {
    const channel = message.guild.channels.cache.get(args[0]);
    if (!channel || channel.type !== "voice") return message.channel.send("❌ | Invalid channel specified!");
    if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE INSTANT_INVITE` permission");
    const activity = ACTIVITIES[args[1] ? args[1].toLowerCase() : null];
    if (!activity) return message.channel.send(`❌ | Correct formats:\n${Object.keys(ACTIVITIES).map(m => `- **${PREFIX}activity <Channel_ID> ${m}**`).join("\n")}`);

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: activity.id,
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(invite => {
            if (invite.error || !invite.code) return message.channel.send(`❌ | Could not start **${activity.name}**!`);
            message.channel.send(`✅ | Click here to start **${activity.name}** in **${channel.name}**: <https://discord.gg/${invite.code}>\n brought to you by <@271387672986124289> <3`);
        })
        .catch(e => {
            message.channel.send(`❌ | Could not start **${activity.name}**!`);
        })
}