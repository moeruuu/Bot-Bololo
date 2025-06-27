


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

module.exports.execute = async (interaction) => {
    const user = interaction.options.getUser("user") || interaction.user
    interaction.reply(user.displayAvatarURL({size: 1024}));
    return;
}