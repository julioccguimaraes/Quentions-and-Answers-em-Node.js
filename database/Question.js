const sequelize = require("sequelize")
const connection = require("./database")

const Question = connection.define('questions', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Question.sync({ force: false }) // force: não força a criação da tabela caso exista
    .then(() => {
        // console.log("Tabela question criada!")
    })

module.exports = Question