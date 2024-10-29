import Reserves from "../models/Reserves.js";
import mongoose from "mongoose";
import { connectToDatabase } from "../utils/db.js";

const createReserve = async (req, res, next) => {
  const newReserve = new Reserves(req.body);

  /*   console.log(newReserve); */

  try {
    await connectToDatabase();
    const saveReserve = await newReserve.save();
    res.status(200).json("Reserve has been created.");
  } catch (err) {
    next(err);
  }
};

const deleteReserve = async (req, res, next) => {
  try {
    await connectToDatabase();
    await Reserves.findByIdAndDelete(req.params.id);
  } catch (err) {
    next(err);
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    await connectToDatabase();
    const allReservations = await Reserves.find();
    return res.status(200).json(allReservations);
  } catch (err) {
    next(err);
  }
};

const getUserReserves = async (req, res, next) => {
  const userid = req.params.userid;

  /*   if (mongoose.Types.ObjectId.isValid(userid)) {
    //userid = mongoose.Types.ObjectId(req.params.userid);
    console.log("VALIDO!!!");
  } else {
    console.log("NO VALIDO!!!");
  } */

  try {
    await connectToDatabase();
    const userReservesList = await Reserves.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userid),
          //userId: userid,
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

export default {
  getUserReserves,
  getAllReservations,
  createReserve,
  deleteReserve,
};
