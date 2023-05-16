const UserModel = require("../../../models/dataview/user.model.js");
const BusinessModel = require("../../../models/dataview/business.model.js");
// const PersonModel = require("../../models/person.model.js");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

////////////////////////Login/////////////////////////////
const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  const foundUser = await UserModel.findOne({
    where: {
      USUARIO: username,
    },
  });

  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const match = password === foundUser.CLAVE;

  if (match) {
    const business = await BusinessModel.findOne({
      where: {
        ID_NEGOCIO: foundUser.ID_NEGOCIO,
      },
    });

    res.status(200).json({ businessId: business.ID_NEGOCIO , businessName: business.NOMBRE_NEGOCIO });
  } else {
    return res.sendStatus(401); //Unauthorized
  }
};

module.exports = { getAllUsers, handleLogin };
