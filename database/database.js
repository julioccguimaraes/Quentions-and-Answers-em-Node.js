const sequelize = require("sequelize")

const connection = new sequelize("questionsguide", 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection