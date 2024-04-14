import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  timezone: { type: String },
  temperature: { type: Number },
  weather: { type: String },
  weatherIcon: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
