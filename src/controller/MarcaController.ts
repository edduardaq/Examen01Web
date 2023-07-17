import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Marca } from "../entity/Marca";
import { validate } from "class-validator";
//Pueabsb d
class MarcaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const marcasRepo = AppDataSource.getRepository(Marca);

      const marcas = await marcasRepo.find();

      if (marcas.length === 0) {
        return resp.status(404).json({ mensaje: "No se encontraron marcas." });
      }

      return resp.status(200).json(marcas);
    } catch (error) {
      return resp.status(500).json({ mensaje: "Error al obtener las marcas" });
    }
  };

  static getOne = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);

      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const marcasRepo = AppDataSource.getRepository(Marca);

      let marca;
      try {
        marca = await marcasRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontró la marca con ese ID" });
      }

      return resp.status(200).json(marca);
    } catch (error) {
      return resp.status(500).json({ mensaje: "Error al obtener la marca" });
    }
  };

  static create = async (req: Request, resp: Response) => {
    try {
      const { nombre, metalizado, estado } = req.body;
  
      // Validar datos de entrada
      if (!nombre) {
        return resp.status(400).json({ mensaje: "Debe indicar el nombre de la marca" });
      }
  
      const marcasRepo = AppDataSource.getRepository(Marca);
  
      // Verificar si ya existe una marca con el mismo nombre
      const marcaExistente = await marcasRepo.findOne({ where: { nombre } });
      if (marcaExistente) {
        return resp.status(400).json({ mensaje: "Ya existe una marca con el mismo nombre" });
      }
  
      const marca = new Marca();
      marca.nombre = nombre;
      marca.metalizado = metalizado;
      marca.estado = estado;
  
      const errors = await validate(marca);
      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }
  
      await marcasRepo.save(marca);
  
      return resp.status(201).json({ mensaje: "Marca creada exitosamente", marca });
    } catch (error) {
      return resp.status(500).json({ mensaje: "Error al crear la marca" });
    }
  };
  
  

  

  static update = async (req: Request, resp: Response) => {
    try {
      const { id, nombre } = req.body;

      // Validar datos de entrada
      if (!id) {
        return resp.status(400).json({ mensaje: "Debe indicar el ID" });
      }
      if (!nombre) {
        return resp
          .status(400)
          .json({ mensaje: "Debe indicar el nombre de la marca" });
      }

      const marcasRepo = AppDataSource.getRepository(Marca);

      let marca;
      try {
        marca = await marcasRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontró la marca" });
      }

      marca.nombre = nombre;

      const errors = await validate(marca);
      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await marcasRepo.save(marca);

      return resp
        .status(200)
        .json({ mensaje: "Marca actualizada exitosamente", marca });
    } catch (error) {
      return resp.status(500).json({ mensaje: "Error al actualizar la marca" });
    }
  };

  static remove = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);

      if (!id) {
        return resp.status(400).json({ mensaje: "Debe indicar el ID" });
      }

      const marcasRepo = AppDataSource.getRepository(Marca);

      let marca;
      try {
        marca = await marcasRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontró la marca" });
      }

      await marcasRepo.remove(marca);

      return resp.status(200).json({ mensaje: "Marca eliminada exitosamente" });
    } catch (error) {
      return resp.status(500).json({ mensaje: "Error al eliminar la marca" });
    }
  };
}

export default MarcaController;
