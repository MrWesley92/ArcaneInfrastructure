const game = {
  unstable: 0,
  refined: 50,
  instability: 0,

  generators: 1,
  refiners: 0,
  anchors: 0,

  genCost: 10,
  refCost: 20,
  anchorCost: 50
};

// ===== CORE SYSTEMS =====

function generateMana() {
  game.unstable += game.generators * 0.5;
  game.instability += game.generators * 0.1;
}

function refineMana() {
  if (game.unstable <= 0) return;

  let efficiency = 1 - game.instability / 100;
  efficiency = Math.max(0, efficiency);

  let amount = Math.min(game.unstable, game.refiners * efficiency);

  game.unstable -= amount;
  game.refined += amount;
}

function stabilise() {
  game.instability -= game.anchors * 0.5;
  if (game.instability < 0) game.instability = 0;
}

// ===== RULE SYSTEM (V1) =====

function processRules() {
  // Rule 1: Auto refine
  if (game.unstable > 100) {
    refineMana();
  }

  // Rule 2: Stabilise if too high
  if (game.instability > 50) {
    stabilise();
  }
}

// ===== BUILDINGS =====

function buyGenerator() {
  if (game.refined >= game.genCost) {
    game.refined -= game.genCost;
    game.generators++;
    game.genCost *= 1.2;
  }
}

function buyRefiner() {
  if (game.refined >= game.refCost) {
    game.refined -= game.refCost;
    game.refiners++;
    game.refCost *= 1.2;
  }
}

function buyAnchor() {
  if (game.refined >= game.anchorCost) {
    game.refined -= game.anchorCost;
    game.anchors++;
    game.anchorCost *= 1.2;
  }
}

// ===== UI =====

function updateUI() {
  document.getElementById("unstable").textContent = game.unstable.toFixed(1);
  document.getElementById("refined").textContent = game.refined.toFixed(1);
  document.getElementById("instability").textContent = game.instability.toFixed(1);

  document.getElementById("genCount").textContent = game.generators;
  document.getElementById("refCount").textContent = game.refiners;
  document.getElementById("anchorCount").textContent = game.anchors;

  document.getElementById("genCost").textContent = Math.floor(game.genCost);
  document.getElementById("refCost").textContent = Math.floor(game.refCost);
  document.getElementById("anchorCost").textContent = Math.floor(game.anchorCost);
}

// ===== GAME LOOP =====

function gameTick() {
  generateMana();
  processRules();
  updateUI();
}

setInterval(gameTick, 100);
