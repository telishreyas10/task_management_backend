const UserService = require("../services/users");

const getUser = async (req, res) => {
  const { query } = req;
  const isActive = query.isActive;

  try {
      if (isActive !== "" && isActive !== null && typeof isActive !== "undefined") {
          const matches = await UserService.getUsersByIsActive(isActive);
          res.json(matches);
      } else {
          const users = await UserService.getAllUsers();
          res.json(users);
      }
  } catch (error) {
      res.status(500).send({ error: error.toString() });
  }
};

const getUserById = async (req, res) => {
  const { params } = req;
  const id = params.id;

  try {
    const user = await UserService.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

const updateUser = async (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    try {
        const user = await UserService.updateUser(id, body);
        res.json(user);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};


module.exports = {
    getUser,
    getUserById,
    updateUser
}
