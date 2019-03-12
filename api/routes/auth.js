import express from "express";
import {login} from "../../lib/auth"

const authRouter = express.Router({ mergeParams: true });

authRouter.route("/").post((req, res) => {
  if(!req.body || !req.body.login || !req.body.password) {
    return res.send("Please specify login and password");
  }

  const authResult = login(req.body.login, req.body.password);
  if(!authResult) {
    return res.send({
      code:404,
      message:"not found",
      data: "incorrect credentials"
    })
  }
  return res.send({
    code:200,
    message:"OK",
    data:authResult.payload,
    token:authResult.token
  });
});

export default authRouter;
