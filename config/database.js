module.exports = {
    url: 'mongodb://nodetest:nodetestapp@ds053944.mongolab.com:53944/nodetestapp',
    options: {
        server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    }
};