const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const express = require('express');
require('dotenv').config();

//Tạo Express server
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        status: 'Bot đang chạy!',
        bot_name: 'Súc Vật',
        uptime: Math.floor(process.uptime()) + ' giây',
        commands: ['avatar', 'ping', 'bll_random'],
        message: 'Discord bot đang hoạt động bình thường'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Web server chạy trên port ${PORT}`);
});

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, async readyClient => {
	const camandsdata = await require("./deploy")(readyClient);
	console.log(camandsdata);
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	
});


client.commands = new Collection();

// Load commands
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;

    const messageContent = message.content.toLowerCase();

    const responses = {  
        'love': 'biến liền cho mẹ',
        'vh': 'đôi mình chuột sấm sex',
		'cel': 'chúng mày lên đây giải thích hộ tao cái ?',
		'mie':'đội 2 nón bảo hiểm kệ mẹ kao',
		'identity v': 'game bệnh hoạn',
		'gem': 'suốt ngày gem, đéo lo học',
		'uhl': 'Nhìn mặt qi đũy vãi',
		'hl': 'gái mẹ m',
		'học': 'Chị không muốn nói đâu, nhưng mà tụi em làm chị buồn cười ghê. @Phát Vĩnh à, em tưởng em là ai? Một đứa chuyên copy tính cách người khác, sống ảo đến mức quên cả mình là ai mà cũng bày đặt lên giọng đạo lý? Ngày trước chị thấy em dễ thương, giờ nhìn em là thấy một tập hợp của toàn những mảnh vá từ người khác, không có gì là bản gốc. Rồi tới em, @uchiha sasusu. Trên mạng thì như thiên thần, ngoài đời thì đúng là "thánh diễn". Nói xấu bạn sau lưng rồi quay lại ôm vai bá cổ cười như chưa có chuyện gì. Em sống như vậy được bao lâu nữa? Em nghĩ lòng tin của người khác là đồ chơi chắc? Nhìn lại xem, bao nhiêu người từng tốt với em, giờ họ ở đâu rồi? Hay là họ đã nhận ra mặt thật của em? @Hy Lam  – cái tên nghe như bước ra từ phim Marvel nhưng hành xử thì y như vai phản diện rẻ tiền. Đừng nghĩ mình cool ngầu khi đứng giữa drama mà nói “Tôi không liên quan”. Người không liên quan không phải là người im lặng khi thấy bất công, mà là người không góp phần tạo ra nó. Em chọn đứng ngoài, nhưng thật ra em là đứa ném đá rồi giấu tay đầu tiên. Còn @Lô Tô – em là đỉnh cao của sự “hiền giả tạo”. Ngoài mặt thì lúc nào cũng "mình không muốn xen vào chuyện người khác", nhưng sau lưng thì tin nhắn em gửi đi còn nhiều hơn status trên tường Facebook. Chị phục em thật, vừa có tài hai mặt, vừa có duyên khiến người ta tin em là nạn nhân. Nhưng em ơi, đừng nghĩ ai cũng mù. Chị đã im lặng lâu rồi, nhưng không có nghĩa là chị mù quáng. Một khi đã đủ thất vọng, thì người hiền nhất cũng biết nói. Tụi em diễn hay thật, nhưng diễn mãi cũng sẽ đến lúc khán giả ném dép. Người ta có thể tha thứ cho sự dại dột, chứ không tha thứ cho sự giả tạo có đầu tư. Nên từ nay, đừng nhắn tin hỏi “Sao chị lạnh nhạt?”, “Sao chị không chơi với tụi em nữa?”, “Sao chị lạ quá vậy?” — tụi em biết lý do mà. Lạ là vì chị không còn ngu như trước. Lạnh là vì chị đã đóng băng mọi cảm xúc dành cho những người chỉ biết yêu bản thân mình. Và không chơi nữa là vì, chị học được bài học lớn nhất.',
		'cl': 'học ngu thích bú cu tài phiệt',
		'doctor':'Mấy con đũy doctor chơi như l',
		'gacha': 'Dính vào là dở rồi',
		'kệ': 'Đéo thích kệ thì sao?',
		'su': 'Mỹ nữ xinh đẹp tuyệt trần chỉ có Susu',
		'ynl': 'canh khổ qua nội nấu chê đắng\nbước ra đời ngậm đắng nuốt cay',
		'sợ': 'Cuộc đời t đéo biết sợ là gì',
		'dở': 'Làm như m hay lắm á',
		'súc vật': 'Nhắc gì t? Mê t hay gì?',
		'kem': 'Đợi xíu, đi nấu kem ~',
		'xin lỗi': 'Tao đéo chấp nhận lời xin lỗi tệ hại này',
		'chửi': 'Chửi lòi bản họng nó cho tao',
		'bll': 'Một lũ bênh hoạn',
		'sủa': 'Lấy cái lí do hãm l nào trên đời set ảnh với tên người khác làm group chat ? Sủa lên cho t coi',
		'p5': 'Anh Ren đẹp zai số 1 thế giới',
		'707': 'Anh 707 là chồng chị đẹp Susu',
		'múi': 'Hãy cho Susu liếm múi đi mè :<',
		'sếu': 'Gơ phố này đang chơi les với Susu rùi nhé :)))',
		'grey': 'Ai không nghe nhạc Grey D là con chó',
		'na': 'Thổi bong bóng bằng lỗ mũi đỉnh đấy bro',
		'im': 'uk, câm mẹ mồm vào',
		'locket': 'Qi có dùng locket 0?\nQi kh dùng lockettttt\n(cr cua em de huong chet di duoc)',
		'kiên': '',
		'bot': 'Nói gì bé dzợ?',
		'decode': 'Nhửa nháy nhái nhon nhọc',
		'bệnh': 'Chữa bệnh md của mày',
		'like': '1 like = 1 phút không coi hentai',
		'hentai': 'Vậy tao vẫn đc coi hentai à',
		'láo': 'Thấy cây kim tiêm xong lưng tao không? Để đút đít mày khi mày láo đấy',
		'nân': 'Tui mời mila làm QTV hết rồi đó nhưng thay đổi tên gúp hay gì phải báo tui nha. Tui hơi tức vụ con Na đối tên gúp không báo rồi đó',
		'nứng': 'Tao máu M càng đập càng nứng'
    };

	if (message.mentions.has(client.user)) {
        try {
			const mention_responses = [
            'Gọi cái loz, đang bận ngắm múi zai rồi',
            'Biến cho mẹ',
			'Chỉ có công chúa Susu mới được gọi tao',
			'Phuyền quá nha con đũy',
			'G-Gọi tui chi dzạ? B-Baka!!!',
			'Kick ra server bây giờ',
			'Cho tui đồ chơi thõa mãn ddiii ~',
			'Nín mỏ chó lại',
        	];
			const randomResponse = mention_responses[Math.floor(Math.random() * mention_responses.length)];
            await message.channel.send(randomResponse); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

	
    for (const [keyword, response] of Object.entries(responses)) {
        if (messageContent.includes(keyword)) {
            try {
                await message.channel.send(response);
                break; 
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
});

console.log(`Loaded ${client.commands.size} commands`);

// Log in to Discord with your client's token
client.login(process.env.TOKEN);