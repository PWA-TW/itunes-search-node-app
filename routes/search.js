const router = require('express').Router();
const request = require('request');
const config = require('../config');

router.route('/search')
    .get((req, res) => {
        const media = req.query.media;
        const term = req.query.term;
        const url = `${config.itunesApi}?media=${media}&term=${term}`;
        request(url, {json: true}, (err, searchResult) => {
            if(err) throw err;
            res.json(searchResult);
        })
    });

module.exports = router;