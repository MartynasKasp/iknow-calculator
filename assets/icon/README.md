# App icon

Source SVGs for the favicon and app icons. The dice glyph is Lucide's `dices` icon
(ISC license, https://lucide.dev), white on the theme accent `#603AFB`.

- `icon.svg`: rounded square, the master design (the header logo shape)
- `icon-small.svg`: bolder and bigger glyph for the 16–48px `favicon.ico`
- `icon-full.svg`: opaque edge-to-edge square with a smaller glyph, used for all home-screen
  icons (Apple touch, Android and maskable). Phones crop it into their own shape, and
  iOS would fill transparent corners with black.

The PNG and ICO files in `public/` are rendered from these.
