import { Request, Response } from "express";
import { HomeRequestType } from "../types/HomeRequestType";

export default class BaseController {
  index(req: HomeRequestType, res: Response) {
    res.send(`
        <div>Welcome ${req.session.user.username}</div>
    `);
  }

  login(req: Request, res: Response) {
    res.send(`
    <form action="/login" method="POST">
      <input name="username" />
      <input name="password" />
      <button>Login</button>
    <form />
    `);
  }
}
