import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  photo: { type: String, default: "https://randomuser.me/api/portraits/unknown.jpg" },
  description: { type: String, required: true },
  votesToSave: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "eliminated"], default: "active" }
});

export default mongoose.model('Participant', participantSchema);