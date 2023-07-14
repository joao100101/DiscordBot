const { SlashCommandBuilder } = require('discord.js');




module.exports = {
    data: new SlashCommandBuilder()
        .setName("money")
        .setDescription("Mostra o dinheiro do usuario")
        .addSubcommand(subcommand => subcommand
            .setName("ver")
            .setDescription("Ver o dinheiro do usuario")
            .addUserOption(option => option
                .setName("user")
                .setDescription("usuario a ver o dinheiro")))
        .addSubcommand(subcommand =>
            subcommand
                .setName("set")
                .setDescription("Seta o dinheiro de alguém")
                .addUserOption(option => option.setName('usuario').setDescription("Seleciona o usuário").setRequired(true))
                .addIntegerOption(ioption => ioption.setName("quantidade").setDescription("Quantidade de deinheiro a setar").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("Remove o dinheiro de alguém")
                .addUserOption(option => option.setName('usuario').setDescription("Seleciona o usuário").setRequired(true))
                .addIntegerOption(ioption => ioption.setName("quantidade").setDescription("Quantidade de deinheiro a remover").setRequired(true))
        ),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "ver":
                if (target != null) {
                    var target = interaction.options.getUser('user');
                    var money = getMoney(target);
                    await interaction.reply(`Dinheiro de ${target.username}: $${money}`)
                } else {

                    money = getMoney(interaction.user.id)
                    await interaction.reply(`Seu dinheiro: $${money}`)
                }
                break;
            case "set":
                var target = interaction.options.getUser('usuario');
                var qtd = interaction.options.getInteger('quantidade');

                await interaction.reply(`Dinheiro de ${target.username} setado para ${qtd}`)
                break;
            case "remove":
                var target = interaction.options.getUser('usuario').username;
                var qtd = interaction.options.getInteger('quantidade');
                await interaction.reply(`Dinheiro de ${target} setado para ${qtd}`)
                break;
        }

    }


}
// function setMoney(userID) {
//     dao.setMoney(target, qtd).then(() => {

//     })
//         .catch((err) => {
//             console.error(err);
//         })
//         .finally(() => {
//             dao.con.end();
//         });
// }
// function getMoney(id) {
//     dao.getMoney(id).then(function (rows) {
//         if (rows.length <= 0) return 0;
//         return rows[0]['money'];
//     }).catch((err) => setImmediate(() => {
//         throw err;
//     })).finally(() => {
//         dao.con.end();
//     });
//     return 0;
// }
