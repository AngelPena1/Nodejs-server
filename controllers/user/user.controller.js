const UserModel = require("../../models/user.model.js");
const RoleUserModel = require("../../models/role_user.model.js");
const RoleModel = require("../../models/role.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const getUserInfo = async(req, res) => {
  try {
    const user = await UserModel.findAll({
      attributes: ['id', 'username'],
      where: {
        id: req.params.id
      },
      include: [
        {
          model: PersonModel,
          attributes: ['id','firstname', 'lastname', 'birthdate', 'gender']
        }
      ],
    })
    res.json(user)
  } catch (error) {
    res.json({ message: error.message });
  }
}

const checkValidPwd = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." })

    try {
      const user = await UserModel.findOne({
        where: {
          username: username,
        }
      })

      const match = await bcrypt.compare(password, user.password)

      if(!match){
        return res.sendStatus(203)
      }
      
      return res.sendStatus(200)

    } catch (error) {
      res.status(500).json({ message: error.message });
    }

};

const createUser = async (req, res) => {
  const { firstname, lastname, birthdate, gender, phone, username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  const userExists = await UserModel.findOne({
    where: {
      username: username,
    },
  });

  if (userExists) return res.sendStatus(409);
  try {
    const personal = await PersonModel.create({
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      gender: gender,
      phone: phone
    })
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      person_Id: personal.id, //Change this value with personId when register is finished
      username: username,
      password: hashedPwd,
    }).catch(err => {
      console.log(err.message);
    })

    await RoleUserModel.create({
      user_Id: user.id,
      role_Id: 3,
    })
    
    res.status(201).json({ message: "New user created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const userRole = await RoleUserModel.findAll({
      attributes: [],
      where: {
        user_id: foundUser.id,
      },
      include: [
        {
          model: RoleModel,
          attributes: ['name', 'code']
        },
      ],
    })
    let userRoles = []
    userRole.map((user) => {
      userRoles.push(user.role.dataValues.code)
    })
    
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: username,
          roles: userRoles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { username: username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "365d" }
    );

    await UserModel.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: { username: foundUser.username },
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,  
      maxAge: 24 * 60 * 60 * 1000, 
    });
    res.json({id: foundUser.id, isActive: foundUser.active, userRoles, accessToken });
  } else {
    return res.sendStatus(401); //Unauthorized
  }
};

const updateUser = async (req, res) => {
  try {
    await UserModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.sendStatus(204)
  } catch (error) {
    res.json({message: error.message})
  }
}

module.exports = { getAllUsers, getUserInfo, checkValidPwd, createUser, handleLogin, updateUser };
