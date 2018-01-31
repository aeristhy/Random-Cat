const Discord = require('discord.js');

//Defined it as client
const client = new Discord.Client();

const config = require('./config.json');

//Insert bot prefix
const prefix = '=='

//Install snekfetch (npm install snekfetch)
const {get} = require("snekfetch"); 

//Embed
const embed = new Discord.RichEmbed();

client.on('ready', () =>{
	console.log('I am ready!')
});


client.on('message', message => {

	//Random Cat in Embed file
	if (message.content.startsWith(prefix + 'embed-cat')) {
		try {
			get('https://random.cat/meow').then(response => {
				embed.setImage(response.body.file);
				message.channel.send({embed});
			});
		} catch (error) {
			return message.channel.send(error.stack);
		}
	};

	if (message.content.startsWith(prefix + 'cat')) {
		try {
			get('https://random.cat/meow').then(response => {
				message.channel.send({files: [{attachment: response.body.file, name: `cat.${response.body.file.split('.')[2]}`}]});
			});
		} catch (e) {
			return message.channel.send(e.stack);
		}
	};

});

//Login to discord
client.login(config.token);