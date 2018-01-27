const express = require('express');
const suggestions = express.Router();

const Suggestion = require('../models/suggestions.js');

// GET
suggestions.get ( '/' , async ( req , res ) => {
try {
  const suggestions = await Suggestion.find();
  res.status( 200 ).json( suggestions );
} catch ( error ) {
  res.status( 400 ).json({error : err.message});
}
});

// POST
suggestions.post ( '/' , async ( req , res ) => {
  try {
    const newSuggestion = await Suggestion.create( req.body );
    res.status( 200 ).json( newSuggestion );
  } catch ( error ) {
    res.status( 400 ).json({error : error.message});
  }
});

// DELETE
suggestions.delete ( '/:id' , async ( req , res ) => {
  try {
    const deleteSuggestion = await Suggestion.findByIdAndRemove( req.params.id );
    res.status( 200 ).json( deleteSuggestion );
  } catch ( error ) {
    res.status( 400 ).json({error : error.message});
  }
});

// EDIT
suggestions.put ( '/:id' , async ( req , res ) => {
  try {
    const updateSuggestion = await Suggestion.findByIdAndUpdate( req.params.id, req.body, { new : true } );
    res.status( 200 ).json( updateSuggestion );
  } catch ( error ) {
    res.status( 400 ).json({error : error.message});
  }
});

module.exports = suggestions;
