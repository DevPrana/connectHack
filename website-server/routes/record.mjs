import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import {body, validationResult} from "express-validator";

const router = express.Router();

const validateRequest = [
	body("Fname").trim()
	.not().isEmpty().withMessage("First name empty")
	.isAlpha().withMessage("contains invalid characters")
	.isLength({max : 50}).withMessage("Name too long")
	.escape(),

	body("Lname").trim()
	.not().isEmpty().withMessage("Last name empty")
	.isAlpha().withMessage("contains invalid characters")
	.isLength({max : 70}).withMessage("Name too long").escape(),

	body("email").trim()
	.not().isEmpty().withMessage("Email Empty")
	.isEmail().withMessage("Not a valid email ID").escape(),  //https://express-validator.github.io/docs/api/validation-chain#isemail

	body("githubID").trim()
	.not().isEmpty().withMessage("githubID Empty")
	.isLength({max : 39}).withMessage("ID too long").escape()
];

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
	const collection = await db.collection("records");
	const results = await collection.find({}).toArray();
	res.send(results).status(200);
});


router.post("/", validateRequest, async (req, res) => {
  	const errors = validationResult(req);   //Validate requests
  	if (!errors.isEmpty()) {                //check if errors is empty //! Linked with TODO at frontend
    	return res.status(400).json({ errors: errors.array() });
  	}

  	try{
		let newUser = {
			Fname: req.body.Fname,
			Lname: req.body.Lname,
			email: req.body.email,
			githubID: req.body.githubID
		};
		
		const response = await fetch("http://localhost:8080/user",{	// A call to the bottle.py server to fetch predictions for user
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
		
		if(response.status === 200){
			const data = await response.json()
			newUser.predictions = data.predictions;		// Creating a new Entry in newUser which adds the prediction array
			console.log(newUser);
			const collection = await db.collection("records");
			await collection.insertOne(newUser);
			res.status(201).send({
				message: "Succesfully inserted new user:",
				user: newUser
			});
		}
		else{
			const errorDetails = await response.json();

			throw new Error({
				message:"Couldn't get predictions from user path (Bottle)",
				details: errorDetails
			});
		}
			

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