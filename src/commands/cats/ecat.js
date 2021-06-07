const Discord = require('discord.js');
const { get } = require("snekfetch");


module.exports = {
	name: 'ecat',
    guildOnly: true,
    cooldown: 5,
    permissions: 'EMBED_LINKS',
	description: 'Sends cats with Embed!',
    category: 'Cats',
	execute(message, args) {
		try{
            get('https://aws.random.cat/meow').then(res => {
                const embed = new Discord.MessageEmbed()
                .setImage(res.body.file);
                return message.channel.send(embed);
            });
        } catch(err) {
            return message.channel.send(err.stack);
        }
	},
};