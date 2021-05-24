const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    requiredRoles: {
        type: Array,
        required: false
    },

    args: {
        type: Array,
        required: false
    },

    output: {
        type: Object,
        required: true
    }
},
    { timestamps: true }
);

const Command = mongoose.model('Command', commandSchema);

module.exports = Command;