import { Router } from "express";
import  MarcaController  from "./controller/MarcaController";
import  VehiculoController  from "./controller/VehiculoController";

const router: Router = Router();

// Definir las rutas y los controladores

router.get("/marcas", MarcaController.getAll);
router.get("/marcas/:id", MarcaController.getOne);
router.post("/marcas", MarcaController.create);
router.put("/marcas/:id", MarcaController.update);
router.delete("/marcas/:id", MarcaController.remove);

router.get("/vehiculos", VehiculoController.getAll);
router.get("/vehiculos/:id", VehiculoController.getById);
router.post("/vehiculos", VehiculoController.add);
router.delete("/vehiculos/:id", VehiculoController.delete);

export { router as Routes };
