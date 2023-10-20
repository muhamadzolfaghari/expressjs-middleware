import session from "express-session";

const expressSessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 * 7, //seven days
    secure: false,
  },
  saveUninitialized: true,
});

export default expressSessionMiddleware;
