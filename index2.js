const express = require("express");
const axios = require("axios");
const ejs = require("ejs");
const path = require("path");
const app = express();
const port = 4000;
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index2", { weather: null, error: null });
});
app.get("/weather", (req, res) => {
    const location = req.query.location;
    const apiKey = '252a36bdb4643609d5c11bcfadfcec5d'

    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then((response) => {
            const weather = response.data;
            if (weather.main === undefined) {
                res.render("index2", { weather: null, error: "Unable to fetch data." });
            } else {
                const temperature = `${weather.main.temp}°C at ${weather.name}`;


                res.render("index2", { weather: temperature, error: null });
            }
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            res.render("index2", {
                weather: null,
                error: "Error fetching weather data. Please try again later.",
            });
        });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});