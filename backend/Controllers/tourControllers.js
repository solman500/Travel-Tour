import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      data: savedTour,
      message: "Tour created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updateTour,
      message: "Tour updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate('reviews');
    
        res.status(200).json({
        success: true,
        data: tour,
        message: "Tour fetched successfully",
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};

export const getAllTour = async (req, res) => {
    const page=parseInt(req.query.page) ;
  
  try {
        const tours = await Tour.find({})
        .populate('reviews').skip(page*8).limit(8);
    
        res.status(200).json({
        success: true,
        data: tours,
        message: "Tours fetched successfully",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Not Found"});
    }
};


export const getTourBySearch= async (req, res) => {
    const city =new RegExp(req.query.city,'i')
    // const distance =new RegExp(req.query.distance);
    // const maxGroupSize =new RegExp(req.query.maxGroupSize);
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } }).populate('reviews');

        res.status(200).json({
        success: true,
        data: tours,
        message: "Tours fetched successfully",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Not Found" });
    }
}


export const getFeaturedTour = async (req, res) => {

try {
      const tours = await Tour.find({featured:true}).populate('reviews').limit(8);
  
      res.status(200).json({
      success: true,
      data: tours,
      message: "Tours fetched successfully",
      });
  } catch (err) {
      res.status(404).json({ success: false, message: "Not Found"});
  }
};


export const getTourCount=async(req,res)=>{
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: tourCount,
      message: "Tours count fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Faild to Fetch " });
  }
}