const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const postRoutes = require('./routes/postRoutes');
const requestRoutes = require('./routes/requestRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// var corsOptions = {
//     origin: process.env.CORS_URL
//   };
  
// app.use(cors(corsOptions));

app.use(cors());
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to SOAL" });
  });

require('./models/user');
require('./models/request');
require('./models/post');

// associations
require('./models/associations');


app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/post', postRoutes);
app.use('/requests', requestRoutes);

sequelize.sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
    });
