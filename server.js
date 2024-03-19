const express = require("express")
const cors = require("cors")
const fs = require('fs')
const uuid = require("uuid")

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

let messages = []

const data = fs.readFileSync("./message.json", { encoding: 'utf8' })
const dataParse = JSON.parse(data)

app.get("/message", (req, res) => {
    res.json(dataParse)
})

app.get("/message/:id", (req, res) => {
    let message = messages.find((message) => message.id == req.params.id)

    if (!message) {
        res.sendStatus(404)
        return
    }

    res.json(todo)
})

app.post("/message", (req, res) =>{
    console.log(req.body)
    dataParse.push({ id: uuid.v4(), ...req.body })
    res.json({ msg: "Add Todo", data: dataParse })

    fs.writeFile("message.json", JSON.stringify(dataParse), (err) => {
        if (err) throw err
        console.log('done')
    })

})

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`)
})