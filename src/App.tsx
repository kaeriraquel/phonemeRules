import { useState } from "react";
import "./App.css";
import { convertIpaToFelipeonetica } from "./utils/felipeoneticaConverter";

function App() {
  const [englishText, setEnglishText] = useState("");
  const [ipaResult, setIpaResult] = useState("");
  const [felipeResult, setFelipeResult] = useState("");

  const handleConvert = () => {
    if (!ipaResult.trim()) return;

    const converted = convertIpaToFelipeonetica(ipaResult);

    setFelipeResult(converted);
  };

  const handleClear = () => {
    setEnglishText("");
    setIpaResult("");
    setFelipeResult("");
  };

  return (
    <main className="app">
      <section className="card">
        <h1>Felipeonética</h1>

        <p className="subtitle">
          Conversión Inglés → IPA → Felipeonética
        </p>

        <label>Texto en Inglés</label>

        <textarea
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
          placeholder="Write English text here..."
        />

        <label>IPA</label>

        <textarea
          value={ipaResult}
          onChange={(e) => setIpaResult(e.target.value)}
          placeholder="Ejemplo: /bɜːd/"
        />

        <div className="buttons">
          <button onClick={handleConvert}>
            Convertir
          </button>

          <button
            className="secondary"
            onClick={handleClear}
          >
            Limpiar
          </button>
        </div>

        <label>Resultado Felipeonética</label>

        <div className="result">
          {felipeResult || "Aquí aparecerá la conversión"}
        </div>
      </section>
    </main>
  );
}

export default App;