/**
* Created with JetBrains PhpStorm.
* User: Almira
*/

/* Include dependencies */
var mongoose = require('mongoose'),
    Bid = mongoose.model('bid'),
   car = mongoose.model('car');

// CREATE
// save @ http://mongoosejs.com/docs/api.html#model_Model-save
/**
 * type: post/ creeert een nieuwe bod, deze data wordt dus als bod opgeslagen.
 * save @ http://mongoosejs.com/docs/api.html#model_Model-save
 */
exports.create = function (req, res) {
    var doc = new Bid({
        phone: req.body.phone,
        price: req.body.price,
        car: req.params.id
    });

    doc.save(req, function (err){
        return res.send({
            err:err,
            doc:doc
        });
    });
}
/**
 * type: get/ deze functie krijgt specifieke details van een bod.
 * daarvoor geen je een id mee om die specifieke bod te vinden.
 */
exports.detail = function (req, res) {
    Bid .findOne({_id: req.params.id})
        .exec(function (err, doc) {
            var retObj = {err: err, doc: doc};
            return res.send(retObj);
        });
}