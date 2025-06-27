const mongoose = require('mongoose')
const imgSchema = new mongoose.Schema({
    url: String
})

module.exports = mongoose.model('image_bololo', imgSchema, 'image_bololo')