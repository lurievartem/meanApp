module.exports = {
    secret: 'secretWordishe',
    expiresTime : 7200,
    facebook: {
        clientID: '1643997065818025',
        clientSecret: '231cebbabae6cb612bd4f192f3c24668',
        callbackURL: 'http://localhost:8000/auth/facebook/callback',
    },
    twitter:{
        consumerKey: 'qoAsSi6fOtbaOJyne7QW7liWm',
        consumerSecret: 'OHY78WWG8yS7Hromi8JiRmINKDRRBg5e1l5VebJn00LzlXTOIN',
        callbackURL: 'http://localhost:8000/auth/twitter/callback',
        sessionSecret: 'keyboard cat'
    },
    google:{
        clientID: '79784744411-ek7kcc5mhevgmobd7lgsdob9nh132spg.apps.googleusercontent.com',
        clientSecret: 'JWwP-mXVF8gd0THagawYljoM',
        callbackURL: 'http://localhost:8000/auth/google/callback'
    }
};