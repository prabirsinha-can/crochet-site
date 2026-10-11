/* =====================================================================
   PRODUCTS
   One block { ... } per item. To add an item, copy a block, paste it
   below the last one and change the details.

   id           A short unique name with no spaces, e.g. "sleepy-bunny"
   name         The item name
   category     Exactly one of: "toys", "keychains", "bag-charms"
   images       Photo paths. Upload photos to images/products/ and write
                "images/products/your-photo.jpg". The first photo is the
                main one. Add more, separated by commas, for a gallery.
   description  Optional. Leave "" if none.
   dimensions   Optional, e.g. "18 cm tall, 9 cm wide"
   price        Optional, written exactly as it should show, e.g. "$24".
                Leave "" and the site shows "Price available on request".
   daysToMake   Number of days before it ships, e.g. 5
   featured     true to show it in the home page slider and the top 10
                grid (the first 10 featured items, in this order).

   The items below are SAMPLES with placeholder pictures. Replace them
   with your own.
   ===================================================================== */
window.PRODUCTS = [
  {
    id: "olivia-rosemary-mouse",
    name: "Olivia Rosemary Mouse",
    category: "toys",
    images: ["images/products/olivia-rosemary-mouse.jpg"],
    description: "A little mouse with big round ears, rosy cheeks and an embroidered smile. She wears a sky-blue dress with a row of red hearts, white bloomers and a navy cape tied with a bow.",
    dimensions: "",
    price: "",
    daysToMake: 7,
    featured: true
  },
  {
    id: "christmas-hippo",
    name: "Christmas Hippo",
    category: "toys",
    images: ["images/products/christmas-hippo.jpg"],
    description: "A smiley white hippo with pink ears, dressed for the holidays in a lilac turtleneck jumper with an embroidered Christmas tree and snowflake dots.",
    dimensions: "",
    price: "",
    daysToMake: 7,
    featured: true
  },
  {
    id: "ron-red-panda",
    name: "Ron the Red Panda",
    category: "toys",
    images: ["images/products/ron-red-panda.jpg"],
    description: "Ron is a red panda with flower-blush cheeks, wrapped up in a chunky burgundy scarf and navy-striped trousers with a sunny yellow waistband.",
    dimensions: "",
    price: "",
    daysToMake: 7,
    featured: true
  },
  {
    id: "mabel",
    name: "Mabel",
    category: "toys",
    images: ["images/products/mabel.jpg"],
    description: "Mabel is a sweet hedgehog with bobble-stitch spines and a tiny ear, in a yellow checked top and a lilac skirt with a pink scalloped hem.",
    dimensions: "",
    price: "",
    daysToMake: 7,
    featured: true
  },
  {
    id: "teddy-bag-charm",
    name: "Sleepy Teddy Bag Charm",
    category: "bag-charms",
    images: ["images/products/teddy-bag-charm.jpg"],
    description: "A fluffy little teddy with a sunny yellow face and sleepy embroidered eyes, carrying a tiny striped satchel. Hangs from a star clasp and key ring.",
    dimensions: "",
    price: "",
    daysToMake: 5,
    featured: true
  },
  {
    id: "love-bag-charm",
    name: "Love Heart Bag Charm",
    category: "bag-charms",
    images: ["images/products/love-bag-charm.jpg"],
    description: "A cheerful red heart-headed friend in a blue suit with yellow spots, on a clasp for your bag.",
    dimensions: "",
    price: "",
    daysToMake: 5,
    featured: true
  },
  {
    id: "strawberry-keychain",
    name: "Strawberry Keychain",
    category: "keychains",
    images: ["images/samples/strawberry-keychain.svg"],
    description: "A plump strawberry with embroidered seeds on a gold-tone key ring.",
    dimensions: "5 cm tall (berry only)",
    price: "$9",
    daysToMake: 2,
    featured: true
  },
  {
    id: "daisy-keychain",
    name: "Daisy Keychain",
    category: "keychains",
    images: ["images/samples/daisy-keychain.svg"],
    description: "",
    dimensions: "6 cm across",
    price: "",
    daysToMake: 2,
    featured: true
  },
  {
    id: "avocado-keychain",
    name: "Mini Avocado Keychain",
    category: "keychains",
    images: ["images/samples/avocado-keychain.svg"],
    description: "Half an avocado with a little stone, on a split key ring.",
    dimensions: "6 cm tall",
    price: "$9",
    daysToMake: 2,
    featured: true
  },
  {
    id: "cloud-keychain",
    name: "Cloud Keychain",
    category: "keychains",
    images: ["images/samples/cloud-keychain.svg"],
    description: "A soft blue cloud with rosy cheeks.",
    dimensions: "7 cm wide",
    price: "$8",
    daysToMake: 2,
    featured: false
  }
];
