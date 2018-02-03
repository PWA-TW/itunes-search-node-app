const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
