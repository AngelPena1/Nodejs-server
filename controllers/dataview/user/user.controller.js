const UserModel = require("../../../models/dataview/user.model.js");
const BusinessModel = require("../../../models/dataview/business.model.js");
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
    return res.status(401).json({ message: "Username and password required." });

  const foundUser = await UserModel.findOne({
    where: {
      USUARIO: username
    },
  });

  if (!foundUser)
    return res.status(401).json({ message: "Username or password incorrect" });

  const match = password === foundUser.CLAVE;

  if (match) {
    if(foundUser.CODIGOMULTINEGOCIO === 0) {
      // console.log(foundUser);
      const business = await BusinessModel.findOne({
        where: {
          ID_NEGOCIO: foundUser.ID_NEGOCIO,
          ACTIVO: "S"
        },
      })
      res.status(200).json({
        active: foundUser.ACTIVO,
        business: business,
        multibusiness: false
      });
    } else {
      const business = await BusinessModel.findAll({
        where: {
          CODIGOMULTINEGOCIO: foundUser.CODIGOMULTINEGOCIO,
          ACTIVO: "S"
        },
      })
      res.status(200).json({
        active: foundUser.ACTIVO,
        business: business,
        multibusiness: true
      });
    }

  } else {
    return res.status(401).json({ message: "Username or password incorrect" });
  }
};

module.exports = { getAllUsers, handleLogin };
