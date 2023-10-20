import session from "express-session";

const expressSessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
});


export default expressSessionMiddleware;