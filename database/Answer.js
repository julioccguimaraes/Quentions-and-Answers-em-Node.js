const sequelize = require("sequelize")
const connection = require("./database")

const Answer = connection.define('answers', {
    body: {
        type: sequelize.TEXT,
        allowNull: false
    },
    question_id: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({ force: false }) // force: não força a criação da tabela caso exista
    .then(() => {
        // console.log("Tabela question criada!")
    })

module.exports = Answer