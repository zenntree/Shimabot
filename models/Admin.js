const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    memberID: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model ('Admin', adminSchema);

module.exports = Admin;