import sanitizer from "perfect-express-sanitizer";

const sanitizationMiddleware = sanitizer.clean({
  xss: true,
  noSql: true,
  sql: true,
  sqlLevel: 5,
  noSqlLevel: 5,
});

export default sanitizationMiddleware;


