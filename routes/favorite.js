const router = require('express').Router();
const webpush = require('web-push');
const checkJwt = require('../middlewares/check-jwt');
const Favorite = require('../models/favorite');
const pushUtil = require('../push');

router.route('/upvote')
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

        Favorite.findOne({collectionId: req.body.collectionId}, (err, existingCollection) => {
            if(err){
                return res.json({
                    success: false,
                    message: 'Unknown error'
                });
            }
            if(existingCollection){
                existingCollection.count = existingCollection.count + 1;
                existingCollection.save();
                res.json({
                    success: true,
                    message: 'Added successfully'
                });
            }
            else {
                let favorite = new Favorite();
                favorite.collectionId = req.body.collectionId;
                favorite.collectionName = req.body.collectionName;
                favorite.collectionViewUrl = req.body.collectionViewUrl;
                favorite.artistName = req.body.artistName;
                favorite.artistViewUrl = req.body.artistViewUrl;
                favorite.artworkUrl60 = req.body.artworkUrl60;
                favorite.artworkUrl100 = req.body.artworkUrl100;
                favorite.description = req.body.description;
                favorite.kind = req.body.kind;
                favorite.genres = req.body.genres;
                favorite.count = 1;
                favorite.save();
                res.json({
                    success: true,
                    message: 'Added to Favorites'
                });
            }
            const pushMsg = {
                userID: req.decoded.user.email,
                favorite: {...req.body}
            };
            pushUtil.sendNotification(JSON.stringify(pushMsg));
        });

    });

module.exports = router;
