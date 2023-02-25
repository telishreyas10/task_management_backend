const SharedService = require("../services/shared");
const User = require("../models/user");

const getAllUsers = async () => {
  const matches = await User.find({}).populate([{path:"project",select:[]}])
  return matches;
}

const getUsersByIsActive = async (searchTerm) => {
  const matches = await User.find({
    isActive: searchTerm,
  }).populate([{path:"project",select:[]}]);
  return matches;
};

const getUserById = async (id) => await SharedService.get(User, id);

const updateUser = async (id, body) => {
    const updated = await User.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });
    return updated;
  };

module.exports = {
  getAllUsers,
  getUsersByIsActive,
  getUserById,
  updateUser
};
