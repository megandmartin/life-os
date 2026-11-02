# Build notes

## Ownership and scope

Life OS was created by [Megan (@megandmartin)](https://github.com/megandmartin). Megan leads the product concept, interface design, implementation and testing. Development and review are AI-assisted.

This public repository is the product's preview and release companion. It includes runnable browser checks, synthetic sample notes, design assets and technical documentation. The application implementation remains private; its commit history and full test suite cannot be assessed from this repository.

For a separate project with publicly inspectable implementation, see [PredictKit](https://github.com/megandmartin/predictkit). It has its own purpose, source and validation; its results should not be attributed to Life OS.

## The problem this build explores

People who already keep Markdown notes can have the information they need spread across projects, daily notes and references. Life OS explores whether a shared visual model can make those connections easier to use while leaving the underlying notes portable.

The initial audience is people already using Obsidian or a folder of Markdown. The browser preview lets them inspect the interaction before considering a native application. This repository does not report measured retention or willingness to pay.

## Three consequential choices

### Keep the notes as files

**Choice:** read Markdown and metadata into a shared model, preserving links to source notes.

**Why:** people can inspect and edit the underlying information with tools they already use. The visual interface does not require a second manually maintained copy of their life.

**Cost:** vault conventions differ. Inference must be explainable, and unsupported structures will need better mappings. File storage also inherits the user's backup and cloud-folder behavior.

### Make interpretation deterministic before adding model calls

**Choice:** infer types from known metadata, folders and tags; provide local question-and-retrieval behavior with citations. Keep optional provider calls separate.

**Why:** importing a vault and seeing its relationships should not require a provider account or sending every note to a model. The offline sample-import check makes one part of that boundary observable.

**Cost:** deterministic interpretation is narrower than general language understanding. Unknown conventions and open-ended questions can fail to map cleanly. Optional LLM quality needs its own evaluation.

### Put editing behind a separate capability

**Choice:** viewing a note does not grant permission to save. Supported overwrites use expected hashes, backups and conflict reporting; native public distribution has a signing and installation gate.

**Why:** an interface over someone's personal notes must earn write access and provide a recovery path.

**Cost:** permission flows, platform differences, concurrent editors and recovery add complexity. Optimistic checks are not a universal cross-process lock, and unit checks do not replace clean-device testing.

## Inspect the result

- [Try the browser preview](https://open-your-life.vercel.app/app/?world=desktop&persona=maya&theme=light).
- [Import the five-note synthetic vault](../examples/README.md), then find Community Map and its collaborator.
- [Read the architecture](TECHNICAL-OVERVIEW.md) and its stated tradeoffs.
- [Run the public checks](VALIDATION.md), inspect their source and compare the limits with the claims.

The next useful product evidence is observed use of personal vaults, repeat usage and specific feedback about what people could do more easily. Those outcomes are not supplied by screenshots or test totals.
