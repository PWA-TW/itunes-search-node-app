const webpush = require('web-push');
const urlsafeBase64 = require('urlsafe-base64');
let vapidKeys;
let subscriptions = [];

exports.init = () => {
    vapidKeys = webpush.generateVAPIDKeys();
};

exports.getPublicVapidKey = () => {
    return vapidKeys.publicKey;
};

exports.sendNotification = (message) => {
    const options = {
        TTL: 24 * 60 * 60,
        vapidDetails: {
            subject: 'mailto:tw@localhost:3040',
            publicKey: vapidKeys.publicKey,
            privateKey: vapidKeys.privateKey
        }
    };
    subscriptions.forEach((subscription) => {
        webpush.sendNotification(
            subscription,
            message,
            options
        );
    });
};

exports.addSubscription = (subscription) => {
    subscriptions.push(subscription);
};
