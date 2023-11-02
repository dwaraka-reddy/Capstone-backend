const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to SOAL" });
  });

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/post', postRoutes);

sequelize.sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
    });
