import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface TreeItem {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

interface Tree {
  sha: string;
  url: string;
  tree: TreeItem[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get("repo");
  const username = searchParams.get("user");
  const folders: string[] | null = searchParams.getAll("folders");
  const exclude: string[] | null = searchParams.getAll("exclude");
  const bgColor = searchParams.get("bgColor") || "#393359";
  const txtColor = searchParams.get("txtColor") || "#F2F2F2";
  const borderColor = searchParams.get("borderColor") || "#121111";
  const view = searchParams.get("view") || "file"; // 'folder' | 'file'

  if (!repo || !username) {
    return NextResponse.json(
      { error: "Os parâmetros 'repo' e 'user' são obrigatórios." },
      { status: 400 }
    );
  }

  if (view !== "folder" && view !== "file") {
    return NextResponse.json(
      { error: "O parâmetro 'view' deve ser 'folder' ou 'file'." },
      { status: 400 }
    );
  }

  const GITHUB_API = `https://api.github.com/repos/${username}/${repo}/git/trees/main?recursive=1`;

  try {
    const response = await axios.get(GITHUB_API);
    const tree = (response?.data as Tree | null)?.tree;

    if (!tree || !Array.isArray(tree) || tree?.length === 0) {
      return NextResponse.json(
        { error: "Erro ao buscar o repositório." },
        { status: 500 }
      );
    }

    let directories = tree
      .filter((item) =>
        view === "file" ? item.type === "blob" : item.type === "tree"
      )
      .map((item) => item.path);

    if (folders && folders.length > 0) {
      directories = directories.filter((dir) =>
        folders.some((folder) => dir.startsWith(folder))
      );
    }

    if (exclude.length > 0) {
      directories = directories.filter(
        (dir) => !exclude.some((excl) => dir.startsWith(excl))
      );
    }

    const fontSize = 14;
    const lineHeight = 20;
    const padding = 10;
    const badgeWidth = 400;
    let badgeHeight = (directories.length + 1) * lineHeight + padding * 2;

    let svg = "";

    if (view === "folder") {
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${badgeWidth}" height="${badgeHeight}" viewBox="0 0 ${badgeWidth} ${badgeHeight}" style="background-color: ${bgColor}; border-radius: 8px;">
        <rect width="${badgeWidth}" height="${badgeHeight}" rx="8" fill="${bgColor}" stroke="${borderColor}" stroke-width="2"/>
        <text x="20" y="${
          padding + lineHeight
        }" font-size="${fontSize}" fill="${txtColor}" font-family="monospace" font-weight="bold">
          📂 ${repo}
        </text>
        ${directories
          .map(
            (line, index) => `
          <text x="20" y="${
            padding + lineHeight * (index + 2)
          }" font-size="${fontSize}" fill="${txtColor}" font-family="monospace">
            ${line}
          </text>
        `
          )
          .join("")}
      </svg>
    `;
    }

    if (view === "file") {
      const folderContents: Record<string, string[]> = {};

      directories.forEach((file) => {
        const parts = file.split("/");
        const folder = parts.length > 1 ? parts.slice(0, -1).join("/") : "/";
        if (!folderContents[folder]) folderContents[folder] = [];
        folderContents[folder].push(parts[parts.length - 1]);
      });
      const totalLines = Object.keys(folderContents).reduce(
        (acc, folder) => acc + folderContents[folder].length + 1,
        1
      );
      badgeHeight = totalLines * lineHeight + padding * 2;

      let yPosition = padding + lineHeight;
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${badgeWidth}" height="${badgeHeight}" viewBox="0 0 ${badgeWidth} ${badgeHeight}" style="background-color: ${bgColor}; border-radius: 8px;">
        <rect width="${badgeWidth}" height="${badgeHeight}" rx="8" fill="${bgColor}" stroke="${borderColor}" stroke-width="2"/>
        <text x="20" y="${yPosition}" font-size="${fontSize}" fill="${txtColor}" font-family="monospace" font-weight="bold">
          📁 ${repo}
        </text>
      `;

      yPosition += lineHeight;

      Object.entries(folderContents).forEach(([folder, files]) => {
        svg += `
        <text x="20" y="${yPosition}" font-size="${fontSize}" fill="${txtColor}" font-family="monospace" font-weight="bold">
          📂 ${folder}
        </text>
        `;
        yPosition += lineHeight;

        files.forEach((file) => {
          svg += `
          <text x="40" y="${yPosition}" font-size="${fontSize}" fill="${txtColor}" font-family="monospace">
            📄 ${file}
          </text>
          `;
          yPosition += lineHeight;
        });
      });

      svg += `</svg>`;
    }

    return new NextResponse(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar o repositório." },
      { status: 500 }
    );
  }
}
