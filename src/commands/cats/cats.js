const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
	name: 'cats',
    guildOnly: true,
    cooldown: 5,
    permissions: ['ATTACH_FILES', 'EMBED_LINKS'],
	description: 'Sends cats with Discord Buttons!',
	execute(message, args) {

            const ping1 = new MessageButton()
            .setLabel("Ping pong!")
            .setStyle('green')
            .setID("ping_pong")
    
            const ecat1 = new MessageButton()
            .setLabel("Embed Cats!")
            .setStyle('green')
            .setID("embed_cats")
    
            const cat1x = new MessageButton()
            .setLabel("Cats File!")
            .setStyle('green')
            .setID("file_cats")
    
            const cat2x = new MessageButton()
            .setLabel("Cats Link!")
            .setStyle('green')
            .setID("link_cats")
    
            const btns = new MessageActionRow()
            .addComponent(ping1)
            .addComponent(ecat1)
            .addComponent(cat1x)
            .addComponent(cat2x)
    
            
            message.channel.send(`Click the buttons bellow for the commands!\n\nRequested by: ${message.author.username}#${message.author.discriminator}`,{
                component: btns
        });
	},
};