import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

/* Verificar cookie */
const verifyToken = (req, res, next) => {
  const token = req.cookies.bkingToken;
  if (!token) {
    return next(createError(401, "You are not authenticated!!!!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));

    req.user = user;
    next();
  });
};

/* Verificar usuario */
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      //return res.status(403).json("You are not authorized!");
      return next(createError(403, "You are not authorized!"));
    }
  });
};

/* Verificar Administrador */
const verifyAdmin = (req, res, next) => {
  //verifyToken(req, res, next, () => {

  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not Admin!"));
      //return res.status(403).json("You are not Admin!");
    }
  });
};

export default {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
