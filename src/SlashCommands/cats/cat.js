const { CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'cat',
    description: 'Send Cats',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'embed',
            description: 'Send cat images via link',
            type: 'SUB_COMMAND'
        },
        {
            name: 'link',
            description: 'Send cat images via link',
            type: 'SUB_COMMAND'
        }
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
         if(interaction.options.getSubcommand() === 'embed') {
            const url = 'https://no-api-key.com/api/v1/animals/cat';
            let image;

            try {
                const { data } = await axios.get(url);
                image = data.image;
                const embed = new MessageEmbed()
                .setImage(image);
                await interaction.followUp({ embeds: [embed] });
            } catch(err) {
                console.log(err.stack);
            }
         } else if(interaction.options.getSubcommand() === 'link') {
             const url = 'https://no-api-key.com/api/v1/animals/cat';
             let image;

             try {
                const { data } = await axios.get(url);
                image = data.image;
                await interaction.followUp({ content: image });
            } catch(err) {
                console.log(err.stack);
            }
         }
    },
};