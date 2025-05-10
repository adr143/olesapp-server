import mongoose from 'mongoose';

const studentRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  prelimTerm: { type: String },
  midTerm: { type: String },
  finalTerm: { type: String },
  totalGrade: { type: String }
});

export default mongoose.model('StudentRecord', studentRecordSchema);
