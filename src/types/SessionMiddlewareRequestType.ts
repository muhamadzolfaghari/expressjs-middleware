import { Request } from "express";
import IUser from "../interfaces/IUser";

export type SessionMiddlewareRequestType = Request<
  any,
  any,
  any,
  Omit<IUser, "id">
> & {
  session: { user: Omit<IUser, "password"> };
};
