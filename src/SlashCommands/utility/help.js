const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "help",
    description: "View some useful information on how to use this bot.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Message} message
     */
    run: async (client, interaction, message) => {
        const embed = new MessageEmbed()
        .setTitle('Random Cat')
        .setDescription(`Hey, there! I am a Open Source Discord bot that send random cat images.\n`+
        'To selfhost me, follow this instructions [in my github](https://github.com/aeristhy/Random-Cat)\n\n'+
        'Here are my commands:\n'+
        '▫️ `/ping`\n▫️ `/cat`\n\n')

        interaction.followUp({ embeds: [embed] });
    },
};
