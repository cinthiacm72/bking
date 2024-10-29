import Users from "../models/Users.js";
import { connectToDatabase } from "../utils/db.js";

/* Update */
const updateUser = async (req, res, next) => {
  try {
    await connectToDatabase();
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      // Devuelve el objeto ya modificado
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

/* Delete */
const deleteUser = async (req, res, next) => {
  try {
    await connectToDatabase();
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

/* Get */
const getUser = async (req, res, next) => {
  try {
    await connectToDatabase();
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(err);
  }
};

/* Get All */
const getAllUsers = (req, res) => {
  const token = req.cookies.bkingToken;

  const allUsers = async () => {
    try {
      await connectToDatabase();
      const users = await Users.find();
      res.status(200).json(users);
    } catch (err) {
      //console.log(err);
    }
  };

  allUsers();
};

const getUserreserve = async (req, res, next) => {
  const userReservesList = await Users.aggregate([
    {
      $lookup: {
        from: "reserves",
        localField: "_id",
        foreignField: "reservesId",
        as: "reservesList",
        pipeline: [
          {
            $project: {
              _id: 0,
              userId: 1,
            },
          },
        ],
      },
    },
  ]);
};

export default {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserreserve,
};
