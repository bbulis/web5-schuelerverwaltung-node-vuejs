const sequelize = require('./../config')
const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Schueler extends Model {}
Schueler.init({
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    klasse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zweig: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'schueler'
})

module.exports = Schueler