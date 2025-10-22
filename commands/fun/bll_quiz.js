import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { quizzes } from "../../model/quiz.js"; 

export const data = {
  name: "bll_quiz",
  description: "Chơi quiz cùng bololo nè",
  type: 1,
};

export async function execute(interaction) {
  const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

  const embed = new EmbedBuilder()
    .setTitle("🎯 M có phải thành viên BLL thiệt k?")
    .setDescription(`🧠 **${quiz.question}**\n\nHãy chọn một đáp án bên dưới:`)
    .setColor("#1a5366");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("a").setLabel(`A. ${quiz.options.a}`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("b").setLabel(`B. ${quiz.options.b}`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("c").setLabel(`C. ${quiz.options.c}`).setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("d").setLabel(`D. ${quiz.options.d}`).setStyle(ButtonStyle.Primary)
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
            ? "✅ Chính xác rồi! Chúc mừng cưng 🎉"
            : `❌ Sai rồi! Đáp án đúng là **${quiz.answer.toUpperCase()}**`
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
        .setDescription("Quá gà nên không trả lời kịp rồi cưng ơi!")
        .setColor("#FFA500");
      await interaction.editReply({ embeds: [timeoutEmbed], components: [row] });
    }
  });
}
