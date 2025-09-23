import express from 'express'
import Word from '../models/Word.js'


const router = express.Router()


router.post('/',async(req,res)=>{
    try {
        const {word,translation,example}=req.body
         if (!word || !translation || !example) {
                return res.status(400).json({message: 'fill all fields'})
            }

        const newWord = new Word({ word, translation, example })
    await newWord.save()
    res.status(201).json(newWord)

    } catch (error) {
        console.log('error creating word',error);
            res.status(500).json({message:error.message})
    }
})

router.get('/',async(req,res)=>{
    try {

        const words = await Word.find().sort({ createdAt: -1 });
        res.json(words)

    } catch (error) {

         console.log('error geting words',error);
        res.status(500).json({message:error.message})
   
    }
})

router.get("/random", async (req, res) => {
  try {
    const count = await Word.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const word = await Word.findOne().skip(randomIndex);
    res.json(word);
  } catch (error) {
    console.log('error geting words',error);
    res.status(500).json({ error: error.message });
  }
});

export default router