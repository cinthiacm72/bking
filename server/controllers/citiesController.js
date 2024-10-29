import Hotels from "../models/Hotels.js";
import Cities from "../models/Cities.js";
import mongoose from "mongoose";
import { connectToDatabase } from "../utils/db.js";

const createCity = async (req, res, next) => {
  const newCity = new Cities(req.body);

  try {
    const savedCity = await newCity.save();
    /*  res.status(200).json(savedCity); */
    res.status(200).json("City has been created.");
  } catch (err) {
    next(err);
  }
};

const getCity = async (req, res, next) => {
  try {
    const user = await Cities.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(err);
  }
};

const deleteCity = async (req, res, next) => {
  try {
    await Cities.findByIdAndDelete(req.params.id);
    res.status(200).json("City has been deleted");
  } catch (err) {
    next(err);
  }
};

const getAllCities = async (req, res, next) => {
  try {
    await connectToDatabase();
    const cities = await Cities.find();
    return res.status(200).json(cities);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const getAllCitiesFeatured = async (req, res, next) => {
  try {
    await connectToDatabase();
    const cities = await Hotels.aggregate([
      { $project: { _id: 0, city: 1, cheapestPrice: 1 } },
      {
        $group: {
          _id: { city: "$city" },
          count: { $sum: 1 },
          _id: "$city",
          minPrice: { $min: "$cheapestPrice" },
        },
      },
      { $limit: 12 },
      { $sort: { count: -1 } },
    ]);

    /*  const cities = await Hotels.aggregate([
      {
        $group: {
          _id: {
            city: "$city",
          },

          count: { $sum: 1 },
        },
      },

      { $sort: { count: -1 } },
    ]); */

    res.status(200).json(cities);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default {
  createCity,
  deleteCity,
  getAllCitiesFeatured,
  getAllCities,
  getCity,
};
