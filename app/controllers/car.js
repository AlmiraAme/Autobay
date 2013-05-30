/**
 * Created with JetBrains PhpStorm.
 * User: Almira
 */

/* Include dependencies */
var mongoose = require('mongoose');
var car = mongoose.model('car');

// creating new car models
/**
 * Dus type is post en dit gaat via de car om carmodels te creeren.
 */
exports.create = function (req, res){
    var doc = new car(req.body);
    doc.save(function (err) {
        var retObj = {err: err, doc: doc};
        return res.send(retObj);
    });
}

// retrieving car models
/**
 * Hier is de type get, want je haalt informatie op hierin haal je car models op.
 * je haalt alleen de auto's op die niet zijn verkocht.
 */
exports.list = function (req, res) {
    var conditions = {}, fields = {}, options = {'createdAt': -1};
    car .find(conditions, fields, options)
        .where('sold').equals(false)
        .exec(function (err, doc) {
            var retObj = {err: err, doc: doc};
            return res.send(retObj);
        });
}
//RETRIEVE one car/:id
/**
 * Ook weer een get maar dan voor een specifieke auto dit krijg je door de id mee te geven.
 */
exports.detail = function (req, res) {
    car .findOne({_id: req.params.id})
        .where('sold').equals(false)
        .exec(function (err, doc) {
        var retObj = {err: err, doc: doc};
        return res.send(retObj);
    });
}
// UPDATE
// findOneAndUpdate @ http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
/**
 * dit is een put want je update de data alleen.
 */
exports.update = function (req, res) {

    var conditions ={_id: req.params.id},
        update = req.body,
        options = { multi: true },
        callback = function (err, doc) {
            var retObj = {err: err, doc: doc};
            return res.send(retObj);
        }

    car.findOneAndUpdate(conditions, update, options, callback);
}

//// UPDATE sold car
//// findOneAndUpdate @ http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
/**
 * Hier update je alleen de auto dat hij verkocht ism de datum is automatisch dat moment.
 */
exports.sold = function (req, res) {
    var conditions ={_id: req.params.id},
        update = {sold: true, soldDate:new Date()},
        options = { multi: true },
        callback = function (err, doc) {
            var retObj = {err: err, doc: doc};
            return res.send(retObj);
        }

    car.findOneAndUpdate(conditions, update, options, callback);
}

//niet aan toegekomen
//exports.search = function(req,res){
//    var searchwords = {};
//    searchwords.make = req.body.make;
//    searchwords.style = req.body.style;
//
//    Car .find(searchwords)
//        .exec(function(err, cars){
//            var retObj = {err: err, doc: cars};
//            return res.send(retObj);
//        });
//}

//// DELETE
//// remove @ http://mongoosejs.com/docs/api.html#model_Model-remove
/**
 * Type delete natuurlijk, hier verwijder je een specifieke car dmv een id.
 * dankzij de middelware zullen de bids die in de car zijn worden verwijdert wanneer de auto word verwijder.
 */
exports.delete = function (req, res) {
    car.findByIdAndRemove(req.params.id,  function (err) {
            var retObj = {err: err, doc: {_id: req.params.id}};
            return res.send(retObj);
    });
}