import { Request } from "express";
import IUser from "../interfaces/IUser";

export type HomeRequestType = Request & {
  session: { user: Omit<IUser, "password"> };
};


