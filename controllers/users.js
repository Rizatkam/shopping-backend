const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { users } = require("../model");

const register = async (req, res) => {
  try {
    const params = req.body;
    const duplicated = await users.findOne({
      where: {
        email: params.email,
      },
    });
    if (duplicated) {
      return res.status(400).send({
        message: "email telah terpakai",
      });
    }
    params.encrypted_password = await bcrypt.hashSync(
      req.body.encrypted_password,
      10
    );
    const data = await users.create(params);
    return res.status(200).send({
      data,
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const params = req.body;
    const query = {
      where: {
        email: params.email,
      },
      raw: true,
    };
    const user = await users.findOne(query);
    if (!user) {
      return res.status(400).send({
        message: "Email tidak ditemukan. Mohon untuk registrasi.",
      });
    }
    const compare_password = bcrypt.compareSync(
      params.encrypted_password,
      user.encrypted_password
    );
    if (!compare_password) {
      return res.status(400).send({
        message: "Password anda salah!",
      });
    }
    const sign_token = {
      issuer: "contoh.com",
      subject: "contoh.com",
      algorithm: "HS256",
      expiresIn: "1d",
      audience: "http://contoh.com",
    };
    const token = jwt.sign(user, process.env.JWT_SECRET, sign_token);
    return res.status(200).send({
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const params = req.query;
    const query = {
      order: [["id"]],
      where: {},
      limit: 10,
      offset: 0,
      attributes: this.attributes,
    };
    if (params.name)
      query.where.name = {
        [Op.like]: `%${params.name}%`,
      };
    if (params.email)
      query.where.email = {
        [Op.like]: `%${params.email}%`,
      };
    if (params.city)
      query.where.city = {
        [Op.like]: `%${params.city}%`,
      };
    if (params.sort_by && params.sort_type)
      query.order = [[params.sort_by, params.sort_type]];
    if (params.limit) query.limit = Number(params.limit);
    if (params.page)
      query.offset =
        Number(query.limit) * ((Number(params.page || 1) || 1) - 1);
    const data = await users.findAndCountAll(query);
    data.limit = query.limit;
    data.offset = query.offset;
    data.page = query.offset / query.limit + 1;
    return res.status(200).send({
      message: "OK",
      data,
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
};
