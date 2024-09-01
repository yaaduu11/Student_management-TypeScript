import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import route from './routes/route';
import methodOverride from 'method-override';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, '../src/public/views'));
app.set('view engine', 'ejs');

app.use('/', route);

mongoose.connect(process.env.MONGODB_URL as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Connection failed', error));

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
