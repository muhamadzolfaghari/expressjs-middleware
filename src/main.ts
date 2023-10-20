import express from "express";
import cors from "cors";
import BaseRoute from "./routes/BaseRoute";

import authenticationMiddleware from "./middlewares/authenticationMiddleware";

import bodyParser from "body-parser";
import createUsers from "./lib/utilities/createUsers";
import expressSessionMiddleware from "./middlewares/expressSessionMiddleware";
import sanitizationMiddleware from "./middlewares/sanitizationMiddleware";

const app = express();

function defineConfig() {
  // cors provides an access-allow-origin through unfamiliar or foreign origin this config allows
  //  calling web services from other domains in production it should be determined by only family ip or web address
  // to have control on origin source control.
  app.use(cors());

  // cookie parser is used to parse the current client cookies as
  // a parameter in request.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressSessionMiddleware);

  app.use(authenticationMiddleware);
  app.use(sanitizationMiddleware);
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
  // Store users as a `users.tsv` file in data folder.
  createUsers();

  // The entire setup and configuration to have a server is provided here.
  defineConfig();

  // The routes such as `index` and `login` pages was added in here.
  defineRoutes();

  // The server is started from this point.
  startServer();
}

main();
