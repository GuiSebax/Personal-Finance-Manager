import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRouter';
import userRoute from './routes/userRoute';
import transactionRoute from './routes//transactionRoute';
import goalRoute from './routes/goalRouter';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoute);
app.use('/api', transactionRoute);
app.use('/api', goalRoute);


app.listen(PORT, () => {
    console.log('Server started on port 3000!');
});


