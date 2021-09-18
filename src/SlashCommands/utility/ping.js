const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping-pong!",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: 'Pong!' });
    },
};
