import City from "../../../models/mongoose/city"


module.exports = {
    index: index
};

function index(req, res) {
    City.find({}, (err, cities) => {
        if (err) return res.send(err);
        return res.send(cities);
    });
}