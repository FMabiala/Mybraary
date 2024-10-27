// All Model j.s
//Create an author Model- remember they must all be linked to the Routes, & Views: MVC

// import mongodb
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create a schema/table
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})
    
// Export the model - with the table name:Author
module.exports = mongoose.model('Author', authorSchema)