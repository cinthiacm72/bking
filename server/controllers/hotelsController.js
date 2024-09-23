import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

/* Create */
const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);

  try {
    const savedHotel = await newHotel.save();
    //res.status(200).json(savedHotel);
    res.status(200).json("Hotel has been created.");
  } catch (err) {
    next(err);
  }
};

/* Update */
const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      // Devuelve el objeto ya modificado
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

/* Delete */
const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

/* Get */
const getHotel = async (req, res, next) => {
  const token = req.cookies.bkingToken;
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

/* Get properties by type */
const getHotelsByType = async (req, res, next) => {
  try {
    const properties = await Hotels.find({ type: req.params.type });

    return res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
};

/* All Properties Type */
const getAllHotelsyByTypes = async (req, res, next) => {
  try {
    const { max, min, featured, limit, ...others } = req.query;

    const allProperties = await Hotels.find({
      ...others,
      type: req.params.type,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(limit);
    return res.status(200).json(allProperties);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const { max, min, featured, limit, ...others } = req.query;
    const hotels = await Hotels.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(limit);
    return res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

/* Count by City */
// Retornar los hoteles con find() o con countDocuments método de Mongodb

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

/* Count by Type */
const countByType = async (req, res, next) => {
  try {
    const hotelsCount = await Hotels.countDocuments({ type: "hotel" });
    const apartmentsCount = await Hotels.countDocuments({ type: "apartment" });
    const resortsCount = await Hotels.countDocuments({ type: "resort" });
    const villasCount = await Hotels.countDocuments({ type: "villa" });
    const cabinsCount = await Hotels.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelsCount },
      { type: "apartment", count: apartmentsCount },
      { type: "resort", count: resortsCount },
      { type: "villa", count: villasCount },
      { type: "cabin", count: cabinsCount },
    ]);
  } catch (err) {
    next(err);
  }
};

/* Get Hotel Rooms */
const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.hotelid);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Rooms.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export default {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms,
  getHotelsByType,
  getAllHotelsyByTypes,
};
