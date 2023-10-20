import { Request } from "express";

export type SessionMiddlewareRequestType = Request & {
  session: { user: { id: string; username: string; password: string } };
};
