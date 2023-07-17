import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty, IsBoolean } from "class-validator";

@Entity()
export class Tipo_Vehiculo {
  static findOne(id_tipoVehiculo: any) {
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

  @OneToMany(() => Vehiculo, vehiculo => vehiculo.id_tipoVehiculo)
  vehiculos: Vehiculo[];
}
