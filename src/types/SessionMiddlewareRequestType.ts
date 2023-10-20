import { Request } from "express";
import IUser from "../interfaces/IUser";

export type SessionMiddlewareRequestType = Request<Omit<IUser, "id">> & {
  session: { user: Omit<IUser, "password"> };
};
