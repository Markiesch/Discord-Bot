module.exports = {
    category: "Moderation",
    description: "Makes sure users cant send messages to the mentioned channel",
    expectedArgs: "[channel]",
    guildOnly: true,
    requiredPermissions: ["ADMINISTRATOR"],
    callback: ({ message, guild }) => {
        const targetChannel = message.mentions.channels.first() || message.channel;

        // Guild ID is the same as the everyone role ID
        const everyoneID = message.guild.id;

        targetChannel.updateOverwrite(everyoneID, {
            SEND_MESSAGES: false,
        });

        targetChannel.send(`**${targetChannel.name}** has been locked :lock:`);
    },
};
