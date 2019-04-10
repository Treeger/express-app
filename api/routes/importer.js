import express from "express";
const importerRouter = express.Router({ mergeParams: true });

import User from "../models/mongoose/user";
import mockUser from "../../data/mock/users";

import Product from "../models/mongoose/product";
import mockProduct from "../../data/mock/products";

importerRouter.route("/").get((req, res) => {
  const data = [User.insertMany(mockUser), Product.insertMany(mockProduct)];
  Promise.all(data).then(result => {
    return res.send(result);
  });
});

export default importerRouter;
