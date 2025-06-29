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
        response: "Chúc mừng bạn đã chọn Zeus!"
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
        name: "Minh Phúc",
        response: "Chúc mừng bạn đã chọn Minh Phúc nhưng ảnh đang bận lo cho tương lai ảnh rồi (nhỏ khác)"
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

    collector.on('collect', async i => {
        const choiceIndex = parseInt(i.customId.replace('choice', '')) - 1;
        const selectedPerson = selectedPeople[choiceIndex];

        await i.update({
            content: selectedPerson.response,
            embeds: [],
            components: [],
        });
        collector.stop();
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            interaction.editReply({
                content: 'Đéo thể đợi nổi, tự tìm người iu đi má',
                embeds: [],
                components: [],
            });
        }
    });
}