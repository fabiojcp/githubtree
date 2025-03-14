import React from "react";

interface TreeSVGProps {
  treeData: string[];
  bgColor?: string;
  txtColor?: string;
}

const TreeSVG: React.FC<TreeSVGProps> = ({
  treeData,
  bgColor = "#ffffff",
  txtColor = "#000000",
}) => {
  const fontSize = 16;
  const lineHeight = 24;
  const width = 400;
  const height = (treeData.length + 1) * lineHeight;

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: bgColor }}
    >
      {treeData.map((line, index) => (
        <text
          key={index}
          x="10"
          y={lineHeight * (index + 1)}
          fontSize={fontSize}
          fill={txtColor}
          fontFamily="monospace"
        >
          {line}
        </text>
      ))}
    </svg>
  );
};

export default TreeSVG;
