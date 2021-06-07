const prefix = '!';

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['cmd', 'cmds'],
	usage: '[command name]',
    category: 'Utility',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

        
		if (!args.length) {
            const command = commands || commands.find(c => c.aliases && c.aliases);
            let currentCategory = "";
            let output = `**Use ${prefix}help <commandName> for details**`;
            const sorted = command.array().sort((p, c) => p.category > c.category ? 1 :  p.name > c.name && p.category === c.category ? 1 : -1 );

            sorted.forEach( c => {
                  const cat = c.category || "None";
                  if (currentCategory !== cat) {
                    output += `\u200b\n\n**${cat}**\n`;
                    currentCategory = cat;
                  }
                  output += `\`${prefix}${c.name}\` `;
                });
                message.channel.send(output);
		} else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
                return message.channel.send('Command not found.');
            }

            data.push(`**Name:** ${command.name}`);
            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
            if (command.category) data.push(`**Category:** ${command.category}` || "None");
            data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
            message.channel.send(data, { split: true });
        }
	},
};