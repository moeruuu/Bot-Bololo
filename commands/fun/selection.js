module.exports.data = {
    name: "selection",
    description: "Chọn ny tương lai nè",
    type: 1,
    option: [],
    integration_types: [0],
    contexts: [0, 1, 2],
}

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const people = [
    {
        name: "Duy Đại",
        response: "Chúc mừng bạn đã chọn Duy Đại! Trai y ngày ngủ đêm đi chơi với nhiều em gái!"
    },
    {
        name: "Kim Ngân",
        response: "Chúc mừng bạn đã chọn Kim Ngân! Gái qbu, đè ra đòi đụ!"
    },
    {
        name: "Đình Duy",
        response: "Chúc mừng bạn đã chọn Đình Duy! Trai Hà Nội rủ bạn ra để ngủ chung!"
    },
    {
        name: "Tùng Lâm",
        response: "Chúc mừng bạn đã chọn Tùng Lâm! Mình mập mờ tiếp được không?"
    },
    {
        name: "Zeus",
        response: "Chúc mừng bạn đã chọn Zeus! Thánh đụ của năm"
    },
    {
        name: "Minh Khuồi",
        response: "Chúc mừng bạn đã chọn Minh Khuồi! Minh Khuồi đang chờ bạn đạp xe đạp xún Biên Hòa nè!"
    },
    {
        name: "Minh Đức",
        response: "Chúc mừng bạn đã chọn Minh Đức! Minh Đức đang chờ bạn chat sẽ nè fen"
    },
    {
        name: "Hiển An",
        response: "Chúc mừng bạn đã chọn Hiển An! Trai phố nhìn tưởng là mình ngầu lắm"
    },
    {
        name: "Hồng Quân",
        response: "Chúc mừng bạn đã chọn Hồng Quân! Boy kiểm soát thèm đụ"
    },
    {
        name: "Jun Bùi",
        response: "Chúc mừng bạn đã chọn Jun Bùi nhưng ảnh đang bận lo cho tương lai ảnh rồi (chơi đá)"
    },
    {
        name: "Phúc Trường",
        response: "Chúc mừng bạn đã chọn Phúc Trường! Dù thế nào thì ảnh vẫn iu nhỏ khác (nyc)"
    },
    {
        name: "Minh Phúc",
        response: "Chúc mừng bạn đã chọn Minh Phúc! Trai uit thèm đụ nhưng nếu bạn từ chối thì ảnh bảo: \n'em cần hs với ng tốt hơn'"
    },
    {
        name: "Đức Lương",
        response: "Chúc mừng bạn đã chọn Đức Lương nhưng ảnh bận quẹt tinder gái khác rồi"
    }
];

const image = [
    'https://i.pinimg.com/474x/52/5b/d5/525bd53a019dded63d73a7fcaa322186.jpg',
    'https://stickerly.pstatic.net/sticker_pack/GKxNn91GyJYvRhMszE6eOQ/FDXTPM/37/-976607614.png',
    'https://i.pinimg.com/564x/85/bd/06/85bd06c324ea37c5eadec42c5927c154.jpg',
    'https://micmictala.wordpress.com/wp-content/uploads/2014/09/ideology-on-love-funny-meme-610x9221.jpg?w=640',
    'https://i.ytimg.com/vi/uqL8Rk43kP8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC0SqNjE0p32_s70gT7Rg9TffA5kQ',
    'https://media.tenor.com/gYve5YxIJHYAAAAM/love.gif',
    'https://sayingimages.com/wp-content/uploads/funny-i-love-you-funny-meme.jpg',
    'https://images3.memedroid.com/images/UPLOADED204/6266b5e7d9e14.jpeg',
    'https://i.redd.it/zm6im9lo45w91.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2018/11/wholesome-loving-relationship-memes-150-5bed968a30965__700.jpg',

]

module.exports.execute = async (interaction) => {
    const shuffled = people.sort(() => 0.5 - Math.random());
    const selectedPeople = shuffled.slice(0, 3);

    const embed = new EmbedBuilder()
        .setTitle('Chọn bạn để iu nè mí mom')
        .setDescription('Thấy ai hợp lý thì pick nhé')
        .setColor('#ce4040')
        .addFields(
            selectedPeople.map(person => ({
                name: person.name,
                value: ' ',
                inline: true
            }))
        );

    const row = new ActionRowBuilder()
        .addComponents(
            selectedPeople.map((person, index) =>
                new ButtonBuilder()
                    .setCustomId(`choice${index + 1}`)
                    .setLabel(person.name)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('😊')
            )
        );

    await interaction.reply({
        embeds: [embed],
        components: [row],
    });

    const filter = i => i.customId.startsWith('choice') && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    const randomImage = image[Math.floor(Math.random() * image.length)];
    collector.on('collect', async i => {
        const choiceIndex = parseInt(i.customId.replace('choice', '')) - 1;
        const selectedPerson = selectedPeople[choiceIndex];

        const responseEmbed = new EmbedBuilder()
            .setTitle('Chúc đầu bạc trăng long nhé!')
            .setDescription(selectedPerson.response)
            .setColor('#ce4040')
            .setImage(randomImage);

        await i.update({
            embeds: [responseEmbed],
            components: [],
        });
        collector.stop();
    });
    collector.on('end', collected => {
        if (collected.size === 0) {
            interaction.editReply({
                content: 'Chọn ny mà lề mà lề mề, tự tìm người iu đi má',
                embeds: [],
                components: [],
            });
        }
    });
}