# AI Video Studio

Remotion project for vertical (1080×1920, 30fps) short-form video: AI dramas and captioned clips.

## Before writing any Remotion code

1. Load the `remotion-best-practices` skill and follow the sub-guide it routes to.
2. Apply the `source-driven-development` skill: Remotion's API changes between versions (e.g. `Track`, `Interactive.create`, `@remotion/media`'s `<Video>`), so verify against the installed version's docs via the `remotion-docs` skill instead of writing from memory. Cite the docs URL above non-obvious API usage.

## Layout

- `src/Root.tsx`: every `<Composition>`; scenes are also registered under the `Drama-parts` folder as connected compositions.
- `src/Drama/`: AI drama template.
  - `DramaEpisode.tsx`: the episode timeline (`TransitionSeries`: opener → shots → cliffhanger, 0.5s fades).
  - `DramaScene.tsx`: one shot: AI clip (`clip`, empty = placeholder) + slow push-in + dialogue.
  - `TitleCard.tsx`, `DialogueLine.tsx`: opener/ending card and subtitle box.
- `src/CaptionedVideo/`: TikTok-style animated captions over any video (for clipping).
- `public/`: media. Put drama shots in `public/drama/` and reference them with `staticFile("drama/shot1.mp4")`.

## Workflows

**AI drama episode**
1. Write the script: one line of dialogue per shot, 3–6s per shot.
2. Generate each shot as a vertical 9:16 clip (Higgsfield, Veo, Kling, etc.) with consistent characters; save to `public/drama/`.
3. In `DramaEpisode.tsx`, set each `<DramaScene clip={staticFile(...)}>`, speaker and line. Add or remove shot blocks by copying a `Sequence` + `Transition` pair.
4. Update `EPISODE_DURATION` in `Root.tsx`: sum of sequence lengths minus 0.5s per fade.
5. Voice-over or music: add `<Audio>` from `@remotion/media` (see the remotion-markup `audio.md` / `voiceover.md` guides).

**Clipping a long video**
1. Cut the segment: `npx remotion ffmpeg -ss <start> -to <end> -i input.mp4 -c copy public/clip.mp4`.
2. Generate word-level captions: `node sub.mjs public/clip.mp4` (downloads Whisper.cpp + model on first run; change the model in `whisper-config.mjs`).
3. Point the `CaptionedVideo` composition's `src` at the clip.

## Conventions

- All `remotion` / `@remotion/*` packages stay on one exact version. Add packages with `npx remotion add <pkg>`, upgrade with `npx remotion upgrade`.
- Seconds → frames via `fps` from `useVideoConfig()`, written inline (e.g. `durationInFrames={4 * fps}`).
- Animate only with `useCurrentFrame()` + `interpolate()`; CSS transitions/animations don't render.
- Write each scene instance as its own JSX node (not a `.map()`), so Studio can edit them individually.

## Verify

- `npm run lint` (ESLint + tsc) must pass.
- Spot-check frames: `npx remotion still DramaEpisode out/check.png --frame=110`.
- Preview: `npm run dev` (Studio). Only run a full `npx remotion render` when the user asks for the final video.

## License

Remotion is free for individuals and companies of up to 3 people; larger companies need a license (remotion.pro/license).
