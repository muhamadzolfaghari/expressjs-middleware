import { NextFunction, Response } from "express";
import { SessionMiddlewareRequestType } from "../types/SessionMiddlewareRequestType";
import Ajv from "ajv";
import IUser from "../interfaces/IUser";
import * as fs from "fs";
import bcrypt from "bcrypt";

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const isAuthenticated = (req: SessionMiddlewareRequestType) =>
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

function findUser(
  body: Omit<IUser, "id">,
): Omit<IUser, "password"> | undefined {
  const content = fs.readFileSync("data/users.tsv", "utf-8");
  const users = content.trim().split("\n");

  for (const user of users) {
    const [id, username, rawPassword] = user.split("\t");

    if (
      username === body.username &&
      bcrypt.compareSync(body.password, rawPassword)
    ) {
      return { username, id };
    }
  }
}

export default function authenticationMiddleware(
  req: SessionMiddlewareRequestType,
  res: Response,
  next: NextFunction,
) {
  // Get cookies from requested route.

  if (isAuthenticated(req)) {
    return next();
  }

  // console.log(req.path, req.method);

  if (req.method === "GET" && req.path !== "/login") {
    return res.redirect("/login");
  }

  if (req.method === "GET" && req.path === "/login") {
    return next();
  }

  const validate = ajv.compile(validationSchema);
  const valid = validate(req.body);

  if (!valid) {
    return next("validation failed");
  }

  const user = findUser(req.body);

  if (!user) {
    return next("authentication failed");
  }

  req.session.user = user;
  res.redirect("/");
}
