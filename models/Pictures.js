var mongoose = require('mongoose');
var PictureSchema = new mongoose.Schema({
    url: String,
});
mongoose.model('Picture', PictureSchema);
