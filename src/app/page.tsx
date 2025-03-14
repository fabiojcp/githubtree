/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");
  const [view, setView] = useState("file");
  const [bgColor, setBgColor] = useState("#393359");
  const [txtColor, setTxtColor] = useState("#F2F2F2");
  const [borderColor, setBorderColor] = useState("#121111");
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(20);
  const [padding, setPadding] = useState(10);
  const [folders, setFolders] = useState<string>("");
  const [exclude, setExclude] = useState<string>("");

  const generateSVG = () => {
    if (!username || !repo || !branch) return;

    const params = new URLSearchParams({
      user: username,
      repo,
      branch,
      view,
      bgColor,
      txtColor,
      borderColor,
      fontSize: fontSize.toString(),
      lineHeight: lineHeight.toString(),
      padding: padding.toString(),
    });

    folders
      .split(",")
      .forEach((folder) => params.append("folders", folder.trim()));
    exclude.split(",").forEach((excl) => params.append("exclude", excl.trim()));

    const url = `/api/tree?${params.toString()}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex gap-2 items-center">
          📂 GitHub Repository Tree Generator
          <img
            alt="Hits"
            src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fwoochanleee.github.io%2Fproject-tree-generator&amp;count_bg=%2379C83D&amp;title_bg=%23555555&amp;icon=&amp;icon_color=%23E7E7E7&amp;title=hits&amp;edge_flat=false"
          ></img>
          <img
            alt="stars"
            src="https://img.shields.io/github/stars/fabiojcp/githubtree?logo=Github"
          ></img>
        </h1>
        <p className="text-gray-700 text-center max-w-lg mb-6">
          This project was created to simplify the visualization of GitHub
          repository structures. With it, you can generate a dynamic SVG that
          clearly and neatly displays the repository's folders and files.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <label className="block font-semibold text-gray-800 mb-2">
            GitHub Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4 text-gray-900"
            placeholder="e.g., facebook"
          />

          <label className="block font-semibold text-gray-800 mb-2">
            Repository Name:
          </label>
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4 text-gray-900"
            placeholder="e.g., react"
          />

          <label className="block font-semibold text-gray-800 mb-2">
            Branch Name:
          </label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4 text-gray-900"
            placeholder="e.g., main"
          />

          <label className="block font-semibold text-gray-800 mb-2">
            Select specific folders to display (comma-separated):
          </label>
          <input
            type="text"
            value={folders}
            onChange={(e) => setFolders(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4 text-gray-900"
            placeholder="e.g., src, components"
          />

          <label className="block font-semibold text-gray-800 mb-2">
            Folders to Exclude (comma-separated):
          </label>
          <input
            type="text"
            value={exclude}
            onChange={(e) => setExclude(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4 text-gray-900"
            placeholder="e.g., node_modules, dist"
          />

          <label className="block font-semibold text-gray-800 mb-2">
            View Mode:
          </label>
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4 text-gray-900"
          >
            <option value="file">📄 Show Files</option>
            <option value="folder">📂 Show Folders</option>
          </select>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-800 mb-2">
                Background:
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-2">
                Text Color:
              </label>
              <input
                type="color"
                value={txtColor}
                onChange={(e) => setTxtColor(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-2">
                Border Color:
              </label>
              <input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block font-semibold text-gray-800 mb-2">
                Font Size:
              </label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full border border-gray-300 rounded p-2 text-gray-900"
                placeholder="14"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-2">
                Line Height:
              </label>
              <input
                type="number"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full border border-gray-300 rounded p-2 text-gray-900"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-2">
                Padding:
              </label>
              <input
                type="number"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full border border-gray-300 rounded p-2 text-gray-900"
                placeholder="10"
              />
            </div>
          </div>

          <button
            onClick={generateSVG}
            className="w-full bg-blue-500 text-white py-2 mt-6 rounded hover:bg-blue-600 transition"
          >
            Generate SVG
          </button>
        </div>
      </div>

      <footer className="flex flex-col justify-center items-center h-16 bg-white text-black pt-4">
        Made By&nbsp;
        <a
          href="https://github.com/fabiojcp"
          target="_blank"
          className="flex items-center font-bold text-blue-500 cursor-pointer text-decoration-under"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 496 512"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
          </svg>
          fabiojcp
        </a>
        <a
          href="https://x.com/fabioCasanova88"
          target="_blank"
          className="flex items-center font-bold text-blue-500 cursor-pointer text-decoration-under"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="svg5"
            x="0px"
            y="0px"
            viewBox="0 0 1668.56 1221.19"
            xmlSpace="preserve"
            width="20px"
            height="20px"
          >
            <g id="layer1" transform="translate(52.390088,-25.058597)">
              <path
                id="path1009"
                d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99   h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
              />
            </g>
          </svg>
          fabioCasanova88
        </a>
      </footer>
    </>
  );
}
