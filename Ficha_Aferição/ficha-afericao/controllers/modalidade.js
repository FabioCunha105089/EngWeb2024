var mongoose = require('mongoose')
const { modelName } = require('../model/modalidade')
var Modalidade = require('../model/modalidade')

module.exports.listSports = () => {
    return Modalidade
        .find({}, { desporto: 1, _id: 0 })
        .sort({ desporto: 1 })
        .exec()
        .then(data => {
            const sports = data.map(item => item.desporto);
            return sports;
        })
}

module.exports.listPeople = (mod) => {
    return Modalidade
        .find({ desporto: mod}, { pessoas: 1, _id: 0 })
        .exec()
        .then(data => {
            const people = data.reduce((acc, curr) => acc.concat(curr.pessoas), []);
            return people.sort();
        })
}