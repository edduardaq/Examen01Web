import * as express from "express";
import cors = require("cors");
import helmet from "helmet";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";


AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

  // register express routes from defined application routes
/*  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      }
    );
  });

  */

  // setup express app here
  // ...

   //rutas
   app.use("/", Routes);

  // start express server
  app.listen(3000);

  

  console.log(
    "Express server has started on port 3000. Open http://localhost:3000/users to see results"
  );
}).catch((error) => console.log(error));
