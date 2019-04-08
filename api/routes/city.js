import express from "express";

const citiesRouter = express.Router({ mergeParams: true });
import City from "../models/mongoose/city";

citiesRouter.route("/").get((req, res) => {
  City.find({}, (err, cities) => {
    if (err) return res.send(err);
    return res.send(cities);
  });
});

citiesRouter.route("/").post((req, res) => {
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
});

citiesRouter.route("/:id").put((req, res) => {
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
});

citiesRouter.route("/:id").delete((req, res) => {
  City.deleteOne({ _id: req.params.id }, (err, city) => {
    if (err) return res.send(err);
    return res.send(city);
  });
});

citiesRouter.route("/random").get((req, res) => {
  City.count().exec((err, count) => {
    const random = Math.floor(Math.random() * count);
    City.findOne()
      .skip(random)
      .exec((err, city) => {
        return res.send(city);
      });
  });
});

export default citiesRouter;
