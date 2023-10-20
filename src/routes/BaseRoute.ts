import * as express from "express";
import BaseController from "../controllers/BaseController";

/**
 * This class is provided a container to hold routes such as login or home page.
 */
export default class BaseRoute {
  getRouter() {
    const controller = new BaseController();
    const router = express.Router();
    router.get("/", controller.index);
    router.get("/login", controller.login);
    return router;
  }
}
