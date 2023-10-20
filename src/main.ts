import * as express from "express";
import * as cors from "cors";

const app = express();



function defineConfig() {
  app.use(cors());
  app.use()
}

function startServer() {
  app.listen(process.env.PORT, () => {
    console.log(`The server is started on port ${process.env.PORT}`);
  });
}

function main() {
  defineConfig();
  startServer();
}

main();