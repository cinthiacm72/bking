import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

/* const test = (req, res) => {
  const token = req.cookies.access_token;
  //console.log("Cookies :  ", req.cookies.access_token);
  // console.log("TOKEN::::", token);
  if (!token) return res.status(400).json("Token NOOO aceptado");
  return res.status(200).json("Token aceptado");
}; */

/* Verificar cookie */
const verifyToken = (req, res, next) => {
  const token = req.cookies.bkingToken;
  //console.log("TOKEN From Verify Token::", token);
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

/* import jwt from "jsonwebtoken";
import { createError } from "./error.js"; */

/* Verificar cookie */
/* const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
    //return res.status(401).json("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
}; */

/* Verificar usuario */
/* const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
}; */

/* Verificar Administrador */
/* const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not Admin!"));
    }
  });
};*/
