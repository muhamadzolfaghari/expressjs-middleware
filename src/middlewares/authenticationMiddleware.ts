import { NextFunction, Response } from "express";
import { SessionMiddlewareRequestType } from "../types/SessionMiddlewareRequestType";
import { validationResult } from "express-validator";
import Ajv from "ajv";

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const isAuthentication = (req: SessionMiddlewareRequestType) =>
  !!req.session.user;

const validationSchema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" },
  },
  required: ["foo"],
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

  validationResult(validationSchema);

  const validate = ajv.compile(validationSchema);
  const valid = validate(req.body);
  if (!valid) console.log(validate.errors);

  next();

  req.session.user = { id: generateUserId() };

  next();
}

//
const generateUserId = () =>
  String(Date.now()).slice(5) + Math.random().toString(36).slice(2);
