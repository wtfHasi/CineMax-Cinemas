import mongoose from 'mongoose';

const filmListingSchema = new mongoose.Schema({
  film_id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  actors: [{ type: String }],
  genre: { type: String },
  rating: { type: String },
  showtimes: [
    {
      cinema_id: { type: Number, required: true },
      showtime: { type: Date, required: true }
    }
  ]
});

const FilmListing = mongoose.model('FilmListing', filmListingSchema);
export default FilmListing;
