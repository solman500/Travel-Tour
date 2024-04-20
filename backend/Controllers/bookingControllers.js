import Booking from "../models/Booking.js";


// Create a new booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      data: savedBooking,
      message: "Booking created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//get single booking

export const getBooking=async (req, res) => {
    const id=req.params.id;

    try {
        const book = await Booking.findById(id);
        res.status(200).json({
        success: true,
        data: book,
        message: "Booking fetched successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message:"notfound" });
    }
}
    

export const getAllBooking =async (req, res) => {

    try {
        const books = await Booking.find();
        res.status(200).json({
        success: true,
        data: books,
        message: "Booking fetched successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message:"internal server error " });
    }
}
