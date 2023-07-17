import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tipo_Vehiculo } from "./entity/Tipo_Vehiculo"
import { Marca } from "./entity/Marca"
import { Color } from "./entity/Color"
import { Vehiculo } from "./entity/Vehiculo"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "bdExamen",
    synchronize: true,
    logging: false,
    entities: [Tipo_Vehiculo, Marca, Color, Vehiculo],
    migrations: [],
    subscribers: [],
})
