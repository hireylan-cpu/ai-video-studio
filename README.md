# AI Video Studio

Vertical short-form video with [Remotion](https://www.remotion.dev), set up for Claude Code to build and edit.

- **DramaEpisode**: AI drama template: title card → shots with dialogue → "To be continued…", crossfaded.
- **CaptionedVideo**: TikTok-style animated word captions over any clip (Whisper.cpp transcription).

## Quick start

```console
npm i --loglevel=error
npm run dev          # opens Remotion Studio preview
```

Render the episode:

```console
npx remotion render DramaEpisode out/episode.mp4
```

## Make an AI drama episode

1. Generate vertical (9:16) clips for each shot and drop them into `public/drama/`.
2. In `src/Drama/DramaEpisode.tsx`, set each shot's `clip={staticFile("drama/shot1.mp4")}`, `speaker` and `line`.
3. Preview with `npm run dev`. You can also edit text, colors and clips in Studio's props panel.

Or just ask Claude Code, e.g. *"Add a 4th shot where Daniel says 'Read it again.' using public/drama/shot4.mp4"*.

## Make a captioned clip

```console
npx remotion ffmpeg -ss 00:12:30 -to 00:13:15 -i long-video.mp4 -c copy public/clip.mp4
node sub.mjs public/clip.mp4     # first run downloads Whisper.cpp + model
```

Then set the `CaptionedVideo` composition's `src` to `staticFile("clip.mp4")`. For non-English, change `WHISPER_MODEL` / `WHISPER_LANG` in `whisper-config.mjs`.

## Claude Code skills (in `.claude/skills/`)

| Skill | Purpose |
|---|---|
| `remotion-*` (12 skills) | Official Remotion agent skills ([remotion-dev/skills](https://github.com/remotion-dev/skills)), version-matched to 4.0.536. Update with `npx skills update`. |
| `source-driven-development` | From [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (MIT): makes Claude verify APIs against official docs before writing code. |

`CLAUDE.md` tells Claude Code how this project is laid out and which skills to use.

## License

Remotion requires a company license for organizations above 3 people: see [remotion.pro/license](https://www.remotion.pro/license). Bundled font: see `public/theboldfont-license.rtf`.
