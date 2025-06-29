
module.exports.data = {
    name: "help",
    description: "Cần gì chị giúp cưng?",
    type: 1,
    option: [],
    integration_types: [0],
    contexts: [0, 1, 2],
}

const { EmbedBuilder } = require('discord.js');
module.exports.execute = async (interaction) => {
    const embed = new EmbedBuilder()
        .setTitle(`Chị tới để mở to con mắt mày ra nè!`)
        .setDescription('/avatar : lấy avatar\n/bll_random: lấy ảnh dìm bololo\n/selection: chọn ny nè')
        .setColor('#7896e3')
        .setImage('https://res.cloudinary.com/dfoxmedhg/image/upload/v1751188953/Screenshot_2025-06-29_153436_idvd5k.png')
        .setFooter({text: 'Phát triển bởi: moeru.owo - Bololo'})
    await interaction.reply({ embeds: [embed] });
}