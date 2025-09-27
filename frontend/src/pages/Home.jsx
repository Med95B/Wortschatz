import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Home = () => {
  const [word, setWord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newWord, setNewWord] = useState({ word: "", translation: "", example: "" });
  const navigate = useNavigate();

  const fetchRandomWord = async () => {
    setLoading(true);
    setError("");
    try {
      
      const res = await api.get("/words/random");
      
      setWord(res.data || null);

    } catch (err) {
      console.error("fetchRandomWord error:", err.response ?? err.message);

      if (err.response?.status === 401) {
        //localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      if (err.response?.status === 404) setError("Pas de mots disponibles");
      else setError("Erreur serveur");
      setWord(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWord = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/words", newWord);
      setWord(res.data);
      setNewWord({ word: "", translation: "", example: "" });
    } catch (err) {
      console.error("handleCreateWord error:", err.response ?? err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }
      setError(err.response?.data?.message || "Erreur ajout mot");
    }
  };

  useEffect(() => {
    fetchRandomWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: 800, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Mot du jour :</h1>
        <button onClick={fetchRandomWord}>Nouveau mot aléatoire</button>
      </header>

      <section style={{ marginTop: 20, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
        {error && (
          <div style={{ marginBottom: 12, color: "#8b0000" }}>
            <strong>{error}</strong>
            <div>
              <button onClick={fetchRandomWord} style={{ marginTop: 8 }}>Réessayer</button>
            </div>
          </div>
        )}

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            {word ? (
              <div>
                <h2>{word.word} == {word.translation}</h2>
                <p><i>{word.example}</i></p>
              </div>
            ) : (
              !error && <p>Pas de mot à afficher pour l'instant.</p>
            )}
          </>
        )}
      </section>

      <div style={{ marginTop: 30 }}>
        <h2>Ajouter un mot</h2>
        <form onSubmit={handleCreateWord} style={{ display: "grid", gap: 8 }}>
          <input
            name="word"
            placeholder="Mot"
            value={newWord.word}
            onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
            required
          />
          <input
            name="translation"
            placeholder="Traduction"
            value={newWord.translation}
            onChange={(e) => setNewWord({ ...newWord, translation: e.target.value })}
            required
          />
          <input
            name="example"
            placeholder="Exemple"
            value={newWord.example}
            onChange={(e) => setNewWord({ ...newWord, example: e.target.value })}
            required
          />
          <div>
            <button type="submit">Ajouter le mot</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;

