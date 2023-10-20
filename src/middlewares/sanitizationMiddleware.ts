import sanitizer from "perfect-express-sanitizer";

const sanitizationMiddleware = sanitizer.clean({
  xss: true,
  noSql: true,
  sql: true,
});

export default sanitizationMiddleware;
