import * as express from "express";

const app = express();

function defineConfig() {

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