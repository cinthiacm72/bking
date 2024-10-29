import bcrypt from "bcryptjs";
import Users from "../models/Users.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../utils/db.js";

/* Register */
const register = async (req, res, next) => {
  try {
    await connectToDatabase();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new Users({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).json("User has been created.");
  } catch (err) {
    if (err.code === 11000)
      return next(
        createError(501, "Username or email is already taken! Try again.")
      );
    return next(createError(500, "Something went wrong. Please try later."));
  }
};

/* Login */
const login = async (req, res, next) => {
  try {
    await connectToDatabase();
    const user = await Users.findOne({ username: req.body.username });
    if (!user) return next(createError(400, "User or password not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "User or password not found!"));

    // Si el password es correcto se envia el token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    // No envia password ni isAdmin en la respuesta
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("bkingToken", token, {
        //httpOnly indica que solo se accede a traves de peticiones HTTP
        httpOnly: true,
        //SameSite indica al explorador si la cookie se utiliza entre sitios o solo en el mismo sitio. Siempre va con secure:true
        sameSite: "none",
        //secure: true solo accedemos en sitio seguros
        secure: true,
        //maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

/* Logout */
const logout = (req, res) => {
  res
    .clearCookie("bkingToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

export default {
  register,
  login,
  logout,
};
