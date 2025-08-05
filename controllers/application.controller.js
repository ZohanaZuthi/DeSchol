import { Application } from '../models/application.model.js';

export const applyScholarship = async (req, res) => {
  try {
    const existing = await Application.findOne({
      user: req.id,
      scholarship: req.body.scholarship,
    });
    if (existing) return res.status(400).json({ message: 'Already applied' });

    const app = new Application({ user: req.id, scholarship: req.body.scholarship });
    await app.save();
    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to apply' });
  }
};

export const getUserApplications = async (req, res) => {
  const applications = await Application.find({ user: req.id }).populate('scholarship');
  res.json(applications);
};
