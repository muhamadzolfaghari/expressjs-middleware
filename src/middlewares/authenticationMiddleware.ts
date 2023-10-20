import { NextFunction, Response } from "express";
import { SessionMiddlewareRequestType } from "../types/SessionMiddlewareRequestType";

const isAuthentication = (req: SessionMiddlewareRequestType) =>
  !!req.session.user;

export default function authenticationMiddleware(
  req: SessionMiddlewareRequestType,
  res: Response,
  next: NextFunction,
) {
  // Get cookies from requested route.

  if (isAuthentication(req)) {
    return next();
  }

  req.session.user = { id: generateUserId() };
  next();
}

//
const generateUserId = () =>
  String(Date.now()).slice(5) + Math.random().toString(36).slice(2);
