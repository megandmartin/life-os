# Repository presentation assets

- `readme-hero.jpg`: README banner, 1280 × 640.
- `social-preview.jpg`: repository link card, 1280 × 640, under 1 MB.
- `desktop-preview.jpg` and `editorial-preview.jpg`: 1440 × 900 screenshots captured from the public browser preview on 3 November 2026. Both show Maya, a fictional demo persona. The product's demo labels remain visible; the screenshots contain no personal vault data.

The editable compositions live in [preview.html](../.github/presentation/preview.html). Open it with a 1280 × 640 viewport: `?variant=a` renders the README composition, `?variant=b` renders the social card, and `?variant=c` shows an alternate layout. It uses Life OS's existing mark, Bricolage Grotesque and Host Grotesk, with the product's enamel, teal and haze colours. The image files are self-contained; fonts load from Google Fonts only when regenerating the HTML compositions.

## Set the GitHub social preview

Committing an image does not set the repository's social preview. In [repository settings](https://github.com/megandmartin/life-os/settings), go to **Social preview → Edit → Upload an image** and choose `social-preview.jpg`.

GitHub's [social preview guide](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview) recommends 1280 × 640 and a file below 1 MB. Verify the saved preview in Settings. Social platforms may cache an older card.
