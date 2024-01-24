import express from "express";
// import { ObjectId } from "mongodb";
// import db from "../db/conn.js";
import Grade from "../models/grades.js"

const router = express.Router();

//Mongoose

router.get('/', async(req, res) => {
  const grades = await Grade.find({});
  res.status(200).json(grades)
})

router.get('/:id', async(req, res) => {
  const userId = req.params.id;
  
  const grades = await Grade.findById(userId);
  res.status(200).json(grades);
})

router.post('/', async(req, res) =>{
  const grades = await Grade.create(req.body);
  res.status(203).json(grades);
})


router.patch('/:id/scores/add', async (req, res) => {
  // find the grade to update
  const grades = await Grade.findOne({_id: req.params.id});
 
  if (!grades) return res.send('Grade not found!')
  // add the new score (req.body) to the scores array
  grades.scores.push(req.body);
  // save doc
  await grades.save();
  res.send(grades);

});

export default router;