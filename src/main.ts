/**
 *
 * *****************************************************************************************
 * Mainly, this file is providing all configuration and who to start a web service or server
 * *****************************************************************************************
 *
 */
import express from "express";
import cors from "cors";
import BaseRoute from "./routes/BaseRoute";

import authenticationMiddleware from "./middlewares/authenticationMiddleware";
import bodyParser from "body-parser";
import createUsers from "./lib/utilities/createUsers";
import expressSessionMiddleware from "./middlewares/expressSessionMiddleware";
import sanitizationMiddleware from "./middlewares/sanitizationMiddleware";

// Create an app from Express class by the factory function of `express`.
const app = express();

/**
 * All configs and middlewares are added here, such as encounter with security issues or another situation.
 */
function defineConfig() {
  // The cors middleware provides an access-allow-origin through unfamiliar or foreign origin this config allows
  //  calling web services from other domains.
  //  In production, it should be determined by only family ip or web address
  // to have control on origin source control.
  app.use(cors());

  // The bodyParser middleware is used to parse body for url-encoded-form
  // and be available in request argument of express route.
  app.use(bodyParser.urlencoded({ extended: true }));

  // The `express-session` middleware is added to handle session management,
  // this session uses in localhost without a credential.
  app.use(expressSessionMiddleware);

  // The authentication middleware is a main function for the `Assessment Question`,
  // as it can provide payload check and session control.
  app.use(authenticationMiddleware);

  // To add extra security with express-sanitization,
  // this server is being avoided from unhandled xss code or other attack or vulnerable
  app.use(sanitizationMiddleware);
}

/**
 * This function is started a server by using `dotenv` data, a PORT environmental variable.
 */
function startServer() {
  app.listen(process.env.PORT, () => {
    console.log(`The server is started on port ${process.env.PORT}`);
  });
}

/**
 * Routes are used in this server are defined here.
 */
function defineRoutes() {
  const baseRoute = new BaseRoute();
  app.use("/", baseRoute.getRouter());
}

// This main function is responsible to define all configuration and case determination.
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

// Starting config server and listen to the defined port.
main();
