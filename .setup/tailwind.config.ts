import { Config } from "tailwindcss";
import sourceParser from "./source-parser";

const { tailwindContent } = sourceParser(process.env.TYPE || "all");

const colors: Record<string, [number, number]> = {
  primary: [73, 58],
};

/** @type {Config} */
module.exports = {
  content: tailwindContent,
  theme: {
    extend: {
      colors: {
        primary: generateHSLColors(...colors.primary), // Основной цвет сайта
        hover: "#124F2E",
        mask: "rgba(0, 0, 0, 0.2)",
      },

      screens: {
        "3xl": "1800px",
      },
      ...generateGrid(24), // eslint-disable-line
      keyframes: {
        blurry: {
          "0%, 100%": { filter: "blur(6px)" },
          "50%": { filter: "blur(10px)" },
        },
      },
      animation: {
        blurry: "blurry 2s ease-in-out infinite",
      },
      blur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
} satisfies Config;

function generateHSLColors(hue: number, saturation: number) {
  const result: Record<number, string> = {};

  result[50] = `hsl(${hue}, ${saturation}%, 95%)`;

  for (let i = 1; i <= 9; i++) {
    result[100 * i] = `hsl(${hue}, ${saturation}%, ${90 - 10 * (i - 1)}%)`;
  }

  return result;
}

function generateGrid(size: number) {
  const result = {
    gridRow: {},
    gridColumn: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridRowStart: {},
    gridRowEnd: {},
    gridColumnStart: {},
    gridColumnEnd: {},
  };

  for (let i = 1; i <= size; i += 1) {
    result.gridRow[`span-${i}`] = `span ${i} / span ${i}`;
    result.gridColumn[`span-${i}`] = `span ${i} / span ${i}`;
    result.gridTemplateColumns[i] = `repeat(${i}, minmax(0, 1fr))`;
    result.gridTemplateRows[i] = `repeat(${i}, minmax(0, 1fr))`;
    result.gridRowStart[i] = `${i}`;
    result.gridRowEnd[i] = `${i}`;
    result.gridColumnStart[i] = `${i}`;
    result.gridColumnEnd[i] = `${i}`;
  }
  return result;
}
