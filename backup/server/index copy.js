import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { PORT, CLIENT_URL } from "./config.js";
import authController from "./controllers/authController.js";
import usersController from "./controllers/usersController.js";
import hotelsController from "./controllers/hotelsController.js";
import roomsController from "./controllers/roomsController.js";
import citiesController from "./controllers/citiesController.js";
import verifyAuth from "./utils/verifyAuth.js";

const app = express();

dotenv.config();
const port = PORT;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    // credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //origin: "http://localhost:5174",
  })
);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB está conectado");
  } catch (err) {
    throw err;
  }
};

// mongoose.connection.on("Desconectado", () => {
// console.log("MongoDB desconectado!");
// });

// Midlewares

//Desde SO
/* app.all("*", function (req, res, next) {
  const origin = cors.origin.includes(req.header("origin").toLowerCase())
    ? req.headers.origin
    : cors.default;
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

// Routes
app.get("/", (req, res) => {
  res.send("Hola Booking");
  //console.log("Cookies :  ", req.cookies);
});

app.get("/cookies", function (req, res) {
  //console.log("Cookies :  ", req.cookies);
});

// Rutas de prueba
/* app.get("/checkauthentication", verifyAuth.verifyToken, (req, res, next) =>
  res.send("Hello, you are logged in")
);
app.get("/checkuser/:id", verifyAuth.verifyUser, (req, res, next) =>
  res.send("Hello User, you are logged in and you can delete your account")
);
app.get("/checkadmin/:id", verifyAuth.verifyAdmin, (req, res, next) =>
  res.send("Hello Admin, you are logged in and you can delete all accounts!")
); */

app.post("/register", authController.register);
app.post("/login", authController.login);
app.post("/logout", authController.logout);
app.put("/users/:id", verifyAuth.verifyUser, usersController.updateUser);
app.delete("/users/:id", verifyAuth.verifyUser, usersController.deleteUser);
app.get("/users/:id", verifyAuth.verifyUser, usersController.getUser);
app.get("/users", verifyAuth.verifyAdmin, usersController.getAllUsers);
app.post("/hotels", verifyAuth.verifyAdmin, hotelsController.createHotel);
app.put("/hotels/:id", verifyAuth.verifyAdmin, hotelsController.updateHotel);
app.delete("/hotels/:id", verifyAuth.verifyAdmin, hotelsController.deleteHotel);
app.get("/hotels/find/:id", hotelsController.getHotel);
app.get("/hotels", hotelsController.getAllHotels);
app.get("/hotels/countByCity", hotelsController.countByCity);
app.get("/hotels/countbytype", hotelsController.countByType);
app.get("/hotels/rooms/:hotelid", hotelsController.getHotelRooms);
app.post("/rooms/:hotelid", verifyAuth.verifyAdmin, roomsController.createRoom);
app.put("/rooms/find/:id", verifyAuth.verifyAdmin, roomsController.updateRoom);
app.put("/rooms/availability/:roomid", roomsController.updateRoomAvailability);
app.put(
  "/rooms/availability/delete/:roomid",
  roomsController.deleteRoomAvailability
);
app.delete(
  "/rooms/:id/:hotelid",
  verifyAuth.verifyAdmin,
  roomsController.deleteRoom
);
app.get("/rooms/:id", roomsController.getRoom);
app.get("/rooms", roomsController.getAllRooms);

/* Test */
app.get("/cities", citiesController.getAllCities);
app.get("/cookies", usersController.getCookies);
app.get("/flights", (req, res) => {
  // const token = req.cookies.access_token;
  //console.log("TOKEN from Vuelos Index:", req.cookies);
  res.status(200).json("You are logged");
});

// --> handler must be below routes to work properly. To send json content instead of html
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log(`La api está funcionando en http://localhost:${port}`);
});
