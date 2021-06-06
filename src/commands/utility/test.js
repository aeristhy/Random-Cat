module.exports = {
	name: 'test',
    args: true,
    aliases: ['xd'],
    usage: '<test>',
    guildOnly: false,
	description: 'test!',
	execute(message, args) {
        message.channel.send(args.join(" "));
	},
};