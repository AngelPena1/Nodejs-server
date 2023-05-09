const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");

const handleLogout = async (req, res) => {
  //On client also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content

  const refreshToken = cookies.jwt;

  const foundUser = await UserModel.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
  console.log(foundUser)

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }) //secure: true
    return res.sendStatus(204);
  }

  // To delete the refreshToken in the db
  try {
    await UserModel.update(
        {refreshToken: ''},
        {
            where: {
                refreshToken: refreshToken
            }
        }
      )
  } catch (error) {
    console.error(error)
  }
  res.clearCookie('jwt',  { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }) //Add - secure: true - in production, this is for https
  res.sendStatus(204)
};

module.exports = { handleLogout };
