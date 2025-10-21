require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin'); 

const connectDB = require('./config/db');

const app = express();


connectDB();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/clients', clientRoutes);
app.use('/api/admins', adminRoutes); 


app.get('/', (req, res) => {
    res.send('Bienvenue sur l’API !');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
