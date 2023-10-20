import * as express from "express";
import * as cors from "cors";
import sessionMiddleware from "./middlewares/sessionMiddleware";
import BaseRoute from "./routes/BaseRoute";
import * as cookieParser from "cookie-parser";

const app = express();

function defineConfig() {
  app.use(cors());
  app.use(cookieParser());
  app.use(sessionMiddleware);
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
  defineConfig();
  defineRoutes();
  startServer();
}

main();
