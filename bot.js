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
const { MessageAttachment } = require('discord.js');

// The bot's prefix
const prefix = '!';


client.on('ready', async () => {
	console.log('I am ready!');
	// For an activity, do: 
	client.user.setActivity('a cat', {
		type: 'WATCHING'
	})

	//Slash commands
	const commands = await App(testguild)
	.commands.get()
	console.log(commands)

	// await App(testguild).commands('850320778205462528').delete()

	await App().commands.post({
		data: {
			name: 'ping',
			description: 'Ping pong command'
		},
	})

	await App().commands.post({
		data: {
			name: 'ecat',
			description: 'Sends embed cats'
		}
	})

	// 	await App(testguild).commands.post({
	// 	data: {
	// 		name: 'cat1',
	// 		description: 'Send cats via file'
	// 	}
	// })

	await App().commands.post({
		data: {
			name: 'cat2',
			description: 'Send cats via URL'
		}
	})

	client.ws.on('INTERACTION_CREATE', async (interaction) => {
		const { name }  = interaction.data
		const command = name.toLowerCase()

		if (command === 'ping') {
			reply(interaction, 'Pong!')
		} else if (command === 'ecat') {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.MessageEmbed()
				.setImage(res.body.file)
				reply(interaction, embed)
			})
		} else if (command === 'cat2') {
			get('https://aws.random.cat/meow').then(res => {
				reply(interaction, res.body.file)
			})
		}
	})
})

const reply = async (interaction, response) => {
	let data = {
		content: response
	}

	//check embed
	if (typeof response === 'object') {
		data = await APIMessage(interaction, response)
	}

	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 4,
			data,
		},
	})
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

//Commands
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