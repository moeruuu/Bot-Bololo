


module.exports.data = {
    name: "avatar",
    description: "Xem ảnh đại diện của mí đứa ml nhen",
    type: 1,
    option: [{
        name: "user",
        description: "Chọn một đứa có avatar xấu xí nè",
        type: 6,
        require: false,
    }],
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}

const { EmbedBuilder } = require('discord.js');
module.exports.execute = async (interaction) => {
    const user = interaction.options.getUser("user") || interaction.user;
    const embed = new EmbedBuilder()
        .setTitle(`Avatar của con đũy ${user.username} xấu ỉa`)
        .setImage(user.displayAvatarURL({ size: 1024 }))
        .setColor('#0099ff');
    await interaction.reply({ embeds: [embed] });
}