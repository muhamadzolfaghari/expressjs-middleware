import { Request, Response } from "express";

export default class BaseController {
  show(req: Request, res: Response) {
    res.send({ data: {} });
  }
}