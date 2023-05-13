const UserModel = require("../../models/user.model.js");
const PersonModel = require("../../models/person.model.js");
require("dotenv").config();

const getAllUsers = async(req, res) => {
  try {
    const users = await UserModel.findAll()
    res.json(users)
  } catch (error) {
    res.json({ message: error.message });
  }
}

////////////////////////Login/////////////////////////////
const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  const foundUser = await UserModel.findOne({
    where: {
      username: username,
    }
  });

  if (!foundUser) return res.sendStatus(401); //Unauthorized
  
  const match = password === foundUser.password
  // const match = await bcrypt.compare(password, foundUser.password);


  if (match) {
    
    res.sendStatus(200)
    // res.json({id: foundUser.id, isActive: foundUser.active, userRoles, accessToken });
  } else {
    return res.sendStatus(401); //Unauthorized
  }
};


module.exports = { getAllUsers, handleLogin };
