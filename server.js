const dotenv = require("dotenv")

dotenv.config()

const express = require("express")
const cors = require("cors")
const drakorkita = require("./src/routes/drakorkita")
const komiku = require("./src/routes/komiku")
const nanimex = require("./src/routes/nanimex")
const kuramanime = require("./src/routes/kuramanime")
const wibudesu = require("./src/routes/wibudesu")

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use("/drakorkita", drakorkita)
app.use("/komiku", komiku)
app.use("/nanimex", nanimex)
app.use("/kuramanime", kuramanime)
app.use("/wibudesu", wibudesu)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Unofficial Komik, Drakor and Anime APIs",
        developed_by: "ZeroneDoo",
        github: "https://github.com/ZeroneDoo",
        data: {
            komiku_url: process.env.KOMIKU_URL,
            drakorkita_url: process.env.DRAKORKITA_URL,
            kuramanime_url: process.env.KURAMANIME_URL,
            nanimex_url: process.env.NANIMEX_URL,
            wibudesu_url: process.env.WIBUDESU_URL,
        }
    })
})

app.get("*", (req, res) => {
    res.status(404).json({
        message: "404 route not found"
    })
})

module.exports = app