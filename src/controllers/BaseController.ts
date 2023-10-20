import { Request, Response } from "express";
import { HomeRequestType } from "../types/HomeRequestType";

/**
 * A controller to control index route and login route,
 * which login is provided a form to retrieve username and password from user.
 * The index page only demonstrated welcome with currently user info as a web page.
 */
export default class BaseController {
  /**
   * The index page is shown the first page of the server.
   * This page illustrated the welcome text and current logged-in user.
   * @param req express request
   * @param res express response
   */
  index(req: HomeRequestType, res: Response) {
    res.send(`
      <div>Welcome ${req.session.user.username}</div>
    `);
  }

  /**
   * A sample webpage includes a form element to retrieve and get data
   * and send to the login service such as username and password data.
   * @param _req express request
   * @param res express response
   */
  login(_req: Request, res: Response) {
    res.send(`
      <form action="/login" method="POST">
        <input name="username" />
        <input name="password" type="password" />
        <button>Login</button>
      <form />
    `);
  }
}
