declare module "perfect-express-sanitizer" {
  import express from "express";
  type SecurityLevelType = 1 | 2 | 3 | 4 | 5;

  interface ISanitizerConfig {
    xss: boolean;
    noSql: boolean;
    sql: boolean;
    sqlLevel?: SecurityLevelType;
    noSqlLevel?: SecurityLevelType;
  }

  function clean(config: ISanitizerConfig): express.RequestHandler;
}
