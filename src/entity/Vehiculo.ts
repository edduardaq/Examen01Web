import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, IsInt, Min, Max, IsDate, IsDateString } from "class-validator";
import { Marca } from "./Marca";
import { Color } from "./Color";
import { Tipo_Vehiculo } from "./Tipo_Vehiculo";

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: "La placa es requerida" })
  placa: string;

  @ManyToOne(() => Marca, marca => marca.vehiculos)
  @JoinColumn({ name: "id_marca" })
  @IsNotEmpty({ message: "La marca es requerida" })
  id_marca: Marca;

  @ManyToOne(() => Color, color => color.vehiculo)
  @JoinColumn({ name: "id_color" })
  @IsNotEmpty({ message: "El color es requerido" })
  id_color: Color;

  @Column()
  @IsInt({ message: "El cilindraje debe ser un número entero" })
  @Min(0, { message: "El cilindraje mínimo es 0" })
  @Max(10000, { message: "El cilindraje máximo es 10000" })
  @IsNotEmpty({ message: "El cilindraje es requerido" })
  cilindraje: number;

  @ManyToOne(() => Tipo_Vehiculo, tipoVehiculo => tipoVehiculo.vehiculos)
  @IsNotEmpty({ message: "El tipo de vehículo es requerido" })
  @JoinColumn({ name: "id_TipoVehiculo" })
  id_tipoVehiculo: Tipo_Vehiculo;

  @Column()
  @IsNotEmpty({ message: "El numero de pasajeros es requerido" })
  @IsInt({ message: "La cantidad de pasajeros debe ser un número entero" })
  @Min(0, { message: "La cantidad de pasajeros mínima es 0" })
  @Max(10, { message: "La cantidad de pasajeros máxima es 10" })
  cantidadPasajeros: number;

  @Column({ type: "date" })
  @IsNotEmpty({ message: "La fecha de ingreso es requerida" })
  fecha_ingreso: Date;

  @Column({ type: "boolean" })
  @IsNotEmpty({ message: "El estado es requerido" })
  estado: boolean;
}
