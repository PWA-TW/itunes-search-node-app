const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const pushUtil = require('./push');

pushUtil.init();
const publicKey =  pushUtil.getPublicVapidKey();
const config = require('./config');

const app = express();

mongoose.connect(config.database, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('connected to DB');
    }
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));
app.use(cors());

const userRoutes = require('./routes/account');
const favoriteRoutes = require('./routes/favorite');
const searchRoutes = require('./routes/search');

app.get('/api/getvapidkey', (req, res) => {
    res.json({
        key: publicKey
    });
});

app.post('/api/subscribe', (req, res) => {
    pushUtil.addSubscription(req.body.subscription);
    res.json({
        success: true,
        message: 'Subscribed'
    });
});

app.use('/api/accounts', userRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', searchRoutes);
const port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log('running on ' + port);
});