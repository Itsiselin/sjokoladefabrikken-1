const chocolateTypes = [
  { id: "milk", name: "Melkesjokolade", detail: "Myk og rund", color: "linear-gradient(135deg, #b27b51, #71472f)", allergens: ["melk", "soya"] },
  { id: "dark", name: "Mørk sjokolade", detail: "Dyp og rik", color: "linear-gradient(135deg, #654132, #321d16)", allergens: ["soya"] },
  { id: "white", name: "Hvit sjokolade", detail: "Søt og silkemyk", color: "linear-gradient(135deg, #f1dfbd, #d5ba90)", allergens: ["melk", "soya"] },
  { id: "pink", name: "Rosa sjokolade", detail: "Fruktig og frisk", color: "linear-gradient(135deg, #db9a98, #ae6467)", allergens: ["melk", "soya"] },
];

const toppings = [
  { id: "chili", name: "Chili", emoji: "🌶️", category: "other", visual: "chili", allergens: null },
  { id: "sea-salt", name: "Havsalt", emoji: "✧", category: "other", visual: "salt", allergens: null },
  { id: "caramel", name: "Karamell", emoji: "🍯", category: "other", visual: "caramel", allergens: null },
  { id: "jelly-men", name: "Seigmenn", emoji: "🧸", category: "candy", visual: "gummy", allergens: null },
  { id: "pick-and-mix", name: "Smågodt", emoji: "🍬", category: "candy", visual: "candy", allergens: null },
  { id: "nonstop", name: "Nonstop", emoji: "🔴", category: "candy", visual: "nonstop", allergens: null },
  { id: "licorice", name: "Lakris", emoji: "🖤", category: "candy", visual: "licorice", allergens: null },
  { id: "nuts", name: "Nøtter", emoji: "🌰", category: "nuts", visual: "nuts", allergens: null },
];

const categories = [
  { id: "all", label: "Alle" },
  { id: "candy", label: "Godteri" },
  { id: "nuts", label: "Nøtter" },
  { id: "other", label: "Annet & knas" },
];

const suggestions = [
  { name: "Søtt møter salt", base: "milk", preference: "salty", toppings: ["caramel", "nuts", "sea-salt"], reason: "Myk melkesjokolade med karamell, nøtter og et lite sting av havsalt." },
  { name: "Leken karamellfest", base: "milk", preference: "sweet", toppings: ["caramel", "nonstop", "jelly-men"], reason: "Rund melkesjokolade med søt karamell og fargerike godteribiter." },
  { name: "Søtt med et lite kick", base: "milk", preference: "bold", toppings: ["chili", "caramel", "licorice"], reason: "Karamell møter lakris og et forsiktig hint av chili." },
  { name: "Karamell med knas", base: "milk", preference: "surprise", toppings: ["caramel", "sea-salt", "pick-and-mix"], reason: "Karamell, havsalt og smågodt gir søtt, salt og knas i samme bit." },
  { name: "Mørk og markant", base: "dark", preference: "bold", toppings: ["chili", "licorice", "sea-salt"], reason: "Mørk sjokolade med chili, lakris og sprøtt havsalt." },
  { name: "Mørk sjokoladefavoritt", base: "dark", preference: "sweet", toppings: ["caramel", "nonstop", "pick-and-mix"], reason: "Dyp sjokolade får en søt og leken kontrast av karamell og godteri." },
  { name: "Dyp søtt og salt", base: "dark", preference: "salty", toppings: ["caramel", "nuts", "sea-salt"], reason: "Karamell og nøtter runder av mørk sjokolade med et lite salt løft." },
  { name: "Uventet mørk miks", base: "dark", preference: "surprise", toppings: ["chili", "caramel", "nonstop"], reason: "Et overraskende møte mellom chili, karamell og fargerik Nonstop." },
  { name: "Godteridryss", base: "white", preference: "sweet", toppings: ["jelly-men", "nonstop", "pick-and-mix"], reason: "Hvit sjokolade med seigmenn, Nonstop og smågodt." },
  { name: "Hvit sjokolade med knas", base: "white", preference: "salty", toppings: ["caramel", "nuts", "sea-salt"], reason: "Søt hvit sjokolade balanseres av karamell, nøtter og havsalt." },
  { name: "Søtt med lakris", base: "white", preference: "bold", toppings: ["licorice", "caramel", "sea-salt"], reason: "Lakris og karamell gir hvit sjokolade en tydelig, salt-søt kontrast." },
  { name: "Leken lakriskontrast", base: "white", preference: "surprise", toppings: ["jelly-men", "caramel", "licorice"], reason: "Seigmenn og karamell møter en liten lakrisoverraskelse." },
  { name: "Rosa godteridrøm", base: "pink", preference: "sweet", toppings: ["caramel", "nonstop", "jelly-men"], reason: "Søt karamell og fargerike biter gjør den rosa platen ekstra leken." },
  { name: "Rosa møter salt", base: "pink", preference: "salty", toppings: ["caramel", "nuts", "sea-salt"], reason: "Karamell, nøtter og havsalt gir en søt-salt kontrast." },
  { name: "Rosa med et kick", base: "pink", preference: "bold", toppings: ["chili", "licorice", "sea-salt"], reason: "Chili, lakris og havsalt gir en uventet kontrast til den rosa basen." },
  { name: "Fargerik overraskelse", base: "pink", preference: "surprise", toppings: ["chili", "nonstop", "caramel"], reason: "En leken miks med et hint av chili, karamell og fargerik Nonstop." },
];

const shapes = [
  { id: "classic", name: "Klassisk", path: "M56 33 Q56 24 65 24 H215 Q224 24 224 33 V177 Q224 186 215 186 H65 Q56 186 56 177 Z" },
  { id: "heart", name: "Hjerte", path: "M140 183 C126 169 66 124 59 83 C50 31 111 19 140 61 C169 19 230 31 221 83 C214 124 154 169 140 183 Z" },
  { id: "round", name: "Rund", path: "M140 22 A82 82 0 1 1 139.9 22 Z" },
];

const state = {
  step: 0,
  base: null,
  toppings: [],
  occasion: "Bare fordi",
  preference: "surprise",
  audience: "adult",
  shape: "classic",
  package: "simple",
  category: "all",
  recommendation: null,
  labelVisible: false,
  labIndex: 0,
  imageUrl: null,
};

const $ = (selector) => document.querySelector(selector);
const chocolateOptions = $("#chocolate-options");
const toppingOptions = $("#topping-options");
const builderError = $("#builder-error");
let toastTimeout;

function renderChocolateOptions() {
  chocolateOptions.innerHTML = chocolateTypes.map((chocolate) => `
    <button class="choice-card ${state.base === chocolate.id ? "is-selected" : ""}" type="button"
      data-chocolate="${chocolate.id}" aria-pressed="${state.base === chocolate.id}">
      <span class="choice-card__check" aria-hidden="true">✓</span>
      <span class="choice-card__swatch" style="background:${chocolate.color}"></span>
      <span class="choice-card__name">${chocolate.name}</span>
      <span class="choice-card__detail">${chocolate.detail}</span>
    </button>
  `).join("");
}

function renderFilters() {
  $("#topping-filters").innerHTML = categories.map((category) => `
    <button class="filter-button ${state.category === category.id ? "is-active" : ""}"
      type="button" data-category="${category.id}" aria-pressed="${state.category === category.id}">
      ${category.label}
    </button>
  `).join("");
}

function renderToppings() {
  const visibleToppings = state.category === "all" ? toppings : toppings.filter((topping) => topping.category === state.category);
  toppingOptions.innerHTML = visibleToppings.map((topping) => {
    const selected = state.toppings.includes(topping.id);
    const allergenText = topping.allergens ? `Inneholder ${topping.allergens.join(", ")}` : "Allergener må bekreftes";
    return `
      <button class="choice-card topping-card ${selected ? "is-selected" : ""}" type="button"
        data-topping="${topping.id}" aria-pressed="${selected}" aria-label="${topping.name}, ${allergenText}">
        <span class="topping-card__emoji" aria-hidden="true">${topping.emoji}</span>
        <span class="topping-card__text">
          <span class="topping-card__name">${topping.name}</span>
          <span class="topping-card__allergen">${allergenText}</span>
        </span>
        <span class="choice-card__check" aria-hidden="true">✓</span>
      </button>
    `;
  }).join("");
  const remaining = 3 - state.toppings.length;
  const hint = $("#topping-hint");
  hint.textContent = state.toppings.length
    ? `${state.toppings.length} av 3 toppinger valgt${remaining ? ` · velg ${remaining} til, eller gå videre` : ""}.`
    : "Velg minst én topping.";
  hint.classList.toggle("is-error", state.toppings.length === 0);
}

function renderShapes() {
  $("#shape-options").innerHTML = shapes.map((shape) => `
    <button class="shape-button ${state.shape === shape.id ? "is-selected" : ""}" type="button"
      data-shape="${shape.id}" aria-pressed="${state.shape === shape.id}">
      <span class="shape-icon ${shape.id === "heart" ? "shape-icon--heart" : shape.id === "round" ? "shape-icon--round" : ""}" aria-hidden="true"></span>
      ${shape.name}
    </button>
  `).join("");
}

function renderPackages() {
  const packages = [
    { id: "simple", icon: "♧", name: "Enkel innpakning", detail: "Fin og trygg · inkludert" },
    { id: "gift", icon: "✧", name: "Gaveeske", detail: "Klar til å gis bort · + 29 kr" },
  ];
  $("#package-options").innerHTML = packages.map((item) => `
    <button class="choice-card package-card ${state.package === item.id ? "is-selected" : ""}" type="button"
      data-package="${item.id}" aria-pressed="${state.package === item.id}">
      <span class="package-card__icon" aria-hidden="true">${item.icon}</span>
      <span class="package-card__copy"><strong>${item.name}</strong><small>${item.detail}</small></span>
      <span class="choice-card__check" aria-hidden="true">✓</span>
    </button>
  `).join("");
}

function drawTopping(topping, index) {
  const palettes = {
    chili: ["#d74838", "#bd372d", "#e15a3e"],
    gummy: ["#df5262", "#f0bf50", "#63a876", "#e58945"],
    candy: ["#e85352", "#efbd46", "#5687bd", "#65a573", "#d27ba1"],
    nonstop: ["#e34937", "#54a96c", "#e8bb39", "#5488c0", "#da6b9b"],
    nuts: ["#c18a51", "#d2a266", "#ae7542"],
  };
  const colors = palettes[topping.visual] || [];
  switch (topping.visual) {
    case "chili":
      return `<path d="M-6 2 C-3 -1 1 -2 5 -5 C5 -1 3 2 -1 4 C-3 5 -5 4 -6 2Z" fill="${colors[index % colors.length]}"/>
        <path d="M3 -3 Q6 -5 6 -7 Q3 -6 2 -4Z" fill="#75804f"/>`;
    case "salt":
      return `<path d="M0 -4 L3 -1 L1 4 L-3 2 L-2 -2 Z" fill="#f3e7d2" stroke="#fff9ed" stroke-width=".8"/>
        <path d="M-1 -1 L1 0" fill="none" stroke="#bfae97" stroke-width=".6"/>`;
    case "caramel":
      return `<path d="M-5 -2 Q-4 -5 0 -3 Q5 -4 5 0 Q4 4 0 3 Q-5 5 -5 -2Z" fill="#d99848"/>
        <path d="M-2 -2 Q0 -3 2 -2" fill="none" stroke="#f4d18e" stroke-width="1" stroke-linecap="round"/>`;
    case "gummy":
      return `<circle cx="0" cy="-2" r="2.4" fill="${colors[index % colors.length]}"/>
        <path d="M-2 -0.5 Q0 -2 2 0 L3 3 L1.5 4 L0.5 2 L-.5 4 L-2 3 L-1 -0.5Z" fill="${colors[index % colors.length]}"/>
        <circle cx="-.7" cy="-2.5" r=".65" fill="#fff6e8" fill-opacity=".72"/>`;
    case "candy":
      if (index % 3 === 0) {
        return `<path d="M-5 0 L-8 -2 L-8 2 Z M5 0 L8 -2 L8 2 Z" fill="#f6db9d"/>
          <rect x="-5" y="-3" width="10" height="6" rx="3" fill="${colors[index % colors.length]}"/>
          <path d="M-2 -1 Q0 -2 2 -1" fill="none" stroke="#fff7e6" stroke-width=".8"/>`;
      }
      return `<path d="M0 -4 L4 0 L0 4 L-4 0 Z" fill="${colors[index % colors.length]}"/>
        <circle cx="-1" cy="-1" r=".8" fill="#fff6e8" fill-opacity=".75"/>`;
    case "nonstop":
      return `<circle r="4.3" fill="${colors[index % colors.length]}" stroke="#f9e6d3" stroke-width=".7"/>
        <ellipse cx="-1.2" cy="-1.4" rx="1.25" ry=".7" transform="rotate(-35 -1.2 -1.4)" fill="#fff6e8" fill-opacity=".72"/>`;
    case "licorice":
      return `<circle r="4.6" fill="#35231f" stroke="#8a5541" stroke-width=".8"/>
        <path d="M2.3 -.5 C2.4 -3.1 -2 -3.2 -2.2 -.7 C-2.4 1.7 1.3 2.5 1.7 .6 C2 -.6 .2 -1.5 -.6 -.4" fill="none" stroke="#c99a73" stroke-width=".85" stroke-linecap="round"/>`;
    case "nuts":
      return `<path d="M-5 0 Q-4 -4 0 -3.3 Q5 -3 5 0 Q4 4 0 3.2 Q-5 3 -5 0Z" fill="${colors[index % colors.length]}" stroke="#e5c193" stroke-width=".65"/>
        <path d="M-1 -2.2 Q1 0 -1 2.1" fill="none" stroke="#8f603c" stroke-width=".75" stroke-linecap="round"/>`;
    default:
      return "";
  }
}

function scatterTopping(topping, toppingIndex) {
  const randomUnit = (seed) => {
    const value = Math.sin(seed * 78.233 + 12.9898) * 43758.5453;
    return value - Math.floor(value);
  };
  return Array.from({ length: 10 }, (_, index) => {
    const seed = toppingIndex * 17 + index;
    const x = 66 + randomUnit(seed + 1) * 150;
    const y = 34 + randomUnit(seed + 101) * 138;
    const rotation = randomUnit(seed + 201) * 360;
    const scale = 0.8 + randomUnit(seed + 301) * 0.35;
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rotation.toFixed(1)}) scale(${scale.toFixed(2)})">${drawTopping(topping, index + toppingIndex)}</g>`;
  }).join("");
}

function updatePreview() {
  const base = chocolateTypes.find((chocolate) => chocolate.id === state.base) || chocolateTypes[0];
  const shape = shapes.find((item) => item.id === state.shape) || shapes[0];
  const barShape = $("#bar-shape");
  barShape.setAttribute("d", shape.path);
  $("#bar-clip-shape").setAttribute("d", shape.path);
  barShape.setAttribute("fill", `url(#chocolate-gradient)`);
  $("#chocolate-gradient stop:first-child").setAttribute("stop-color", base.color.match(/#[\da-f]{6}/gi)?.[0] || "#805033");
  const gradientEnd = base.id === "dark" ? "#321d16" : base.id === "white" ? "#d5ba90" : base.id === "pink" ? "#ae6467" : "#4f2c20";
  $("#chocolate-gradient stop:last-child").setAttribute("stop-color", gradientEnd);
  const pieces = $("#bar-pieces");
  pieces.setAttribute("visibility", state.shape === "classic" ? "visible" : "hidden");
  const selectedToppings = state.toppings
    .map((id) => toppings.find((item) => item.id === id))
    .filter(Boolean);
  const decorations = selectedToppings.map((topping, index) => scatterTopping(topping, index)).join("");
  $("#bar-toppings").innerHTML = decorations;
  const toppingLabel = selectedToppings.map((topping) => topping.name).join(", ");
  $("#chocolate-preview").setAttribute("aria-label", `Forhåndsvisning av ${base.name.toLowerCase()} med ${toppingLabel || "ingen valgte toppinger"} strødd utover platen`);
  const name = $("#chocolate-name").value.trim() || "Din sjokolade";
  $("#bar-name").textContent = name.length > 23 ? `${name.slice(0, 22)}…` : name;
  $("#bar-name").setAttribute("y", state.shape === "round" ? "207" : "207");
  $("#bar-pieces").setAttribute("stroke", base.id === "white" ? "#5e432d" : "#291711");
  updateLabel();
}

function updateLabel() {
  $("#personal-label").hidden = !state.labelVisible;
  $("#personal-label-name").textContent = $("#chocolate-name").value.trim() || "Din sjokolade";
  $("#personal-label-occasion").textContent = state.occasion === "Bare fordi"
    ? "Laget til deg"
    : `Til ${state.occasion.toLowerCase()}`;
}

function allergenList() {
  const base = chocolateTypes.find((chocolate) => chocolate.id === state.base);
  const allergens = new Set(base?.allergens || []);
  state.toppings.forEach((id) => {
    toppings.find((topping) => topping.id === id)?.allergens?.forEach((allergen) => allergens.add(allergen));
  });
  return [...allergens];
}

function updateReview() {
  const base = chocolateTypes.find((chocolate) => chocolate.id === state.base);
  const chosen = state.toppings.map((id) => toppings.find((topping) => topping.id === id)).filter(Boolean);
  const name = $("#chocolate-name").value.trim() || "Din sjokolade";
  $("#review-name").textContent = name;
  $("#review-chips").innerHTML = [
    base?.name,
    ...chosen.map((topping) => topping.name),
    state.shape === "heart" ? "Hjerteform" : state.shape === "round" ? "Rund form" : "Klassisk form",
    state.occasion,
  ].filter(Boolean).map((label) => `<span class="review-chip">${label}</span>`).join("");
  const allergens = allergenList();
  $("#allergen-summary").textContent = allergens.length
    ? `Sjokoladebasen inneholder (eksempel): ${allergens.join(", ")}. Allergener i toppingene er ikke bekreftet.`
    : "Allergeninnholdet i sjokolade og toppinger må bekreftes mot den faktiske varedeklarasjonen.";
  $("#review-card-price").textContent = state.package === "gift" ? "218 kr" : "189 kr";
}

function updateAside() {
  const base = chocolateTypes.find((chocolate) => chocolate.id === state.base);
  const chosen = state.toppings.map((id) => toppings.find((topping) => topping.id === id)?.name).filter(Boolean);
  $("#aside-title").textContent = $("#chocolate-name").value.trim() || (base ? `${base.name} med din vri` : "Her begynner noe godt.");
  $("#aside-description").textContent = chosen.length
    ? `${base?.name || "Sjokolade"} med ${chosen.join(", ").toLowerCase()}.`
    : base ? `${base.name} – velg noen toppinger som passer.` : "Velg en sjokolade, så bygger vi videre sammen.";
}

function updateStep() {
  document.querySelectorAll(".wizard-step").forEach((panel) => {
    const active = Number(panel.dataset.step) === state.step;
    panel.hidden = !active;
    panel.setAttribute("aria-hidden", String(!active));
  });
  $("#progress-fill").style.width = `${((state.step + 1) / 4) * 100}%`;
  $("#progress-label").textContent = `Steg ${state.step + 1} av 4`;
  document.querySelectorAll(".step-dot").forEach((dot, index) => {
    dot.classList.toggle("is-active", index === state.step);
  });
  $("#back-button").hidden = state.step === 0;
  $("#next-button").innerHTML = state.step === 3
    ? 'Fullfør bestilling (demo) <span aria-hidden="true">→</span>'
    : `${["Velg smakene", "Gjør den personlig", "Velg innpakning"][state.step]} <span aria-hidden="true">→</span>`;
  builderError.hidden = true;
  updatePreview();
  updateAside();
  if (state.step === 3) updateReview();
}

function showError(message) {
  builderError.textContent = message;
  builderError.hidden = false;
  builderError.focus?.();
}

function getSuggestion() {
  const base = state.base || chocolateTypes[0].id;
  const options = suggestions.filter((item) => item.base === base);
  const familyFriendly = state.audience === "family" || state.audience === "teen";
  const preferred = options.find((item) => item.preference === state.preference);
  const recommendation = preferred || options[0];
  if (!familyFriendly || !recommendation.toppings.some((id) => ["chili", "licorice"].includes(id))) {
    return recommendation;
  }
  return options.find((item) => !item.toppings.some((id) => ["chili", "licorice"].includes(id))) || recommendation;
}

function showSuggestion() {
  const recommendation = getSuggestion();
  state.recommendation = recommendation;
  $("#suggestion-title").textContent = recommendation.name;
  const audienceNote = state.audience === "family" || state.audience === "teen"
    ? " Tilpasset et mildere smaksuttrykk for den valgte målgruppen."
    : "";
  const occasionNote = state.occasion === "Bare fordi"
    ? ""
    : ` Et lite forslag til ${state.occasion.toLowerCase()}.`;
  $("#suggestion-reason").textContent = `${recommendation.reason}${occasionNote}${audienceNote}`;
  $("#suggestion-toppings").replaceChildren(...recommendation.toppings.map((id) => {
    const topping = toppings.find((item) => item.id === id);
    const chip = document.createElement("span");
    chip.className = "review-chip";
    chip.textContent = topping.name;
    return chip;
  }));
  $("#suggestion-basis").textContent = "Kurert demo-forslag basert på valgene dine — ikke ekte KI eller kjemisk Matinfo-analyse.";
  $("#suggestion").hidden = false;
  $("#apply-suggestion").focus({ preventScroll: true });
}

function applySuggestion() {
  if (!state.recommendation) return;
  state.base = state.recommendation.base;
  state.toppings = [...state.recommendation.toppings];
  state.recommendation = null;
  $("#suggestion").hidden = true;
  renderChocolateOptions();
  renderToppings();
  updatePreview();
  updateAside();
}

function showLabIdeas() {
  const labSelection = [
    suggestions.find((item) => item.base === "dark" && item.preference === "bold"),
    suggestions.find((item) => item.base === "milk" && item.preference === "salty"),
    suggestions.find((item) => item.base === "white" && item.preference === "surprise"),
    suggestions.find((item) => item.base === "pink" && item.preference === "sweet"),
  ];
  const ideas = Array.from({ length: 3 }, (_, index) => labSelection[(state.labIndex + index) % labSelection.length]);
  $("#lab-results-grid").innerHTML = ideas.map((idea) => {
    const baseName = chocolateTypes.find((item) => item.id === idea.base).name;
    const ingredientNames = idea.toppings.map((id) => toppings.find((item) => item.id === id).name).join(" · ");
    return `<article class="lab-idea"><span>${baseName} · ${idea.name}</span><strong>${ingredientNames}</strong><p>${idea.reason}</p></article>`;
  }).join("");
  state.labIndex = (state.labIndex + 1) % labSelection.length;
  $("#lab-results").hidden = false;
  $("#lab-results").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function finishDemoOrder() {
  const gift = state.package === "gift" ? "gaveeske" : "enkel innpakning";
  const toast = $("#toast");
  toast.textContent = `Takk! «${$("#chocolate-name").value.trim() || "Din sjokolade"}» er klar i prototypen med ${gift}. Ingen bestilling er sendt.`;
  toast.hidden = false;
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => { toast.hidden = true; }, 7000);
}

function startDesign() {
  $("#designer").scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => chocolateOptions.querySelector("button")?.focus({ preventScroll: true }), 350);
}

document.querySelectorAll("[data-start]").forEach((button) => button.addEventListener("click", startDesign));
$("#chocolate-options").addEventListener("click", (event) => {
  const button = event.target.closest("[data-chocolate]");
  if (!button) return;
  state.base = button.dataset.chocolate;
  state.recommendation = null;
  $("#suggestion").hidden = true;
  renderChocolateOptions();
  updatePreview();
  updateAside();
});
$("#occasion").addEventListener("change", (event) => {
  state.occasion = event.target.value;
  updateLabel();
  if (state.step === 3) updateReview();
});
$("#taste-preference").addEventListener("change", (event) => {
  state.preference = event.target.value;
  state.recommendation = null;
  $("#suggestion").hidden = true;
});
$("#gift-audience").addEventListener("change", (event) => {
  state.audience = event.target.value;
  state.recommendation = null;
  $("#suggestion").hidden = true;
});
$("#topping-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderFilters();
  renderToppings();
});
$("#topping-options").addEventListener("click", (event) => {
  const button = event.target.closest("[data-topping]");
  if (!button) return;
  const id = button.dataset.topping;
  if (state.toppings.includes(id)) {
    state.toppings = state.toppings.filter((item) => item !== id);
  } else if (state.toppings.length < 3) {
    state.toppings.push(id);
  } else {
    $("#topping-hint").textContent = "Du har valgt tre toppinger. Fjern en hvis du vil prøve en annen.";
    $("#topping-hint").classList.add("is-error");
    return;
  }
  state.recommendation = null;
  $("#suggestion").hidden = true;
  renderToppings();
  updatePreview();
  updateAside();
});
$("#suggest-button").addEventListener("click", showSuggestion);
$("#apply-suggestion").addEventListener("click", applySuggestion);
$("#lab-button").addEventListener("click", showLabIdeas);
$("#generate-label").addEventListener("click", () => {
  state.labelVisible = true;
  updateLabel();
});
$("#shape-options").addEventListener("click", (event) => {
  const button = event.target.closest("[data-shape]");
  if (!button) return;
  state.shape = button.dataset.shape;
  renderShapes();
  updatePreview();
});
$("#package-options").addEventListener("click", (event) => {
  const button = event.target.closest("[data-package]");
  if (!button) return;
  state.package = button.dataset.package;
  renderPackages();
  updateReview();
});
$("#chocolate-name").addEventListener("input", (event) => {
  $("#name-count").textContent = String(event.target.value.length);
  updatePreview();
  updateAside();
  if (state.step === 3) updateReview();
});
$("#image-upload").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showError("Velg en bildefil for å bruke den i forhåndsvisningen.");
    event.target.value = "";
    return;
  }
  if (state.imageUrl) URL.revokeObjectURL(state.imageUrl);
  state.imageUrl = URL.createObjectURL(file);
  $("#preview-image").src = state.imageUrl;
  $("#preview-image").hidden = false;
  $("#remove-image").hidden = false;
  builderError.hidden = true;
});
$("#remove-image").addEventListener("click", () => {
  if (state.imageUrl) URL.revokeObjectURL(state.imageUrl);
  state.imageUrl = null;
  $("#preview-image").removeAttribute("src");
  $("#preview-image").hidden = true;
  $("#remove-image").hidden = true;
  $("#image-upload").value = "";
});
$("#back-button").addEventListener("click", () => {
  state.step = Math.max(0, state.step - 1);
  updateStep();
});
$("#next-button").addEventListener("click", () => {
  builderError.hidden = true;
  if (state.step === 0 && !state.base) {
    showError("Velg en sjokoladetype før du går videre.");
    return;
  }
  if (state.step === 1 && state.toppings.length === 0) {
    showError("Velg minst én topping, eller spør Sjokoladeprofessoren om et forslag.");
    return;
  }
  if (state.step === 3) {
    if (!$("#confirm-allergens").checked) {
      showError("Bekreft at du har lest allergenoversikten før du fortsetter.");
      return;
    }
    finishDemoOrder();
    return;
  }
  state.step += 1;
  updateStep();
});

renderChocolateOptions();
renderFilters();
renderToppings();
renderShapes();
renderPackages();
updateStep();
