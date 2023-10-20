import sanitizer from "perfect-express-sanitizer";

// To avoid from any xss, noSql or sql injection, this package is provided useful protection.
// This package doesn't have any declaration and file is created for that manually.
const sanitizationMiddleware = sanitizer.clean({
  xss: true,
  noSql: true,
  sql: true,
});

export default sanitizationMiddleware;
