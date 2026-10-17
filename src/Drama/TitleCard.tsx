import {
  Easing,
  Interactive,
  interpolate,
  type InteractivitySchema,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BODY_FONT, DISPLAY_FONT } from "./fonts";

type TitleCardProps = {
  readonly kicker: string;
  readonly title: string;
  readonly subtitle: string;
  readonly accentColor: string;
};

// Full-screen text card, used for the episode opener and the cliffhanger ending.
const TitleCardInner: React.FC<TitleCardProps> = ({
  kicker,
  title,
  subtitle,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
        padding: "0 80px",
        textAlign: "center",
        opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 2 * fps], [1.06, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
      }}
    >
      {kicker ? (
        <div
          style={{
            color: accentColor,
            fontFamily: BODY_FONT,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>
      ) : null}
      <div
        style={{
          color: "white",
          fontFamily: DISPLAY_FONT,
          fontSize: 130,
          lineHeight: 1.05,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            color: "rgba(255,255,255,0.7)",
            fontFamily: BODY_FONT,
            fontSize: 44,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

const titleCardSchema = {
  ...Interactive.backgroundSchema,
  kicker: { type: "string", default: "", description: "Small text above title" },
  title: { type: "string", default: "", description: "Main title" },
  subtitle: { type: "string", default: "", description: "Text below title" },
  accentColor: {
    type: "color",
    default: "#e11d48",
    description: "Kicker color",
  },
} as const satisfies InteractivitySchema;

export const TitleCard = Interactive.create({
  Component: TitleCardInner,
  layout: "absolute-fill",
  schema: titleCardSchema,
});
