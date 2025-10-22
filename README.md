# 📝 API Admin & Client - MERN

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

Une API REST complète pour gérer des **administrateurs** et des **clients**, construite avec **Express.js** et **MongoDB/Mongoose**, utilisant le pattern **MVC (Model-View-Controller)**.

---

## 📚 Table des Matières

- [Introduction](#-introduction)
- [Architecture MVC avec MongoDB](#-architecture-mvc-avec-mongodb)
- [Structure du Projet](#-structure-du-projet)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Endpoints de l'API](#-endpoints-de-lapi)
- [Tests avec Postman](#-tests-avec-postman)
- [Validation des Erreurs](#-validation-des-erreurs)
- [Technologies Utilisées](#-technologies-utilisées)
- [Schémas de Données](#-schémas-de-données)
- [Auteur](#-auteur)

---

## 🎯 Introduction

Cette API permet de gérer **Admins** et **Clients** avec un CRUD complet.  
MongoDB est utilisé pour la persistance des données et Mongoose pour la validation et le typage.

---

## 🏗️ Architecture MVC avec MongoDB

Notre application suit une architecture **MVC complète** :

```
┌─────────────────────────────────────────────────┐
│           server.js (Point d'entrée)            │
│  - Configuration Express                        │
│  - Middlewares globaux                          │
│  - Connexion à MongoDB                          │
│  - Montage des routes                           │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│         Routes Layer                            │
│  - admin.js (/api/admins)                       │
│  - client.js (/api/clients)                     │
│  - Définition des endpoints HTTP                │
│  - Mapping URL → Controller                     │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│       Controllers Layer                         │
│  - adminController.js                           │
│  - clientController.js                          │
│  - Logique métier                               │
│  - Appels aux modèles                           │
│  - Gestion des réponses HTTP                    │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│         Models Layer - Mongoose                 │
│  - Admin.js (Schéma Mongoose)                   │
│  - Client.js (Schéma Mongoose)                  │
│  - Définition des structures de données         │
│  - Validation automatique                       │
│  - Interaction avec MongoDB                     │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│              MongoDB Database                   │
│  - Collection: admins                           │
│  - Collection: clients                          │
│  - Persistance des données                      │
└─────────────────────────────────────────────────┘
```

---

## 📁 Structure du Projet

```
App1/
│
├── 📄 server.js                    # Point d'entrée + connexion MongoDB
├── 📄 package.json                 # Dépendances (Express, Mongoose, etc.)
├── 📄 .env                         # Variables d'environnement (MongoDB URI)
├── 📄 README.md                    # Documentation complète
│
├── 📁 config/                      # Configuration
│   └── db.js                       # Connexion à MongoDB
│
├── 📁 models/                      # Modèles Mongoose
│   ├── admin.js                    # Schéma Admin
│   └── client.js                   # Schéma Client
│
├── 📁 controllers/                 # Logique métier
│   ├── admin.js                    # CRUD Admins avec MongoDB
│   └── client.js                   # CRUD Clients avec MongoDB
│
├── 📁 routes/                      # Définition des routes
│   ├── admin.js                    # Routes pour les admins
│   └── client.js                   # Routes pour les clients
│
└── 📄 package-lock.json            # Lock des dépendances
```

---

## 🚀 Installation

### Prérequis

- **Node.js** (v14 ou supérieur)
- **MongoDB** (local ou MongoDB Atlas)
- **npm** ou **yarn**
- **Postman** (pour tester l'API)

### Étapes d'Installation

1. **Naviguer vers le projet**

```bash
cd /home/raed/Desktop/polytech/MERN/App1
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env` à la racine du projet :

```env
MONGODB_URI=mongodb://localhost:27017/app1
# OU pour MongoDB Atlas :
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/app1
PORT=3000
```

4. **Lancer le serveur en mode développement**

```bash
npm run dev
```

5. **Lancer le serveur en mode production**

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000` et se connecte à MongoDB.

---

## ⚙️ Configuration

### 📝 Fichier `.env`

```env
# URI de connexion à MongoDB
MONGODB_URI=mongodb://localhost:27017/app1

# Port du serveur (optionnel, par défaut 3000)
PORT=3000
```

### 🔌 Connexion MongoDB (`config/db.js`)

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connecté avec succès');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB :', err.message);
        process.exit(1); // Arrêter l'application si échec de connexion
    }
};

module.exports = connectDB;
```

---

## 📋 Schémas de Données

### 👨‍💼 Schéma Admin

```javascript
{
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
  role: {
    type: String,
    enum: {
      values: ["admin", "client"],
      message: "Le rôle doit être soit 'admin' soit 'client'"
    },
    default: "client"
  }
}
```

### 👤 Schéma Client

```javascript
{
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
}
```

---

## 🔌 Endpoints de l'API

### Page d'Accueil

#### GET `/`

- **Description** : Page d'accueil de l'API
- **Réponse** : HTML

```
GET http://localhost:3000/
```

**Réponse :**

```html
Bienvenue sur l'API !
```

---

### Administrateurs

#### GET `/api/admins`

- **Description** : Récupérer tous les administrateurs depuis MongoDB
- **Réponse** : JSON (Array)

```json
[
  {
    "_id": "6789abcd1234567890abcdef",
    "name": "Admin Principal",
    "email": "admin@example.com",
    "password": "hashed_password_here",
    "role": "admin",
    "__v": 0
  },
  {
    "_id": "6789abcd1234567890fedcba",
    "name": "Super Admin",
    "email": "superadmin@example.com",
    "password": "hashed_password_here",
    "role": "admin",
    "__v": 0
  }
]
```

#### GET `/api/admins/:id`

- **Description** : Récupérer un administrateur par son ID
- **Paramètres** : `id` (ObjectId MongoDB)
- **Réponse** : JSON

```json
{
  "_id": "6789abcd1234567890abcdef",
  "name": "Admin Principal",
  "email": "admin@example.com",
  "password": "hashed_password_here",
  "role": "admin",
  "__v": 0
}
```

#### POST `/api/admins`

- **Description** : Créer un nouvel administrateur dans MongoDB
- **Body** : JSON

```json
{
  "name": "Nouveau Admin",
  "email": "nouveauadmin@example.com",
  "password": "secure123"
}
```

- **Réponse** : JSON

```json
{
  "_id": "6789abcd1234567890abcdef",
  "name": "Nouveau Admin",
  "email": "nouveauadmin@example.com",
  "password": "secure123",
  "role": "admin",
  "__v": 0
}
```

#### PUT `/api/admins/:id`

- **Description** : Mettre à jour un administrateur par son ID
- **Paramètres** : `id` (ObjectId MongoDB)
- **Body** : JSON (champs à mettre à jour)

```json
{
  "name": "Admin Modifié",
  "email": "adminmodifie@example.com"
}
```

#### DELETE `/api/admins/:id`

- **Description** : Supprimer un administrateur par son ID
- **Paramètres** : `id` (ObjectId MongoDB)
- **Réponse** : JSON

```json
{
  "message": "Administrateur supprimé avec succès."
}
```

---

### Clients

#### GET `/api/clients`

- **Description** : Récupérer tous les clients depuis MongoDB
- **Réponse** : JSON (Array)

```json
[
  {
    "_id": "6789abcd1234567890abcdef",
    "name": "Client 1",
    "email": "client1@example.com",
    "password": "hashed_password_here",
    "numeroClient": "CLI001",
    "montant": 1500.50,
    "__v": 0
  },
  {
    "_id": "6789abcd1234567890fedcba",
    "name": "Client 2",
    "email": "client2@example.com",
    "password": "hashed_password_here",
    "numeroClient": "CLI002",
    "montant": 2500.00,
    "__v": 0
  }
]
```

#### GET `/api/clients/:id`

- **Description** : Récupérer un client par son ID
- **Paramètres** : `id` (ObjectId MongoDB)
- **Réponse** : JSON

```json
{
  "_id": "6789abcd1234567890abcdef",
  "name": "Client 1",
  "email": "client1@example.com",
  "password": "hashed_password_here",
  "numeroClient": "CLI001",
  "montant": 1500.50,
  "__v": 0
}
```

#### POST `/api/clients`

- **Description** : Créer un nouveau client dans MongoDB
- **Body** : JSON

```json
{
  "name": "Nouveau Client",
  "email": "nouveauclient@example.com",
  "password": "secure123",
  "numeroClient": "CLI003",
  "montant": 1000.00
}
```

- **Réponse** : JSON

```json
{
  "_id": "6789abcd1234567890abcdef",
  "name": "Nouveau Client",
  "email": "nouveauclient@example.com",
  "password": "secure123",
  "numeroClient": "CLI003",
  "montant": 1000,
  "__v": 0
}
```

#### PUT `/api/clients/:id`

- **Description** : Mettre à jour un client par son ID
- **Paramètres** : `id` (ObjectId MongoDB)
- **Body** : JSON (champs à mettre à jour)

```json
{
  "name": "Client Modifié",
  "montant": 2000.00
}
```

#### DELETE `/api/clients/:id`

- **Description** : Supprimer un client par son ID
- **Paramètres** : `id` (ObjectId MongoDB)
- **Réponse** : JSON

```json
{
  "message": "Client supprimé avec succès."
}
```

---

## 🧪 Tests avec Postman

### 1. Test de l'Endpoint Accueil - GET `/`

**Étapes :**

1. Ouvrir Postman
2. Créer une nouvelle requête GET
3. URL : `http://localhost:3000/`
4. Cliquer sur "Send"
5. Vérifier la réponse (Status 200)

**Réponse attendue :**

```
Bienvenue sur l'API !
```

---

### 2. Récupération de Tous les Administrateurs - GET `/api/admins`

**Étapes :**

1. Créer une nouvelle requête GET
2. URL : `http://localhost:3000/api/admins`
3. Cliquer sur "Send"
4. Vérifier la réponse (Status 200)

**Réponse attendue :**

```json
[
  {
    "_id": "...",
    "name": "Admin Principal",
    "email": "admin@example.com",
    "password": "...",
    "role": "admin",
    "__v": 0
  }
]
```

---

### 3. Création d'un Administrateur - POST `/api/admins`

**Étapes :**

1. Créer une nouvelle requête POST
2. URL : `http://localhost:3000/api/admins`
3. Dans l'onglet "Body" :
   - Sélectionner "raw"
   - Sélectionner "JSON"
4. Ajouter le JSON :

```json
{
  "name": "Test Admin",
  "email": "testadmin@example.com",
  "password": "test123456"
}
```

5. Cliquer sur "Send"
6. Vérifier la réponse (Status 201)

**Réponse attendue :**

```json
{
  "name": "Test Admin",
  "email": "testadmin@example.com",
  "password": "test123456",
  "role": "admin",
  "_id": "68f69676a011359b4736bc6a",
  "__v": 0
}
```

---

### 4. Test de Validation - Administrateur Invalide

**Tester sans nom :**

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

**Réponse attendue (Status 400) :**

```json
{
  "message": "Erreur lors de la création de l'administrateur.",
  "error": "Admin validation failed: name: Le nom est obligatoire"
}
```

---

### 5. Récupération de Tous les Clients - GET `/api/clients`

**Étapes :**

1. Créer une nouvelle requête GET
2. URL : `http://localhost:3000/api/clients`
3. Cliquer sur "Send"
4. Vérifier la réponse (Status 200)

---

### 6. Création d'un Client - POST `/api/clients`

**Étapes :**

1. Créer une nouvelle requête POST
2. URL : `http://localhost:3000/api/clients`
3. Dans l'onglet "Body" :
   - Sélectionner "raw"
   - Sélectionner "JSON"
4. Ajouter le JSON :

```json
{
  "name": "Test Client",
  "email": "testclient@example.com",
  "password": "test123456",
  "numeroClient": "CLI999",
  "montant": 500.00
}
```

5. Cliquer sur "Send"
6. Vérifier la réponse (Status 201)

**Réponse attendue :**

```json
{
  "name": "Test Client",
  "email": "testclient@example.com",
  "password": "test123456",
  "numeroClient": "CLI999",
  "montant": 500,
  "_id": "68f698f4a011359b4736bc6d",
  "__v": 0
}
```

---

### 7. Test de Validation - Client Invalide

**Tester avec un email invalide :**

```json
{
  "name": "Test",
  "email": "email-invalide",
  "password": "123456",
  "numeroClient": "CLI001"
}
```

**Réponse attendue (Status 400) :**

```json
{
  "message": "Erreur lors de la création du client.",
  "error": "Client validation failed: email: Veuillez entrer un email valide"
}
```

---

## 🛠️ Technologies Utilisées

- **Node.js** - Environnement d'exécution JavaScript côté serveur
- **Express.js v5.1.0** - Framework web minimaliste et flexible
- **MongoDB** - Base de données NoSQL orientée documents
- **Mongoose v8.19.2** - ODM (Object Document Mapper) pour MongoDB
- **CORS v2.8.5** - Gestion des requêtes cross-origin
- **Body-parser** - Parsing des corps de requêtes HTTP
- **Dotenv v17.2.3** - Gestion des variables d'environnement
- **Bcrypt v6.0.0** - Hashage des mots de passe (installé mais non utilisé dans les contrôleurs)
- **Nodemon v3.1.10** - Rechargement automatique du serveur en développement
- **Postman** - Tests et documentation d'API

---

## 🎓 Concepts Clés Appris

### 1. **Mongoose ODM**

Mongoose simplifie l'interaction avec MongoDB en fournissant :

- ✅ Schémas de données structurés
- ✅ Validation automatique
- ✅ Middleware (hooks)
- ✅ Méthodes pratiques (find, save, update, delete)

### 2. **CRUD Operations**

Opérations de base implémentées pour chaque entité :

- **Create** : `POST /api/entite`
- **Read** : `GET /api/entite` et `GET /api/entite/:id`
- **Update** : `PUT /api/entite/:id`
- **Delete** : `DELETE /api/entite/:id`

### 3. **Async/Await**

```javascript
// Gestion asynchrone des opérations MongoDB
const clients = await Client.find();
```

**Avantages :**

- Code plus lisible et maintenable
- Gestion d'erreurs simplifiée avec try/catch
- Évite le "callback hell"

### 4. **Variables d'Environnement**

```javascript
require("dotenv").config();
process.env.MONGODB_URI;
```

**Pourquoi ?**

- 🔐 Sécurité (URLs de connexion hors du code)
- 🌍 Configuration par environnement (dev, prod)
- ♻️ Réutilisabilité

### 5. **Gestion d'Erreurs Robuste**

```javascript
try {
  // Opération risquée
  const result = await Model.save();
} catch (err) {
  // Gestion de l'erreur
  res.status(400).json({ message: "Erreur", error: err.message });
}
```

---

## 📝 Auteur

Projet réalisé dans le cadre du cours MERN - Polytech
