
module.exports.data = {
    name: "ping",
    description: "Con cac",
    type: 1,
    option: [],
    integration_types: [0],
    contexts: [0, 1, 2],
}

module.exports.execute = async (interaction) => {
    const ping = interaction.client.ws.ping;
    interaction.reply("con cac ne");
    return;
}