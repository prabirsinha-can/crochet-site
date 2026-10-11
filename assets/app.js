/* Site logic. You shouldn't need to edit this file: item details live in
   data/products.js, patterns in data/learn.js and shop settings in data/site.js. */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PRODUCTS = window.PRODUCTS || [];
  var PATTERNS = window.PATTERNS || [];
  var SLIDE_MS = 3000;
  var CATS = [
    { id: "toys", label: "Toys", blurb: "Soft friends to hug, gift and keep." },
    { id: "keychains", label: "Keychains", blurb: "Little makes that ride along with your keys." },
    { id: "bag-charms", label: "Bag charms", blurb: "A bit of colour for your bag, tote or backpack." }
  ];

  var view = document.getElementById("view");
  var orderPrefill = null;
  var sliderCleanup = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function photo(p) { return (p.images && p.images[0]) || ""; }
  function catLabel(id) { var c = CATS.filter(function (c) { return c.id === id; })[0]; return c ? c.label : id; }
  function byId(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }
  function featured() { var f = PRODUCTS.filter(function (p) { return p.featured; }); return f.length ? f : PRODUCTS; }
  function days(n) { n = Number(n) || 0; return n + (n === 1 ? " day" : " days"); }

  /* ---------- Shared bits ---------- */
  function card(p) {
    return '<a class="card" href="#item-' + esc(p.id) + '">' +
      '<div class="card-img"><img src="' + esc(photo(p)) + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
      '<span class="card-name">' + esc(p.name) + "</span></a>";
  }
  function grid(items) {
    if (!items.length) return '<p class="empty">New pieces are on the hook. Check back soon.</p>';
    return '<div class="grid">' + items.map(card).join("") + "</div>";
  }

  /* ---------- Pages ---------- */
  function pageHome() {
    var slides = featured();
    var top = featured().slice(0, 10);
    var hero = slides.length ? (
      '<section class="hero" aria-roledescription="carousel" aria-label="Featured makes" style="--slide-ms:' + SLIDE_MS + 'ms">' +
      slides.map(function (p, i) {
        return '<a class="slide' + (i === 0 ? " is-active" : "") + '" href="#item-' + esc(p.id) + '" aria-hidden="' + (i ? "true" : "false") + '"' + (i ? ' tabindex="-1"' : "") + '>' +
          '<span class="slide-bg" style="background-image:url(\'' + esc(photo(p)) + '\')"></span>' +
          '<img class="slide-photo" draggable="false" src="' + esc(photo(p)) + '" alt="' + esc(p.name) + '">' +
          '<span class="slide-cap"><span class="eyebrow">' + esc(catLabel(p.category)) + '</span><span class="slide-name">' + esc(p.name) + "</span></span></a>";
      }).join("") +
      '<div class="hero-ctrl" role="tablist" aria-label="Choose a slide">' +
      slides.map(function (p, i) { return '<button class="dot' + (i === 0 ? " is-active" : "") + '" data-go="' + i + '" aria-label="Show ' + esc(p.name) + '"><span></span></button>'; }).join("") +
      "</div>" +
      '<div class="hero-arrows"><button data-step="-1" aria-label="Previous item">&#8592;</button><button data-step="1" aria-label="Next item">&#8594;</button></div>' +
      "</section>") : "";

    return hero +
      '<section class="section wrap">' +
      '<div class="section-head"><div><p class="eyebrow">Most loved</p><h2>Top makes</h2></div>' +
      '<a class="text-link" href="#products">See all products &#8594;</a></div>' +
      grid(top) + "</section>";
  }

  function pageProducts(cat) {
    var items = cat ? PRODUCTS.filter(function (p) { return p.category === cat; }) : PRODUCTS;
    var c = CATS.filter(function (x) { return x.id === cat; })[0];
    var chips = '<div class="chips"><a class="chip' + (!cat ? " is-active" : "") + '" href="#products">All</a>' +
      CATS.map(function (x) { return '<a class="chip' + (x.id === cat ? " is-active" : "") + '" href="#' + x.id + '">' + x.label + "</a>"; }).join("") + "</div>";
    return '<section class="section wrap">' +
      '<div class="section-head"><div><p class="eyebrow">Products</p><h1>' + (c ? c.label : "Everything") + "</h1></div>" +
      '<p class="muted">' + (c ? c.blurb : "Every piece is crocheted by hand and made to order.") + "</p></div>" +
      chips + grid(items) + "</section>";
  }

  function pageItem(id) {
    var p = byId(id);
    if (!p) return pageMissing();
    var imgs = p.images && p.images.length ? p.images : [""];
    var thumbs = imgs.length > 1 ? '<div class="thumbs">' + imgs.map(function (src, i) {
      return '<button type="button" class="' + (i === 0 ? "is-active" : "") + '" data-thumb="' + esc(src) + '" aria-label="Photo ' + (i + 1) + '"><img src="' + esc(src) + '" alt=""></button>';
    }).join("") + "</div>" : "";
    var hasPrice = p.price && String(p.price).trim();
    var facts = "";
    if (p.dimensions) facts += "<div><dt>Dimensions</dt><dd>" + esc(p.dimensions) + "</dd></div>";
    facts += "<div><dt>Price</dt><dd>" + (hasPrice ? '<span class="price">' + esc(p.price) + "</span>" : '<span class="price on-request">Price available on request</span>') + "</dd></div>";
    facts += "<div><dt>Category</dt><dd><a class=\"text-link\" href=\"#" + esc(p.category) + "\">" + esc(catLabel(p.category)) + "</a></dd></div>";

    return '<section class="section wrap">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="#products">Products</a><span>/</span><a href="#' + esc(p.category) + '">' + esc(catLabel(p.category)) + "</a><span>/</span><span>" + esc(p.name) + "</span></nav>" +
      '<div class="item">' +
      '<div class="gallery"><div class="gallery-main"><img id="main-photo" src="' + esc(imgs[0]) + '" alt="' + esc(p.name) + '"></div>' + thumbs + "</div>" +
      '<div class="details">' +
      '<div><p class="eyebrow">Handmade to order</p><h1>' + esc(p.name) + "</h1></div>" +
      (p.description ? '<p class="desc">' + esc(p.description) + "</p>" : "") +
      '<dl class="facts">' + facts + "</dl>" +
      '<div class="ship-note"><span class="ship-ico" aria-hidden="true">' + esc(Number(p.daysToMake) || "") + 'd</span><span>Made by hand after you order. <strong>Will ship in ' + days(p.daysToMake) + ".</strong></span></div>" +
      '<div class="actions"><a class="btn btn-primary" href="#order" data-order="' + esc(p.id) + '">Order this item</a>' +
      '<a class="btn btn-ghost" href="' + esc(SITE.instagramUrl || "#contact") + '" target="_blank" rel="noopener">Ask a question</a></div>' +
      "</div></div></section>" +
      related(p);
  }

  function related(p) {
    var more = PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 3);
    if (!more.length) return "";
    return '<section class="section wrap" style="padding-top:0"><div class="section-head"><h2>More ' + esc(catLabel(p.category).toLowerCase()) + "</h2></div>" + grid(more) + "</section>";
  }

  function pageLearn() {
    var list = PATTERNS.length ? '<div class="pattern-list">' + PATTERNS.map(function (pt) {
      return '<a class="pattern-card" href="#pattern-' + esc(pt.id) + '">' +
        '<div class="card-img"><img src="' + esc((pt.images || [])[0] || "") + '" alt="' + esc(pt.title) + '" loading="lazy"></div>' +
        '<div class="tags">' + [pt.skillLevel, pt.timeNeeded].filter(Boolean).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
        "<h2>" + esc(pt.title) + '</h2><p class="muted">' + esc(pt.summary) + "</p></a>";
    }).join("") + "</div>" : '<p class="empty">Patterns are coming soon.</p>';
    return '<section class="section wrap"><div class="section-head"><div><p class="eyebrow">Learn</p><h1>Free crochet patterns</h1></div>' +
      '<p class="muted">Step-by-step patterns for some of the pieces in the shop. Grab a hook and make your own.</p></div>' + list + "</section>";
  }

  function rowHtml(r) {
    var m = String(r).match(/^((?:Rnds?|Rows?|Round|Row)\s*[\d–\-–]+\s*:)\s*(.*)$/i);
    var head = m ? '<span class="rnd">' + esc(m[1]) + "</span>" : "";
    var body = m ? m[2] : String(r);
    var c = body.match(/^(.*?)\s*(\(\d+\))\s*$/);
    if (c) return "<li>" + head + esc(c[1]) + ' <span class="count">' + esc(c[2]) + "</span></li>";
    return "<li>" + head + esc(body) + "</li>";
  }

  function pagePattern(id) {
    var pt = PATTERNS.filter(function (x) { return x.id === id; })[0];
    if (!pt) return pageMissing();
    var imgs = pt.images || [];
    var glance = [["Skill level", pt.skillLevel], ["Time", pt.timeNeeded], ["Finished size", pt.finishedSize], ["Hook", pt.hook]]
      .map(function (g) { return '<div><span class="label">' + g[0] + "</span><strong>" + esc(g[1] || "–") + "</strong></div>"; }).join("");
    var mats = (pt.materials || []).length ? '<div><h2>You will need</h2><ul class="plain-list">' + pt.materials.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul></div>" : "";
    var abbr = (pt.abbreviations || []).length ? '<div><h2>Abbreviations</h2><table class="abbr"><tbody>' + pt.abbreviations.map(function (a) { return "<tr><td>" + esc(a[0]) + "</td><td>" + esc(a[1]) + "</td></tr>"; }).join("") + "</tbody></table></div>" : "";
    var secs = (pt.sections || []).map(function (s) {
      return '<section class="p-section"><h3>' + esc(s.title) + "</h3>" + (s.intro ? "<p>" + esc(s.intro) + "</p>" : "") +
        '<div class="p-section-body' + (s.image ? " has-img" : "") + '"><ul class="rows">' + (s.rows || []).map(rowHtml).join("") + "</ul>" +
        (s.image ? '<figure><img src="' + esc(s.image) + '" alt="' + esc(s.title) + '" loading="lazy"></figure>' : "") + "</div></section>";
    }).join("");
    var notes = (pt.notes || []).length ? '<div class="notes"><h2>Tips</h2><ul class="plain-list">' + pt.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></div>" : "";

    return '<article class="section wrap"><div class="pattern">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="#learn">Learn</a><span>/</span><span>' + esc(pt.title) + "</span></nav>" +
      '<header class="pattern-head"><p class="eyebrow">Free pattern</p><h1>' + esc(pt.title) + "</h1><p class=\"muted\">" + esc(pt.summary) + "</p></header>" +
      (imgs[0] ? '<div class="pattern-cover"><img src="' + esc(imgs[0]) + '" alt="' + esc(pt.title) + '"></div>' : "") +
      (imgs.length > 1 ? '<div class="pattern-more">' + imgs.slice(1).map(function (s) { return '<img src="' + esc(s) + '" alt="" loading="lazy">'; }).join("") + "</div>" : "") +
      '<div class="glance">' + glance + "</div>" +
      '<div class="pattern-cols">' + mats + abbr + "</div>" +
      "<h2>Pattern</h2>" + secs + notes +
      "</div></article>";
  }

  function pageOrder() {
    var picks = CATS.map(function (c) {
      var items = PRODUCTS.filter(function (p) { return p.category === c.id; });
      if (!items.length) return "";
      return '<div class="pick-group">' + c.label + "</div>" + items.map(function (p) {
        return '<div class="pick" data-pick="' + esc(p.id) + '">' +
          '<input type="checkbox" id="pick-' + esc(p.id) + '" aria-label="' + esc(p.name) + '">' +
          '<img src="' + esc(photo(p)) + '" alt="" loading="lazy">' +
          '<label class="pick-name" for="pick-' + esc(p.id) + '">' + esc(p.name) + "<small>" + (p.price ? esc(p.price) : "Price on request") + " · ships in " + days(p.daysToMake) + "</small></label>" +
          '<span class="qty"><button type="button" data-q="-1" aria-label="One fewer">&minus;</button><output>1</output><button type="button" data-q="1" aria-label="One more">+</button></span></div>';
      }).join("");
    }).join("");

    return '<section class="section wrap"><div class="order-layout">' +
      '<div class="order-intro"><p class="eyebrow">How to Order</p><h1>Tell me what you\'d love</h1>' +
      '<p class="muted">Every piece is made to order, so there\'s no checkout. Send your details and I\'ll get in touch to confirm colours, price, payment and delivery.</p>' +
      '<ol class="steps"><li><span>Pick your items and fill in your details.</span></li><li><span>I\'ll contact you to confirm everything and arrange payment.</span></li><li><span>Your order is made by hand and shipped to you.</span></li></ol></div>' +

      '<div id="order-box"><form class="order" id="order-form" novalidate>' +
      '<fieldset><legend>Your details</legend>' +
      '<div class="field"><label for="o-name">Full name</label><input type="text" id="o-name" name="name" autocomplete="name" required></div>' +
      '<div class="two"><div class="field"><label for="o-email">Email</label><input type="email" id="o-email" name="email" autocomplete="email" required></div>' +
      '<div class="field"><label for="o-phone">Phone <span class="opt">(optional)</span></label><input type="tel" id="o-phone" name="phone" autocomplete="tel"></div></div>' +
      "</fieldset>" +
      '<fieldset><legend>Shipping address</legend>' +
      '<div class="field"><label for="o-addr1">Street address</label><input type="text" id="o-addr1" name="address" autocomplete="street-address" required></div>' +
      '<div class="two"><div class="field"><label for="o-city">City</label><input type="text" id="o-city" name="city" autocomplete="address-level2" required></div>' +
      '<div class="field"><label for="o-state">State or region</label><input type="text" id="o-state" name="state" autocomplete="address-level1"></div></div>' +
      '<div class="two"><div class="field"><label for="o-zip">Postal code</label><input type="text" id="o-zip" name="postal_code" autocomplete="postal-code" required></div>' +
      '<div class="field"><label for="o-country">Country</label><input type="text" id="o-country" name="country" autocomplete="country-name" required></div></div>' +
      "</fieldset>" +
      '<fieldset><legend>Items to purchase</legend><div class="pick-list" id="pick-list">' + picks + "</div>" +
      '<div class="field"><label for="o-notes">Anything else? <span class="opt">(colours, custom requests, a date you need it by)</span></label><textarea id="o-notes" name="notes"></textarea></div>' +
      "</fieldset>" +
      '<input class="hp" type="text" name="_gotcha" id="o-gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div id="form-msg" class="form-msg err" role="alert" hidden></div>' +
      '<div><button class="btn btn-primary" type="submit" id="o-submit">Send my order request</button></div>' +
      "</form></div></div></section>";
  }

  function pageAbout() {
    var paras = (SITE.aboutParagraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    return '<section class="section wrap"><div class="about">' +
      '<div class="about-photo"><img src="' + esc(SITE.aboutPhoto || "") + '" alt="The crochet designer"></div>' +
      '<div class="about-text"><p class="eyebrow">About</p><h1>' + esc(SITE.aboutHeading || "About") + "</h1>" + paras +
      '<div class="actions"><a class="btn btn-ghost" href="#products">Browse the shop</a></div></div>' +
      "</div></section>";
  }

  function pageContact() {
    return '<section class="section wrap"><div class="contact"><p class="eyebrow">Contact</p><h1>Say hello on Instagram</h1>' +
      '<p class="muted" style="font-size:1.125rem;max-width:56ch">New makes, works in progress and the occasional giveaway. Send a message there with any question.</p>' +
      '<a class="ig-card" href="' + esc(SITE.instagramUrl || "#") + '" target="_blank" rel="noopener">' +
      '<span class="ig-mark" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></span>' +
      '<span><span class="label">Instagram</span><strong>' + esc(SITE.instagramHandle || "") + "</strong></span></a>" +
      '<p class="muted">Ready to buy? Use the <a class="text-link" href="#order">order form</a> and I\'ll reply with the details.</p>' +
      "</div></section>";
  }

  function pageMissing() {
    return '<section class="section wrap"><h1>That page has wandered off</h1><p class="muted" style="margin-top:12px">It may have sold out or moved. <a class="text-link" href="#home">Back to the shop</a></p></section>';
  }

  /* ---------- Behaviour ---------- */
  function startSlider() {
    var hero = view.querySelector(".hero");
    if (!hero) return;
    var slides = hero.querySelectorAll(".slide");
    var dots = hero.querySelectorAll(".dot");
    if (slides.length < 2) return;
    var i = 0;
    function go(n) {
      slides[i].classList.remove("is-active"); slides[i].setAttribute("aria-hidden", "true"); slides[i].tabIndex = -1;
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active"); slides[i].setAttribute("aria-hidden", "false"); slides[i].removeAttribute("tabindex");
      dots.forEach(function (d, k) {
        d.classList.remove("is-active");
        d.classList.toggle("is-done", k < i);
        var s = d.firstElementChild; s.style.animation = "none"; void s.offsetWidth; s.style.animation = "";
      });
      dots[i].classList.add("is-active");
    }
    // Each slide advances when its progress bar finishes filling (3 seconds).
    function onEnd(e) { if (e.target.parentElement && e.target.parentElement.classList.contains("is-active")) go(i + 1); }
    hero.addEventListener("animationend", onEnd);
    hero.addEventListener("click", function (e) {
      var d = e.target.closest("[data-go]"); if (d) { e.preventDefault(); go(+d.dataset.go); }
      var s = e.target.closest("[data-step]"); if (s) { e.preventDefault(); go(i + +s.dataset.step); }
    });
    function pause() { hero.classList.add("is-paused"); }
    function play() { hero.classList.remove("is-paused"); }
    hero.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") pause(); });
    hero.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") play(); });
    // Swipe left or right on phones and tablets
    var sx = null, sy = 0, lx = 0, horiz = false, swiped = false;
    function swipeStart(x, y) { sx = x; sy = y; lx = x; horiz = false; swiped = false; }
    function swipeEnd() {
      if (sx === null) return;
      var dx = lx - sx; sx = null;
      if (Math.abs(dx) > 35) { swiped = true; go(i + (dx < 0 ? 1 : -1)); setTimeout(function () { swiped = false; }, 400); }
    }
    hero.addEventListener("touchstart", function (e) { var t = e.touches[0]; swipeStart(t.clientX, t.clientY); }, { passive: true });
    hero.addEventListener("touchmove", function (e) {
      if (sx === null) return;
      var t = e.touches[0]; lx = t.clientX;
      if (!horiz && Math.abs(t.clientX - sx) > 8 && Math.abs(t.clientX - sx) > Math.abs(t.clientY - sy)) horiz = true;
      if (horiz && e.cancelable) e.preventDefault(); // keep the page from scrolling sideways while swiping
    }, { passive: false });
    hero.addEventListener("touchend", swipeEnd);
    hero.addEventListener("touchcancel", swipeEnd);
    // Mouse and pen drags too
    hero.addEventListener("pointerdown", function (e) { if (e.pointerType !== "touch") swipeStart(e.clientX, e.clientY); });
    hero.addEventListener("pointermove", function (e) { if (e.pointerType !== "touch" && sx !== null) lx = e.clientX; });
    hero.addEventListener("pointerup", function (e) { if (e.pointerType !== "touch") swipeEnd(); });
    hero.addEventListener("click", function (e) { if (swiped) { e.preventDefault(); e.stopPropagation(); } }, true);
    sliderCleanup = function () { hero.removeEventListener("animationend", onEnd); };
  }

  function bindItem() {
    var main = document.getElementById("main-photo");
    view.querySelectorAll("[data-thumb]").forEach(function (b) {
      b.addEventListener("click", function () {
        main.src = b.dataset.thumb;
        view.querySelectorAll("[data-thumb]").forEach(function (x) { x.classList.toggle("is-active", x === b); });
      });
    });
  }

  function bindOrder() {
    var form = document.getElementById("order-form");
    var msg = document.getElementById("form-msg");
    var list = document.getElementById("pick-list");

    function setOn(row, on) { row.classList.toggle("is-on", on); row.querySelector("input").checked = on; }
    list.addEventListener("change", function (e) { var row = e.target.closest(".pick"); if (row) setOn(row, e.target.checked); });
    list.addEventListener("click", function (e) {
      var b = e.target.closest("[data-q]"); if (!b) return;
      var out = b.parentElement.querySelector("output");
      out.textContent = Math.max(1, Math.min(20, (+out.textContent || 1) + +b.dataset.q));
    });
    if (orderPrefill) {
      var row = list.querySelector('[data-pick="' + orderPrefill + '"]');
      if (row) { setOn(row, true); setTimeout(function () { row.scrollIntoView({ block: "nearest" }); }, 50); }
      orderPrefill = null;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      msg.hidden = true;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var items = Array.prototype.map.call(list.querySelectorAll(".pick.is-on"), function (row) {
        var p = byId(row.dataset.pick);
        return p.name + " x " + row.querySelector("output").textContent + (p.price ? " (" + p.price + ")" : " (price on request)");
      });
      var v = function (id) { return document.getElementById(id).value.trim(); };
      if (!items.length && !v("o-notes")) {
        msg.textContent = "Choose at least one item, or describe what you'd like in the box below the list.";
        msg.hidden = false; return;
      }
      var data = {
        name: v("o-name"), email: v("o-email"), phone: v("o-phone"),
        shipping_address: [v("o-addr1"), v("o-city"), v("o-state"), v("o-zip"), v("o-country")].filter(Boolean).join(", "),
        items: items.join("\n"), notes: v("o-notes"),
        _subject: "New order request from " + v("o-name"),
        _gotcha: v("o-gotcha")
      };
      var summary = "Name: " + data.name + "\nEmail: " + data.email + (data.phone ? "\nPhone: " + data.phone : "") +
        "\nShip to: " + data.shipping_address + "\n\nItems:\n" + (data.items || "(see notes)") + (data.notes ? "\n\nNotes: " + data.notes : "");

      var endpoint = SITE.orderFormEndpoint;
      if (!endpoint) { done(summary, true); return; }
      var btn = document.getElementById("o-submit");
      btn.disabled = true; btn.textContent = "Sending...";
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(summary, false); })
        .catch(function () {
          btn.disabled = false; btn.textContent = "Send my order request";
          msg.textContent = "Your order request didn't go through. Check your connection and try again, or message me on Instagram.";
          msg.hidden = false;
        });
    });
  }

  function done(summary, preview) {
    var box = document.getElementById("order-box");
    box.innerHTML = '<div class="order form-done" style="background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:clamp(20px,3.5vw,36px)">' +
      '<p class="eyebrow">' + (preview ? "Preview mode" : "Order request sent") + "</p>" +
      "<h2>" + (preview ? "This is what would be sent" : "Thank you! I'll be in touch soon.") + "</h2>" +
      '<p class="muted">' + (preview
        ? "The form isn't connected yet, so nothing was sent. Once the shop owner adds a form address in data/site.js, requests like this are saved and emailed to them."
        : "I'll email you to confirm colours, price, payment and delivery. Here's a copy of your request.") + "</p>" +
      '<div class="summary">' + esc(summary) + "</div>" +
      '<div><a class="btn btn-ghost" href="#products">Keep browsing</a></div></div>';
    box.scrollIntoView({ block: "start" });
  }

  var TITLES = { home: "", products: "Products", learn: "Learn", order: "How to Order", about: "About", contact: "Contact" };

  function route() {
    var h = decodeURIComponent(location.hash.slice(1)) || "home";
    if (h === "view") return;
    if (sliderCleanup) { sliderCleanup(); sliderCleanup = null; }
    var html, title = TITLES[h], navKey = h;
    if (h === "home") html = pageHome();
    else if (h === "products") html = pageProducts(null);
    else if (CATS.some(function (c) { return c.id === h; })) { html = pageProducts(h); title = catLabel(h); }
    else if (h.indexOf("item-") === 0) { var p = byId(h.slice(5)); html = pageItem(h.slice(5)); title = p && p.name; navKey = p && p.category; }
    else if (h === "learn") html = pageLearn();
    else if (h.indexOf("pattern-") === 0) { html = pagePattern(h.slice(8)); navKey = "learn"; title = "Learn"; }
    else if (h === "order") html = pageOrder();
    else if (h === "about") html = pageAbout();
    else if (h === "contact") html = pageContact();
    else html = pageMissing();

    view.innerHTML = html;
    document.title = (title ? title + " · " : "") + (SITE.shopName || "Shop");
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var k = a.dataset.nav;
      a.classList.toggle("is-active", k === navKey || (k === "products" && CATS.some(function (c) { return c.id === navKey; })) || (k === "products" && h === "products"));
    });
    closeMenu();
    if (h === "home") startSlider();
    if (h.indexOf("item-") === 0) bindItem();
    if (h === "order") bindOrder();
    window.scrollTo(0, 0);
  }

  /* ---------- Menu & shell ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");
  function closeMenu() { nav.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", function () {
    var open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open); menuBtn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-order]"); if (o) orderPrefill = o.dataset.order;
    var a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute("href") === location.hash) { e.preventDefault(); route(); }
  });

  document.querySelectorAll("[data-brand]").forEach(function (el) { el.textContent = SITE.shopName || "Shop"; });
  document.querySelectorAll("[data-shop]").forEach(function (el) { el.textContent = SITE.shopName || ""; });
  document.querySelectorAll("[data-tagline]").forEach(function (el) { el.textContent = SITE.tagline || ""; });
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-ig]").forEach(function (el) { el.textContent = SITE.instagramHandle || "Instagram"; el.href = SITE.instagramUrl || "#contact"; });

  window.addEventListener("hashchange", route);
  route();
})();
