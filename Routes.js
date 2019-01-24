const Events = require('./controllers/Events');

module.exports = function(router) {
    router.get('/events', Events.getEvents);
    router.get('/events/:id', Events.getExternByEvent);
    router.post('/events', Events.insertEvents);
    router.post('/events/:id', Events.insertExternByEvent);
    return router;
}