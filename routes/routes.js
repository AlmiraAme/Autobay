module.exports = function (app) {

    /*  Relation routes
        ---------------
        We create a variable "relations" that holds the controller object.
        We map the URL to a method in the created variable "relations".
        In this example is a mapping for every CRUD action.
     */
    var cars = require('../app/controllers/car.js'),
     bids = require('../app/controllers/bid.js');

    //Cars
    // CREATE
    app.post('/car', cars.create);
    // RETRIEVE
    app.get('/car', cars.list);
    app.get('/car/:id', cars.detail);
    // UPDATE
    app.put('/car/:id', cars.update);
    // DELETE
    app.delete('/car/:id', cars.delete);
    //Sold
    app.get('/car/:id/sold', cars.sold);

    //bid
    //create
     app.post('/car/:id/bid', bids.create);
    //retrieve
     app.get('/bid/:id', bids.detail);

}


