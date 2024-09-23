import mongoose from "mongoose";

const ReservesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },

  hotelId: {
    type: mongoose.Types.ObjectId,
  },

  roomId: {
    type: mongoose.Types.ObjectId,
  },

  selectedRooms: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],

  allDates: {
    type: [Date],
  },
});

export default mongoose.model("Reserves", ReservesSchema);
