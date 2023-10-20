import { NextFunction, Response } from "express";
import { SessionMiddlewareRequestType } from "../types/SessionMiddlewareRequestType";

// A hash-table as a raw object keeps each season by the unique id.
const sessions: Record<string, any> = {};

/**
 *
 */
export default function sessionMiddleware(
  req: SessionMiddlewareRequestType,
  res: Response,
  next: NextFunction,
) {
  // Get cookies from requested route.
  const sessionId = req.cookies?.sessionId;

  // Whenever cookie is not existed and completely empty.
  if (!sessionId) {
    const newSessionId = generateSessionId();
    req.cookies.sessionId = newSessionId;
    req.cookies = { sessionId: newSessionId };
    sessions[newSessionId] = req.cookies
    res.cookie("sessionId", newSessionId, { maxAge: 86400000, httpOnly: true });
  }

  // if (sessionId) {
  //   console.log(sessionId);
  // }

  // Con
  next();
}

//
const generateSessionId = () =>
  String(Date.now()).slice(5) + Math.random().toString(36).slice(2);
