import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface IProduct {
  id: number;
  title: string;
  status: boolean;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCreationAttributes = Optional<IProduct, 'id'>;

export class Product extends Model<IProduct, ProductCreationAttributes> {
  declare id: number | null;
  declare title: string | null;
  declare status: boolean | null;
  declare userId: number | null;
  declare createdAt: Date | null;
  declare updatedAt: Date | null;
}

Product.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
    },
    userId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
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
    tableName: 'products',
    modelName: 'product',
  },
);
