import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

interface UserInstance extends Model {
    id: number;
    usuario: string;
    age: number;
}


export const User = sequelize.define<UserInstance>("User",  {
    id: 
    {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    usuario:{
        type: DataTypes.INTEGER
    },
    age:{
        type: DataTypes.INTEGER,
        defaultValue: 18
    }
},
{
    tableName:'users',
    timestamps:false
})