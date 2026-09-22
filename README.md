# Glass Browser

Glass Browser is a liquid-glass, Chromium-inspired search workspace made for vibecoders. It treats search as a creative prompt: describe the feeling, reference, or interaction you want, then explore a small set of intentional results.

## Features

- Vibe-led search home with curated result cards
- Chromium-inspired tabs, omnibox, navigation controls, and bookmarks
- Command palette with keyboard-first actions
- History, bookmarks, and downloads utility drawers
- Dark glass visual system with responsive desktop/mobile layouts
- Electron desktop wrapper for a standalone Windows build
- Real external link navigation in native browser windows
- Bright frosted liquid-glass theme by default

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

The Windows build is a single portable executable written to `release/Glass-Browser-0.1.2-win32-x64.exe`.

## Release

The current public release is **v0.1.2**. Download the single-file Windows executable from the [GitHub Releases page](https://github.com/jxxdhaha/glass-browser/releases).

## License

MIT
