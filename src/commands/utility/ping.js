module.exports = {
	name: 'ping',
	description: 'Pong!',
	category: 'Utility',
	execute(message, args) {
		message.channel.send('Pong!');
	},
};