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
  const view = searchParams.get("view") || "file"; // folders | files
  console.log(view);

  if (!repo || !username) {
    return NextResponse.json(
      { error: "O parâmetro 'repo' é obrigatório." },
      { status: 400 }
    );
  }

  if (view !== "folder" && view !== "file") {
    return NextResponse.json(
      {
        error: "O parâmetro 'view' deve ser 'folders' ou 'files'.",
      },
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
    let foldersPath: string[] = [];
    let directories = tree
      .filter((item) =>
        view === "file" ? item.type === "blob" : item.type === "tree"
      )
      .map((item) => item.path);

    if (view === "file") {
      foldersPath = tree
        .filter((item) => item.type === "tree")
        .map((item) => item.path);
    }

    if (folders && folders.length > 0) {
      console.log(folders);
      directories = directories.filter((dir) => folders.includes(dir));
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
    const badgeHeight = (directories.length + 1) * lineHeight + padding * 2;

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
