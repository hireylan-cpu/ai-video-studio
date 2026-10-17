// Local font loading via @remotion/fonts (handles delayRender internally).
// Source: https://www.remotion.dev/docs/fonts-api/load-font
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const DISPLAY_FONT = "TheBoldFont";
export const BODY_FONT = "Helvetica, Arial, sans-serif";

loadFont({ family: DISPLAY_FONT, url: staticFile("theboldfont.ttf") });
