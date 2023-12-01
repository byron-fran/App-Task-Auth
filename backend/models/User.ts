import {Model, Table, DataType, PrimaryKey, AutoIncrement, Column} from 'sequelize-typescript';
import { User as UserInterface } from '../interfaces/User';

@Table({
    tableName : 'users',
    timestamps : true
})

class User extends Model<UserInterface, User>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id! : number

    @Column(DataType.STRING)
    name!: string

    @Column(DataType.STRING)
    password! : string

    @Column(DataType.STRING)
    email! : string 
};
 export default User
