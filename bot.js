const Discord = require('discord.js');
const { get } = require("snekfetch");
const config = require('./config.json');

// Declare and define your client constant
const client = new Discord.Client();
const { MessageAttachment } = require('discord.js');

// The bot's prefix
const prefix = '!';

client.on('ready', () => {
	console.log('I am ready!');
	// For an activity, do: 
	// client.user.setActivity('Name of activity');
});

client.on('message', async message => {
	
	if (message.content.startsWith(prefix + 'ping')) {
		message.channel.send("Pong!")

	}

	// Sends embedded cats
	if (message.content.startsWith(prefix + 'ecat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.MessageEmbed()
					.setImage(res.body.file)
				return message.channel.send({embed});
			});
		} catch (err) {
			return message.channel.send(err.stack);
		}
	}

	// Sends cats via File
	if (message.content.startsWith(prefix + 'cat1')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const test1 = new MessageAttachment(res.body.file)
				return message.channel.send(test1)
			})
		} catch (err) {
			return message.channel.send(err.stack)
		}

	}
	//Sends cats with links
	if (message.content.startsWith(prefix + 'cat2')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				return message.channel.send(res.body.file);
			});
		} catch (err) {
			return message.channel.send(err.stack);
		}
	}
});

// Start the client
client.login(config.token);