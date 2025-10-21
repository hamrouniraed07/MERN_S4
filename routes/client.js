const express = require('express');
const router = express.Router();
const {
    getAllClients,
    getClientById,
    createClient,
    updateClientById,
    deleteClientById
} = require('../controllers/client');

router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClientById);
router.delete('/:id', deleteClientById);

module.exports = router;
