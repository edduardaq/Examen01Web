import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";
import { validate } from "class-validator";
import { Marca } from "../entity/Marca";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";
import { Color } from "../entity/Color";

class VehiculoController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const vehiculosRepo = AppDataSource.getRepository(Vehiculo);

      const listaVehiculos = await vehiculosRepo.find({
        where: { estado: true },
      });

      if (listaVehiculos.length == 0) {
        return res.status(404).json({ mensaje: "No se encontraron vehiculos en la base de datos" });
      }
      return res.status(200).json(listaVehiculos);
    } catch (error) {
      return res.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params["id"]);
  
      if (!id) {
        return res.status(404).json({ mensaje: "No se indica el ID" });
      }
  
      const vehiculosRepo = AppDataSource.getRepository(Vehiculo);
  
      let vehiculo;
      try {
        vehiculo = await vehiculosRepo.findOneOrFail({
          where: { id, estado: true },
          relations: ["id_tipoVehiculo", "id_marca", "id_color"],
        });
      } catch (error) {
        return res.status(404).json({ mensaje: "No hay un vehículo con ese ID" });
      }
  
      return res.status(200).json(vehiculo);
    } catch (error) {
      return res.status(400).json({ mensaje: error });
    }
  };
  

  static add = async (req: Request, res: Response) => {
    try {
      const {
        placa,
        id_marca,
        id_tipoVehiculo,
        cilindraje,
        id_color,
        cantidadPasajeros,
      } = req.body;
  
      // Obtener los repositorios necesarios
      const vehiculosRepo = AppDataSource.getRepository(Vehiculo);
      const marcasRepo = AppDataSource.getRepository(Marca);
      const tipoVehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      const coloresRepo = AppDataSource.getRepository(Color);
  
      // Obtener la marca, tipo de vehículo y color
      const marca = await marcasRepo.findOne(id_marca);
      const tipoVehiculo = await tipoVehiculoRepo.findOne(id_tipoVehiculo);
      const color = await coloresRepo.findOne(id_color);
  
      if (!marca || !tipoVehiculo || !color) {
        return res
          .status(404)
          .json({ mensaje: "La marca, el tipo de vehículo o el color no existen" });
      }
  
      // Crear el objeto de vehículo
      const vehiculo = new Vehiculo();
      vehiculo.placa = placa;
      vehiculo.id_marca = marca;
      vehiculo.id_tipoVehiculo = tipoVehiculo;
      vehiculo.cilindraje = cilindraje;
      vehiculo.id_color = color;
      vehiculo.cantidadPasajeros = cantidadPasajeros;
      vehiculo.fecha_ingreso = new Date(); // Establecer la fecha actual
      vehiculo.estado = true; // Establecer el estado como true
  
      // Guardar el vehículo en la base de datos
      await vehiculosRepo.save(vehiculo);
  
      return res.status(201).json({ mensaje: "Vehículo creado" });
    } catch (error) {
      return res.status(400).json({ mensaje: "Error al crear el vehículo" });
    }
  };
  
  
  
  
  

  static delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return res.status(404).json({ mensaje: "Debe indicar el ID" });
      }

      const vehiculosRepo = AppDataSource.getRepository(Vehiculo);
      let vehiculo;
      try {
        vehiculo = await vehiculosRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return res
          .status(404)
          .json({ mensaje: "No se encuentra el vehiculo con ese ID" });
      }

      vehiculo.estado = false;
      try {
        await vehiculosRepo.save(vehiculo);
        return res.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return res.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      return res.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default VehiculoController;
