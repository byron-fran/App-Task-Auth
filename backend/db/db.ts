import {Sequelize} from 'sequelize-typescript';
import dotnev from 'dotenv';
import User from '../models/User';
import Task from '../models/Task';

dotnev.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User, Task]
})

User.hasMany(Task, {foreignKey : 'userId', onDelete : 'CASCADE'});
Task.belongsTo(User, {foreignKey : 'userId',});