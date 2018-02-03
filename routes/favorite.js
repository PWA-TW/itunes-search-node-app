const router = require('express').Router();
const checkJwt = require('../middlewares/check-jwt');
const Favorite = require('../models/favorite');

router.route('/favorite')
    .get((req, res) => {
        Favorite
            .find({})
            .populate({path: 'addedBy', select: 'email _id'})
            .exec((err, favorites) => {
                if(err) throw err;
    
                res.json({
                    success: true,
                    message: "",
                    favorites: favorites
                });
    
            });
    })
    .post(checkJwt, (req, res) => {
        let favorite = new Favorite();
        favorite.artistName = req.body.artistName;
        favorite.artistViewUrl = req.body.artistViewUrl;
        favorite.artworkUrl60 = req.body.artworkUrl60;
        favorite.artworkUrl100 = req.body.artworkUrl100;
        favorite.description = req.body.description;
        favorite.kind = req.body.kind;
        favorite.genres = req.body.genres;
        favorite.addedBy = req.decoded.user._id;
        favorite.save();
        res.json({
            success: true,
            message: 'Added to Favorites'
        });
    });

module.exports = router;
