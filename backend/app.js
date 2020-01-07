require('dotenv').config()
const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const sequelize = require('./config')
const Schueler = require('./models/schueler')

const PORT = process.env.PORT || 3000

app.get('/schueler', async(req, res) => {
    let schuelers = await Schueler.findAll()
    res.send(JSON.stringify({ "success": "true", "data": schuelers }))
})

app.delete('/schueler/:id', async(req, res) => {
    try {
        let result = await Schueler.destroy({ where: { id: req.params.id } })
        if (result == 1) {
            res.send(JSON.stringify({ "deleted": "true" }))
        } else {
            res.send(JSON.stringify({ "deleted": "false" }))
        }
    } catch (err) {
        res.send(JSON.stringify({ "error": "true", "data": err }))
    }
})

app.get('/reset', async(req, res) => {
    await Schueler.sync({ force: true })
    let schueler1 = await Schueler.create({
        firstname: 'Benjamin',
        lastname: 'Bulis',
        klasse: '5CHIT',
        zweig: 'MEDT'
    })

    let schueler2 = await Schueler.create({
        firstname: 'David',
        lastname: 'Langheiter',
        klasse: '5CHIT',
        zweig: 'SYT'
    })

    res.send(JSON.stringify({ "success": "true", "data": [schueler1, schueler2] }))
})

app.get('/testing', async(req, res) => {
    try {
        result = await sequelize.authenticate()
        res.send(JSON.stringify({ "type": "success" }))
    } catch (err) {
        res.send(JSON.stringify(err))
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})