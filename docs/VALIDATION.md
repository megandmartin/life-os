# Validation and how to reproduce it

The application is a working preview. This page separates checks anyone can run against the public browser app from checks of private implementation modules. Neither establishes customer demand, retention, production readiness or public native-release readiness.

## Run the public browser checks

Requires Node.js 22 or later and internet access to load the preview. From a fresh clone:

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm test
```

On a Linux machine without Chromium's system libraries, use `npx playwright install --with-deps chromium` instead. To inspect a report locally, run `npm run test:report`.

On 3 November 2026, the public suite passed **4/4 locally** in Chromium on macOS and **4/4 on GitHub Actions**. The [first successful CI run](https://github.com/megandmartin/life-os/actions/runs/41496619532) tested commit `23cc6ce376b4a0fb9106998727b496d5615fbe1c` from a fresh Linux checkout with Playwright 1.64.1.

The [workflow](../.github/workflows/preview-checks.yml) runs the same suite on GitHub Actions. The [Actions history](https://github.com/megandmartin/life-os/actions/workflows/preview-checks.yml) shows the actual results and downloadable reports. Reports are retained for seven days; rerun the workflow or local command to generate a fresh report. Tests use fresh browser contexts, synthetic notes and public demo lives. They require no account, provider key, wallet or private data. Retries are disabled so a failed attempt is visible.

| Public check | What it exercises |
|---|---|
| Project → source note | Opens a demo project and verifies that its 45% rendered progress matches the Markdown, including its fictional provenance. |
| World and preference change | Switches to Editorial, retains the same demo life, and recovers the saved dark preference without a theme URL override. |
| Offline sample import | Loads the app, disconnects its browser context, imports the five-note sample folder, finds Community Map and reads its 25% progress. Checks the fixture's file hashes afterward. |
| Phone lookup | Opens the phone demo, finds the same project through search, and checks for horizontal overflow at 390 × 844. |

The folder test uses the real HTML directory-input fallback after disabling Chromium's native directory-picker API. It does **not** validate the native File System Access permission dialog, desktop IPC, offline reload, provider behavior or all possible note formats. Hash equality checks this fixture and this flow; it is not a general filesystem or privacy guarantee.

These checks target a live deployment, which can change independently of this repository. A failed run may reflect a regression, changed demo content or hosting availability; inspect the report rather than treating a badge as a release certificate.

## Local implementation checks: 3 November 2026

The following checks were rerun against the private development checkout on macOS 27.0.1, Apple silicon, Node.js 26.12.1. They are reported development results, **not independently reproducible from this public repository**. They do not identify the public browser deployment as the same build.

| Command in the private checkout | Result | Scope |
|---|---|---|
| `cd app && npm run write:check` | 85/85 passed | Actual native filesystem writer on temporary copies; conflicts, path/symlink guards, backup/restore, byte-preserving frontmatter changes. Browser File System Access uses mocked handles. The check verifies the bundled vaults were not modified. |
| `cd app && npm run graph:check` | 455 checks passed | Shared life model, graph and search across demo and sparse fixtures, plus a synthetic scale fixture. |
| `cd app && npm run ask:check` | 3,593 checks passed | Deterministic local answers, citations, provenance, Year calculations, and optional request construction. Network calls are explicitly disabled; this is not a live LLM evaluation. |
| `cd desktop-app && npm run privacy:check` | 32 checks passed | Network-policy decisions, deep-link parsing and release/privacy configuration. No signed installer or native GUI acceptance is established. |

Counts are assertions emitted by each check script, not customer outcomes or comparable independent test cases. No runtime speed numbers are presented as benchmarks.

A small [machine-readable record](evidence/2026-11-03.json) preserves the date, commands and boundaries. Private source, vault contents, credentials and machine paths are excluded.

## What is still unverified

- Signed and notarized Mac downloads passing a fresh-device installation and launch.
- Windows installation and real-device acceptance.
- General cross-browser filesystem permissions and saving behavior.
- Live optional AI/voice providers, long-running reliability and data recovery under device/storage failure.
- Whether people choose this workflow, return to it, or pay for it. Demo activity and test runs do not answer those questions.
