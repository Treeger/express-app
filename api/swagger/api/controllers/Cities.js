import City from "../../../models/mongoose/city"


module.exports = {
    indexCity,
    createCity,
    updateCity,
    deleteCity
};

function indexCity(req, res) {
    City.find({}, (err, cities) => {
        if (err) return res.send(err);
        return res.send(cities);
    });
}

function createCity(req, res) {
    if (!req.body || !req.body.name) {
        return res.send("Please specify name");
    }
    City.create(
        {
            name: req.body.name,
            country: req.body.country,
            capital: req.body.capital,
            location: {
                lat: req.body.lat,
                long: req.body.long
            }
        },
        (err, city) => {
            if (err) return res.send(err);
            return res.send(city);
        }
    );
}

function updateCity(req, res) {
    if (!req.body || !req.body.name) {
        return res.send("Please specify name");
    }
    City.findOneAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            country: req.body.country,
            capital: req.body.capital,
            location: {
                lat: req.body.lat,
                long: req.body.long
            }
        },
        { new: true },
        (err, city) => {
            if (err) return res.send(err);
            return res.send(city);
        }
    );
}

function deleteCity(req, res) {
    City.deleteOne({ _id: req.params.id }, (err, city) => {
        if (err) return res.send(err);
        return res.send(city);
    });
}