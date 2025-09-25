import express from 'express'
import Word from '../models/Word.js'
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()


router.post('/',authMiddleware,async(req,res)=>{
    try {
        const {word,translation,example}=req.body
         if (!word || !translation || !example) {
                return res.status(400).json({message: 'fill all fields'})
            }

        const newWord = new Word({ word, translation, example,userId: req.user.id })
    await newWord.save()
    res.status(201).json(newWord)

    } catch (error) {
        console.log('error creating word',error);
            res.status(500).json({message:error.message})
    }
})

router.get('/',authMiddleware,async(req,res)=>{
    try {

        const words = await Word.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(words)

    } catch (error) {

         console.log('error geting words',error);
        res.status(500).json({message:error.message})
   
    }
})

router.get("/random",authMiddleware,async (req, res) => {
  try {
      const words = await Word.find({ userId: req.user.id });
    if (words.length === 0) return res.status(404).json({ error: "Aucun mot trouvé" });

    const randomIndex = Math.floor(Math.random() * words.length);
    res.json(words[randomIndex]);

  } catch (error) {
    console.log('error geting words',error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const word = await Word.findByIdAndDelete(id);

    if (!word) {
      return res.status(404).json({ message: "Mot introuvable" });
    }

    res.json({ message: "Mot supprimé avec succès" });
    
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
})

export default router