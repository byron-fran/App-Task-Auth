import {Model, AutoIncrement, PrimaryKey, Table, DataType, Column} from 'sequelize-typescript';
import * as z from 'zod';
@Table({
    tableName : 'tasks',
    timestamps : true
})

class Task extends Model<Task> {
    
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id! : number

    @Column(DataType.STRING)
    title! : string

    @Column(DataType.STRING)
    content! : string

    @Column(DataType.INTEGER)
    userId! : number
}
;

export default Task