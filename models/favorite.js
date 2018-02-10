const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    count: Number,
    collectionId: {
        type: Number,
        required: true
    },
    collectionName: String,
    collectionViewUrl: String,
    artistName: String,
    artistViewUrl: String,
    artworkUrl60: String,
    artworkUrl100: String,
    description: String,
    kind: String,
    genres: [String],
    addedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
