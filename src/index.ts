import { Client, Guild,Intents, GuildMember, Interaction, Role } from "discord.js";
import * as config from "./config.json"


	// Create a new client instance
const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS],  retryLimit: 100 });

let guild: Guild;
let unregisteredUser: Role
let registeredUser: Role
// When the client is ready, run this code (only once)
client.once('ready', async () => {
	const guilds = await client.guilds.fetch();
	console.log('Ready!');
	guild = await guilds.at(0).fetch();
	unregisteredUser = await guild.roles.fetch('974781831864008744')
	registeredUser = await guild.roles.fetch('974782203093471292')
});

client.on('guildMemberAdd', async (member) => {
	await member.roles.add(unregisteredUser)
})

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'isimal') {
		const user = interaction.member
		const members = guild.members.cache
		members.forEach(async (item) => {
			if (item.id === user.user.id) {
				await item.roles.add(registeredUser)
				await item.roles.remove(unregisteredUser)
				await item.edit({nick: interaction.options.getString('ismin')})
			}
		})
		await interaction.reply('Kaydın başarılı.')
	}
	else if (commandName === 'server') {
		await interaction.reply('Server info.');
	}
	else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});



// Login to Discord with your client's token
client.login(config.token);
