import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<IUser, 'id'>;

export class User extends Model<IUser, UserCreationAttributes> {
  declare id?: number;
  declare name?: string;
  declare email?: string;
  declare password?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

User.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    createdAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'user',
  },
);
