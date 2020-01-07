require('dotenv').config()
const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const sequelize = require('./config')
const Schueler = require('./models/schueler')

const PORT = process.env.PORT || 3000

app.get('/schueler', (req, res) => {
    res.send(JSON.stringify({ "type": "GET-Request" }, null, 2))
})

app.get('/testing', async(req, res) => {
    try {
        result = await sequelize.authenticate()
        res.send(JSON.stringify({ "type": "success" }, null, 3))
    } catch (err) {
        res.send(JSON.stringify(err, null, 3))
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})