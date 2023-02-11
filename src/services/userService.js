const db = require("../models");
const User = db.users;

const findById = async (id) => {
  return await User.findOne({ where: { id: id } });
};

const getAll = async () => {
  return await User.findAll();
};

const create = async (payload) => {
  return await User.create(payload);
};

const update = async (id, payload) => {
  return await User.update(payload, { where: { id: id } });
};

const destroy = async (id) => {
  return await User.destroy({ where: { id: id } });
};

module.exports = {
  findById,
  getAll,
  create,
  update,
  destroy,
};
