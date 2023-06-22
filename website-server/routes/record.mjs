import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import {body, validationResult} from "express-validator";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

const validateRequest = [
  body("Fname").trim()
  .isEmpty().withMessage("First name empty")
  .isAlpha().withMessage("contains invalid characters")
  .isLength({max : 50}).withMessage("Name too long")
  .escape(),

  body("Lname").trim()
  .isEmpty().withMessage("Last name empty")
  .isAlpha().withMessage("contains invalid characters")
  .isLength({max : 70}).withMessage("Name too long")
  .escape(),

  body("email").trim()
  .isEmpty().withMessage("Email Empty")
  .isEmail().withMessage("Not a valid email ID")  //https://express-validator.github.io/docs/api/validation-chain#isemail
  .escape(),

  body("githubID").trim()
  .isEmpty().withMessage("githubID Empty")
  .isLength({max : 39}).withMessage("ID too long")
  .escape(),
];

router.post("/", validateRequest, async (req, res) => {
  
  const errors = validationResult(req);   //Validate requests
  if (!errors.isEmpty()) {                //check if errors is empty
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    let newUser = {
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      email: req.body.email,
      githubID: req.body.githubID,
    };

    let collection = await db.collection("records")
    let result = await collection.insertOne(newUser);
    res.send(result).status(204);

  } catch(error){
    console.error(error);
    res.status(500).send({
      error: "Internal server error",
      message: "Failed to insert user into the database",
      details: error.message,
    });
  }
});

export default router;