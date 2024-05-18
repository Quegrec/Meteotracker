import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  city: { type: String, required: true },
  // lat: { type: Number, required: true },
  // lng: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  timezone: { type: String },
  temperature: { type: Number },
  weather: { type: String },
  weatherIcon: { type: String },
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
