const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    artist: {
        type: String, 
    },
    album: {
        type: String,
    },
    yearOfRelease: {
        type: Number,
    },
    uploadAudioFile: {
        type: String,
    },
    });

module.exports = mongoose.model('Music', musicSchema);
