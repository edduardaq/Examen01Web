import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty, IsBoolean } from "class-validator";

@Entity()
export class Marca {
  static findOne(id_marca: any) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: "El nombre es requerido" })
  nombre: string;

  @Column({ type: "boolean" })
  @IsNotEmpty({ message: "El metalizado es requerido" })
  metalizado: boolean;

  @Column({ type: "boolean" })
  @IsNotEmpty({ message: "El estado es requerido" })
  estado: boolean;

  @OneToMany(() => Vehiculo, vehiculo => vehiculo.id_marca)
  vehiculos: Vehiculo[];
}
