import { useState } from "react";
import "./App.css";
import { convertEnglishToFelipeonetica } from "./utils/englishToFelipeonetica";

function App() {
  const [englishText, setEnglishText] = useState("");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const converted = convertEnglishToFelipeonetica(englishText);
    setResult(converted);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
  };

  const handleClear = () => {
    setEnglishText("");
    setResult("");
  };

  return (
    <main className="app">
      <section className="card">
        <h1>Felipeonética</h1>
        <p className="subtitle">Convertidor de inglés a Felipeonética</p>

        <label>Texto en inglés</label>
        <textarea
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
          placeholder="Example: cat dog ship think this"
        />

        <div className="buttons">
          <button onClick={handleConvert}>Convertir</button>
          <button className="secondary" onClick={handleCopy} disabled={!result}>
            Copiar
          </button>
          <button className="secondary" onClick={handleClear}>
            Limpiar
          </button>
        </div>

        <label>Resultado</label>
        <div className="result">
          {result || "Aquí aparecerá el resultado"}
        </div>
      </section>
    </main>
  );
}

export default App;