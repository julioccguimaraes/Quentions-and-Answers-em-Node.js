const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")

connection.authenticate()
    .then(() => {
        console.log("BD sucesso")
    })
    .catch((error) => {
        console.log(error)
    })

const Question = require("./database/Question")
const Answer = require("./database/Answer")

app.set('view engine', 'ejs') // dizendo para o express usar o ejs como view engine
app.use(express.static('public')) // onde ficam os arquivos estáticos (css, js, img, etc)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    Question.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then((questions) => {
        res.render("index", { questions })
    })
})

app.get("/question", (req, res) => {
    res.render("question");
})

app.post("/savequestion", (req, res) => {
    Question.create({
        title: req.body.title,
        description: req.body.description
    }).then(() => {
        res.redirect("/")
    })
})

app.get("/question/:id", (req, res) => {
    Question.findOne({
        where: { id: req.params.id }
    }).then((question) => {
        if (question) {
            Answer.findAll({
                where: { question_id: req.params.id },
                order: [['id', 'DESC']]
            }).then((answers) => {
                res.render("questionInfo", { question, answers });
            })
        } else {
            res.redirect("/")
        }
    })
})

app.post("/answer", (req, res) => {
    Answer.create({
        body: req.body.body,
        question_id: req.body.question_id
    }).then(() => {
        res.redirect("/question/" + req.body.question_id)
    })
})

app.listen(3000, function () {
    console.log("Server is running")
})