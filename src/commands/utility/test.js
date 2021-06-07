module.exports = {
	name: 'test',
    args: true,
    aliases: ['xd'],
    usage: '<test>',
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
	description: 'test!',
    category: 'Utility',
	execute(message, args) {
        message.channel.send(args.join(" "));
	},
};