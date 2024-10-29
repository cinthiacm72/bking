import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";
import { connectToDatabase } from "../utils/db.js";
import mongoose from "mongoose";

/* Create */
const createRoom = async (req, res, next) => {
  // Primer paso añadir el nuevo room al hotel que corresponde por id
  const hotelId = req.params.hotelid;
  const newRoom = new Rooms(req.body);

  try {
    await connectToDatabase();
    const savedRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    // res.status(200).json(savedRoom);
    res.status(200).json("Room has been created.");
  } catch (err) {
    next(err);
  }
};

/* Update */
const updateRoom = async (req, res) => {
  try {
    await connectToDatabase();
    const updatedRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      // Devuelve el objeto ya modificado
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Update updateRoomAvailability*/
const updateRoomAvailability = async (req, res, next) => {
  try {
    await connectToDatabase();
    await Rooms.updateOne(
      { "roomNumbers._id": req.params.roomid },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Room availability status has been updated");
  } catch (err) {
    next(err);
  }
};

/* Delete updateRoomAvailability */
const deleteRoomAvailability = async (req, res, next) => {
  // console.log({ "roomNumbers._id": req.params.roomid });
  try {
    await connectToDatabase();
    await Rooms.updateOne(
      { "roomNumbers._id": req.params.roomid },
      {
        $pullAll: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Room availability has been deleted");
  } catch (err) {
    next(err);
  }
};

/* Delete */
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await connectToDatabase();
    await Hotels.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    });
    try {
      await Rooms.findByIdAndDelete(req.params.id);
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

/* Get */
const getRoom = async (req, res) => {
  try {
    await connectToDatabase();
    const room = await Rooms.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Get All */
const getAllRooms = async (req, res, next) => {
  try {
    await connectToDatabase();
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export default {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
  deleteRoomAvailability,
};
