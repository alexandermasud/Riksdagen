const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const RiksdagsledamoterSchema = new Schema({
  username:{
    type:String,
  },
  email:{
    type: String,
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  image: {
    type:String
  }
});

// Create collection and add schema
mongoose.model('Riksdagsledamoter', Riksdagsledamoter);


module.exports = mongoose.model('Riksdagsledamoter', RiksdagsledamoterSchema);