const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

module.exports = async (client) => {
    const commands = [];

    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(process.env.TOKEN);

    try {
        console.log(`Started refreshing ${commands.length} application [/] commands.`);

        // Đảm bảo client đã sẵn sàng
        if (!client.user) {
            throw new Error('Client user not available. Make sure the bot is logged in first.');
        }

        const data = await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application [/] commands.`);
        return data;
    } catch (error) {
        console.error('Error deploying commands:', error);
        throw error;
    }
}