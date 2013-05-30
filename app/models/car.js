/**
 * Created with JetBrains PhpStorm.
 * User: Almira
 * Date: 15-4-13
 * Time: 20:09
 * To change this template use File | Settings | File Templates.
 */
// used: http://mongoosejs.com/docs/index.html
//http://mongoosejs.com/docs/guide.html
//https://gist.github.com/fwielstra/1025038
/**
 * Module dependencies.
 */
var mongoose, car, modelName, collectionName;

mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Deze schema maps naar de mongoDB collectie en defineerd de vorimg van de document in de collectie.
 * @type {*} : de schema definitie
 */
car = Schema({
    make: {type: String, required: true},
    style: {type: String, required: true},
    color: {type: String, required: true},
    engine: {type: Number, required: true},
    fuel: {type: String, required: true},
    id: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    power: {type: Number, required: true},
    price: {type: Number, required: true},
    sold: {type: Boolean, "default": false},
    year: {type: Number, required: true, index:true},
    soldDate: {type: Date},
    bids: [{type: Schema.Types.ObjectId, ref: 'bid'}]
});

/**
 * verwijder de bid die aan de auto vast staat welke wordt verwijder.
 */
car.pre('remove',function(next){
    bid.remove({car:this._id});
    next();
})
/*
 If collectionName is absent as third argument, than the modelName should always end with an -s.
 Mongoose pluralizes the model name. (This is not documented).
 Set the name of the model and the plural naming convention.
 Then define the mongoose model.
 */
modelName = "car";
collectionName = "cars";
mongoose.model(modelName, car, collectionName);