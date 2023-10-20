import * as express from "express";
import BaseController from "../controllers/BaseController";

export default class BaseRoute {
  getRouter() {
    const controller = new BaseController();
    const router = express.Router();
    router.get('/show', controller.show)
    return router;
  }
}
