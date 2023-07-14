const { Discord, Events, GatewayIntentBits, Client, Collection } = require('discord.js');


//Checagem de inatividade
const TIMEOUT = 15 * 60 * 1000; // 15 minutos em milissegundos
let voiceConnectionTimeouts = new Map();

//.ENV
const dotenv = require('dotenv').config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

const PREFIX = 'm.play ';

//Command Handler
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausente.`)
    }
}

//Login do bot
require('./deploy-commands');
client.once(Events.ClientReady, c => {
    console.log(`Ready! logged in as ${c.user.tag}`)
})
client.login(TOKEN);


//Listener de interações
client.on(Events.InteractionCreate, async interaction => {
    if (interaction != undefined) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error("Comando não encontrado")
            return;
        }
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error);
            await interaction.reply("Houve um erro ao executar esse comando!");
        }
    }
})

client.on('voiceStateUpdate', (_oldState, newState) => {
    const member = newState.member;

    // Verifica se o usuário é o próprio bot e se está em um canal de voz
    if (member.user.id === client.user.id && newState.channel) {
        const channel = newState.channel;

        // Verifica se o canal de voz está vazio
        if (channel.members.size === 1) {
            // Define um temporizador para desconectar o bot após o TIMEOUT
            const timeout = setTimeout(() => {
                channel.leave();
                voiceConnectionTimeouts.delete(channel.id);
            }, TIMEOUT);

            // Armazena o temporizador na coleção para o canal
            voiceConnectionTimeouts.set(channel.id, timeout);
        } else {
            // Remove o temporizador se houver atividade no canal de voz
            if (voiceConnectionTimeouts.has(channel.id)) {
                clearTimeout(voiceConnectionTimeouts.get(channel.id));
                voiceConnectionTimeouts.delete(channel.id);
            }
        }
    }
});




