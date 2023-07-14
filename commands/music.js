const { SlashCommandBuilder } = require('discord.js');


var musics = [];


module.exports = {
    data: new SlashCommandBuilder()
        .setName("musica")
        .setDescription("Toca musicas")
        .addSubcommand(subcommand => subcommand
            .setName("play")
            .setDescription("Adiciona musicas na fila")
            .addStringOption(soption => soption.setName("music").setDescription("Nome ou url da musica").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("stop")
                .setDescription("Desconecta o bot do canal de voz")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("Remove uma musica da lista")
                .addIntegerOption(ioption => ioption.setName("posicao").setDescription("Posicao da musica").setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName("pause")
            .setDescription("Pausa a musica atual")
        )
        .addSubcommand(subcommand => subcommand
            .setName("volume")
            .setDescription("Ajusta o volume da musica")
            .addIntegerOption(ioption => ioption.setName("volume").setDescription("Seta o volume").setMaxValue(100).setMinValue(0).setRequired(true))
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "play":
                let VoiceChannel = interaction.member.voice.channel;
                let arg = interaction.options.getString("music")
                await interaction.reply(`Tocando: ${arg}`)
                break;
            case "stop":
                break;
            case "remove":
                break;
            case "pause":
                break;
            case "volume":
                break;
        }

    }


}
// client.on('message', msg => {
//     if (msg.author.bot) {
//         return;
//     }

//     if (msg.content.toLowerCase().startsWith("m.play")) {
//         let VoiceChannel = msg.guild.find(channel => channel.id === msg.author.voice.channel.id);

//         if (VoiceChannel == null) {
//             msg.channel.send("Canal de VOZ nao encontrado.");
//             return;
//         }else{
//             msg.channel.sened("SIM");
//         }

//     }
// })