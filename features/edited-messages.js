const Discord = require("discord.js");

const ignoredChannels = ["800722874045300763"];

module.exports = (client, instance, guild) => {
    client.on("messageUpdate", (oldMessage, newMessage) => {
        if (newMessage.author.bot) return;
        if (oldMessage.guild.id != "801905744680452097") return console.log("Wrong guild");

        if (ignoredChannels.includes(oldMessage.channel.id)) {
            return console.log("Ignored channel");
        }

        const channelID = "800722874045300765";
        const channel = oldMessage.guild.channels.cache.get(channelID);
        const EditEmbed = new Discord.MessageEmbed()
            .setColor("#fc3c3c")
            .addField(
                `**${oldMessage.guild.name}** `,
                `📝[Message](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}) verzonder door ${newMessage.author} bewerkt in ${newMessage.channel}`
            )
            .addField(`Oud bericht`, oldMessage.content)
            .addField(`Nieuw Bericht`, newMessage.content)
            .setFooter(`Bericht ID: ${oldMessage.id} • Author ID: ${oldMessage.author.id}`);
        oldMessage.channel.send(EditEmbed);
    });
};
