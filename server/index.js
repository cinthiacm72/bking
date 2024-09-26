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
import reservesController from "./controllers/reservesController.js";
import verifyAuth from "./utils/verifyAuth.js";

import Cities from "./models/Cities.js";

const app = express();

dotenv.config();
const port = PORT;
const clientUrl = CLIENT_URL;
/* const clientUrl = "https://bking-client.vercel.app"; */

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", clientUrl);
  /*   res.header(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  ); */
  /*  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  ); */
  /*   res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  } */
  next();
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB está conectado");
  } catch (err) {
    throw err;
  }
};

app.get("/", async (req, res) => {
  //res.send("Hola Booking");
  try {
    const cities = await Cities.find();
    return res.status(200).json(cities);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

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
app.get("/hotels/:id", hotelsController.getHotel);
app.get("/hotels", hotelsController.getAllHotels);
app.get("/hotels/countByCity", hotelsController.countByCity);
app.get("/hotels/find/countbytype", hotelsController.countByType);
app.get("/propertytypes/:type", hotelsController.getAllHotelsyByTypes);
app.get("/hotels/hotelsbytype/:type", hotelsController.getHotelsByType);
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
app.post("/reserves", reservesController.createReserve);
app.get("/reserves/:id", reservesController.getUserReserves);
app.get("/reserves", reservesController.getAllReservations);
app.delete("/reserves/delete/:id", reservesController.deleteReserve);
// Cities
app.get("/cities", citiesController.getAllCities);
app.get("/featuredCities", citiesController.getAllCitiesFeatured);
app.post("/cities", citiesController.createCity);
app.delete("/cities/:id", citiesController.deleteCity);
app.get("/cities/:id", citiesController.getCity);

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
