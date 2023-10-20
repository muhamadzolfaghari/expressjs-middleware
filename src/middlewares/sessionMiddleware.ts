import { NextFunction, Request, Response } from "express";

// A hash-table as a raw object keeps each season by the unique id.
const sessions: Record<string, string> = {};


/**
 *
 */
export default function sessionMiddleware(req: Omit<Request, "cookies"> &
  { cookies: { sessionId: string } }, res: Response, next: NextFunction
) {
  const sessionId = req.cookies.sessionId;
}