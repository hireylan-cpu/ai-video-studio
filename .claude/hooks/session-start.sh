#!/bin/bash
# Installs dependencies so lint, Studio and renders work in Claude Code cloud sessions.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

npm install --no-fund --no-audit --loglevel=error

# Remotion renders with its own Chrome Headless Shell; fetch it now instead of on first render.
npx remotion browser ensure
