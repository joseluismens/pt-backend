import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Usuario } from "./Usuario";

@Table({
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  tableName: "conversions",
})
export class Conversion extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  original_amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date_conversion!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  uf!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  conversion_amount!: number;

  
  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuario_id!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;
}

