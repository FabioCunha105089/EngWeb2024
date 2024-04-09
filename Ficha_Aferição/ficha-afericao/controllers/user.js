var mongoose = require('mongoose')
const { modelName } = require('../model/user')
var User = require('../model/user')

module.exports.list = () => {
    return User
        .find()
        .exec()
}

module.exports.insert = user => {
    if ((User.findOne({ $or: [{ BI: user.BI }, { CC: user.CC }] }).exec()).length != 1) {
        var newUser = new User(user)
        return newUser.save()
    }
}

module.exports.delete = id => {
    return User
            .find({ _id: id })
            .deleteOne()
            .exec()
}

module.exports.update = (id, user) => {
    return User
        .findByIdAndUpdate(id, user, { new: true })
        .exec()
}

module.exports.listByModalidade = (modalidade) => {
    return Pessoa
        .find({ desportos: { $elemMatch: { $eq: modalidade } } })
        .exec()
}