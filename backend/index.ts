import express from 'express';
import dotenv from 'dotenv';
import router from './routes/user.route';
import routeTasks from './routes/task.route';
import cors from 'cors';
import morgan = require('morgan');
import cookieParser = require('cookie-parser');
dotenv.config();

import { sequelize } from './db/db';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(morgan('dev'));
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true

}));
app.use(cookieParser());
app.use('/api',router);
app.use('/api',routeTasks);

sequelize.sync({force : false}).then(() => {
    console.log('Database synced');
    app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

})
