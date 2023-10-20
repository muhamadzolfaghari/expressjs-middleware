import { Request } from "express";

export type SessionMiddlewareRequestType = Omit<Request, "cookies"> & {
  cookies: { sessionId: string };
};