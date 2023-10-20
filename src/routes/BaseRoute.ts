import * as express from "express";
import BaseController from "../controllers/BaseController";
import { checkSchema } from "express-validator";
import { Schema } from "express-validator/src/middlewares/schema";

const validationSchema: Schema = {
  username: {
    errorMessage: "Invalid username",
    isEmail: true,
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
};

export default class BaseRoute {
  getRouter() {
    const controller = new BaseController();
    const router = express.Router();
    router.get("/login", checkSchema(validationSchema), controller.login);
    return router;
  }
}
