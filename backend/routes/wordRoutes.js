import express from "express";
import { createWord, getRandomWord, getAllWords, updateWord, deleteWord } from "../controllers/wordController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

 // ajouter un mot
router.post("/", protect, createWord);   
// mot aléatoire   
router.get("/random", protect, getRandomWord); 
// liste de mots
router.get("/", protect, getAllWords);    
// update mot   
router.put("/:id", protect, updateWord);   
// delete mot  
router.delete("/:id", protect, deleteWord);  

export default router;
