var mongoose = require("mongoose")

var modalidadesSchema = new mongoose.Schema({
    desporto: String,
    pessoas: [String]
}, {versionKey: false})

module.exports = mongoose.model('modalidade', modalidadesSchema)