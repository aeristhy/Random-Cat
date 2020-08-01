const Discord = require('discord.js');
const { get } = require("snekfetch"); 
const config = require('./config.json');

// Declare and define your client constant
const client = new Discord.Client();

// The bot's prefix
const prefix = '==';

client.on('ready', () => {
	console.log('I am ready!');
	// For an activity, do: 
	// client.user.setActivity('Name of activity');
});

client.on('message', async message => {
	// Embedded
	if(message.content.startsWith(prefix + 'ecat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.MessageEmbed()
				.setImage(res.body.file)
				return message.channel.send({embed});
			});
		} catch(err) {
			return message.channel.send(err.stack);
		}
	}
	
	// Non-embedded
	if(message.content.startsWith(prefix + 'cat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				return message.channel.send({files: [{attachment: res.body.file, name: `cat.${res.body.file.split('.')[2]}`}]});
			});
		} catch(err) {
			return message.channel.send(err.stack);
		}
	}
});

// Start the client
client.login(config.token);
