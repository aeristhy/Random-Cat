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

client.on('message', msg => {
	// Embedded
	if(msg.content.startsWith(prefix + 'ecat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				.setImage(res.body.file)
				return msg.channel.send({embed});
			});
		} catch(err) {
			return msg.channel.send(err.stack);
		}
	}
	
	// Non-embedded
	if(msg.content.startsWith(prefix + 'cat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				return msg.channel.send({files: [{attachment: res.body.file, name: `cat.${res.body.file.split('.')[2]}`}]});
			});
		} catch(err) {
			return msg.channel.send(err.stack);
		}
	}
});

// Start the client
client.login(config.token);
