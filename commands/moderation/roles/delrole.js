const { MessageEmbed, Message } = require("discord.js");

// const errMessage = "<:failed:818800981001240617> I couldn't make changes to that role.";

module.exports = {
    category: "misc",
    cooldown: "3s",
    expectedArgs: "<role>",
    description: "Deleted the mentioned role",
    requiredPermissions: ["ADMINISTRATOR"],
    callback: async ({ message, args }) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.find((role) => role.name == args[0]) || message.guild.roles.cache.get(args[0]);

        const notFound = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> I couldn't find the role **${args[0]}**`);

        if (!role) return message.channel.send(notFound);

        const errMessageOrder = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> Make sure my highest role is above ${role.name}`);
        const cancelled = new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Cancelled deletion of ${role.name}`);
        const succesMessage = new MessageEmbed().setColor("#43b581").setDescription(`<:succes:818800870274891827> Deleted role **${role.name}**`);
        const errMessage = new MessageEmbed().setColor("#f14948").setDescription(`<:failed:818800981001240617> An error accured while trying to delete ${role.name}`);
        if (role.position >= message.guild.me.roles.highest.position) return message.channel.send(errMessageOrder);

        const botMessage = await message.channel.send(`Are you sure you want to delete **${role.name}**?`);

        botMessage.react("✅");

        const filter = (reaction, user) => {
            return reaction.emoji.name === "✅" && user.id === message.author.id;
        };

        botMessage
            .awaitReactions(filter, { max: 1, time: 10000, errors: ["time"] })
            .then(() => {
                try {
                    role.delete();
                    message.channel.send(succesMessage);
                } catch (err) {
                    message.channel.send(errMessage);
                }
            })
            .catch(() => {
                message.channel.send(cancelled);
            });
    },
};
