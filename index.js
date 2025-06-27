const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, async readyClient => {
	const camandsdata = await require("./deploy")(readyClient);
	console.log(camandsdata);
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	
});


client.commands = new Collection();

// Load commands
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;

    const messageContent = message.content.toLowerCase();

    const responses = {  
        'i love you': 'biến liền cho mẹ',
        'vh': 'đôi mình chuột sấm sex'
    };

	if (message.mentions.has(client.user)) {
        try {
            await message.channel.send('Gọi cái loz, đang bận'); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

	
    for (const [keyword, response] of Object.entries(responses)) {
        if (messageContent.includes(keyword)) {
            try {
                await message.channel.send(response);
                break; 
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
});

console.log(`Loaded ${client.commands.size} commands`);

// Log in to Discord with your client's token
client.login(process.env.TOKEN);