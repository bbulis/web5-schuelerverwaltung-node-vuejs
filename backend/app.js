require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Sequelize = require('sequelize')
const sequelize = require('./config')
const Schueler = require('./models/schueler')

const PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/schueler', async(req, res) => {
    let schuelers = await Schueler.findAll()
    res.send(JSON.stringify({ "success": true, "data": schuelers }))
})

app.get('/schueler/:id', async(req, res) => {
    let schueler = await Schueler.findByPk(req.params.id)
    if (schueler) {
        res.send(JSON.stringify({ "success": true, "data": schueler }))
    } else {
        res.send(JSON.stringify({ "success": false, "data": "no schueler found" }))
    }
})

app.post('/schueler', async(req, res) => {
    let Inputfirstname = req.body.firstname
    let Inputlastname = req.body.lastname
    let Inputklasse = req.body.klasse
    let Inputzweig = req.body.zweig

    let [schueler, created] = await Schueler.findOrCreate({ where: { firstname: Inputfirstname, lastname: Inputlastname, klasse: Inputklasse, zweig: Inputzweig } })

    if (created) {
        res.send(JSON.stringify({ "success": true, "data": schueler }))
    } else {
        res.send(JSON.stringify({ "success": false, "data": "schueler already exists" }))
    }
})

app.delete('/schueler/:id', async(req, res) => {
    try {
        let result = await Schueler.destroy({
            where: { id: req.params.id }
        })
        if (result == 1) {
            res.send(JSON.stringify({ "deleted": true }))
        } else {
            res.send(JSON.stringify({ "deleted": false }))
        }
    } catch (err) {
        res.send(JSON.stringify({ "error": true, "data": err }))
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

    res.send(JSON.stringify({ "success": true, "data": [schueler1, schueler2] }))
})

app.get('/testing', async(req, res) => {
    try {
        result = await sequelize.authenticate()
        res.send(JSON.stringify({ "success": true }))
    } catch (err) {
        res.send(JSON.stringify(err))
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})