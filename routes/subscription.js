const router = require('express').Router();
const pushUtil = require('../push');

router.route('/subscribe')
    .post((req, res) => {
        pushUtil.addSubscription(req.body.subscription);
        res.json({
            success: true,
            message: 'Subscribed'
        });
    });

module.exports = router;