# Little Loops website: how to update it

Everything you need to change lives in two places: the `images` folder and the `data` folder. You don't need to touch anything else.

```
crochet-site/
├── index.html          the website (open this in a browser to view it)
├── images/
│   ├── products/       ← upload item photos here
│   ├── learn/          ← upload pattern photos here
│   ├── about/          ← upload your own photo here
│   └── samples/        placeholder pictures (delete once you have real ones)
└── data/
    ├── products.js     ← item details (name, price, days to make…)
    ├── learn.js        ← crochet patterns for the Learn page
    └── site.js         ← shop name, Instagram, About text, order form
```

## Add an item

1. Upload the photo(s) to `images/products/`. Use simple file names without spaces, e.g. `sleepy-bunny-1.jpg`, `sleepy-bunny-2.jpg`. Square or portrait photos (4:5) look best.
2. Open `data/products.js`, copy one `{ ... },` block and paste it below the last one.
3. Change the details:

| Field | What to write | Example |
|---|---|---|
| id | short unique name, no spaces | `"sleepy-bunny"` |
| name | item name | `"Sleepy Bunny"` |
| category | `"toys"`, `"keychains"` or `"bag-charms"` | `"toys"` |
| images | photo paths, main one first | `["images/products/sleepy-bunny-1.jpg", "images/products/sleepy-bunny-2.jpg"]` |
| description | optional, `""` if none | `"A soft, floppy-eared bunny…"` |
| dimensions | optional | `"22 cm tall, 10 cm wide"` |
| price | optional, exactly as shown. Leave `""` to show "Price available on request" | `"$34"` |
| daysToMake | days before it ships | `7` |
| featured | `true` puts it in the home slider and top-10 grid | `true` |

The home page slider shows every featured item (3 seconds each). The "Top makes" grid shows the first 10 featured items, in the order they appear in the file.

To update an item later (a new price, different days to make), just edit its block.

## Add a crochet pattern (Learn page)

Upload photos to `images/learn/`, then copy the sample pattern block in `data/learn.js` and edit it. Write one line per round, starting with `Rnd 1:` (or `Row 1:`) and ending with the stitch count in brackets, e.g. `"Rnd 3: (sc 1, inc) 6 times (18)"`. The site highlights the round number and stitch count automatically.

## Shop settings (data/site.js)

Shop name, tagline, your Instagram handle and link, your About photo and text, and the order form address.

## The How to Order form

The form sends orders through **Formspree** (free plan: 50 orders a month). Formspree saves every order in its dashboard and emails each one to you.

1. Sign up at formspree.io with the email address that should receive orders.
2. Create a new form. Copy its address, which looks like `https://formspree.io/f/abcdwxyz`.
3. Paste it into `orderFormEndpoint` in `data/site.js`.

Until then the form runs in preview mode: visitors see what would be sent, and nothing is sent.

## Viewing and publishing

Double-click `index.html` to view the site on your computer. To put it online, the whole `crochet-site` folder can be uploaded as-is to any static host (Netlify, GitHub Pages, Cloudflare Pages).
