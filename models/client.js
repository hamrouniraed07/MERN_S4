const mongoose = require('mongoose')

const Client = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom est obligatoire"],
        unique: true,
        trim: true,
        minlength: [3, "Le nom doit contenir au moins 3 caractères"],
        maxlength: [30, "Le nom ne peut pas dépasser 30 caractères"]
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Veuillez entrer un email valide"]
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
        minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"]
    },
    numeroClient: {
        type: String,
        required: [true, "Le numéro client est obligatoire"],
        unique: true,
        trim: true
    },
    montant: {
        type: Number,
        default: 0,
        min: [0, "Le montant ne peut pas être négatif"]
    }
})


module.exports = mongoose.models.Client || mongoose.model('Client', Client);