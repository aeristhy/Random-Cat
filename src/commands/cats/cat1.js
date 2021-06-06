const { MessageAttachment } = require('discord.js');
const { get } = require("snekfetch");


module.exports = {
	name: 'cat1',
    guildOnly: true,
    cooldown: 5,
    permissions: 'ATTACH_FILES',
	description: 'Sends cats with file attachment!',
	execute(message, args) {
		try{
            get('https://aws.random.cat/meow').then(res => {
                const test1 = new MessageAttachment(res.body.file);
                return message.channel.send(test1);
            });
        } catch(err) {
            return message.channel.send(err.stack);
        }
	},
};