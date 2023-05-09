const PersonModel = require("../models/person.model.js");

const getAllPersonal = async (req, res) => {
  try {
    const personals = await PersonModel.findAll();
    res.json(personals);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getPersonal = async (req, res) => {
  try {
    const personal = await PersonModel.findAll({
      where: {
        email: req.params.email,
      },
    });
    res.json(personal);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createPersonal = async (req, res) => {
  try {
    const personal = await PersonModel.create(req.body);
    res.json(personal.id);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updatePersonal = async (req, res) => {
  try {
    await PersonModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Personal updated succesfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deletePersonal = async (req, res) => {
  try {
    await PersonModel.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Personal deleted succesfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getAllPersonal,
  getPersonal,
  createPersonal,
  updatePersonal,
  deletePersonal,
};
