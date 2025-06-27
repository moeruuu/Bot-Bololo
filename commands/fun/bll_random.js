const { default: mongoose } = require('mongoose');
const db = require('../../database/db');
const image_bololo = require('../../model/image_bololo');
module.exports.data = {
    name: "bll_random",
    description: "Chọn 1 người bất kỳ để có ảnh 6 nè",
    type: 1,
    option: [],
    integration_types: [0],
    contexts: [0, 1, 2],
}

module.exports.execute = async (interaction) => {
    const mongodb_string = process.env.MONGODB;
    
    try {
        
        await db.connect();
        const collection = image_bololo

        const randomImage = await collection.aggregate([{ $sample: { size: 1 } }]);
    
         if (randomImage.length > 0 && randomImage[0].url) {
            if (randomImage[0].url.startsWith('https://')) {
                await interaction.reply({
                    content: 'Á à, con đĩ nào nè',
                    embeds: [{
                        image: { url: randomImage[0].url },
                        color: 0xFF80B7
                    }]
                });
            } else {
                await interaction.reply({ content: 'URL ảnh không hợp lệ!', ephemeral: true });
            }
        } else {
            await interaction.reply({ content: 'Không tìm thấy ảnh trong database!', ephemeral: true });
        }
    } catch (error) {
        console.error('Lỗi:', error);
        await interaction.reply({ content: `Đã có lỗi xảy ra: ${error.message}`, ephemeral: true });
    }

    
}
