import { Video } from "@remotion/media";
import {
  Easing,
  Interactive,
  interpolate,
  type InteractivitySchema,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DialogueLine } from "./DialogueLine";
import { BODY_FONT, DISPLAY_FONT } from "./fonts";

type DramaSceneProps = {
  readonly label: string;
  readonly clip: string | undefined;
  readonly speaker: string;
  readonly line: string;
  readonly accentColor: string;
};

// One shot of the drama: an AI-generated clip with a slow push-in,
// plus the line of dialogue spoken over it.
// Leave `clip` empty to get a placeholder while the shot is being generated.
const DramaSceneInner: React.FC<DramaSceneProps> = ({
  label,
  clip,
  speaker,
  line,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <>
      {clip ? (
        // Source: https://www.remotion.dev/docs/media/video
        <Video
          name="Clip"
          src={clip}
          objectFit="cover"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            scale: interpolate(frame, [0, durationInFrames], [1, 1.08], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
            background: `radial-gradient(circle at 50% 35%, ${accentColor}55, #0a0a0f 70%)`,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: DISPLAY_FONT, fontSize: 72 }}>{label}</div>
          <div style={{ fontFamily: BODY_FONT, fontSize: 36 }}>
            Drop a clip into public/drama/ and set `clip`
          </div>
        </div>
      )}
      {/* Darken the bottom so dialogue stays readable on bright shots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      {line ? (
        <DialogueLine
          name="Dialogue"
          speaker={speaker}
          accentColor={accentColor}
          style={{
            opacity: interpolate(
              frame,
              [0.3 * fps, 0.7 * fps],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            translate: interpolate(
              frame,
              [0.3 * fps, 0.7 * fps],
              ["0px 30px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          {line}
        </DialogueLine>
      ) : null}
    </>
  );
};

const dramaSceneSchema = {
  ...Interactive.backgroundSchema,
  label: { type: "string", default: "Scene", description: "Placeholder label" },
  clip: {
    type: "asset",
    assetType: "video",
    default: undefined,
    description: "AI-generated clip for this shot",
  },
  speaker: { type: "string", default: "", description: "Who is speaking" },
  line: { type: "string", default: "", description: "Dialogue line" },
  accentColor: {
    type: "color",
    default: "#e11d48",
    description: "Speaker tag / placeholder color",
  },
} as const satisfies InteractivitySchema;

export const DramaScene = Interactive.create({
  Component: DramaSceneInner,
  layout: "absolute-fill",
  schema: dramaSceneSchema,
});
