import { useState } from "react";
import "./App.css";
import {
  convertTextWithApi,
  type ConversionResult,
} from "./utils/convertWithApi";

function App() {
  const [englishText, setEnglishText] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);

    const converted = await convertTextWithApi(englishText);

    setResult(converted);
    setLoading(false);
  };

  const handleClear = () => {
    setEnglishText("");
    setResult(null);
  };

  return (
    <main className="app">
      <section className="card">
        <h1>Felipeonética</h1>

        <p className="subtitle">
          Convertidor de inglés a Felipeonética
        </p>

        <label>Texto en inglés</label>

        <textarea
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
          placeholder="Example: hello my friend"
        />

        <div className="buttons">
          <button onClick={handleConvert} disabled={loading}>
            {loading ? "Convirtiendo..." : "Convertir"}
          </button>

          <button
            className="secondary"
            onClick={handleClear}
            disabled={loading}
          >
            Limpiar
          </button>
        </div>

        <label>Resultado</label>

        <div className="result">
          {result?.text || "Resultado"}
        </div>

        {result && (
          <div className="word-status">
            <div>
              <h3>Palabras encontradas</h3>
              {result.foundWords.length > 0 ? (
                <ul>
                  {result.foundWords.map((word) => (
                    <li key={word}>✅ {word}</li>
                  ))}
                </ul>
              ) : (
                <p>No se encontró ninguna palabra.</p>
              )}
            </div>

            <div>
              <h3>Palabras pendientes</h3>
              {result.missingWords.length > 0 ? (
                <ul>
                  {result.missingWords.map((word) => (
                    <li key={word}>⚠️ {word}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay palabras pendientes.</p>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;