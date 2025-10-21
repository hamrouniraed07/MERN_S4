const Client = require('../models/client');


const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des clients.", error: err.message });
    }
};


const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findById(id);
        if (!client) return res.status(404).json({ message: "Client non trouvé." });
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération du client.", error: err.message });
    }
};


const createClient = async (req, res) => {
    try {
        const { name, email, password, numeroClient, montant } = req.body;
        const newClient = new Client({ name, email, password, numeroClient, montant });
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la création du client.", error: err.message });
    }
};


const updateClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedClient = await Client.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedClient) return res.status(404).json({ message: "Client non trouvé." });
        res.status(200).json(updatedClient);
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la mise à jour du client.", error: err.message });
    }
};


const deleteClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) return res.status(404).json({ message: "Client non trouvé." });
        res.status(200).json({ message: "Client supprimé avec succès." });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression du client.", error: err.message });
    }
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClientById,
    deleteClientById
};
