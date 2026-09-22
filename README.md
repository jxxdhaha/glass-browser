# Glass Browser

Glass Browser is a liquid-glass, Chromium-inspired search workspace made for vibecoders. It treats search as a creative prompt: describe the feeling, reference, or interaction you want, then explore a small set of intentional results.

## Features

- Vibe-led search home with curated result cards
- Chromium-inspired tabs, omnibox, navigation controls, and bookmarks
- Command palette with keyboard-first actions
- History, bookmarks, and downloads utility drawers
- Dark glass visual system with responsive desktop/mobile layouts
- Electron desktop wrapper for a standalone Windows build

## Development

```bash
pnpm install
pnpm dev
```

## Desktop build

Run the native wrapper locally:

```bash
pnpm desktop:run
```

Create the Windows x64 package:

```bash
pnpm desktop:win
```

The packaged app is written to `release/Glass Browser-win32-x64/`. The executable inside that folder is `Glass Browser.exe`.

## Release

The current public release is **v0.1.1**. Download the Windows package from the [GitHub Releases page](https://github.com/jxxdhaha/glass-browser/releases).

## License

MIT
