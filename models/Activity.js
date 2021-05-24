const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activity: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: false
    }
});

const Activity = mongoose.model ('Activity', activitySchema);

module.exports = Activity;