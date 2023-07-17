import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty, IsBoolean } from "class-validator";

@Entity()
export class Color {
  static findOne(id_color: any) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: "El nombre es requerido" })
  nombre: string;

  @Column()
  @IsNotEmpty({ message: "El estado es requerido" })
  @IsBoolean({ message: "El campo 'estado' debe ser un valor booleano" })
  estado: boolean;

  @OneToMany(() => Vehiculo, vehiculo => vehiculo.id_color)
  vehiculo: Vehiculo;
}
