const chocolates = {
  milk: { name: "Melkesjokolade", colors: ["#865238", "#3d2217", "#633b28"] },
  dark: { name: "Mørk sjokolade", colors: ["#4c3026", "#20130f", "#382118"] },
  white: { name: "Hvit sjokolade", colors: ["#ead8b2", "#bda077", "#d3b98c"] },
};

const toppings = [
  { name: "Nonstop", category: "Søtt", note: "Eks.: Melk, soya", color: "#cb4b42", shape: "candy" },
  { name: "Seigmenn", category: "Søtt", paid: true, color: "#e5aa54", shape: "gummy" },
  { name: "Salt lakris", category: "Salt", note: "Eks.: Hvete", color: "#382828", shape: "licorice" },
  { name: "Myk karamell", category: "Søtt", note: "Eks.: Melk", color: "#aa7047", shape: "caramel" },
  { name: "Bringebærbiter", category: "Fruktig", paid: true, color: "#b7395f", shape: "raspberry" },
  { name: "Havsalt", category: "Salt", paid: true, color: "#f0e5c8", shape: "salt" },
  { name: "Mini-marshmallows", category: "Søtt", paid: true, color: "#e9c2c8", shape: "marshmallow" },
  { name: "Kjeksbiter", category: "Sprøtt", note: "Eks.: Hvete, melk", color: "#ad805c", shape: "cookie" },
  { name: "Salte kringler", category: "Salt", note: "Eks.: Hvete", color: "#865537", shape: "pretzel" },
  { name: "Surt eple", category: "Syrlig", paid: true, color: "#86a65c", shape: "apple" },
  { name: "Sure jordbær", category: "Syrlig", paid: true, color: "#d85d69", shape: "strawberry" },
  { name: "Sitronbiter", category: "Syrlig", paid: true, color: "#e8d75c", shape: "lemon" },
  { name: "Jordbærbiter", category: "Fruktig", paid: true, color: "#ce6271", shape: "strawberry-piece" },
  { name: "Appelsinskall", category: "Fruktig", paid: true, color: "#e78a3b", shape: "orange" },
  { name: "Krokankrønsj", category: "Sprøtt", note: "Eks.: Mandler, melk", color: "#b1814e", shape: "brittle" },
  { name: "Hasselnøtter", category: "Sprøtt", note: "Eks.: Hasselnøtter", color: "#95643d", shape: "hazelnut" },
  { name: "Marsipanbiter", category: "Søtt", note: "Eks.: Mandler", color: "#d4ad83", shape: "marzipan" },
  { name: "Vaniljefudge", category: "Søtt", note: "Eks.: Melk", color: "#e5cba1", shape: "fudge" },
  { name: "Surt colagodteri", category: "Syrlig", paid: true, color: "#6e4850", shape: "cola" },
  { name: "Chiliflak", category: "Sterkt", paid: true, color: "#ba3c30", shape: "chili" },
  { name: "Salt karamell", category: "Salt", note: "Eks.: Melk", color: "#bd8151", shape: "salted-caramel" },
];

const state = {
  chocolate: "milk",
  selectedToppings: new Set(),
  filter: "Alle",
  query: "",
  imageUrl: null,
  imageProcessing: false,
  sourceFile: null,
  focusX: 0.5,
  focusY: 0.5,
  backgroundSoftness: 0.8,
  decoration: 'none',
  side: 'front',
  text: '',
  font: 'classic',
};

const $ = (selector) => document.querySelector(selector);
const toppingGrid = $("#topping-options");
let toastTimeout;
let imageJob = 0;


function createToppingShape(topping, preview = false) {
  const shape = document.createElement("span");
  shape.className = `topping-shape topping-shape--${topping.shape}${preview ? " topping-shape--preview" : ""}`;
  shape.style.setProperty("--topping-color", topping.color);
  shape.setAttribute("aria-hidden", "true");
  const piece = document.createElement("span");
  piece.className = "topping-shape__piece";
  shape.append(piece);
  return shape;
}

function renderToppings() {
  const query = state.query.trim().toLocaleLowerCase("nb");
  const visible = toppings.filter((topping) => {
    const matchesFilter = state.filter === "Alle" || topping.category === state.filter;
    const matchesQuery = !query || topping.name.toLocaleLowerCase("nb").includes(query);
    return matchesFilter && matchesQuery;
  });

  toppingGrid.replaceChildren(...visible.map((topping) => {
    const selected = state.selectedToppings.has(topping.name);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `topping-option${selected ? " selected" : ""}`;
    button.setAttribute("aria-pressed", String(selected));
    button.disabled = !selected && state.selectedToppings.size >= 6;

    const name = document.createElement("span");
    name.className = "topping-name";
    name.textContent = topping.name;

    const note = document.createElement("span");
    note.className = "topping-note";
    note.textContent = topping.note || (topping.paid ? "+ 9 kr" : "");

    button.append(createToppingShape(topping), name, note);
    button.addEventListener("click", () => toggleTopping(topping.name));
    return button;
  }));
  updateSelection();
}

function toggleTopping(name) {
  if (state.selectedToppings.has(name)) {
    state.selectedToppings.delete(name);
  } else if (state.selectedToppings.size < 6) {
    state.selectedToppings.add(name);
  } else {
    showToast("Du kan velge opptil 6 typer smågodt.");
    return;
  }
  renderToppings();
  updatePreview();
}

function updateSelection() {
  const selected = [...state.selectedToppings];
  $("#selection-count").textContent = `${selected.length} av 6 valgt${selected.length ? ` · ${selected.join(", ")}` : ""}`;
}

function updatePreview() {
  const chocolate = chocolates[state.chocolate];
  const [light, dark, piece] = chocolate.colors;
  const bar = $("#chocolate-bar");
  bar.style.setProperty("--bar-light", light);
  bar.style.setProperty("--bar-dark", dark);
  bar.style.setProperty("--piece-light", light);
  bar.style.setProperty("--piece-dark", piece);
  bar.setAttribute("aria-label", `${chocolate.name}plate`);
  $("#preview-chocolate").textContent = chocolate.name;

  const selected = toppings.filter((topping) => state.selectedToppings.has(topping.name));
  $("#preview-toppings").textContent = selected.length
    ? selected.map((topping) => topping.name).join(" · ")
    : "Uten topping";

  const pieces = selected.flatMap((topping, toppingIndex) =>
    Array.from({ length: 4 }, (_, index) => {
      const piece = createToppingShape(topping, true);
      piece.style.left = `${8 + ((index * 23 + toppingIndex * 17) % 82)}%`;
      piece.style.top = `${8 + ((index * 31 + toppingIndex * 19) % 80)}%`;
      piece.style.setProperty("--piece-rotation", `${(index * 37 + toppingIndex * 23) % 360}deg`);
      return piece;
    }));
  $("#bar-toppings").replaceChildren(...pieces);

  const paidToppings = selected.filter((topping) => topping.paid).length;
  const hasImage = state.decoration === "image" && Boolean(state.imageUrl);
  bar.classList.toggle("show-back", state.side === "back");
  document.querySelectorAll("[data-side]").forEach((button) => {
    const selected = button.dataset.side === state.side;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  $("#side-note").textContent = state.side === "back"
    ? "Glatt bakside med toppingen du har valgt."
    : "Forsiden med bilde eller skrift som opphøyd sjokoladerelieff.";
  bar.setAttribute("aria-label", `${chocolate.name}plate, ${state.side === "back" ? "bakside" : "forside"}`);
  renderRelief();
  const imageFee = hasImage ? 29 : 0;
  $("#preview-price").textContent = `${179 + paidToppings * 9 + imageFee} kr`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => { toast.hidden = true; }, 5000);
}

function appendChatMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `chat-message chat-message--${sender}`;
  const label = document.createElement("strong");
  label.textContent = sender === "user" ? "Du" : "Smaksprofessoren";
  const body = document.createElement("p");
  body.textContent = text;
  message.append(label, body);
  $("#chat-log").append(message);
  message.scrollIntoView({ block: "nearest" });
}

function suggestCombination(prompt) {
  const isNew = prompt === "nytt";
  const combo = isNew
    ? { chocolate: "dark", toppings: ["Bringebærbiter", "Havsalt", "Chiliflak"], message: "Prøv mørk sjokolade med bringebærbiter, havsalt og et lite sting av chili. Vil du prøve kombinasjonen?" }
    : { chocolate: "milk", toppings: ["Myk karamell", "Havsalt", "Krokankrønsj"], message: "Til en gave foreslår jeg melkesjokolade med karamell, havsalt og krokankrønsj. Vil du prøve kombinasjonen?" };
  state.pendingSuggestion = combo;
  appendChatMessage(combo.message, "professor");

  const apply = document.createElement("button");
  apply.type = "button";
  apply.className = "apply-suggestion";
  apply.textContent = "Prøv på platen";
  apply.addEventListener("click", () => {
    state.chocolate = combo.chocolate;
    state.selectedToppings = new Set(combo.toppings);
    document.querySelectorAll("[data-chocolate]").forEach((button) => {
      const selected = button.dataset.chocolate === state.chocolate;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    renderToppings();
    updatePreview();
    appendChatMessage("Forslaget er lagt til på platen din.", "professor");
    apply.remove();
  });
  const wrapper = document.createElement("div");
  wrapper.className = "chat-message chat-message--professor";
  wrapper.append(apply);
  $("#chat-log").append(wrapper);
}

document.querySelectorAll("[data-chocolate]").forEach((button) => {
  button.addEventListener("click", () => {
    state.chocolate = button.dataset.chocolate;
    document.querySelectorAll("[data-chocolate]").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
    updatePreview();
  });
});

$("#topping-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((filter) => {
    const selected = filter === button;
    filter.classList.toggle("selected", selected);
    filter.setAttribute("aria-pressed", String(selected));
  });
  renderToppings();
});

$("#topping-search").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderToppings();
});

document.querySelectorAll("[data-side]").forEach((button) => {
  button.addEventListener("click", () => {
    state.side = button.dataset.side;
    updatePreview();
  });
});

document.querySelectorAll("[data-decoration]").forEach((button) => {
  button.addEventListener("click", () => {
    state.decoration = button.dataset.decoration;
    if (state.decoration !== "none") state.side = "front";
    document.querySelectorAll("[data-decoration]").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
    $("#image-fields").hidden = state.decoration !== "image";
    $("#text-fields").hidden = state.decoration !== "text";
    updatePreview();
  });
});
$("#decoration-text").addEventListener("input", (event) => {
  state.text = event.target.value;
  updatePreview();
});
$("#decoration-font").addEventListener("change", (event) => {
  state.font = event.target.value;
  updatePreview();
});
$("#bar-image").addEventListener("load", updatePreview);
$("#image-upload").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) return;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    showToast("Velg et JPG-, PNG- eller WebP-bilde.");
    event.target.value = "";
    return;
  }
  void prepareImage(file);
});


$("#retry-image").addEventListener("click", () => {
  if (state.sourceFile) void prepareImage(state.sourceFile);
});

$("#remove-image").addEventListener("click", () => {
  imageJob++;
  if (state.imageUrl) URL.revokeObjectURL(state.imageUrl);
  state.imageUrl = null;
  state.sourceFile = null;
  state.imageProcessing = false;
  $("#bar-image").removeAttribute("src");
  $("#bar-image").hidden = true;
  $("#remove-image").hidden = true;
  $("#retry-image").hidden = true;
  $("#image-status").textContent = "";
  $("#image-fields").setAttribute("aria-busy", "false");
  $("#image-upload").value = "";
  updatePreview();
});
$("#professor-toggle").addEventListener("click", () => {
  const panel = $("#professor-panel");
  panel.hidden = !panel.hidden;
  $("#professor-toggle").setAttribute("aria-expanded", String(!panel.hidden));
});

$("#close-professor").addEventListener("click", () => {
  $("#professor-panel").hidden = true;
  $("#professor-toggle").setAttribute("aria-expanded", "false");
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => suggestCombination(button.dataset.prompt));
});

$("#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("#chat-input");
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  appendChatMessage(text, "user");
  input.value = "";
  const answer = /mørk/i.test(text)
    ? "Mørk sjokolade passer godt med bringebær, havsalt eller litt chili. Velg en kombinasjon, eller bruk forslaget mitt."
    : "Karamell, havsalt og litt sprøtt er en god kombinasjon. Prøv en av knappene over for å legge et forslag på platen.";
  appendChatMessage(answer, "professor");
});

$("#order-button").addEventListener("click", () => {
  showToast("Dette er en prototype, så ingen bestilling blir sendt.");
});

renderToppings();
updatePreview();

// Real height-field geometry: image pixels set vertex height, never surface color.
// This is a relief preview, not a dimensioned or validated manufacturing mold.
function buildTextRelief(pixels, w, h) {
  // Solid lettering has its own extrusion: 3.5 mm, independent of photo settings.
  const height=3.5*1.94/160;
  const tones=new Float32Array(w*h);
  const mask=new Float32Array(w*h);
  const distance=new Float32Array(w*h);
  for(let i=0;i<w*h;i++) {
    mask[i]=pixels[i*4+3]/255;
    distance[i]=mask[i]>0.05 ? w+h : 0;
    tones[i]=1;
  }
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) {
    const i=y*w+x;
    if(x>0) distance[i]=Math.min(distance[i],distance[i-1]+1);
    if(y>0) distance[i]=Math.min(distance[i],distance[i-w]+1);
  }
  for(let y=h-1;y>=0;y--) for(let x=w-1;x>=0;x--) {
    const i=y*w+x;
    if(x<w-1) distance[i]=Math.min(distance[i],distance[i+1]+1);
    if(y<h-1) distance[i]=Math.min(distance[i],distance[i+w]+1);
  }
  const heights=new Float32Array(w*h);
  for(let i=0;i<w*h;i++) {
    const edge=Math.min(1,distance[i]/2);
    const bevel=edge*edge*(3-2*edge);
    heights[i]=height*mask[i]*bevel;
  }
  return {heights,tones};
}

function buildImageRelief(pixels, w, h, settings) {
  const tones = new Float32Array(w*h);
  const alpha = new Float32Array(w*h);
  // Stretch the useful tonal range without letting isolated black/white pixels dominate.
  const histogram = new Uint32Array(256);
  for (let i=0; i<w*h; i++) {
    alpha[i] = pixels[i*4+3]/255;
    tones[i] = (pixels[i*4]*0.2126+pixels[i*4+1]*0.7152+pixels[i*4+2]*0.0722)/255;
    if (alpha[i] > 0.5) histogram[Math.round(tones[i]*255)]++;
  }
  const count = histogram.reduce((a,b)=>a+b,0);
  const percentile = (fraction) => {
    let sum=0;
    for(let i=0;i<256;i++) { sum+=histogram[i]; if(sum>count*fraction) return i/255; }
    return 1;
  };
  const low=percentile(0.02), range=Math.max(0.15,percentile(0.98)-low);
  // Two fast box blurs keep the focus readable while suppressing busy backgrounds.
  // Integral images make each blur linear in pixel count, regardless of radius.
  let softened=tones.slice();

  {
    const stride=w+1;
    const sums=new Float64Array((w+1)*(h+1));
    const weights=new Float64Array(sums.length);
    for(let y=0;y<h;y++) {
      let rowSum=0,rowWeight=0;
      for(let x=0;x<w;x++) {
        const i=y*w+x, p=(y+1)*stride+x+1;
        rowSum+=tones[i]*alpha[i]; rowWeight+=alpha[i];
        sums[p]=sums[p-stride]+rowSum;
        weights[p]=weights[p-stride]+rowWeight;
      }
    }
    const average=(x,y,radius)=>{
      const x0=Math.max(0,x-radius),x1=Math.min(w,x+radius+1);
      const y0=Math.max(0,y-radius),y1=Math.min(h,y+radius+1);
      const a=y0*stride+x0,b=y0*stride+x1,c=y1*stride+x0,d=y1*stride+x1;
      const weight=weights[d]-weights[b]-weights[c]+weights[a];
      return weight>0 ? (sums[d]-sums[b]-sums[c]+sums[a])/weight : 0;
    };
    for(let y=0;y<h;y++) for(let x=0;x<w;x++) {
      const dx=(x/w-settings.focusX)/0.3,dy=(y/h-settings.focusY)/0.4;
      const focus=Math.exp(-(dx*dx+dy*dy)*1.5);
      const blend=settings.backgroundSoftness*(1-focus);
      const fine=average(x,y,1),soft=average(x,y,8);
      softened[y*w+x]=fine*(1-blend)+soft*blend;

    }
  }
  // Distance to the transparent cutout edge rounds the raised silhouette into the bar.
  const distance=new Float32Array(w*h);
  for(let i=0;i<w*h;i++) distance[i]=alpha[i]>0.12 ? w+h : 0;
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) {
    const i=y*w+x;
    if(x>0) distance[i]=Math.min(distance[i],distance[i-1]+1);
    if(y>0) distance[i]=Math.min(distance[i],distance[i-w]+1);
  }
  for(let y=h-1;y>=0;y--) for(let x=w-1;x>=0;x--) {
    const i=y*w+x;
    if(x<w-1) distance[i]=Math.min(distance[i],distance[i+1]+1);
    if(y<h-1) distance[i]=Math.min(distance[i],distance[i+w]+1);
  }
  // Millimetres use a 160 mm reference width for this preview, not a print export.
  const mmToPreview=1.94/160;
  const raisedBaseMm=0.5;
  const detailHeightMm=9;
  const ramp=(value,start,end)=>{
    const t=Math.max(0,Math.min(1,(value-start)/(end-start)));
    return t*t*(3-2*t);
  };
  const blendWidthPx=Math.max(8,Math.min(w,h)*0.10);
  let heights = new Float32Array(w*h);
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) {
    const i=y*w+x;
    const tone=Math.max(0,Math.min(1,(softened[i]-low)/range));
    tones[i]=tone;
    // Continuous relief with extra height to show the raised chocolate motif.
    const toBoundary=Math.min(x,y,w-1-x,h-1-y);
    const edge=Math.min(1,Math.min(distance[i],toBoundary)/blendWidthPx);
    // A broad transition with zero slope and curvature at both ends joins the bar.
    const roundedEdge=edge*edge*edge*(edge*(edge*6-15)+10);
    // Every opaque image detail starts 0.5 mm ABOVE the bar, with only positive added height.
    // Three overlapping rounded levels progressively add material above the base.
    const buildup= (ramp(tone,0.02,0.42)+ramp(tone,0.28,0.72)+ramp(tone,0.58,0.98))/3;
    const heightMm=raisedBaseMm+buildup*detailHeightMm;
    heights[i]=alpha[i]>0.12 ? alpha[i]*roundedEdge*heightMm*mmToPreview : 0;
  }
  // Round the actual surface, not just its lighting. A separable Gaussian keeps
  // antialiased letter contours and photo edges from turning into little steps.
  const horizontal=new Float32Array(w*h);
  const rounded=new Float32Array(w*h);
  const kernel=[0,1,6,1,0];
  const kernelWeight=8;
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) {
    let sum=0;
    for(let k=-2;k<=2;k++) sum+=heights[y*w+Math.max(0,Math.min(w-1,x+k))]*kernel[k+2];
    horizontal[y*w+x]=sum/kernelWeight;
  }
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) {
    let sum=0;
    for(let k=-2;k<=2;k++) sum+=horizontal[Math.max(0,Math.min(h-1,y+k))*w+x]*kernel[k+2];
    rounded[y*w+x]=(x===0 || y===0 || x===w-1 || y===h-1) ? 0 : sum/kernelWeight;
  }
  heights=rounded;
  return {heights,tones};
}

function renderRelief() {
  const canvas = $("#bar-relief");
  const image = $("#bar-image");
  image.hidden = true;
  const isText = state.decoration === "text" && state.text.trim();
  const isImage = state.decoration === "image" && state.imageUrl && !state.imageProcessing && image.complete && image.naturalWidth;
  canvas.hidden = state.side !== "front" || (!isText && !isImage);
  if (canvas.hidden) return;
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
  if (!gl) {
    canvas.hidden = true;
    showToast("Nettleseren må støtte WebGL for å vise sjokoladerelieffet.");
    return;
  }
  if (!canvas.reliefProgram) {
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    };
    const program = gl.createProgram();
    const shaders = [
      compile(gl.VERTEX_SHADER, `attribute vec3 position; attribute vec3 normal; attribute vec2 detail;
        varying vec3 n; varying vec2 surface;
        void main(){ n=normal; surface=detail;
          gl_Position=vec4(position.x+position.z*0.10, position.y+position.z*0.55, -position.z, 1.0); }`),
      compile(gl.FRAGMENT_SHADER, `precision highp float; varying vec3 n; varying vec2 surface; uniform vec3 chocolate;
        void main(){
          vec3 N=normalize(n);
          vec3 L=normalize(vec3(-0.55,0.8,1.4));
          float diffuse=max(dot(N,L),0.0);
          float sheen=pow(max(dot(N,normalize(L+vec3(0.0,0.0,1.0))),0.0),24.0);
          float crest=1.0+clamp(surface.y,0.0,0.12);
          float fineDetail=1.0;
          float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
          vec3 material=chocolate*(0.40+0.60*diffuse)*crest*fineDetail*(0.994+grain*0.012);
          gl_FragColor=vec4(material+vec3(0.085,0.071,0.055)*sheen,1.0);
        }`)
    ];
    shaders.forEach(shader => gl.attachShader(program, shader));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    shaders.forEach(shader => gl.deleteShader(shader));
    canvas.reliefProgram = program;
    canvas.reliefBuffer = gl.createBuffer();
  }
  const reliefKey = isText ? `text:${state.font}:${state.text}` : `${state.imageUrl}:${state.focusX}:${state.focusY}:${state.backgroundSoftness}`;
  if (canvas.reliefKey !== reliefKey) {
  const w = 640, h = 360;
  const source = document.createElement("canvas");
  source.width = w; source.height = h;
  const ctx = source.getContext("2d", { willReadFrequently: true });
  let imageWidth = w - 8, imageHeight = h - 8;
  if (isImage) {
    const scale = Math.min(imageWidth / image.naturalWidth, imageHeight / image.naturalHeight);
    imageWidth = image.naturalWidth * scale;
    imageHeight = image.naturalHeight * scale;
    ctx.drawImage(image, (w-imageWidth)/2, (h-imageHeight)/2, imageWidth, imageHeight);
  } else {
    const family = state.font === "handwriting" ? "cursive" : state.font === "modern" ? "sans-serif" : "serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    let size = 100;
    do { ctx.font = `bold ${size--}px ${family}`; } while (ctx.measureText(state.text).width > w - 18 && size > 5);
    ctx.fillText(state.text, w/2, h/2);
  }
  const pixels = ctx.getImageData(0, 0, w, h).data;
  const {heights,tones}=isText
    ? buildTextRelief(pixels,w,h)
    : buildImageRelief(pixels,w,h,state);
  const vertices = new Float32Array((w-1)*(h-1)*6*8);
  let vertexOffset=0;
  const emit = (x,y) => {
    const z = heights[y*w+x];
    const dx = (heights[y*w+Math.min(w-1,x+2)]-heights[y*w+Math.max(0,x-2)]) * w / 8;
    const dy = (heights[Math.min(h-1,y+2)*w+x]-heights[Math.max(0,y-2)*w+x]) * h / 8;
    const neighbor=(heights[y*w+Math.max(0,x-2)]+heights[y*w+Math.min(w-1,x+2)]+heights[Math.max(0,y-2)*w+x]+heights[Math.min(h-1,y+2)*w+x])/4;
    const cavity=(z-neighbor)*24;
    vertices[vertexOffset++]=x/(w-1)*1.94-0.97;
    vertices[vertexOffset++]=0.94-y/(h-1)*1.88;
    vertices[vertexOffset++]=z;
    vertices[vertexOffset++]=-dx;
    vertices[vertexOffset++]=dy;
    vertices[vertexOffset++]=1;
    vertices[vertexOffset++]=tones[y*w+x];
    vertices[vertexOffset++]=cavity;
  };
  for(let y=0;y<h-1;y++) for(let x=0;x<w-1;x++) {
    if (!heights[y*w+x] && !heights[y*w+x+1] && !heights[(y+1)*w+x] && !heights[(y+1)*w+x+1]) continue;
    emit(x,y); emit(x+1,y); emit(x,y+1);
    emit(x+1,y); emit(x+1,y+1); emit(x,y+1);
  }
  gl.bindBuffer(gl.ARRAY_BUFFER,canvas.reliefBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,vertices.subarray(0,vertexOffset),gl.STATIC_DRAW);
  canvas.reliefVertexCount=vertexOffset/8;
  canvas.reliefKey=reliefKey;
  }
  const program = canvas.reliefProgram;
  gl.viewport(0,0,canvas.width,canvas.height);
  gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST); gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER,canvas.reliefBuffer);
  for (const [name,offset] of [["position",0],["normal",12],["detail",24]]) {
    const location = gl.getAttribLocation(program,name);
    gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location,name === "detail" ? 2 : 3,gl.FLOAT,false,32,offset);
  }
  const color = chocolates[state.chocolate].colors[0];
  gl.uniform3f(gl.getUniformLocation(program,"chocolate"), ...[1,3,5].map(i=>parseInt(color.slice(i,i+2),16)/255));
  gl.drawArrays(gl.TRIANGLES,0,canvas.reliefVertexCount);
}

async function prepareImage(file) {
  const job=++imageJob;
  state.sourceFile=file;
  state.imageProcessing=true;
  state.focusX=0.5; state.focusY=0.5;
  if(state.imageUrl) URL.revokeObjectURL(state.imageUrl);
  state.imageUrl=null;
  $("#bar-image").removeAttribute("src");
  $("#remove-image").hidden=false;
  $("#retry-image").hidden=true;
  $("#image-fields").setAttribute("aria-busy","true");
  const status=$("#image-status");
  status.textContent="Lager sjokoladerelieff med mykere bakgrunn …";
  updatePreview();
  try {
    const url=URL.createObjectURL(file);
    state.imageUrl=url;
    const image=$("#bar-image");
    image.src=url;
    await image.decode();
    if(job!==imageJob) return;
    status.textContent="Relieffet starter på 0,5 mm og øker med 3 mm per nivå, opptil 9,5 mm.";
  } catch(error) {
    if(job!==imageJob) return;
    if(state.imageUrl) URL.revokeObjectURL(state.imageUrl);
    state.imageUrl=null;
    $("#bar-image").removeAttribute("src");
    status.textContent="Bildet kunne ikke leses. Velg et annet bilde eller prøv igjen.";
    $("#retry-image").hidden=false;
  } finally {
    if(job===imageJob) {
      state.imageProcessing=false;
      $("#image-fields").setAttribute("aria-busy","false");
      updatePreview();
    }
  }
}
