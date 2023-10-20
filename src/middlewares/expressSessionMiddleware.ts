import session from "express-session";

/**
 * This config is provided for the `express-session` package,
 * the main reason to use this package is handle session of logged user in a cookie that be available in a client as well.
 */
const expressSessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // The max age is defined for one day.
    secure: false,
  },
  saveUninitialized: true,
});

export default expressSessionMiddleware;
