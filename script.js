const names = [
  "Maxime Lanthier",
  "PA Valentin",
  "Gatien Butez",
  "Vianney Watine",
  "Martin Jacob",
  "Edouard Roussel",
  "Sebastien Bonduelle",
  "Quentin Ibled",
  "Cedric Boyer",
  "Quentin Mulliez",
  "Mathieu Dubus",
  "Arnault Lorthios",
  "Barnabe Fromentin",
  "TIm Couvreur",
  "Morgan Delassus",
  "Hugues Bourbotte",
];

const world = document.getElementById("world");
const charactersLayer = document.getElementById("characters");
const selectionList = document.getElementById("selectionList");
const level2 = document.getElementById("level2");
const transition = document.getElementById("transition");
const playerName = document.getElementById("playerName");
const backToLevel1 = document.getElementById("backToLevel1");
const druidBox = document.getElementById("druidBox");
const playerBox = document.getElementById("playerBox");
const chatChoices = document.getElementById("chatChoices");
const chatProgress = document.getElementById("chatProgress");
const levelCta = document.getElementById("levelCta");
const goLevel2 = document.getElementById("goLevel2");
const levelCtaText = document.getElementById("levelCtaText");
const level3 = document.getElementById("level3");
const backToLevel2 = document.getElementById("backToLevel2");
const confirmRecap = document.getElementById("confirmRecap");
const recapGrid = document.getElementById("recapGrid");
const recapTitle = document.getElementById("recapTitle");
const toggleAdmin = document.getElementById("toggleAdmin");
const adminBox = document.getElementById("adminBox");
const adminList = document.getElementById("adminList");
const copyResponses = document.getElementById("copyResponses");
const resetPersonSelect = document.getElementById("resetPersonSelect");
const resetPerson = document.getElementById("resetPerson");

const weekGroups = [
  {
    label: "Juin",
    weeks: [
      { label: "Semaine 1 (29 juin - 5 juil.)", value: "2026-06-29_2026-07-05" },
    ],
  },
  {
    label: "Juillet",
    weeks: [
      { label: "Semaine 2 (6 - 12 juil.)", value: "2026-07-06_2026-07-12" },
      { label: "Semaine 3 (13 - 19 juil.)", value: "2026-07-13_2026-07-19" },
      { label: "Semaine 4 (20 - 26 juil.)", value: "2026-07-20_2026-07-26" },
      { label: "Semaine 5 (27 juil. - 2 aout)", value: "2026-07-27_2026-08-02" },
    ],
  },
  {
    label: "Aout",
    weeks: [
      { label: "Semaine 6 (3 - 9 aout)", value: "2026-08-03_2026-08-09" },
      { label: "Semaine 7 (10 - 16 aout)", value: "2026-08-10_2026-08-16" },
      { label: "Semaine 8 (17 - 23 aout)", value: "2026-08-17_2026-08-23" },
      { label: "Semaine 9 (24 - 30 aout)", value: "2026-08-24_2026-08-30" },
    ],
  },
  {
    label: "Septembre",
    weeks: [
      { label: "Semaine 10 (31 aout - 6 sept.)", value: "2026-08-31_2026-09-06" },
    ],
  },
];

const conversationSteps = [
  {
    id: "interest",
    type: "multi",
    druid: "Salut ! Tu serais chaud pour des vacances entre potes cet ete ?",
    choices: [
      { label: "Oui", value: "oui" },
      { label: "Peut-etre", value: "peut-etre" },
      { label: "Non", value: "non" },
    ],
  },
  {
    id: "crewType",
    type: "multi",
    druid: "Tu voyages plutot comment ?",
    choices: [
      { label: "Entre potes", value: "potes" },
      { label: "Entre adultes", value: "adultes" },
      { label: "En famille", value: "famille" },
    ],
  },
  {
    id: "companions",
    type: "form",
    druid: "Combien de personnes viendraient avec toi ?",
  },
  {
    id: "weeksPossible",
    type: "weeks",
    druid: "Quelles semaines te vont bien ?",
  },
  {
    id: "duration",
    type: "multi",
    druid: "Tu preferes partir combien de temps ?",
    choices: [
      { label: "3-4 jours", value: "3-4" },
      { label: "5-7 jours", value: "5-7" },
      { label: "7-10 jours", value: "7-10" },
    ],
  },
  {
    id: "format",
    type: "multi",
    druid: "Quel format te tente le plus ?",
    choices: [
      { label: "Grande maison tous ensemble", value: "maison" },
      { label: "Logements proches (chacun son logement, mais cote a cote)", value: "proches" },
      { label: "Road trip", value: "roadtrip" },
      { label: "Un club all inclusive (type pierre et vacances)", value: "club" },
      { label: "Pas d'avis", value: "no-idea" },
    ],
  },
  {
    id: "rhythm",
    type: "multi",
    druid: "Et le rythme sur place ?",
    choices: [
      { label: "Chill", value: "chill" },
      { label: "Mix chill + activites", value: "mix" },
      { label: "Actif", value: "actif" },
    ],
  },
  {
    id: "together",
    type: "multi",
    druid: "Vous voulez vivre combien ensemble ?",
    choices: [
      { label: "Beaucoup ensemble", value: "ensemble" },
      { label: "Mix", value: "mix" },
      { label: "Chacun flexible", value: "flex" },
    ],
  },
  {
    id: "travelTime",
    type: "multi",
    druid: "Temps de trajet max acceptable pour aller sur le lieu de vacances ?",
    choices: [
      { label: "< 3h", value: "<3h" },
      { label: "3-6h", value: "3-6h" },
      { label: "Avion OK", value: "avion" },
    ],
  },
  {
    id: "vibe",
    type: "multi",
    druid: "Plutot quelle vibe ?",
    choices: [
      { label: "Mer", value: "mer" },
      { label: "Campagne", value: "campagne" },
      { label: "Montagne", value: "montagne" },
      { label: "Pas d'avis", value: "no-idea" },
    ],
  },
  {
    id: "budget",
    type: "multi",
    druid:
      "Petit point budget, sans jugement : on veut juste trouver un lieu adapte a tous. Ton niveau de confort ?",
    choices: [
      { label: "Budget optimise", value: "budget" },
      { label: "Confort standard", value: "standard" },
      { label: "Lieu premium si coup de coeur", value: "premium" },
    ],
  },
  {
    id: "commit",
    type: "multi",
    druid: "Si on trouve une option qui coche la majorite des criteres, tu confirmes ?",
    choices: [
      { label: "Oui", value: "oui" },
      { label: "Depend du prix", value: "prix" },
      { label: "Incertain", value: "incertain" },
    ],
  },
];

let currentStep = 0;
const answers = {};
let lastSelectedName = "";
let lastPlayerReply = "";
const STORAGE_KEY = "vacancesResponses";
const CONFIRM_KEY = "vacancesConfirmed";
const SUPABASE_URL = "https://nddxtxehlnnjfczvrxeq.supabase.co";
const SUPABASE_ANON_KEY =
  "sb_publishable_RTi5Y-nwTE8GT-QPbUDrWQ_6Sk_DHHS";
const supabase =
  window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
let lastResponseId = null;

const sprites = ["sprite-1", "sprite-2", "sprite-3", "sprite-4"];
const characters = [];
const selected = new Set();

const obstacleSelector = ".tree, .house, .table, .fireplace, .ball";
let obstacles = [];

function pickSprite(index) {
  return sprites[index % sprites.length];
}

function createCharacter(name, index) {
  const el = document.createElement("div");
  el.className = "character";

  const shadow = document.createElement("div");
  shadow.className = "shadow";

  const sprite = document.createElement("div");
  sprite.className = `sprite ${pickSprite(index)}`;

  const label = document.createElement("div");
  label.className = "nameplate";
  label.textContent = name;
  label.setAttribute("role", "button");
  label.setAttribute("tabindex", "0");

  el.appendChild(shadow);
  if (name === "Arnault Lorthios") {
    const flag = document.createElement("div");
    flag.className = "player-flag";
    flag.innerHTML =
      "<img alt=\"RC Lens\" src=\"https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/RC_Lens_logo.svg/250px-RC_Lens_logo.svg.png\" />";
    el.appendChild(flag);
  }
  el.appendChild(sprite);
  el.appendChild(label);
  charactersLayer.appendChild(el);

  const velocity = (Math.random() * 0.4 + 0.6) * (Math.random() > 0.5 ? 1 : -1);
  const velocityY = (Math.random() * 0.4 + 0.6) * (Math.random() > 0.5 ? 1 : -1);

  const { x, y } = getInitialPosition(index);
  const char = {
    el,
    name,
    x,
    y,
    vx: velocity,
    vy: velocityY,
    hovered: false,
    selected: false,
    radius: 16,
  };

  el.addEventListener("mouseenter", () => {
    char.hovered = true;
    el.classList.add("is-paused");
  });

  el.addEventListener("mouseleave", () => {
    char.hovered = false;
    if (!char.selected) {
      el.classList.remove("is-paused");
    }
  });

  el.addEventListener("click", () => {
    // Make selection exclusive for clarity
    characters.forEach((c) => {
      if (c !== char) {
        c.selected = false;
        c.el.classList.remove("is-selected", "is-paused");
      }
    });
    selected.clear();
    char.selected = true;
    selected.add(char.name);
    lastSelectedName = char.name;
    el.classList.add("is-selected", "is-paused");
    updateSelection();
  });

  label.addEventListener("click", (event) => {
    event.stopPropagation();
    characters.forEach((c) => {
      if (c !== char) {
        c.selected = false;
        c.el.classList.remove("is-selected", "is-paused");
      }
    });
    selected.clear();
    selected.add(char.name);
    char.selected = true;
    lastSelectedName = char.name;
    el.classList.add("is-selected", "is-paused");
    updateSelection();
    goToLevel2(char.name);
  });

  label.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      characters.forEach((c) => {
        if (c !== char) {
          c.selected = false;
          c.el.classList.remove("is-selected", "is-paused");
        }
      });
      selected.clear();
      selected.add(char.name);
      char.selected = true;
      lastSelectedName = char.name;
      el.classList.add("is-selected", "is-paused");
      updateSelection();
      goToLevel2(char.name);
    }
  });

  characters.push(char);
}

function getInitialPosition(index) {
  const rect = world.getBoundingClientRect();
  const padding = 20;
  const usableWidth = Math.max(200, rect.width - padding * 2);
  const usableHeight = Math.max(200, rect.height - 140);
  const columns = Math.max(4, Math.floor(usableWidth / 90));
  const rows = Math.ceil(names.length / columns);
  const col = index % columns;
  const row = Math.floor(index / columns);
  const stepX = usableWidth / columns;
  const stepY = usableHeight / Math.max(1, rows);
  const x = padding + col * stepX;
  const y = 90 + row * stepY;
  return { x, y };
}

function updateSelection() {
  if (selected.size === 0) {
    selectionList.textContent = "Personne pour le moment";
    if (levelCta) {
      levelCta.classList.remove("is-active");
    }
    if (levelCtaText) {
      levelCtaText.textContent = "Selectionne ton personnage";
    }
    if (goLevel2) {
      goLevel2.disabled = true;
      goLevel2.textContent = "Je suis ...";
    }
    return;
  }
  selectionList.textContent = "";
  Array.from(selected).forEach((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name;
    button.addEventListener("click", () => {
      goToLevel2(name);
    });
    selectionList.appendChild(button);
  });
  if (levelCta) {
    levelCta.classList.add("is-active");
  }
  if (levelCtaText) {
    const focusName = lastSelectedName || Array.from(selected)[0];
    if (focusName) {
      levelCtaText.textContent = `Pret, ${focusName} ?`;
    }
  }
  if (goLevel2) {
    const focusName = lastSelectedName || Array.from(selected)[0];
    goLevel2.disabled = !focusName;
    goLevel2.textContent = focusName ? `Je suis ${focusName}` : "Je suis ...";
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rectsOverlap(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

function updateObstacleCache() {
  const worldRect = world.getBoundingClientRect();
  obstacles = Array.from(world.querySelectorAll(obstacleSelector)).map((el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left - worldRect.left,
      right: rect.right - worldRect.left,
      top: rect.top - worldRect.top,
      bottom: rect.bottom - worldRect.top,
    };
  });
}

function collides(x, y, size) {
  const padding = 8;
  const rect = {
    left: x - size + padding,
    right: x + size - padding,
    top: y - size + padding,
    bottom: y + size - padding,
  };

  return obstacles.some((obs) => rectsOverlap(rect, obs));
}

function updatePositions() {
  const rect = world.getBoundingClientRect();
  const padding = 16;
  const maxX = rect.width - 36 - padding;
  const maxY = rect.height - 36 - padding;
  const minY = 80;

  characters.forEach((char) => {
    if (char.hovered || char.selected) {
      return;
    }

    const nextX = char.x + char.vx;
    const nextY = char.y + char.vy;

    const blockedX =
      nextX < padding ||
      nextX > maxX ||
      collides(nextX + 18, char.y + 18, char.radius);
    const blockedY =
      nextY < minY ||
      nextY > maxY ||
      collides(char.x + 18, nextY + 18, char.radius);

    if (blockedX) {
      char.vx *= -1;
    } else {
      char.x = clamp(nextX, padding, maxX);
    }

    if (blockedY) {
      char.vy *= -1;
    } else {
      char.y = clamp(nextY, minY, maxY);
    }

    char.el.style.setProperty("--x", `${char.x}px`);
    char.el.style.setProperty("--y", `${char.y}px`);
  });

  requestAnimationFrame(updatePositions);
}

function goToLevel2(name) {
  if (!level2 || !transition) {
    return;
  }
  if (playerName) {
    playerName.textContent = name;
  }
  transition.classList.add("is-active");
  setTimeout(() => {
    document.querySelector(".level-1").classList.remove("is-active");
    level2.classList.add("is-active");
    transition.classList.remove("is-active");
    level2.scrollIntoView({ behavior: "smooth", block: "start" });
    startConversation();
  }, 900);
}

function renderBubbles(druidText, playerText = "") {
  if (!druidBox || !playerBox) {
    return;
  }
  druidBox.textContent = druidText;
  playerBox.textContent = "Choisis une reponse ci-dessous.";
}

function renderChoices(step) {
  if (!chatChoices) {
    return;
  }
  chatChoices.innerHTML = "";
  const nav = document.createElement("div");
  nav.className = "chat-nav";
  if (currentStep > 0) {
    const back = document.createElement("button");
    back.type = "button";
    back.textContent = "Question precedente";
    back.addEventListener("click", () => {
      currentStep = Math.max(0, currentStep - 1);
      const prevStep = conversationSteps[currentStep];
      delete answers[prevStep.id];
      lastPlayerReply = "";
      showStep();
    });
    nav.appendChild(back);
  }
  if (step.type === "single") {
    step.choices.forEach((choice, idx) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = choice.label;
      button.addEventListener("click", () => {
        answers[step.id] = choice.value;
        lastPlayerReply = choice.label;
        currentStep += 1;
        showStep();
      });
      chatChoices.appendChild(button);
    });
    chatChoices.appendChild(nav);
    return;
  }

  if (step.type === "multi") {
    const selectedChoices = new Set();
    const list = document.createElement("div");
    list.className = "choice-grid";
    step.choices.forEach((choice) => {
      const label = typeof choice === "string" ? choice : choice.label;
      const value = typeof choice === "string" ? choice : choice.value;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.dataset.value = value;
      button.addEventListener("click", () => {
        if (selectedChoices.has(value)) {
          selectedChoices.delete(value);
          button.classList.remove("is-selected");
        } else {
          selectedChoices.add(value);
          button.classList.add("is-selected");
        }
      });
      list.appendChild(button);
    });
    const validate = document.createElement("button");
    validate.type = "button";
    validate.className = "is-primary";
    validate.textContent = "Valider";
    validate.addEventListener("click", () => {
      const payload = Array.from(selectedChoices);
      answers[step.id] = payload;
      const labelMap = new Map(
        step.choices.map((c) =>
          typeof c === "string" ? [c, c] : [c.value, c.label]
        )
      );
      const pretty = payload.map((v) => labelMap.get(v) || v);
      lastPlayerReply = pretty.length ? pretty.join(", ") : "Aucune selection";
      currentStep += 1;
      showStep();
    });
    chatChoices.appendChild(list);
    chatChoices.appendChild(validate);
    chatChoices.appendChild(nav);
    return;
  }

  if (step.type === "weeks") {
    const selectedChoices = new Set();
    const list = document.createElement("div");
    list.className = "choice-grid";
    weekGroups.forEach((group) => {
      const title = document.createElement("div");
      title.className = "choice-group";
      title.textContent = group.label;
      list.appendChild(title);
      group.weeks.forEach((week) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = week.label;
        button.dataset.value = week.value;
        button.addEventListener("click", () => {
          if (selectedChoices.has(week.value)) {
            selectedChoices.delete(week.value);
            button.classList.remove("is-selected");
          } else {
            selectedChoices.add(week.value);
            button.classList.add("is-selected");
          }
        });
        list.appendChild(button);
      });
    });

    const comment = document.createElement("input");
    comment.type = "text";
    comment.placeholder = "Commentaire dates (optionnel)";
    comment.className = "date-comment";

    const validate = document.createElement("button");
    validate.type = "button";
    validate.className = "is-primary";
    validate.textContent = "Valider";
    validate.addEventListener("click", () => {
      const payload = Array.from(selectedChoices);
      answers[step.id] = payload;
      answers.weeksComment = comment.value.trim();
      lastPlayerReply = payload.length ? payload.join(", ") : "Aucune selection";
      if (answers.weeksComment) {
        lastPlayerReply += ` | Commentaire: ${answers.weeksComment}`;
      }
      currentStep += 1;
      showStep();
    });

    chatChoices.appendChild(list);
    chatChoices.appendChild(comment);
    chatChoices.appendChild(validate);
    chatChoices.appendChild(nav);
    return;
  }

  if (step.type === "form") {
    const form = document.createElement("div");
    form.className = "chat-form";
    const crewType = answers.crewType || "";
    const showKids = true;
    form.innerHTML = `
      <label>
        Nb adultes
        <input type="number" min="0" max="20" step="1" name="adults" placeholder="ex: 2" />
      </label>
      <label>
        Nb enfants
        <input type="number" min="0" max="20" step="1" name="kids" placeholder="ex: 1" />
      </label>
      <label class="full">
        Ages des enfants (optionnel)
        <input type="text" name="ages" placeholder="ex: 3, 6" />
      </label>
    `;
    const error = document.createElement("div");
    error.className = "form-error";
    error.textContent = "Merci d'indiquer le nb d'adultes et le nb d'enfants (0 si aucun).";
    error.style.display = "none";
    const validate = document.createElement("button");
    validate.type = "button";
    validate.className = "is-primary";
    validate.textContent = "Valider";
    validate.addEventListener("click", () => {
      const adults = form.querySelector("[name='adults']").value || "0";
      const kidsInput = form.querySelector("[name='kids']");
      const agesInput = form.querySelector("[name='ages']");
      const kids = kidsInput.value || "0";
      const ages = agesInput.value || "-";
      if (adults === "" || kids === "") {
        error.style.display = "block";
        return;
      }
      error.style.display = "none";
      answers[step.id] = { adults, kids, ages, crewType };
      lastPlayerReply = `Adultes: ${adults} | Enfants: ${kids} | Ages: ${ages}`;
      currentStep += 1;
      showStep();
    });
    chatChoices.appendChild(form);
    form.appendChild(error);
    chatChoices.appendChild(validate);
    chatChoices.appendChild(nav);
    return;
  }

  chatChoices.appendChild(nav);
}

function updateProgress() {
  if (!chatProgress) {
    return;
  }
  chatProgress.textContent = `${Math.min(currentStep, conversationSteps.length)}/${conversationSteps.length} questions`;
}

function formatAnswer(value) {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "-";
  }
  return value || "-";
}

function showStep() {
  updateProgress();
  if (currentStep >= conversationSteps.length) {
    saveResponses().then((saved) => {
      renderBubbles(
        saved
          ? "Merci ! Tes reponses sont bien notees. Tu peux voir ton apercu."
          : "Merci ! Tes reponses sont bien notees."
      );
    });
    if (chatChoices) {
      chatChoices.innerHTML = "";
      const back = document.createElement("button");
      back.type = "button";
      back.textContent = "Question precedente";
      back.addEventListener("click", () => {
        currentStep = Math.max(0, conversationSteps.length - 1);
        const prevStep = conversationSteps[currentStep];
        delete answers[prevStep.id];
        lastPlayerReply = "";
        showStep();
      });
      const recap = document.createElement("button");
      recap.type = "button";
      recap.textContent = "Voir mon apercu";
      recap.classList.add("is-primary");
      recap.addEventListener("click", () => {
        const weeksPossible = (answers.weeksPossible || []).join(", ") || "-";
        const companions = answers.companions
          ? `Mode ${answers.companions.crewType || "-"}, Adultes ${answers.companions.adults}, Enfants ${answers.companions.kids}, Ages ${answers.companions.ages}`
          : "-";
        const weeksComment = answers.weeksComment ? ` | Commentaire dates: ${answers.weeksComment}` : "";
        const summary =
          `Participation: ${formatAnswer(answers.interest)} | ` +
          `Avec toi: ${companions} | ` +
          `Semaines possibles: ${weeksPossible}${weeksComment} | ` +
          `Duree: ${formatAnswer(answers.duration)} | ` +
          `Format: ${formatAnswer(answers.format)} | ` +
          `Rythme: ${formatAnswer(answers.rhythm)} | ` +
          `Vie commune: ${formatAnswer(answers.together)} | ` +
          `Trajet: ${formatAnswer(answers.travelTime)} | ` +
          `Vibe: ${formatAnswer(answers.vibe)} | ` +
          `Confort: ${formatAnswer(answers.budget)} | ` +
          `Engagement: ${formatAnswer(answers.commit)}`;
        renderBubbles("Voici ton recap :", summary);
        goToLevel3();
      });
      chatChoices.appendChild(back);
      chatChoices.appendChild(recap);
    }
    updateProgress();
    return;
  }

  const step = conversationSteps[currentStep];
  renderBubbles(step.druid);
  renderChoices(step);
}

function startConversation() {
  if (!druidBox || !playerBox) {
    return;
  }
  currentStep = 0;
  Object.keys(answers).forEach((key) => delete answers[key]);
  lastPlayerReply = "Salut druide !";
  showStep();
}

function goToLevel1() {
  if (!level2 || !transition) {
    return;
  }
  transition.classList.add("is-active");
  setTimeout(() => {
    level2.classList.remove("is-active");
    document.querySelector(".level-1").classList.add("is-active");
    transition.classList.remove("is-active");
    world.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
}

function goToLevel3() {
  if (!level3 || !transition) {
    return;
  }
  transition.classList.add("is-active");
  setTimeout(() => {
    level2.classList.remove("is-active");
    level3.classList.add("is-active");
    transition.classList.remove("is-active");
    renderRecapCard();
    level3.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
}

function goToLevel2From3() {
  if (!level3 || !transition) {
    return;
  }
  transition.classList.add("is-active");
  setTimeout(() => {
    level3.classList.remove("is-active");
    level2.classList.add("is-active");
    transition.classList.remove("is-active");
    level2.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 900);
}

async function saveResponses() {
  try {
    const payload = {
      name: lastSelectedName || playerName?.textContent || "Anonyme",
      timestamp: new Date().toISOString(),
      confirmed: false,
      answers: { ...answers },
    };
    if (supabase) {
      const { data, error } = await supabase
        .from("responses")
        .insert([
          {
            name: payload.name,
            answers: payload.answers,
            confirmed: payload.confirmed,
            source: "github-pages",
          },
        ])
        .select("id")
        .single();
      if (error) {
        throw error;
      }
      lastResponseId = data?.id || null;
      localStorage.setItem("lastResponseId", lastResponseId || "");
    }
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.push(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return true;
  } catch {
    return false;
  }
}

async function confirmLatestResponse() {
  try {
    const storedId = lastResponseId || localStorage.getItem("lastResponseId");
    if (supabase && storedId) {
      const { error } = await supabase
        .from("responses")
        .update({ confirmed: true })
        .eq("id", storedId);
      if (error) {
        throw error;
      }
    }
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    if (!existing.length) {
      return false;
    }
    existing[existing.length - 1].confirmed = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    localStorage.setItem(CONFIRM_KEY, new Date().toISOString());
    return true;
  } catch {
    return false;
  }
}

async function refreshAdminBox() {
  if (!adminList) {
    return;
  }
  let entries = [];
  if (supabase) {
    const { data, error } = await supabase
      .from("responses")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      entries = data.map((row) => ({
        id: row.id,
        name: row.name,
        timestamp: row.created_at,
        confirmed: row.confirmed,
        answers: row.answers,
      }));
    }
  } else {
    const data = localStorage.getItem(STORAGE_KEY);
    entries = data ? JSON.parse(data) : [];
  }
  adminList.innerHTML = "";

  const names = new Set();
  entries.forEach((entry, index) => {
    names.add(entry.name || "Anonyme");
    const row = document.createElement("div");
    row.className = "admin-row";
    const header = document.createElement("div");
    header.className = "admin-row-header";
    header.innerHTML = `<strong>${entry.name || "Anonyme"}</strong>`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Supprimer";
    remove.addEventListener("click", () => {
      if (supabase && entry.id) {
        supabase
          .from("responses")
          .delete()
          .eq("id", entry.id)
          .then(() => refreshAdminBox());
      } else {
        entries.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        refreshAdminBox();
      }
    });
    header.appendChild(remove);

    const meta = document.createElement("div");
    meta.className = "admin-row-meta";
    meta.textContent = `${entry.timestamp || "-"} · ${entry.confirmed ? "Valide" : "Non valide"}`;

    const answersText = document.createElement("div");
    answersText.className = "admin-row-answers";
    answersText.textContent = JSON.stringify(entry.answers || {}, null, 2);

    row.appendChild(header);
    row.appendChild(meta);
    row.appendChild(answersText);
    adminList.appendChild(row);
  });

  if (resetPersonSelect) {
    resetPersonSelect.innerHTML = "";
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Choisir une personne";
    resetPersonSelect.appendChild(option);
    Array.from(names).forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      resetPersonSelect.appendChild(opt);
    });
  }
}

function renderRecapCard() {
  if (!recapGrid) {
    return;
  }
  recapGrid.innerHTML = "";
  const titleName = lastSelectedName || playerName?.textContent || "Vacancier";
  if (recapTitle) {
    recapTitle.textContent = `Profil de ${titleName}`;
  }

  const items = [
    { label: "Participation", value: formatAnswer(answers.interest) },
    { label: "Type", value: formatAnswer(answers.crewType) },
    {
      label: "Groupe",
      value: answers.companions
        ? `Adultes ${answers.companions.adults}, Enfants ${answers.companions.kids}`
        : "-",
    },
    {
      label: "Dates",
      value:
        (answers.weeksPossible || []).join(", ") +
        (answers.weeksComment ? ` (${answers.weeksComment})` : ""),
    },
    { label: "Duree", value: formatAnswer(answers.duration) },
    { label: "Format", value: formatAnswer(answers.format) },
    { label: "Rythme", value: formatAnswer(answers.rhythm) },
    { label: "Vie commune", value: formatAnswer(answers.together) },
    { label: "Trajet max", value: formatAnswer(answers.travelTime) },
    { label: "Vibe", value: formatAnswer(answers.vibe) },
    { label: "Confort", value: formatAnswer(answers.budget) },
    { label: "Engagement", value: formatAnswer(answers.commit) },
  ];

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "recap-item";
    card.innerHTML = `<div class="recap-label">${item.label}</div><div class="recap-value">${item.value || "-"}</div>`;
    recapGrid.appendChild(card);
  });
}


function init() {
  names.forEach((name, index) => createCharacter(name, index));
  updateSelection();
  updateObstacleCache();
  requestAnimationFrame(updatePositions);
}

window.addEventListener("resize", () => {
  updateObstacleCache();
});

if (backToLevel1) {
  backToLevel1.addEventListener("click", () => {
    goToLevel1();
  });
}

if (goLevel2) {
  goLevel2.addEventListener("click", () => {
    const name = lastSelectedName || Array.from(selected)[0];
    if (name) {
      goToLevel2(name);
    }
  });
}

if (backToLevel2) {
  backToLevel2.addEventListener("click", () => {
    goToLevel2From3();
  });
}

if (confirmRecap) {
  confirmRecap.addEventListener("click", () => {
    confirmLatestResponse().then((ok) => {
      if (ok) {
        renderBubbles("Merci ! Ton apercu est valide. On se tient au courant.");
        refreshAdminBox();
      }
    });
  });
}

if (toggleAdmin) {
  toggleAdmin.addEventListener("click", () => {
    if (!adminBox) {
      return;
    }
    adminBox.classList.toggle("is-open");
    refreshAdminBox();
  });
}

if (copyResponses) {
  copyResponses.addEventListener("click", () => {
    if (supabase) {
      supabase
        .from("responses")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          navigator.clipboard.writeText(JSON.stringify(data || [], null, 2)).catch(() => {});
        });
      return;
    }
    const data = localStorage.getItem(STORAGE_KEY) || "[]";
    navigator.clipboard.writeText(data).catch(() => {});
  });
}

if (resetPerson) {
  resetPerson.addEventListener("click", () => {
    if (!resetPersonSelect) {
      return;
    }
    const target = resetPersonSelect.value;
    if (!target) {
      return;
    }
    if (supabase) {
      supabase
        .from("responses")
        .delete()
        .eq("name", target)
        .then(() => refreshAdminBox());
      return;
    }
    const data = localStorage.getItem(STORAGE_KEY);
    const entries = data ? JSON.parse(data) : [];
    const filtered = entries.filter((entry) => (entry.name || "Anonyme") !== target);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    refreshAdminBox();
  });
}

init();
