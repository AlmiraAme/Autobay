/**
* Created with JetBrains PhpStorm.
* User: Almira
*/

/* Include dependencies */
var mongoose, bidSchema, modelName, collectionName, car;
mongoose = require('mongoose'),
Schema = mongoose.Schema;
//ObjectId = Schema.ObjectId;

/**
* Deze schema maps naar de mongoDB collectie en defineerd de vorimg van de document in de collectie.
* @type {*} : de schema definitie
*/
 bidSchema = Schema({
    phone: {type: String, required: true},
    price: {type: Number, required: true},
    car: {type: Schema.Types.ObjectId, ref: 'car'},
    bidDate: {type: Date, "default": Date.now}
});

// Mongoose middleware
// @see http://mongoosejs.com/docs/middleware.html
/**
* Deze functie is er om voordat de bod wordt opgeslagen controlles uit te voeren zoals:
* Maximaal mag je 2 bods doen.
* hiervoor is de middleware methode gebruikt, hiervoor heb ik gebruik gemaakt van:
* used: -> http://mongoosejs.com/docs/middleware.html
* Dit heeft brian aan mij voorgesteld en ik vondt het inderdaad makkelijker om te gebruiken en fijner.
 * op een gegeven moment kwam ik op een probleem dat hij de callback niet wou uitvoeren,
 * Brian heeft aan me doorgegeven datje de callback moet meegeven en in de next moest zetten.
*/
bidSchema.pre('save', function(next, req,callback){
    var error = new Error("Voldoent niet aan de eisen er is al 2 keer geboden")
    mongoose.models['bid']
        .find({phone: req.body.phone})
        .exec(function (err, bids){
            if(bids.length < 2){
               next(callback);
            }
            else{
                err = error;
                next(err);
                return false;
            }
        })
});

/**
 * Na het opslaan van de schema met de link nog worden gezet van de car naar de bid.
 * De bid word dan gepushed in de car.
 * used: http://mongoosejs.com/docs/middleware.html
 */
bidSchema.post('save', function(bid,req){
    mongoose.models['car'].findOne({_id: bid.car})
        .exec(function (err2, car){
            car.bids.push(bid);
            car.save()
        });
});

modelName = "bid";
collectionName = "bids";
mongoose.model(modelName, bidSchema, collectionName);