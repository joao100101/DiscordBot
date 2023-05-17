const User = require('./User.js');

function getIdade(nome) {
    User.findOne({ where: { Nome: nome } }).then(user => {
        if (user != undefined) {
            console.log(user.Idade);
        } else {
            console.log(`Nao encontrei nenhum registro sobre ${nome}`)
        }
    });
}

getIdade('Janaina');

