const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { users } = require("../model");

dotenv.config();

const sign_token = {
  issuer: "contoh.com",
  subject: "contoh.com",
  algorithm: "HS256",
  expiresIn: "1d",
  audience: "http://contoh.com",
};

const userAuth = async (req, res, next) => {
  try {
    const data = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      sign_token
    );

    console.log(data, "data from decoded userAuth middleware");
    const query = {
      where: {
        email: data.email,
      },
      raw: true,
    };
    const user = await users.findOne(query);

    if (!user) {
      return res.status(400).send({
        message: "user not found",
      });
    }

    return next();
  } catch (err) {
    return res.status(400).send({
      message: "please login",
    });
  }
};

module.exports = { userAuth };
