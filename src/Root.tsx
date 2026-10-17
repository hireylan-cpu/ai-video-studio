import { Composition, Folder, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import { DialogueLine } from "./Drama/DialogueLine";
import { DramaEpisode } from "./Drama/DramaEpisode";
import { DramaScene } from "./Drama/DramaScene";
import { TitleCard } from "./Drama/TitleCard";

const FPS = 30;
// Opener 2.5s + 3 shots × 4s + cliffhanger 2.5s, minus 4 fades × 0.5s = 15s
const EPISODE_DURATION = (2.5 + 4 * 3 + 2.5 - 4 * 0.5) * FPS;

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        calculateMetadata={calculateCaptionedVideoMetadata}
        schema={captionedVideoSchema}
        width={1080}
        height={1920}
        defaultProps={{
          src: staticFile("sample-video.mp4"),
        }}
      />
      <Composition
        id="DramaEpisode"
        component={DramaEpisode}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={EPISODE_DURATION}
      />
      <Folder name="Drama-parts">
        <Composition
          id="DramaScene"
          component={DramaScene}
          width={1080}
          height={1920}
          fps={FPS}
          durationInFrames={4 * FPS}
          defaultProps={{
            label: "Shot 1",
            clip: undefined,
            speaker: "Mia",
            line: "You signed it without reading it?",
            accentColor: "#e11d48",
            style: { backgroundColor: "#0a0a0f" },
          }}
        />
        <Composition
          id="TitleCard"
          component={TitleCard}
          width={1080}
          height={1920}
          fps={FPS}
          durationInFrames={2.5 * FPS}
          defaultProps={{
            kicker: "Episode 1",
            title: "The Inheritance",
            subtitle: "A vertical AI drama",
            accentColor: "#e11d48",
            style: {
              backgroundColor: "#0a0a0f",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        />
        <Composition
          id="DialogueLine"
          component={DialogueLine}
          width={1080}
          height={1920}
          fps={FPS}
          durationInFrames={2 * FPS}
          defaultProps={{
            speaker: "Mia",
            children: "You signed it without reading it?",
            accentColor: "#e11d48",
            style: { backgroundColor: "#0a0a0f" },
          }}
        />
      </Folder>
    </>
  );
};
