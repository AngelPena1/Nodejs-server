const jwt = require("jsonwebtoken");
const UserModel = require('../../models/user.model')
const UserRoleModel = require('../../models/role_user.model')
const RoleModel = require('../../models/role.model')
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); //Unauthorized

  const refreshToken = cookies.jwt;

  const foundUser = await UserModel.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });

  if (!foundUser) return res.sendStatus(403); //Forbidden

  const userRol = await UserRoleModel.findAll({
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
  let rolUserArray = []
  userRol.map((user) => {
    rolUserArray.push(user.role.dataValues.code)
  })

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: rolUserArray,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
