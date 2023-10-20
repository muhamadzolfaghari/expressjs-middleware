import { NextFunction, Response } from "express";
import { SessionMiddlewareRequestType } from "../types/SessionMiddlewareRequestType";
import Ajv from "ajv";

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const isAuthentication = (req: SessionMiddlewareRequestType) =>
  !!req.session.user;

const validationSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

export default function authenticationMiddleware(
  req: SessionMiddlewareRequestType,
  res: Response,
  next: NextFunction,
) {
  // Get cookies from requested route.

  if (isAuthentication(req)) {
    return next();
  }


  const validate = ajv.compile(validationSchema);
  const valid = validate(req.body);

  if (!valid) {
    next(new Error("authentication failed"));
  }

  next();

  // req.session.user = { id: generateUserId() };

  next();
}

//

