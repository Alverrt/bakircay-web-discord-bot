
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
import { SlashCommandBuilder } from "@discordjs/builders";
import * as config from "./config.json"

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!').addStringOption(option => option.setName('ismin').setDescription('Sunucuya kayıt olacağın kendi gerçek ismin.')),
	new SlashCommandBuilder().setName('isimal').setDescription('Gerçek isminizi yazarak kullanıcı adınızı değiştirir ve sunucuya kayıt olursunuz.').addStringOption(option => option.setName('ismin').setDescription('Sunucuya kayıt olacağın kendi gerçek ismin.').setRequired(true)),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.token);

rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);