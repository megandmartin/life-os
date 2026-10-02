# Life OS

**Open your life.** Life OS turns the Markdown notes you already keep into a visual operating system for your life: today, projects, people, places and the long arc. It's beautiful without any decorating, and everything stays on your device.

This repository hosts the **macOS preview downloads**. You can also [try Life OS in your browser](https://open-your-life.vercel.app/app/) with nothing to install.

## Download

| Mac | File |
|---|---|
| Apple silicon (M1 and later) | [Life-OS-mac-arm64.dmg](https://github.com/megandmartin/life-os/releases/latest/download/Life-OS-mac-arm64.dmg) |
| Intel | [Life-OS-mac-intel.dmg](https://github.com/megandmartin/life-os/releases/latest/download/Life-OS-mac-intel.dmg) |

You need macOS 12 or later.

### First launch

This preview isn't notarised by Apple yet, so macOS asks before opening it the first time.

1. Open the download and drag **Life OS** into Applications.
2. Open Life OS. If macOS says it can't check the app, choose **Done**.
3. Go to **System Settings › Privacy & Security**, scroll down and click **Open Anyway**.

Or, in Terminal:

```
xattr -dr com.apple.quarantine "/Applications/Life OS.app"
```

## What's inside

- **Your vault, as a life.** Point it at an Obsidian vault or any folder of Markdown. It redraws the moment a note changes.
- **Eight worlds, light and dark:** Desktop, Editorial, Reel, Sleeve, Ask, Socratis Sanctuary, Atelier and Observatory.
- **A council of 19 agents**, guided practices, life pillars, agent organisation and automation plans.
- **Voice notes and read aloud** in sessions and pillars, with recordings included in full backups. Local transcription requires whisper-cli, ffmpeg and a Whisper model installed on your Mac; device speech needs no API key.
- **Graph view, Search (⌘K), Ask My Life and a Year view.** Ask My Life answers from your notes and cites them.
- **Explore lives.** Nine demo lives, fictional, public-figure and historical, each labelled for what it is.
- **Safe by default.** Life OS reads your notes and only saves changes after you allow it. It keeps the previous version of every note, and it can keep a full backup copy of your vault.
- **No account and no upload.** Your notes stay on your machine.

## Demo lives

Maya, Priya, Nina, Leila, Jordan and Marco are fictional. The Sam Altman and Gisele Bündchen lives are hypothetical demos built from their public writing and interviews. They are not their notes, and neither of them is affiliated with or endorses Life OS. The Leonardo da Vinci life is built from the historical record. Anything invented is labelled Demo.
