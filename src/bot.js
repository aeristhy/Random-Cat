const Discord = require('discord.js');
const { get } = require("snekfetch");
const config = require('../config.json');
const fs = require('fs');

// Declare and define your client constant
const client = new Discord.Client();
require('discord-buttons')(client);
const { MessageAttachment } = require('discord.js');
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync(require("path").join(__dirname, "./commands"))


for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(require("path").join(__dirname, `./commands/${folder}`)).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


// The bot's prefix
const prefix = '!';

client.on('ready', async () => {
	console.log('I am ready!');
	// For an activity, do: 
	client.user.setActivity('a cat', {
		type: 'WATCHING'
	});
});


//The button functions
client.on('clickButton', (button, message) => {
	if (button.id == 'ping_pong') {
		button.defer();
		button.message.delete();
		button.channel.send("Pong!");
	} else if (button.id == 'embed_cats') {
		button.defer();
		button.message.delete();
		get('https://aws.random.cat/meow').then(res => {
			const embed = new Discord.MessageEmbed()
			.setImage(res.body.file);
			button.channel.send({embed});
		});
	} else if (button.id == 'link_cats') {
		button.defer();
		button.message.delete();
		get('https://aws.random.cat/meow').then(res => {
			button.channel.send(res.body.file);
		});
	} else if (button.id == 'file_cats') {
		button.defer();
		button.message.delete();
		get('https://aws.random.cat/meow').then(res => {
			const test1 = new MessageAttachment(res.body.file);
			button.channel.send(test1);
		});
	}
});

//Commands
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.channel.send('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.channel.send('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = 'You didn\'t provide any arguments!';
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		} return message.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('An error occured: ' + error);
	}
});

// Start the client
client.login(config.token);