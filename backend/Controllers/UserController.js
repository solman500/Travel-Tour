import User from "../models/User.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      data: savedUser,
      message: "user created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updateUser,
      message: "Tour updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
    
        res.status(200).json({
        success: true,
        data: user,
        message: "User fetched successfully",
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};

export const getAllUser = async (req, res) => {
  
  try {
        const users = await User.find({});
    
        res.status(200).json({
        success: true,
        data: users,
        message: "users fetched successfully",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Not Found"});
    }
};
