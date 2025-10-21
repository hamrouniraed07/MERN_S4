const Admin = require('../models/admin');

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des administrateurs.",
      error: err.message
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Administrateur non trouvé." });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'administrateur.",
      error: err.message
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.params;

    const newAdmin = new Admin({
      name,
      email,
      password,
      role: 'admin'
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la création de l'administrateur.",
      error: err.message
    });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Administrateur non trouvé." });
    }

    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour de l'administrateur.",
      error: err.message
    });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Administrateur non trouvé." });
    }

    res.status(200).json({ message: "Administrateur supprimé avec succès." });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'administrateur.",
      error: err.message
    });
  }
};



module.exports = {
  getAllAdmins,
  createAdmin,
  getAdminById,
  deleteAdminById,
  updateAdminById
};
