const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Joi = require('joi');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre'); 

//GET
router.get('/', async (req, res) => {
    const movies = await Movie
        .find()
        .sort('title'); 
    
    res.send(movies); 
}); 

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id); 
    if (movie == null) return res.send(404).send(`The movie with the ID: ${req.param.id} was not found.`);  
    res.send(movie); 
}); 

//POST 
router.post('/', async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    let movie = new Movie({ 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    
    res.send(movie);
}); 

//UPDATE
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error != null) return  res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId); 
    if (genre == null)  return res.status(404).send(`The movie with the ID: ${req.body.genreId} was not found`);

    let movie = await Movie.findByIdAndUpdate({
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    if (movie == null) return res.status(404).send(`The movie with the ID: ${req.params.id} was not found`); 
    movie = await movie.save();
    res.send(movie);
});

//DELETE 
router.delete('/:id',  async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id); 
    if (movie == null) return res.status(404).send(`The movie with the ID: ${req.params.id} was not found`); 
    res.send(movie);
}); 

module.exports = router; 