const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
  content: { type: String, required: true },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model ('Suggestion', suggestionSchema);
