const Joi = require('joi'); 
const mongoose = require('mongoose'); 
const { genreSchema } = require('../models/genre');

const moviesSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true, 
        maxlength : 255,
        trim : true
    },
    genre : {
        type : genreSchema, 
        required : true
    }, 
    numberInStock : {
        type : Number, 
        required : true, 
    }, 

    dailyRentalRate : {
        type : Number, 
        required : true
    }
}); 

function validateMovie(movie){
    const schema = {
        title : Joi.string().max(255).required(), 
        genreId : Joi.string().required(), 
        numberInStock : Joi.number().min(0).required(), 
        dailyRentalRate : Joi.number().min(0).required()
    }; 

    return Joi.validate(movie, schema); 
}
const Movie = mongoose.model("Movie", moviesSchema);

exports.moviesSchema = moviesSchema;
exports.Movie = Movie;
exports.validate = validateMovie; 