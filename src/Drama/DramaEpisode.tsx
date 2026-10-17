import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { useVideoConfig } from "remotion";
import { DramaScene } from "./DramaScene";
import { TitleCard } from "./TitleCard";

// One vertical episode: opener → shots → cliffhanger, crossfaded.
// Duplicate a <DramaScene> block to add shots, and keep EPISODE_DURATION
// in Root.tsx in sync: sum of sequence lengths minus each fade overlap.
// Source: https://www.remotion.dev/docs/transitions/transitionseries
export const DramaEpisode: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <TransitionSeries name="Episode">
      <TransitionSeries.Sequence name="Opener" durationInFrames={2.5 * fps}>
        <TitleCard
          kicker="Episode 1"
          title="The Inheritance"
          subtitle="A vertical AI drama"
          accentColor="#e11d48"
          style={{
            backgroundColor: "#0a0a0f",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence name="Shot 1" durationInFrames={4 * fps}>
        <DramaScene
          label="Shot 1"
          clip={undefined}
          speaker="Mia"
          line="You signed it without reading it?"
          accentColor="#e11d48"
          style={{ backgroundColor: "#0a0a0f" }}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence name="Shot 2" durationInFrames={4 * fps}>
        <DramaScene
          label="Shot 2"
          clip={undefined}
          speaker="Daniel"
          line="It was Grandpa's last wish. I had no choice."
          accentColor="#2563eb"
          style={{ backgroundColor: "#0a0a0f" }}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence name="Shot 3" durationInFrames={4 * fps}>
        <DramaScene
          label="Shot 3"
          clip={undefined}
          speaker="Mia"
          line="Then why is MY name on the last page?"
          accentColor="#e11d48"
          style={{ backgroundColor: "#0a0a0f" }}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 0.5 * fps })}
      />
      <TransitionSeries.Sequence name="Cliffhanger" durationInFrames={2.5 * fps}>
        <TitleCard
          kicker=""
          title="To be continued…"
          subtitle="Follow for Episode 2"
          accentColor="#e11d48"
          style={{
            backgroundColor: "#0a0a0f",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
