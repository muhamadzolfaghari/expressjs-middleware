declare module "perfect-express-sanitizer" {
  import { NextFunction, Request, Response } from "express";
  type SecurityLevelType = 1 | 2 | 3 | 4 | 5;

  interface ISanitizerConfig {
    xss: boolean;
    noSql: boolean;
    sql: boolean;
    sqlLevel: SecurityLevelType;
    noSqlLevel: SecurityLevelType;
  }

  // @ts-ignore
  function clean(config: ISanitizerConfig) {
    // @ts-ignore
    return function (req: Request, res: Response, next: NextFunction) {};
  }
}
