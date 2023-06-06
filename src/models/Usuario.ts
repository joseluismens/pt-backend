
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Conversion } from "./Conversion";
import * as bcrypt from "bcryptjs";

@Table({
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  tableName: "users",
})
export class Usuario extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({type: DataType.STRING,
    allowNull:false,
    unique:true,
    set(value: any) {
        const hash = bcrypt.hashSync(value, 8);
        this.setDataValue('password', hash);
    }})
  password!: string;

  @Column({ 
    type: DataType.STRING,
    allowNull: true,
    defaultValue:'user'
  })
  rol!: string;

  @HasMany(() => Conversion)
  conversions!: Conversion[];
}
