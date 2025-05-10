// controllers/studentUpload.js
import csv from 'csv-parser';
import fs from 'fs';
import StudentRecord from "../models/studentRecords.model.js"

export const uploadStudents = async (req, res) => {
    const students = req.body.students;
  
    if (!students || !Array.isArray(students)) {
      return res.status(400).json({ error: 'students array is required.' });
    }
  
    const updated = [];
    const inserted = [];
  
    for (const row of students) {
      const { name, studentId, prelimTerm, midTerm, finalTerm, totalGrade } = row;
  
      try {
        const existing = await StudentRecord.findOne({ studentId: studentId.trim(), name: name.trim() });
  
        const record = await StudentRecord.findOneAndUpdate(
          { studentId: studentId.trim(), name: name.trim() },
          {
            prelimTerm: prelimTerm.trim(),
            midTerm: midTerm.trim(),
            finalTerm: finalTerm.trim(),
            totalGrade: totalGrade.trim()
          },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
  
        if (existing) {
          updated.push({ name, studentId });
        } else {
          inserted.push({ name, studentId });
        }
      } catch (err) {
        console.error(`Error processing student ${studentId}:`, err.message);
      }
    }
  
    return res.json({
      message: 'Upload complete',
      insertedCount: inserted.length,
      updatedCount: updated.length,
      inserted,
      updated
    });
  };
  

export const getAllStudents = async (req, res) => {
    try {
      const students = await StudentRecord.find().sort({ name: 1 });
      res.json(students);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch student records.' });
    }
  };
