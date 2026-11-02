# Technical overview

Life OS is a visual layer over Markdown notes. It keeps the files as the source and builds a shared model that different interfaces can display. This document describes the current implementation reviewed on **3 November 2026**. Application source is private; this repository contains runnable browser checks, synthetic sample notes, documentation, preview assets and release infrastructure.

## One model, several views

The reading pipeline has four stages:

1. **Read notes and images.** Bundled demos and user-selected folders enter through different adapters.
2. **Parse Markdown and YAML.** A shared parser extracts metadata, wikilinks, tags, tasks and schedules. Parse errors are retained rather than silently converted into invented information.
3. **Build the life model.** Explicit note types take precedence. For ordinary Obsidian notes without Life OS metadata, deterministic rules infer categories from folders, tags and properties. Inference carries an explanation and is not written back to the files.
4. **Render a view.** Desktop, Editorial and the other worlds use the same model. Projects, people and other objects retain references to their underlying notes, so a reader can inspect the source.

This separates information from presentation: changing the visual world does not require a second copy of the vault. The tradeoff is that the shared model and inference rules determine what the views can understand; arbitrary vault conventions will not always map cleanly.

Markdown rendering passes generated HTML through DOMPurify. A note is treated as content, rather than a way to execute scripts or borrow the application's styling.

## Reading and editing are separate capabilities

A folder that can be read is not automatically writable. Saving requires permission for the selected vault. Demo lives, GitHub imports and browser folders opened through a read-only path do not acquire write access.

For a supported overwrite, the write layer:

- Checks the vault-relative path and the supported file type.
- Compares an expected SHA-256 hash with the current file.
- Preserves the previous bytes before replacing them.
- Rechecks for an intervening change and reports a conflict when detected.

The native writer uses a temporary file, file synchronization and rename for replacement. These are **optimistic conflict checks**, not a transaction lock shared with every external editor. Concurrent filesystem changes, storage failures and platform differences still need realistic testing. Version history and whole-vault copies are recovery mechanisms, not substitutes for separate backups.

## Browser and native boundaries

| Browser preview | Native implementation |
|---|---|
| Reads selected files using capabilities available in the browser. Folder access, editing and permission persistence vary. | Reads a chosen vault through the Electron main process and can watch it for changes. |
| Browser storage belongs to that browser and origin. | App-only records belong to the desktop application profile. |
| Does not demonstrate native IPC, installation or OS permissions. | Uses a sandboxed renderer, context isolation and a restricted preload bridge. The main process checks the calling frame, selected vault and editing permission. |

Browser and desktop storage are separate. Installing the native app does not silently migrate browser records. A vault backup also does not include every app-profile record; feature exports may be needed for sessions, recordings and other app-only data.

Local storage is not application-level encryption. Cloud-folder services can synchronize files independently of Life OS.

## Optional AI is a separate path

Ask My Life includes a deterministic local question-and-retrieval engine with note citations. Optional model requests can send a question and selected note excerpts to a configured provider. Other optional voice and memory integrations have their own data flows.

The native implementation defaults to offline mode. Its renderer network policy and service bridge gate optional connections; enabling them requires confirmation. Disabling connections cannot retract information already received by another service. Browser behavior should not be assumed to inherit the native container's policy.

## Verification and remaining limits

Public browser checks can verify visible behavior. They cannot independently reproduce checks of private implementation modules, prove native behavior, or establish real-user usefulness.

Native downloads remain paused. Mac distribution requires Developer ID signing, notarization and clean-device installation checks before publication. Windows packaging likewise needs signed artifacts and real-device acceptance. A successful local unit check does not satisfy those release gates.
