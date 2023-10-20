import { NextFunction, Response } from "express";
import { SessionMiddlewareRequestType } from "../types/SessionMiddlewareRequestType";
import Ajv from "ajv";
import IUser from "../interfaces/IUser";
import * as fs from "fs";
import bcrypt from "bcrypt";
import { USERS_FILE_PATH } from "../lib/users.const";

/**
 * create an instance from `Ajv` package to control the flow of data in case of validation with an existed schema.
 */
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

/**
 * This is function in an easy way validation the current authentication.
 * @param req an express request
 */
const isAuthenticated = (req: SessionMiddlewareRequestType) =>
  !!req.session.user;

/**
 * The validationSchema is provided a config handling by ajv package. Username and password both are string and required.
 */
const validationSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
  additionalProperties: false,
};

/**
 * This function is retrieve a user by provided username and password from client form.
 * @param body a user data without id only a username and password
 */
function findUser(
  body: Omit<IUser, "id">,
): Omit<IUser, "password"> | undefined {
  // The stored data related to users is read from the `users.tsv`.
  const content = fs.readFileSync(USERS_FILE_PATH, "utf-8");

  // The read file split by newline character.
  const users = content.trim().split("\n");

  for (const user of users) {
    // Each line is seperated by tab character so the first is id and others is another data related to the user.
    const [id, username, rawPassword] = user.split("\t");

    if (
      username === body.username &&
      // the current password is a password is retrieved from the client and the `rawPassword` is hashed stored password.
      bcrypt.compareSync(body.password, rawPassword)
    ) {
      return { username, id };
    }
  }
}

/**
 * The authentication middleware is main function that concentrated on backend assigment.
 * @param req An express request
 * @param res An express response
 * @param next An function to handle next action
 */
export default function authenticationMiddleware(
  req: SessionMiddlewareRequestType,
  res: Response,
  next: NextFunction,
) {
  // Handle the next action whenever user is existed in current session.
  if (isAuthenticated(req)) {
    return next();
  }

  // Whenever the page is not login and the method is `GET` so authentication should redirect to login page.
  // The reason is user is not authenticated.
  if (req.method === "GET" && req.path !== "/login") {
    return res.redirect("/login");
  }

  // However, the current page is login and current method is `GET`
  // so middleware should allow executing the next action which is render login page.
  if (req.method === "GET" && req.path === "/login") {
    return next();
  }

  // The validation of data by provided schema is checked.
  // Whenever any problem is found in data in case of mismatching with a pattern, the related error show to a client.
  const validate = ajv.compile(validationSchema);
  const valid = validate(req.body);

  if (!valid) {
    return next("validation failed");
  }

  // Whenever this `findUser` match any user, the next step is redirected to homepage otherwise,
  // a related error show in the client.
  const user = findUser(req.body);

  if (!user) {
    return next("authentication failed");
  }

  req.session.user = user;
  res.redirect("/");
}
