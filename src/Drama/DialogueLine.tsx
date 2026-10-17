import type React from "react";
import { Interactive, type InteractivitySchema } from "remotion";
import { BODY_FONT, DISPLAY_FONT } from "./fonts";

type DialogueLineProps = {
  readonly speaker: string;
  readonly children: React.ReactNode;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

// Subtitle-style dialogue box: speaker name tag above the spoken line.
const DialogueLineInner: React.FC<DialogueLineProps> = ({
  speaker,
  children,
  accentColor,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: 260,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
        textAlign: "center",
        ...style,
      }}
    >
      {speaker ? (
        <div
          style={{
            backgroundColor: accentColor,
            color: "white",
            fontFamily: DISPLAY_FONT,
            fontSize: 40,
            letterSpacing: 2,
            textTransform: "uppercase",
            padding: "8px 24px",
            borderRadius: 10,
          }}
        >
          {speaker}
        </div>
      ) : null}
      <div
        style={{
          color: "white",
          fontFamily: BODY_FONT,
          fontSize: 58,
          fontWeight: 700,
          lineHeight: 1.25,
          textShadow: "0 4px 24px rgba(0,0,0,0.85), 0 0 4px rgba(0,0,0,0.9)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const dialogueLineSchema = {
  ...Interactive.childrenSchema,
  speaker: { type: "string", default: "", description: "Speaker name" },
  accentColor: {
    type: "color",
    default: "#e11d48",
    description: "Speaker tag color",
  },
} as const satisfies InteractivitySchema;

export const DialogueLine = Interactive.create({
  Component: DialogueLineInner,
  layout: "none",
  schema: dialogueLineSchema,
});
