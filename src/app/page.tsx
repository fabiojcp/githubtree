"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [view, setView] = useState("file");
  const [bgColor, setBgColor] = useState("#393359");
  const [txtColor, setTxtColor] = useState("#F2F2F2");
  const [borderColor] = useState("#121111");
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(20);
  const [padding, setPadding] = useState(10);


  const generateSVG = () => {
    if (!username || !repo) return;

    const params = new URLSearchParams({
      user: username,
      repo,
      view,
      bgColor,
      txtColor,
      borderColor,
      fontSize: fontSize.toString(),
      lineHeight: lineHeight.toString(),
      padding: padding.toString(),
    });

    const url = `/api/tree?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        📂 GitHub Repository Tree Generator
      </h1>
      <p className="text-gray-600 text-center max-w-lg mb-6">
        Este projeto foi criado para facilitar a visualização da estrutura de
        repositórios GitHub. Com ele, você pode gerar um **SVG dinâmico** que
        exibe pastas e arquivos do repositório de forma clara e organizada.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block font-medium mb-2">Usuário GitHub:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="ex: facebook"
        />

        <label className="block font-medium mb-2">Repositório:</label>
        <input
          type="text"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="ex: react"
        />

        <label className="block font-medium mb-2">Visualização:</label>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        >
          <option value="file">📄 Exibir Arquivos</option>
          <option value="folder">📂 Exibir Pastas</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Cor de Fundo:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Cor do Texto:</label>
            <input
              type="color"
              value={txtColor}
              onChange={(e) => setTxtColor(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-2">Fonte:</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Espaço:</label>
            <input
              type="number"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Padding:</label>
            <input
              type="number"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <button
          onClick={generateSVG}
          className="w-full bg-blue-500 text-white py-2 mt-6 rounded hover:bg-blue-600 transition"
        >
          Gerar SVG
        </button>
      </div>
    </div>
  );
}
