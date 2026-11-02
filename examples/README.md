# A small vault you can inspect

`review-vault/` contains five Markdown notes, one invented person named Rowan, one invented collaborator and one invented project. There are no API keys, external images or real personal details. It is a product fixture, not a customer or usage claim.

1. Clone this repository, or download its ZIP and extract it.
2. Open the [browser preview](https://open-your-life.vercel.app/app/?world=desktop&theme=light).
3. Choose **Add your life → I already have a vault → Choose a vault folder**.
4. Select only the extracted `examples/review-vault` folder, then choose **Open my Life OS**.
5. Search for **Community Map**, follow its connection to **Alex Chen**, and compare Desktop with Editorial.

You should see Rowan's invented life and the Community Map project at 25% progress. The original notes remain normal Markdown with YAML frontmatter and `[[wikilinks]]`.

The [public browser checks](../tests/preview.spec.mjs) import this exact folder using Chromium's HTML directory-input fallback and perform a lookup while the browser is offline. They do not test the operating system's native folder-permission dialog. Imported browser folders are session-only; keep the original files. Import the fixture, not a real personal vault, when running or sharing test results.
