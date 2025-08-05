import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './db.js';

import userRoutes from './routes/user.route.js';
import universityRoutes from './routes/university.route.js';
import scholarshipRoutes from './routes/scholarship.route.js';
import applicationRoutes from './routes/application.route.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/applications', applicationRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running...');
});
