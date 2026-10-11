/* =====================================================================
   LEARN: CROCHET PATTERNS
   One block { ... } per pattern. Upload pattern photos to images/learn/.

   id            Short unique name with no spaces
   title         Pattern name
   summary       One or two sentences shown on the Learn page
   images        Photos of the finished piece (first one is the cover)
   skillLevel    e.g. "Beginner", "Easy", "Intermediate"
   timeNeeded    e.g. "About 1 hour"
   finishedSize  e.g. "7 cm wide"
   hook          e.g. "3.0 mm"
   materials     List of materials, one per line
   abbreviations Pairs of ["short", "meaning"]
   sections      The pattern itself, in parts. Each part has a title,
                 optional intro text, optional image, and rows: one line
                 per round or row. Stitch counts go in brackets at the end.
   notes         Optional tips at the end

   The pattern below is a SAMPLE. Replace it with your own.
   ===================================================================== */
window.PATTERNS = [
  {
    id: "puffy-heart",
    title: "Puffy Heart Bag Charm",
    summary: "A quick, squishy amigurumi heart worked in continuous rounds. A good first project if you've learned the magic ring and single crochet.",
    images: ["images/samples/pattern-heart.svg"],
    skillLevel: "Beginner",
    timeNeeded: "About 1 hour",
    finishedSize: "7 cm wide",
    hook: "3.0 mm",
    materials: [
      "DK weight cotton yarn in red, about 15 g",
      "3.0 mm crochet hook",
      "A small handful of toy stuffing",
      "Lobster clasp or key ring",
      "Stitch marker and tapestry needle"
    ],
    abbreviations: [
      ["MR", "magic ring"],
      ["ch", "chain"],
      ["sc", "single crochet"],
      ["inc", "increase: 2 sc in the same stitch"],
      ["dec", "decrease: sc 2 stitches together"],
      ["sl st", "slip stitch"],
      ["FO", "fasten off"]
    ],
    sections: [
      {
        title: "Bumps (make 2)",
        intro: "Work in continuous rounds. Place a stitch marker in the first stitch of each round and move it up as you go.",
        rows: [
          "Rnd 1: 6 sc in MR (6)",
          "Rnd 2: inc in each st around (12)",
          "Rnd 3: (sc 1, inc) 6 times (18)",
          "Rnds 4–5: sc in each st around (18)",
          "FO the first bump. Leave the second bump on your hook."
        ]
      },
      {
        title: "Joining the bumps",
        intro: "Hold the bumps side by side. Continue from the second bump.",
        image: "images/samples/pattern-heart-step.svg",
        rows: [
          "Rnd 6: sc 15 around the second bump, then sc 18 around the first bump, then sc the remaining 3 of the second bump (36)",
          "Rnd 7: sc in each st around (36)",
          "Rnd 8: (sc 4, dec) 6 times (30)",
          "Rnd 9: sc in each st around (30)",
          "Rnd 10: (sc 3, dec) 6 times (24)",
          "Start stuffing now, a little at a time."
        ]
      },
      {
        title: "Closing the point",
        rows: [
          "Rnd 11: (sc 2, dec) 6 times (18)",
          "Rnd 12: (sc 1, dec) 6 times (12)",
          "Top up the stuffing.",
          "Rnd 13: dec 6 times (6)",
          "FO, leaving a long tail. Weave it through the front loops of the last round and pull tight to close."
        ]
      },
      {
        title: "Finishing",
        rows: [
          "Ch 12 with a new strand, sl st into the top centre of the heart to make a loop.",
          "Thread the loop through the clasp.",
          "Weave in all ends."
        ]
      }
    ],
    notes: [
      "Stuff firmly at the bumps so the heart keeps its shape.",
      "If the gap between the bumps looks loose, close it with a couple of stitches using the starting tail."
    ]
  }
];
