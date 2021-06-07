const { get } = require("snekfetch");

module.exports = {
	name: 'cat2',
    guildOnly: true,
    cooldown: 5,
    permissions: 'EMBED_LINKS',
	description: 'Sends cats with links!',
    category: 'Cats',
	execute(message, args) {
		try{
            get('https://aws.random.cat/meow').then(res => {
                return message.channel.send(res.body.file);
            });
        } catch(err) {
            return message.channel.send(err.stack);
        }
	},
};