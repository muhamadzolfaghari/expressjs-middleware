import express from "express";
import cors from "cors";
import BaseRoute from "./routes/BaseRoute";

import authenticationMiddleware from "./middlewares/authenticationMiddleware";
import expressSessionMiddleware from "./middlewares/expressSessionMiddleware";
import sanitizationMiddleware from "./middlewares/sanitizationMiddleware";

import bodyParser from "body-parser";
import createUsers from "./lib/utilities/createUsers";

const app = express();

function defineConfig() {
  // cors provides an access-allow-origin through unfamiliar or foreign origin
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(sanitizationMiddleware);

  // cookie parser is used to parse the current client cookies as
  // a parameter in request.
  app.use(expressSessionMiddleware);
  app.use(authenticationMiddleware);
}

function startServer() {
  app.listen(process.env.PORT, () => {
    console.log(`The server is started on port ${process.env.PORT}`);
  });
}

function defineRoutes() {
  const baseRoute = new BaseRoute();
  app.use("/", baseRoute.getRouter());
}

function main() {
  createUsers();
  defineConfig();
  defineRoutes();
  startServer();
}

main();
