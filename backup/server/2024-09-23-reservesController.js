import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";
import Reserves from "../models/Reserves.js";
import Users from "../models/Users.js";
import mongoose from "mongoose";

const createReserve = async (req, res, next) => {
  const newReserve = new Reserves(req.body);

  try {
    const saveReserve = await newReserve.save();
    res.status(200).json("Reserve has been created.");
  } catch (err) {
    next(err);
  }
};

const deleteReserve = async (req, res, next) => {
  try {
    await Reserves.findByIdAndDelete(req.params.id);
  } catch (err) {
    next(err);
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    const allReservations = await Reserves.find();
    return res.status(200).json(allReservation);
  } catch (err) {
    next(err);
  }
};

const getUserReserves = async (req, res, next) => {
  try {
    const userReservesList = await Reserves.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.params.id),
        },
      },

      {
        $lookup: {
          from: "hotels",
          localField: "hotelId",
          foreignField: "_id",
          as: "reservesList",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
                city: 1,
                address: 1,
                images: { $first: "$images" },
              },
            },
          ],
        },
      },
      {
        $unwind: "$reservesList",
      },

      {
        $lookup: {
          from: "rooms",
          localField: "roomId",
          foreignField: "_id",
          as: "reservesRooms",
          pipeline: [
            {
              $project: {
                _id: 0,
                title: 1,
                price: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$reservesRooms",
      },
    ]);
    res.status(200).json(userReservesList);
  } catch (err) {
    next(err);
  }
};
/* getUserReserves(); */

export default {
  getUserReserves,
  getAllReservations,
  createReserve,
  deleteReserve,
};
