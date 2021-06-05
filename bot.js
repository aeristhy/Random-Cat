const Discord = require('discord.js');
const { get } = require("snekfetch");
const config = require('./config.json');
const testguild = "419724812592611338"

const App = (testguild) => {
	const app = client.api.applications(client.user.id)
	if (testguild) {
		app.guilds(testguild)
	}
	return app
}

// Declare and define your client constant
const client = new Discord.Client();
require('discord-buttons')(client);
const { MessageAttachment } = require('discord.js');


// The bot's prefix
const prefix = '!';

client.on('ready', async () => {
	console.log('I am ready!');
	// For an activity, do: 
	client.user.setActivity('a cat', {
		type: 'WATCHING'
	});

	//Slash commands
	const commands = await App(testguild)
	.commands.get()
	console.log(commands)

	// await App(testguild).commands('850716731264466954').delete()

	await App(testguild).commands.post({
		data: {
			name: 'test',
			description: 'test'
		},
	});

	await App().commands.post({
		data: {
			name: 'ping',
			description: 'Ping pong command'
		},
	});

	await App().commands.post({
		data: {
			name: 'ecat',
			description: 'Sends embed cats'
		}
	});

	await App().commands.post({
		data: {
			name: 'cat2',
			description: 'Send cats via URL'
		}
	});

	client.ws.on('INTERACTION_CREATE', async (interaction) => {
		const { name }  = interaction.data
		if(!name) return;
		const command = name.toLowerCase();

		if(command === 'test') {
			reply(interaction, 'test');
		} else if (command === 'ping') {
			reply(interaction, 'Pong!');
		} else if (command === 'ecat') {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.MessageEmbed()
				.setImage(res.body.file)
				reply(interaction, embed);
			});
		} else if (command === 'cat2') {
			get('https://aws.random.cat/meow').then(res => {
				reply(interaction, res.body.file);
			});
		}
	});
});

const reply = async (interaction, response) => {
	let data = {
		content: response
	}

	//check embed
	if (typeof response === 'object') {
		data = await APIMessage(interaction, response);
	}

	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 4,
			data,
		},
	});
}

const APIMessage = async (interaction, content) => {
	const { data, files } = await Discord.APIMessage.create(
		client.channels.resolve(interaction.channel_id),
		content
	)
	.resolveData()
	.resolveFiles()

	return { ...data, files }
}

//The button functions
client.on('clickButton', (button, message) => {
	if (button.id == 'ping_pong') {
		button.defer();
		button.message.edit("Pong!");
	} else if (button.id == 'embed_cats') {
		button.defer();
		get('https://aws.random.cat/meow').then(res => {
			const embed = new Discord.MessageEmbed()
			.setImage(res.body.file);
			button.message.edit({embed});
		});
	} else if (button.id == 'link_cats') {
		button.defer();
		get('https://aws.random.cat/meow').then(res => {
			button.message.edit(res.body.file);
		});
	} else if (button.id == 'file_cats') {
		button.defer();
		get('https://aws.random.cat/meow').then(res => {
			const test1 = new MessageAttachment(res.body.file);
			button.channel.send(test1);
		});
	}
});

//Commands
client.on('message', async message => {

	//Message buttons
	if(message.content.startsWith(prefix + 'buttons')) {
		const { MessageButton, MessageActionRow } = require('discord-buttons');

		const ping1 = new MessageButton()
		.setLabel("Ping pong!")
		.setStyle('green')
		.setID("ping_pong")

		const ecat1 = new MessageButton()
		.setLabel("Embed Cats!")
		.setStyle('green')
		.setID("embed_cats")

		const cat1x = new MessageButton()
		.setLabel("Cats File!")
		.setStyle('green')
		.setID("file_cats")

		const cat2x = new MessageButton()
		.setLabel("Cats Link!")
		.setStyle('green')
		.setID("link_cats")

		const btns = new MessageActionRow()
		.addComponent(ping1)
		.addComponent(ecat1)
		.addComponent(cat1x)
		.addComponent(cat2x)

		
		message.channel.send("Click the buttons bellow for the commands!",{
			component: btns
		})
	}
	
	if (message.content.startsWith(prefix + 'ping')) {
		message.channel.send("Pong!");
	}

	// Sends embedded cats
	if (message.content.startsWith(prefix + 'ecat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.MessageEmbed()
					.setImage(res.body.file);
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
				const test1 = new MessageAttachment(res.body.file);
				return message.channel.send(test1);
			})
		} catch (err) {
			return message.channel.send(err.stack);
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