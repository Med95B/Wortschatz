import Word from "../models/Word.js";

// Creer un mot
export const createWord = async (req, res) => {
  try {
    const { word, translation, example } = req.body;
    
     if (!word || !translation || !example) {
                return res.status(400).json({message: 'fill all fields'})
            }

        const newWord = new Word({ word, translation, example,userId: req.user._id })
    await newWord.save()
    res.status(201).json(newWord)

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Obtenir un mot aleatoire
export const getRandomWord = async (req, res) => {
  
  
  try {
      const words = await Word.find({ userId: req.user._id });
    if (words.length === 0) return res.status(404).json({ error: "Aucun mot trouvé" });

    const randomIndex = Math.floor(Math.random() * words.length);
    res.json(words[randomIndex]);

  } catch (error) {
    console.log('error geting words',error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les mots
export const getAllWords = async (req, res) => {
  
  try {

        const words = await Word.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(words)

    } catch (error) {

         console.log('error geting words',error);
        res.status(500).json({message:error.message})
   
    }
};

// Mettre a jour un mot
export const updateWord = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user._id;

    const word = await Word.findOne({ _id: id, userId: user });

    if (!word) {
      return res.status(404).json({ message: "Mot introuvable ou non autorisé" });
    }

    word.word = req.body.word || word.word;
    word.translation = req.body.translation || word.translation;
    word.example = req.body.example || word.example;

    const updatedWord = await word.save();

    res.json(updatedWord);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer un mot
export const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;
        const user = req.user._id;

  const deletedWord = await Word.findOneAndDelete({ _id: id, userId: user });

    if (!deletedWord) {
      return res.status(404).json({ message: "Mot non trouvé ou non autorisé" });
    }
    res.json({ message: "Mot supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
