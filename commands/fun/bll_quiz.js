import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";   
import {quizzes} from "../../model/quiz.js";
module.exports.data = { 
    name: "bll_quiz",
    description: "Chơi quiz cùng bololo nè",
    type: 1,
}

module.exports.execute = async (interaction) => {
    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

    const embed = new EmbedBuilder()
      .setTitle("🎯 M có phải thành viên bll thiệt k?")
      .setDescription(`🧠 **${quiz.question}**\n\nHãy chọn một đáp án bên dưới:`)
      .setColor("#1a5366ff");
    
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("a").setLabel('a. ${quiz.options.a}').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("b").setLabel('b. ${quiz.options.b}').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("c").setLabel('c. ${quiz.options.c}').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("d").setLabel('d. ${quiz.options.d}').setStyle(ButtonStyle.Primary),
    );

     await interaction.reply({ embeds: [embed], components: [row] });

     const collector = interaction.channel.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 30000, 
      max: 1,
    });

     collector.on("collect", async (i) => {
        const answer = i.customId;
        const isCorrect = answer === quiz.answer;

        row.components.forEach((btn) => btn.setDisabled(true));
        const resultEmbed = new EmbedBuilder()
            .setTitle("🎯 Quiz cùng Bololo")
            .setDescription(
            `🧠 **${quiz.question}**\n\nCưng chọn: **${answer.toUpperCase()}**\n\n${
                isCorrect
                ? "✅ Chính xác rồi! Chúc mừng cưng"
                : "❌ Sai rồi! Thử lại lần sau nhé cưng"
            }`
            )
            .setColor(isCorrect ? "#00FF7F" : "#FF6347");

        await i.update({ embeds: [resultEmbed], components: [row] });
    });

    collector.on("end", async (collected) => {
      if (collected.size === 0) {
        row.components.forEach((btn) => btn.setDisabled(true));
        const timeoutEmbed = new EmbedBuilder()
          .setTitle("⏰ Hết thời gian!")
          .setDescription(`Quá gà nên không trả lời kịp rồi cưng ơi!`)
          .setColor("#FFA500");
        await interaction.editReply({ embeds: [timeoutEmbed], components: [row] });
      }
    });


}