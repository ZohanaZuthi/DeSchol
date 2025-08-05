import express from 'express';
import { filterScholarships, createScholarship } from '../controllers/scholarship.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/filter', filterScholarships);
router.post('/', isAuthenticated, createScholarship);

export default router;

//-----------------------------------------
// 4. controllers/scholarship.controller.js
//-----------------------------------------
import { Job } from '../models/news.model.js';

export const filterScholarships = async (req, res) => {
  const { country, type, deadlineBefore } = req.query;
  const filter = {};
  if (country) filter.country = country.toLowerCase();
  if (type) filter.type = type;
  if (deadlineBefore) filter.deadline = { $lt: new Date(deadlineBefore) };

  try {
    const jobs = await Job.find(filter).populate('university');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error filtering scholarships' });
  }
};

export const createScholarship = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Scholarship created', job });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


