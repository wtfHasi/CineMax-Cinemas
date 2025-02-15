import mongoose from 'mongoose';

const screeningSchema = new mongoose.Schema({
  screening_id: { type: Number, required: true },
  cinema_id: { type: Number, required: true },
  film_id: { type: Number, required: true },
  showtime: { type: Date, required: true },
  available_seats: { type: Number, required: true }
});

const Screening = mongoose.model('Screening', screeningSchema);
export default Screening;
