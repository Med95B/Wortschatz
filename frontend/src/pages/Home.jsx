import { useEffect, useState } from "react";
import api from "../api";

const Home = () => {
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newWord, setNewWord] = useState({ word: "", translation: "", example: "" });


  const fetchRandomWord = async () => {
    setLoading(true);
    try {
      const res = await api.get("/words/random");
      setWord(res.data);
      setError("");
    } catch (err) {
      if (err.response?.status === 404) setError("Pas de mots disponibles");
      else setError("Erreur serveur");
      setWord(null);
    }
    setLoading(false);
  };

 
  const handleCreateWord = async e => {
    e.preventDefault();
    try {
      await api.post("/words", newWord);
      alert("Mot ajouté avec succès !");
      setNewWord({ word: "", translation: "", example: "" });
      fetchRandomWord(); 
    } catch (err) {
      alert(err.response?.data?.message || "Erreur ajout mot");
    }
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mot du jour :</h1>

      {word && (
        <div>
          <h2>{word.word} == {word.translation}</h2>
          <p><i>{word.example}</i></p>
          <button onClick={fetchRandomWord}>Nouveau mot aléatoire</button>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h2>Ajouter un mot</h2>
        <form onSubmit={handleCreateWord}>
          <input
            name="word"
            placeholder="Mot"
            value={newWord.word}
            onChange={e => setNewWord({ ...newWord, word: e.target.value })}
            required
          />
          <input
            name="translation"
            placeholder="Traduction"
            value={newWord.translation}
            onChange={e => setNewWord({ ...newWord, translation: e.target.value })}
            required
          />
          <input
            name="example"
            placeholder="Exemple"
            value={newWord.example}
            onChange={e => setNewWord({ ...newWord, example: e.target.value })}
            required
          />
          <button type="submit">Ajouter le mot</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

