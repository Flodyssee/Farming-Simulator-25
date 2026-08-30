/**
 * FS25 Post-Harvest, Precision Farming, Crop Rotation & Paperasserie (RedTape) Engine
 * Support complet de la carte LE MECHET, gestion de l'historique sur 5 ans (N, N-1, N-2, N-3, N-4)
 * et découpage des travaux par mois de jeu FS25.
 * Rédigé exclusivement en français sans équivalents en anglais.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "fs25_post_harvest_planner_v6";

  // Mois de jeu FS25 dans l'ordre chronologique agricole
  const MONTHS_ORDER = [
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin"
  ];

  // État initial par défaut avec historique sur 5 ans
  let state = {
    activeFieldId: "field-1",
    viewMode: "parcel", // "parcel" ou "global_calendar"
    themePreference: "system", // "system", "dark", "light"
    fields: [
      {
        id: "field-1",
        name: "Champ #1 (Le Pré du Moulin)",
        areaHa: 4.8,
        cropN: "fs25-ble",
        cropN1: "fs25-soja",
        cropN2: "fs25-mais-grain",
        cropN3: "fs25-colza",
        cropN4: "fs25-orge",
        targetCropNPlus1: "fs25-colza",
        strawHandled: "bales",
        soilDistribution: {
          loamy_sand: 0,
          sandy_loam: 20,
          loam: 70,
          silty_clay: 10
        },
        completedTasks: {}
      },
      {
        id: "field-2",
        name: "Champ #2 (La Grande Pièce)",
        areaHa: 6.2,
        cropN: "fs25-luzerne",
        cropN1: "fs25-luzerne",
        cropN2: "fs25-ble",
        cropN3: "fs25-colza",
        cropN4: "fs25-orge",
        targetCropNPlus1: "fs25-mais-grain",
        strawHandled: "chopped",
        soilDistribution: {
          loamy_sand: 10,
          sandy_loam: 40,
          loam: 40,
          silty_clay: 10
        },
        completedTasks: {}
      },
      {
        id: "field-3",
        name: "Champ #3 (Les Vignes du Morvan)",
        areaHa: 3.5,
        cropN: "fs25-orge",
        cropN1: "fs25-ble",
        cropN2: "fs25-soja",
        cropN3: "fs25-mais-grain",
        cropN4: "fs25-ble",
        targetCropNPlus1: "fs25-moutarde",
        strawHandled: "chopped",
        soilDistribution: {
          loamy_sand: 25,
          sandy_loam: 45,
          loam: 30,
          silty_clay: 0
        },
        completedTasks: {}
      }
    ]
  };

  // ==================== 1. GESTION DU SYSTÈME & THÈME (CLAIR / SOMBRE) ====================
  function initTheme() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function applyCurrentTheme() {
      if (state.themePreference === "system") {
        if (mediaQuery.matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
      } else if (state.themePreference === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      updateThemeButtonText();
    }

    mediaQuery.addEventListener("change", () => {
      if (state.themePreference === "system") applyCurrentTheme();
    });

    document.getElementById("btn-toggle-theme")?.addEventListener("click", () => {
      if (state.themePreference === "system") {
        state.themePreference = mediaQuery.matches ? "light" : "dark";
      } else if (state.themePreference === "dark") {
        state.themePreference = "light";
      } else {
        state.themePreference = "system";
      }
      saveState();
      applyCurrentTheme();
    });

    applyCurrentTheme();
  }

  function updateThemeButtonText() {
    const textEl = document.getElementById("theme-text-indicator");
    if (!textEl) return;

    if (state.themePreference === "system") {
      textEl.textContent = "Thème : Auto (Système)";
    } else if (state.themePreference === "dark") {
      textEl.textContent = "Thème : Sombre";
    } else {
      textEl.textContent = "Thème : Clair";
    }
  }

  // ==================== 2. LOCALSTORAGE & GESTION MULTI-PARCELLES ====================
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
      }
    } catch (e) {
      console.warn("Erreur chargement localStorage:", e);
    }

    // Migration et compatibilité des champs
    if (!state.fields || state.fields.length === 0) {
      state.fields = [
        {
          id: "field-1",
          name: "Champ #1",
          areaHa: 5.0,
          cropN: "fs25-ble",
          cropN1: "fs25-soja",
          cropN2: "fs25-mais-grain",
          cropN3: "fs25-colza",
          cropN4: "fs25-orge",
          targetCropNPlus1: "fs25-colza",
          strawHandled: "chopped",
          soilDistribution: { loamy_sand: 0, sandy_loam: 30, loam: 60, silty_clay: 10 },
          completedTasks: {}
        }
      ];
      state.activeFieldId = "field-1";
    }

    // Assurer la présence des 5 années d'historique sur chaque champ
    state.fields.forEach(f => {
      if (f.cropNMinus1 && !f.cropN1) f.cropN1 = f.cropNMinus1;
      if (!f.cropN1) f.cropN1 = "";
      if (!f.cropN2) f.cropN2 = "";
      if (!f.cropN3) f.cropN3 = "";
      if (!f.cropN4) f.cropN4 = "";
    });

    if (!state.fields.some(f => f.id === state.activeFieldId)) {
      state.activeFieldId = state.fields[0].id;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Erreur sauvegarde localStorage:", e);
    }
  }

  function getActiveField() {
    return state.fields.find(f => f.id === state.activeFieldId) || state.fields[0];
  }

  function switchActiveField(fieldId) {
    if (state.fields.some(f => f.id === fieldId)) {
      state.activeFieldId = fieldId;
      saveState();
      syncFormWithActiveField();
      renderApp();
    }
  }

  function addNewField() {
    const newNumber = state.fields.length + 1;
    const newId = "field-" + Date.now();
    const newField = {
      id: newId,
      name: `Champ #${newNumber}`,
      areaHa: 4.5,
      cropN: "fs25-ble",
      cropN1: "fs25-soja",
      cropN2: "fs25-mais-grain",
      cropN3: "fs25-colza",
      cropN4: "fs25-orge",
      targetCropNPlus1: "fs25-colza",
      strawHandled: "chopped",
      soilDistribution: { loamy_sand: 0, sandy_loam: 30, loam: 60, silty_clay: 10 },
      completedTasks: {}
    };
    state.fields.push(newField);
    state.activeFieldId = newId;
    saveState();
    syncFormWithActiveField();
    renderApp();
  }

  function renameActiveField() {
    const field = getActiveField();
    const newName = prompt("Nouveau nom pour cette parcelle :", field.name);
    if (newName && newName.trim()) {
      field.name = newName.trim();
      saveState();
      renderApp();
    }
  }

  function duplicateActiveField() {
    const field = getActiveField();
    const newId = "field-" + Date.now();
    const cloned = JSON.parse(JSON.stringify(field));
    cloned.id = newId;
    cloned.name = `${field.name} (Copie)`;
    cloned.completedTasks = {};
    state.fields.push(cloned);
    state.activeFieldId = newId;
    saveState();
    syncFormWithActiveField();
    renderApp();
  }

  function deleteActiveField() {
    if (state.fields.length <= 1) {
      alert("Vous devez conserver au moins un champ dans votre exploitation.");
      return;
    }
    const field = getActiveField();
    if (confirm(`Confirmez-vous la suppression de "${field.name}" ?`)) {
      state.fields = state.fields.filter(f => f.id !== field.id);
      state.activeFieldId = state.fields[0].id;
      saveState();
      syncFormWithActiveField();
      renderApp();
    }
  }

  // ==================== 3. MOTEUR D'ASSOLEMENT SUR 5 ANS & PAPERASSERIE (REDTAPE) ====================
  function getAllCrops() {
    return window.CROPS_DATABASE || [];
  }

  function getCropById(cropId) {
    return getAllCrops().find(c => c.id === cropId) || getAllCrops()[0];
  }

  function getAllTools() {
    return window.TOOLS_DATABASE || [];
  }

  function getToolById(toolId) {
    return getAllTools().find(t => t.id === toolId) || null;
  }

  /**
   * Calcule le score de rotation en prenant en compte les 5 dernières années (N, N-1, N-2, N-3, N-4)
   */
  function calculate5YearRotationScore(field, candidateCropId) {
    const cropN = getCropById(field.cropN);
    const cropN1 = field.cropN1 ? getCropById(field.cropN1) : null;
    const cropN2 = field.cropN2 ? getCropById(field.cropN2) : null;
    const cropN3 = field.cropN3 ? getCropById(field.cropN3) : null;
    const cropN4 = field.cropN4 ? getCropById(field.cropN4) : null;
    const candidate = getCropById(candidateCropId);

    if (!cropN || !candidate) return { score: 0, status: "neutral", text: "+0% (Rotation neutre)" };

    // 1. Détection de monoculture directe (N = N+1)
    if (cropN.id === candidate.id && candidate.rotationCategory !== "grass") {
      return {
        score: -25,
        status: "danger",
        text: "-25% (Pénalité monoculture directe : 2 années consécutives de la même culture)"
      };
    }

    // 2. Détection de retour trop rapide pour les cultures exigeantes (Colza, Tournesol, Oignons, Lin)
    const demandingCrops = ["fs25-colza", "fs25-tournesol", "fs25-oignons", "fs25-lin", "fs25-betterave"];
    if (demandingCrops.includes(candidate.id)) {
      if (cropN1 && cropN1.id === candidate.id) {
        return { score: -20, status: "danger", text: `-20% (Retour trop rapide sur ${candidate.name} après seulement 1 an de coupure)` };
      }
      if (cropN2 && cropN2.id === candidate.id) {
        return { score: -10, status: "warning", text: `-10% (Coupure de 2 ans insuffisante pour ${candidate.name} - 3 à 4 ans recommandés)` };
      }
    }

    // 3. Détection de même famille botanique consécutive (ex: Céréale sur Céréale)
    if (cropN.rotationCategory === candidate.rotationCategory && cropN.rotationCategory !== "grass") {
      return {
        score: -15,
        status: "danger",
        text: `-15% (Même famille botanique consécutive : ${cropN.familyLabel})`
      };
    }

    // 4. Vérification des précédents parfaits directs (N vers candidate)
    const matchIdeal = (cropN.idealNextCrops || []).find(r => r.cropId === candidate.id);
    if (matchIdeal) {
      let bonusVal = 15;
      if (matchIdeal.bonus.includes("20%")) bonusVal = 20;
      else if (matchIdeal.bonus.includes("18%")) bonusVal = 18;
      else if (matchIdeal.bonus.includes("12%")) bonusVal = 12;
      else if (matchIdeal.bonus.includes("10%")) bonusVal = 10;

      // Bonus Assolement Parfait sur 5 ans : calcul de la diversité
      const historyCategories = new Set([
        cropN.rotationCategory,
        cropN1 ? cropN1.rotationCategory : null,
        cropN2 ? cropN2.rotationCategory : null,
        cropN3 ? cropN3.rotationCategory : null,
        cropN4 ? cropN4.rotationCategory : null,
        candidate.rotationCategory
      ].filter(Boolean));

      if (historyCategories.size >= 4) {
        bonusVal = Math.min(bonusVal + 2, 20);
      }

      return {
        score: bonusVal,
        status: "perfect",
        text: `+${bonusVal}% (${matchIdeal.bonus.replace(/\+\d+%\s*/, "")})`
      };
    }

    // 5. Vérification des incompatibilités directes
    const matchBad = (cropN.badNextCrops || []).find(r => r.cropId === candidate.id);
    if (matchBad) {
      return {
        score: -15,
        status: "danger",
        text: matchBad.malus
      };
    }

    // 6. Règle générale des alternances de familles
    if (cropN.rotationCategory === "legumes" && (candidate.rotationCategory === "cereals" || candidate.rotationCategory === "oilseeds")) {
      return { score: 15, status: "good", text: "+15% (Précédent légumineuse fixatrice d'azote)" };
    }
    if (cropN.rotationCategory === "cereals" && (candidate.rotationCategory === "oilseeds" || candidate.rotationCategory === "legumes")) {
      return { score: 15, status: "good", text: "+15% (Alternance céréale vers oléagineux ou légumineuse)" };
    }
    if (cropN.rotationCategory === "oilseeds" && candidate.rotationCategory === "cereals") {
      return { score: 18, status: "perfect", text: "+18% (Oléagineux vers céréale d'hiver)" };
    }
    if (cropN.rotationCategory === "roots" && (candidate.rotationCategory === "cereals" || candidate.rotationCategory === "legumes")) {
      return { score: 15, status: "good", text: "+15% (Sarclées vers céréale meunière)" };
    }

    return { score: 5, status: "neutral", text: "+5% (Rotation standard acceptable)" };
  }

  /**
   * Audit de conformité réglementaire pour le mod Paperasserie (RedTape) basé sur l'historique 5 ans
   */
  function auditPaperasserie5Years(field, chosenCrop) {
    const cropN = getCropById(field.cropN);
    const cropN1 = field.cropN1 ? getCropById(field.cropN1) : null;
    const cropN2 = field.cropN2 ? getCropById(field.cropN2) : null;
    const cropN3 = field.cropN3 ? getCropById(field.cropN3) : null;
    const cropN4 = field.cropN4 ? getCropById(field.cropN4) : null;
    const coverCropInfo = evaluateCoverCropNeed(cropN, chosenCrop);

    let issues = [];
    let isCompliant = true;

    // 1. Contrôle anti-monoculture RedTape
    if (cropN.id === chosenCrop.id && chosenCrop.rotationCategory !== "grass") {
      isCompliant = false;
      issues.push("Infraction RedTape : Monoculture directe détectée sur la parcelle. Risque d'amende et pénalité de subvention.");
    } else if (cropN.rotationCategory === chosenCrop.rotationCategory && cropN.rotationCategory !== "grass") {
      issues.push("Avertissement RedTape : Répétition de la même famille botanique deux années consécutives.");
    }

    // 2. Contrôle du délai de retour des cultures sensibles
    const demandingCrops = ["fs25-colza", "fs25-tournesol", "fs25-oignons", "fs25-lin", "fs25-betterave"];
    if (demandingCrops.includes(chosenCrop.id)) {
      if (cropN1 && cropN1.id === chosenCrop.id) {
        issues.push(`Vigilance RedTape : Retour sur ${chosenCrop.name} après seulement 1 an. Risque sanitaire accru.`);
      }
    }

    // 3. Contrôle de couverture hivernale obligatoire (CIPAN)
    if (coverCropInfo.recommended) {
      issues.push("Obligation RedTape : Parcelle libérée en été avec semis prévu au printemps. Implantation d'un couvert végétal requise pour éviter l'amende de sol nu hivernal.");
    }

    // 4. Calcul de la diversité sur 5 ans de la parcelle
    const parcel5YearFamilies = new Set([
      cropN.rotationCategory,
      cropN1 ? cropN1.rotationCategory : null,
      cropN2 ? cropN2.rotationCategory : null,
      cropN3 ? cropN3.rotationCategory : null,
      cropN4 ? cropN4.rotationCategory : null,
      chosenCrop.rotationCategory
    ].filter(Boolean));

    // 5. Diversité d'assolement sur l'ensemble de l'exploitation
    const farmUniqueFamilies = new Set(state.fields.map(f => {
      const c = getCropById(f.targetCropNPlus1 || f.cropN);
      return c ? c.rotationCategory : "other";
    }));

    const farmDiversityStatus = farmUniqueFamilies.size >= 3
      ? "Conforme (3+ familles différentes sur l'exploitation)"
      : "Insuffisant (Moins de 3 familles - Diversifier l'assolement)";

    return {
      isCompliant,
      issues,
      parcelDiversityCount: parcel5YearFamilies.size,
      farmDiversityScore: farmUniqueFamilies.size,
      farmDiversityStatus
    };
  }

  /**
   * Calcule le potentiel de rendement Precision Farming moyen pondéré par la distribution du sol
   */
  function calculateWeightedSoilYield(soilDist) {
    const yieldFactors = {
      loamy_sand: 0.80,  // 1. Sable glaiseux : 80%
      sandy_loam: 1.00,  // 2. Glaise sableuse : 100%
      loam: 1.25,        // 3. Glaise : 125%
      silty_clay: 1.10   // 4. Argile limoneuse : 110%
    };

    let totalPercent = (soilDist.loamy_sand || 0) + (soilDist.sandy_loam || 0) + (soilDist.loam || 0) + (soilDist.silty_clay || 0);
    if (totalPercent === 0) totalPercent = 100;

    const weighted = (
      ((soilDist.loamy_sand || 0) * yieldFactors.loamy_sand) +
      ((soilDist.sandy_loam || 0) * yieldFactors.sandy_loam) +
      ((soilDist.loam || 0) * yieldFactors.loam) +
      ((soilDist.silty_clay || 0) * yieldFactors.silty_clay)
    ) / totalPercent;

    return Math.round(weighted * 100);
  }

  /**
   * Détermine si un couvert végétal (Radis oléagineux / Moutarde / CIPAN) est recommandé
   */
  function evaluateCoverCropNeed(cropN, cropNPlus1) {
    const summerHarvestCrops = ["fs25-ble", "fs25-orge", "fs25-seigle", "fs25-triticale", "fs25-avoine", "fs25-colza", "fs25-lin", "fs25-pois-haricots"];
    const springSownCrops = ["fs25-mais-grain", "fs25-tournesol", "fs25-soja", "fs25-pomme-de-terre", "fs25-betterave", "fs25-carottes-panais", "fs25-betterave-rouge", "fs25-oignons", "fs25-chanvre", "fs25-coton"];

    const isSummerHarvest = summerHarvestCrops.includes(cropN.id);
    const isSpringSown = springSownCrops.includes(cropNPlus1.id);

    if (isSummerHarvest && isSpringSown) {
      return {
        recommended: true,
        type: "Radis oléagineux ou Moutarde (Couvert végétal d'interculture)",
        reason: "Interculture estivale et hivernale (6 à 8 mois) entre la moisson d'été et le semis de printemps. Le couvert apporte +1 niveau d'azote gratuit (+50 kg N/ha en Precision Farming), protège le sol contre le lessivage et valide l'obligation réglementaire du mod Paperasserie (RedTape).",
        timing: "Semis en août ou septembre au semoir direct -> Destruction en mars avant semis de printemps",
        benefit: "+50 kg N/ha d'azote organique gratuit et conformité réglementaire RedTape"
      };
    }

    if (cropN.id === "fs25-orge" && !isSpringSown) {
      return {
        recommended: true,
        type: "Moutarde ou Radis d'été rapide",
        reason: "L'orge est récoltée très tôt (juin ou juillet). Un couvert court peut être semé puis détruit avant le semis d'automne pour enrichir le sol sans frais.",
        timing: "Semis fin juin ou juillet -> Destruction en septembre",
        benefit: "+1 niveau de fertilisation gratuit"
      };
    }

    return {
      recommended: false,
      type: "Non requis",
      reason: "La culture suivante est implantée rapidement après la récolte (semis d'automne direct).",
      timing: "Enchaînement direct vers les travaux de préparation et de semis d'automne",
      benefit: "Gain de temps direct"
    };
  }

  /**
   * Génère l'itinéraire complet des travaux post-récolte découpé par mois de jeu FS25
   */
  function generateMonthlyPostHarvestTasks(cropN, cropNPlus1, coverCropInfo, strawHandled, fieldId) {
    let tasks = [];
    let stepOrder = 1;

    let harvestMonth = "Août";
    if (cropN.id === "fs25-orge") harvestMonth = "Juillet";
    else if (["fs25-mais-grain", "fs25-tournesol", "fs25-soja", "fs25-oignons"].includes(cropN.id)) harvestMonth = "Octobre";
    else if (["fs25-carottes-panais", "fs25-betterave-rouge", "fs25-betterave", "fs25-riz-inonde"].includes(cropN.id)) harvestMonth = "Novembre";

    // 1. Paille & Résidus (Mois de récolte)
    if (cropN.hasStraw) {
      if (strawHandled === "bales") {
        tasks.push({
          id: `${fieldId}-task-straw`,
          order: stepOrder++,
          month: harvestMonth,
          phase: "1. Récolte de la paille",
          title: "Presser et ramasser les andains de paille",
          toolId: "fs25-presse-balles",
          speed: "15-20 km/h",
          impact: "Valorisation litière animale ou vente",
          notes: "Presse à balles haute densité avec plateau de ramassage."
        });
      } else {
        tasks.push({
          id: `${fieldId}-task-straw`,
          order: stepOrder++,
          month: harvestMonth,
          phase: "1. Gestion des pailles",
          title: "Broyage et éparpillage de la paille à la moissonneuse",
          toolId: "fs25-broyeur",
          speed: "Vitesse de moisson",
          impact: "Restitution de matière organique",
          notes: "Activer le broyeur de paille sur la moissonneuse-batteuse."
        });
      }
    }

    // 2. Broyeur de chaumes (Mois de récolte) -> Bonus +2.5%
    tasks.push({
      id: `${fieldId}-task-mulch`,
      order: stepOrder++,
      month: harvestMonth,
      phase: "2. Broyage des chaumes",
      title: "Passage du broyeur sur les chaumes de récolte",
      toolId: "fs25-broyeur",
      speed: "12-15 km/h",
      impact: "+2.5% de rendement sur la récolte N+1",
      notes: "À passer immédiatement sur les chaumes avant tout travail du sol. Valide l'état 'Chaumes broyées'."
    });

    // 3. Si couvert végétal recommandé : Semis du radis oléagineux / moutarde (Août ou Septembre)
    if (coverCropInfo.recommended) {
      tasks.push({
        id: `${fieldId}-task-cover-sow`,
        order: stepOrder++,
        month: harvestMonth === "Juillet" ? "Août" : "Septembre",
        phase: "3. Couvert végétal",
        title: `Implanter le couvert : ${coverCropInfo.type}`,
        toolId: "fs25-semoir-direct",
        speed: "15-18 km/h",
        impact: "+50 kg N/ha gratuit en Precision Farming et conformité RedTape",
        notes: coverCropInfo.timing + ". " + coverCropInfo.reason
      });
    }

    // 4. Chaux à dosage variable (Precision Farming)
    tasks.push({
      id: `${fieldId}-task-lime`,
      order: stepOrder++,
      month: harvestMonth === "Juillet" || harvestMonth === "Août" ? "Août" : harvestMonth,
      phase: "4. Chaux à dosage variable",
      title: "Épandage de chaux avec modulation automatique de dose",
      toolId: "fs25-epandeur-chaux",
      speed: "18-20 km/h",
      impact: "+15% de rendement et score pH optimal 100/100",
      notes: "Precision Farming ajuste automatiquement le débit de chaux selon la carte des sols pour atteindre le pH optimal."
    });

    // Déterminer la période d'implantation de la culture N+1
    const springSownCrops = ["fs25-mais-grain", "fs25-tournesol", "fs25-soja", "fs25-pomme-de-terre", "fs25-betterave", "fs25-carottes-panais", "fs25-betterave-rouge", "fs25-oignons", "fs25-chanvre", "fs25-coton", "fs25-avoine", "fs25-lin"];
    const isNextSpringSown = springSownCrops.includes(cropNPlus1.id);

    if (isNextSpringSown) {
      // ===== TRAVAUX DE PRINTEMPS =====
      if (coverCropInfo.recommended) {
        tasks.push({
          id: `${fieldId}-task-cover-destroy`,
          order: stepOrder++,
          month: "Mars",
          phase: "5. Destruction du couvert",
          title: "Destruction du couvert végétal (Broyage ou déchaumage)",
          toolId: "fs25-broyeur",
          speed: "15 km/h",
          impact: "Enfouissement de l'azote organique piégé",
          notes: "Broie la biomasse végétale avant l'implantation du semis de printemps."
        });
      }

      if (cropN.needsPlowing) {
        tasks.push({
          id: `${fieldId}-task-subsoil`,
          order: stepOrder++,
          month: "Mars",
          phase: "6. Restructuration du sol (Labour requis)",
          title: "Sous-soleuse et décompacteur (Recommandé en Precision Farming)",
          toolId: "fs25-sous-soleuse",
          speed: "12 km/h",
          impact: "Supprime le malus -10% de labour et préserve le score de sol",
          notes: "La sous-soleuse élimine l'obligation de labour imposée par les racines sans dégrader le score environnemental."
        });
      }

      tasks.push({
        id: `${fieldId}-task-sow-spring`,
        order: stepOrder++,
        month: "Avril",
        phase: "7. Semis de printemps et fertilisation",
        title: `Semer ${cropNPlus1.name} (Semoir monograine ou combiné) avec apport d'engrais modulé`,
        toolId: "fs25-semoir-monograine",
        speed: "15 km/h",
        impact: "Implantation de printemps et fertilisation modulée",
        notes: "Semis monograine avec fertilisation localisée."
      });

      tasks.push({
        id: `${fieldId}-task-roll-spring`,
        order: stepOrder++,
        month: "Avril",
        phase: "8. Roulage de finition",
        title: "Passage du rouleau compresseur de sol sur le champ semé",
        toolId: "fs25-rouleau-sol",
        speed: "15 km/h",
        impact: "+2.5% de rendement et enfoncement des petites pierres",
        notes: "À passer immédiatement après le semis avant la levée."
      });

      tasks.push({
        id: `${fieldId}-task-n-spring`,
        order: stepOrder++,
        month: "Mai",
        phase: "9. Azote et désherbage ciblé",
        title: `Apport d'azote ciblé (Capteurs ou lisier) et désherbage ciblé par caméras`,
        toolId: "fs25-pf-capteurs-isaria",
        speed: "15-18 km/h",
        impact: "Score Azote et Désherbage 100/100 dans Precision Farming",
        notes: "Les capteurs optiques scannent la culture en direct pour ajuster le débit au kg près."
      });

    } else {
      // ===== TRAVAUX D'AUTOMNE (CÉRÉALES D'HIVER & COLZA) =====
      const autumnSowMonth = cropNPlus1.id === "fs25-colza" ? "Août" : "Septembre";

      if (cropN.needsPlowing) {
        tasks.push({
          id: `${fieldId}-task-subsoil`,
          order: stepOrder++,
          month: autumnSowMonth,
          phase: "5. Restructuration du sol (Labour requis)",
          title: "Sous-soleuse et décompacteur (Recommandé en Precision Farming)",
          toolId: "fs25-sous-soleuse",
          speed: "12 km/h",
          impact: "Supprime le malus -10% de labour et préserve le score de sol",
          notes: "La sous-soleuse élimine l'obligation de labour imposée par les racines sans dégrader le score environnemental."
        });
      }

      tasks.push({
        id: `${fieldId}-task-sow-autumn`,
        order: stepOrder++,
        month: autumnSowMonth,
        phase: "6. Semis d'automne (Score PF 100/100)",
        title: `Semer ${cropNPlus1.name} au semoir direct sans labour avec fertilisation`,
        toolId: "fs25-semoir-direct",
        speed: "15-18 km/h",
        impact: "Score Sol PF 100/100 et 1er apport d'azote modulé",
        notes: "Le semis direct sans labour permet d'obtenir la note maximale de 100/100 au score de travail du sol de Precision Farming."
      });

      tasks.push({
        id: `${fieldId}-task-roll-autumn`,
        order: stepOrder++,
        month: autumnSowMonth,
        phase: "7. Roulage de finition",
        title: "Passage du rouleau compresseur de sol sur le champ semé",
        toolId: "fs25-rouleau-sol",
        speed: "15 km/h",
        impact: "+2.5% de rendement et enfoncement des petites pierres",
        notes: "À passer immédiatement après le semis avant la levée des plantules."
      });

      tasks.push({
        id: `${fieldId}-task-n-winter-exit`,
        order: stepOrder++,
        month: "Mars",
        phase: "8. Azote modulé (Sortie d'hiver)",
        title: `2ème apport d'azote avec capteurs optiques (Cible : ${cropNPlus1.pfNitrogenTarget || "Optimale"})`,
        toolId: "fs25-pf-capteurs-isaria",
        speed: "15-18 km/h",
        impact: "Score Azote PF 100/100 et 100% de fertilisation atteinte",
        notes: "Les capteurs optiques scannent la culture vivante en temps réel pour doser l'engrais au kg près sans surdosage."
      });

      tasks.push({
        id: `${fieldId}-task-spot-spray`,
        order: stepOrder++,
        month: "Avril",
        phase: "9. Désherbage ciblé",
        title: "Pulvérisateur ciblé par caméras ou herse étrille mécanique",
        toolId: "fs25-pf-spot-spraying",
        speed: "15 km/h",
        impact: "Score Désherbage PF 100/100 (Économie de 90% d'herbicide)",
        notes: "Les caméras intelligentes déclenchent la pulvérisation uniquement au-dessus des adventices."
      });
    }

    // Associer les détails des outils
    tasks.forEach(t => {
      const toolObj = getToolById(t.toolId);
      t.toolDetails = toolObj ? {
        name: toolObj.name,
        category: toolObj.categoryLabel,
        dlc: toolObj.dlc
      } : { name: "Outil adapté", category: "", dlc: "" };
    });

    return tasks;
  }

  // ==================== 4. ANALYSE & RENDU GLOBAL ====================
  function runFieldAnalysis(field) {
    const cropN = getCropById(field.cropN);
    const allCrops = getAllCrops();

    // Classement des cultures candidates pour N+1 sur la base de l'historique 5 ans
    const candidateRankings = allCrops.map(candidate => {
      const rot = calculate5YearRotationScore(field, candidate.id);
      return {
        crop: candidate,
        rotationScore: rot.score,
        rotationStatus: rot.status,
        rotationText: rot.text
      };
    });

    candidateRankings.sort((a, b) => b.rotationScore - a.rotationScore);

    const topCandidate = candidateRankings[0];
    const chosenCropId = field.targetCropNPlus1 || topCandidate.crop.id;
    const chosenCrop = getCropById(chosenCropId);
    const chosenRotationInfo = calculate5YearRotationScore(field, chosenCrop.id);

    const baseSoilYield = calculateWeightedSoilYield(field.soilDistribution);
    const totalPotentialYield = baseSoilYield + Math.max(chosenRotationInfo.score, -25) + 5;

    const coverCropInfo = evaluateCoverCropNeed(cropN, chosenCrop);
    const tasks = generateMonthlyPostHarvestTasks(cropN, chosenCrop, coverCropInfo, field.strawHandled, field.id);
    const redTapeAudit = auditPaperasserie5Years(field, chosenCrop);

    return {
      field,
      cropN,
      chosenCrop,
      chosenRotationInfo,
      candidateRankings,
      baseSoilYield,
      totalPotentialYield,
      coverCropInfo,
      tasks,
      redTapeAudit
    };
  }

  function toggleTaskCompletion(fieldId, taskId) {
    const field = state.fields.find(f => f.id === fieldId);
    if (!field) return;
    if (!field.completedTasks) field.completedTasks = {};
    field.completedTasks[taskId] = !field.completedTasks[taskId];
    saveState();
    renderApp();
  }

  // ==================== 5. RENDU DE L'INTERFACE ====================
  function renderApp() {
    renderParcelSwitcher();

    if (state.viewMode === "global_calendar") {
      renderGlobalCalendarView();
    } else {
      renderSingleParcelView();
    }
  }

  function renderParcelSwitcher() {
    const container = document.getElementById("parcel-switcher-tabs");
    if (!container) return;

    const tabsHtml = state.fields.map(f => {
      const isActive = f.id === state.activeFieldId;
      const crop = getCropById(f.cropN);
      const nextCrop = getCropById(f.targetCropNPlus1 || "fs25-colza");

      return `
        <button class="parcel-tab-btn ${isActive ? "active" : ""}" onclick="window.AgriEngine.switchActiveField('${f.id}')">
          <span class="parcel-tab-name font-bold">${escapeHtml(f.name)}</span>
          <span class="parcel-tab-crops text-xs text-muted">${escapeHtml(crop.name.split(" ")[0])} ➔ ${escapeHtml(nextCrop.name.split(" ")[0])}</span>
        </button>
      `;
    }).join("");

    container.innerHTML = `
      <div class="parcel-tabs-list">
        ${tabsHtml}
        <button class="btn btn-secondary btn-sm" onclick="window.AgriEngine.addNewField()">+ Ajouter un champ</button>
      </div>
      <div class="parcel-actions-wrap">
        <button class="btn btn-secondary btn-xs" onclick="window.AgriEngine.renameActiveField()">Renommer</button>
        <button class="btn btn-secondary btn-xs" onclick="window.AgriEngine.duplicateActiveField()">Dupliquer</button>
        ${state.fields.length > 1 ? `<button class="btn btn-secondary btn-xs text-danger-custom" onclick="window.AgriEngine.deleteActiveField()">Supprimer</button>` : ""}
      </div>
    `;
  }

  function renderSingleParcelView() {
    const field = getActiveField();
    const analysis = runFieldAnalysis(field);
    const container = document.getElementById("analysis-results-container");
    if (!container) return;

    const { cropN, chosenCrop, chosenRotationInfo, candidateRankings, baseSoilYield, totalPotentialYield, tasks, redTapeAudit } = analysis;

    // Rendu de la frise chronologique des 5 années d'historique
    const historyYears = [
      { label: "Année N-4", cropId: field.cropN4 },
      { label: "Année N-3", cropId: field.cropN3 },
      { label: "Année N-2", cropId: field.cropN2 },
      { label: "Année N-1", cropId: field.cropN1 },
      { label: "Année N (Récoltée)", cropId: field.cropN, current: true },
      { label: "Année N+1 (Projetée)", cropId: chosenCrop.id, target: true }
    ];

    const historyRibbonHtml = historyYears.map((h, idx) => {
      const cropObj = h.cropId ? getCropById(h.cropId) : null;
      const isTarget = !!h.target;
      const isCurrent = !!h.current;

      return `
        <div class="history-step-node ${isTarget ? "history-target" : ""} ${isCurrent ? "history-current" : ""}">
          <div class="history-node-label text-xs">${escapeHtml(h.label)}</div>
          <div class="history-node-crop font-bold text-sm">${cropObj ? escapeHtml(cropObj.name) : "Non renseigné"}</div>
          ${isTarget ? `<div class="history-bonus-tag text-xs font-bold text-success-custom">${chosenRotationInfo.score >= 0 ? "+" + chosenRotationInfo.score + "%" : chosenRotationInfo.score + "%"}</div>` : ""}
        </div>
        ${idx < historyYears.length - 1 ? `<div class="history-connector">➔</div>` : ""}
      `;
    }).join("");

    // Rendu du Top 4 des meilleures cultures recommandées
    const topRecommendationsHtml = candidateRankings.slice(0, 4).map((cand, idx) => {
      const isSelected = cand.crop.id === chosenCrop.id;
      const isTop1 = idx === 0;

      return `
        <div class="rotation-candidate-card ${isSelected ? "candidate-selected" : ""} ${isTop1 ? "candidate-top1" : ""}" 
             onclick="window.AgriEngine.selectNextCrop('${cand.crop.id}')">
          <div class="candidate-header">
            <div>
              <div class="d-flex gap-2 align-items-center">
                <h4 class="cand-title">${escapeHtml(cand.crop.name)}</h4>
                ${isTop1 ? '<span class="badge-tag-owned">Choix optimal</span>' : ""}
                ${isSelected && !isTop1 ? '<span class="badge-tag-owned">Sélectionné</span>' : ""}
              </div>
              <div class="cand-fam text-muted text-xs">${escapeHtml(cand.crop.familyLabel)}</div>
            </div>
          </div>
          <div class="cand-bonus-pill status-${cand.rotationStatus}">
            ${escapeHtml(cand.rotationText)}
          </div>
          <div class="cand-footer text-xs text-muted">
            Azote cible PF : <strong>${escapeHtml(cand.crop.pfNitrogenTarget || "Normal")}</strong>
          </div>
        </div>
      `;
    }).join("");

    // Rendu des cultures à éviter (malus)
    const badCandidates = candidateRankings.filter(c => c.rotationScore < 0);
    const badCandidatesHtml = badCandidates.map(cand => `
      <div class="bad-candidate-pill" onclick="window.AgriEngine.selectNextCrop('${cand.crop.id}')">
        <span><strong>${escapeHtml(cand.crop.name)}</strong></span>
        <span class="text-xs text-danger-custom">${escapeHtml(cand.rotationText)}</span>
      </div>
    `).join("");

    // Rendu du bandeau d'audit Paperasserie (RedTape)
    let redTapeHtml = "";
    if (redTapeAudit.issues.length > 0) {
      redTapeHtml = `
        <div class="redtape-banner redtape-warning mb-4">
          <div class="redtape-header">
            <span class="font-bold text-sm">Mod Paperasserie (RedTape) — Points de vigilance réglementaires (Historique 5 ans) :</span>
            <span class="badge-redtape-status text-xs">${redTapeAudit.isCompliant ? "Conforme avec vigilance" : "Risque de non-conformité"}</span>
          </div>
          <ul class="redtape-issues-list text-xs">
            ${redTapeAudit.issues.map(iss => `<li>• ${escapeHtml(iss)}</li>`).join("")}
          </ul>
          <div class="redtape-footer text-xs text-muted mt-1">
            Diversité d'assolement de l'exploitation : <strong>${escapeHtml(redTapeAudit.farmDiversityStatus)}</strong>
          </div>
        </div>
      `;
    } else {
      redTapeHtml = `
        <div class="redtape-banner redtape-success mb-4">
          <div class="redtape-header">
            <span class="font-bold text-sm">Mod Paperasserie (RedTape) — 100% Conforme (Historique 5 ans validé)</span>
            <span class="badge-redtape-ok text-xs">Audit validé</span>
          </div>
          <p class="text-xs text-muted">L'enchaînement cultural sur 5 ans et la couverture des sols respectent l'ensemble des exigences environnementales et d'assolement.</p>
        </div>
      `;
    }

    // Regroupement des tâches par MOIS DE JEU
    let tasksByMonth = {};
    tasks.forEach(t => {
      if (!tasksByMonth[t.month]) tasksByMonth[t.month] = [];
      tasksByMonth[t.month].push(t);
    });

    let monthlyTimelineHtml = Object.keys(tasksByMonth).map(monthName => {
      const monthTasks = tasksByMonth[monthName];
      const monthTasksHtml = monthTasks.map(task => {
        const isDone = !!(field.completedTasks && field.completedTasks[task.id]);

        return `
          <div class="workflow-task-item ${isDone ? "task-is-done" : ""}">
            <div class="task-checkbox-wrap">
              <input type="checkbox" id="${task.id}" ${isDone ? "checked" : ""} 
                     onchange="window.AgriEngine.toggleTaskCompletion('${field.id}', '${task.id}')">
            </div>
            <div class="task-details-col">
              <div class="d-flex justify-between align-items-start gap-2 flex-wrap">
                <div>
                  <span class="task-phase-badge">${escapeHtml(task.phase)}</span>
                  <h4 class="task-main-title ${isDone ? "text-strikethrough" : ""}">${escapeHtml(task.title)}</h4>
                </div>
                <div class="task-badges-wrap">
                  <span class="spec-pill"><span class="text-muted">Vitesse :</span> <strong>${escapeHtml(task.speed)}</strong></span>
                  <span class="spec-pill yield-bonus-pill highlight-bonus">${escapeHtml(task.impact)}</span>
                </div>
              </div>

              <div class="task-tool-recommended">
                <strong>Outil magasin :</strong> <span class="tool-name-highlight">${escapeHtml(task.toolDetails.name)}</span>
              </div>

              <div class="task-agronomic-note">
                <em>${escapeHtml(task.notes)}</em>
              </div>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="monthly-timeline-block mb-4">
          <div class="monthly-header-badge">
            <span class="month-name-tag font-bold">${escapeHtml(monthName)}</span>
            <span class="month-task-count text-xs text-muted">${monthTasks.length} intervention${monthTasks.length > 1 ? "s" : ""}</span>
          </div>
          <div class="monthly-tasks-container">
            ${monthTasksHtml}
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <!-- AUDIT PAPERASSERIE (REDTAPE) -->
      ${redTapeHtml}

      <!-- FRISE CHRONOLOGIQUE DES 5 ANS DE ROTATION -->
      <section class="card mb-4">
        <h3 class="section-sub-title">Historique des 5 dernières cultures & Projection N+1 (${escapeHtml(field.name)}) :</h3>
        <div class="history-ribbon-wrapper">
          ${historyRibbonHtml}
        </div>
      </section>

      <!-- SYNTHÈSE DE RECOMMANDATION N+1 -->
      <section class="card result-hero-card">
        <div class="result-hero-header">
          <div class="hero-crop-selected">
            <div>
              <span class="hero-label">Culture recommandée pour l'année N+1 (${escapeHtml(field.name)}) :</span>
              <h2 class="hero-crop-title">${escapeHtml(chosenCrop.name)}</h2>
              <div class="hero-crop-meta text-sm text-muted">
                Rotation 5 ans : <strong class="text-success-custom">${escapeHtml(chosenRotationInfo.text)}</strong> • Azote cible : <strong>${escapeHtml(chosenCrop.pfNitrogenTarget || "Normal")}</strong>
              </div>
            </div>
          </div>

          <div class="hero-yield-box">
            <div class="yield-box-label">Potentiel de rendement max :</div>
            <div class="yield-box-val">${totalPotentialYield}%</div>
            <div class="yield-box-sub text-xs text-muted">Sol (${baseSoilYield}%) + Rotation (${chosenRotationInfo.score >= 0 ? "+" + chosenRotationInfo.score : chosenRotationInfo.score}%) + Bonus techniques (+5%)</div>
          </div>
        </div>

        <!-- Classement des options de rotation -->
        <div class="rotation-options-section">
          <h3 class="section-sub-title">Classement des cultures pour ${escapeHtml(field.name)} selon l'historique 5 ans :</h3>
          <div class="rotation-candidates-grid">
            ${topRecommendationsHtml}
          </div>

          ${badCandidates.length > 0 ? `
            <div class="bad-candidates-wrap">
              <div class="bad-candidates-label text-danger-custom text-xs font-bold">Cultures déconseillées (Pénalité monoculture ou rotation trop serrée) :</div>
              <div class="bad-candidates-flex">${badCandidatesHtml}</div>
            </div>
          ` : ""}
        </div>
      </section>

      <!-- SECTION 2 : CALENDRIER DES TRAVAUX PAR MOIS -->
      <section class="mt-4">
        <div class="d-flex justify-between align-items-center mb-3 flex-wrap gap-2">
          <div>
            <h3 class="section-title-sm">Calendrier des travaux mois par mois pour ${escapeHtml(field.name)}</h3>
            <p class="text-muted text-xs">Suivez l'ordre d'intervention exact selon les saisons de Farming Simulator 25.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-secondary btn-sm" onclick="window.AgriEngine.toggleViewMode('global_calendar')">Vue Calendrier de toute la ferme</button>
            <button class="btn btn-secondary btn-sm" onclick="window.print()">Imprimer la feuille de route</button>
          </div>
        </div>

        <div class="workflow-steps-list">
          ${monthlyTimelineHtml}
        </div>
      </section>
    `;
  }

  function renderGlobalCalendarView() {
    const container = document.getElementById("analysis-results-container");
    if (!container) return;

    let allFarmTasksByMonth = {};
    MONTHS_ORDER.forEach(m => allFarmTasksByMonth[m] = []);

    state.fields.forEach(field => {
      const analysis = runFieldAnalysis(field);
      analysis.tasks.forEach(t => {
        if (!allFarmTasksByMonth[t.month]) allFarmTasksByMonth[t.month] = [];
        allFarmTasksByMonth[t.month].push({
          ...t,
          fieldName: field.name,
          fieldArea: field.areaHa,
          fieldId: field.id,
          isDone: !!(field.completedTasks && field.completedTasks[t.id])
        });
      });
    });

    let monthsGridHtml = MONTHS_ORDER.map(monthName => {
      const tasks = allFarmTasksByMonth[monthName] || [];
      if (tasks.length === 0) return "";

      const tasksRowsHtml = tasks.map(t => `
        <div class="global-calendar-row ${t.isDone ? "task-is-done" : ""}">
          <div class="d-flex align-items-center gap-2">
            <input type="checkbox" ${t.isDone ? "checked" : ""} 
                   onchange="window.AgriEngine.toggleTaskCompletion('${t.fieldId}', '${t.id}')">
            <span class="global-field-badge">${escapeHtml(t.fieldName)}</span>
          </div>
          <div class="global-task-title font-bold text-sm ${t.isDone ? "text-strikethrough" : ""}">${escapeHtml(t.title)}</div>
          <div class="global-task-tool text-xs text-muted">${escapeHtml(t.toolDetails.name)} (${escapeHtml(t.speed)})</div>
        </div>
      `).join("");

      return `
        <div class="global-month-card card mb-3">
          <div class="global-month-header">
            <h4 class="font-bold text-primary">${escapeHtml(monthName)}</h4>
            <span class="text-xs text-muted">${tasks.length} tâche${tasks.length > 1 ? "s" : ""} sur l'exploitation</span>
          </div>
          <div class="global-month-tasks-list mt-2">
            ${tasksRowsHtml}
          </div>
        </div>
      `;
    }).filter(Boolean).join("");

    container.innerHTML = `
      <div class="global-calendar-view-header card mb-4">
        <div class="d-flex justify-between align-items-center flex-wrap gap-2">
          <div>
            <h2 class="config-section-title">Calendrier Global des Travaux de l'Exploitation (Le Mechet)</h2>
            <p class="text-muted text-sm">Vue consolidée de l'ensemble de vos parcelles mois par mois pour ne rien oublier au fil des saisons.</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.AgriEngine.toggleViewMode('parcel')">Retour à la vue par champ</button>
        </div>
      </div>

      <div class="global-calendar-months-grid">
        ${monthsGridHtml}
      </div>
    `;
  }

  function toggleViewMode(newMode) {
    state.viewMode = newMode;
    saveState();
    renderApp();
  }

  // ==================== 6. SYNCHRONISATION DU FORMULAIRE HISTORIQUE SUR 5 ANS ====================
  function syncFormWithActiveField() {
    const field = getActiveField();
    const selectCropN = document.getElementById("select-crop-n");
    const selectCropN1 = document.getElementById("select-crop-n1");
    const selectCropN2 = document.getElementById("select-crop-n2");
    const selectCropN3 = document.getElementById("select-crop-n3");
    const selectCropN4 = document.getElementById("select-crop-n4");
    const selectStraw = document.getElementById("select-straw-handling");

    const loamySandInput = document.getElementById("soil-loamy-sand-val");
    const sandyLoamInput = document.getElementById("soil-sandy-loam-val");
    const loamInput = document.getElementById("soil-loam-val");
    const siltyClayInput = document.getElementById("soil-silty-clay-val");

    if (selectCropN) selectCropN.value = field.cropN || "";
    if (selectCropN1) selectCropN1.value = field.cropN1 || "";
    if (selectCropN2) selectCropN2.value = field.cropN2 || "";
    if (selectCropN3) selectCropN3.value = field.cropN3 || "";
    if (selectCropN4) selectCropN4.value = field.cropN4 || "";
    if (selectStraw) selectStraw.value = field.strawHandled || "chopped";

    if (loamySandInput) loamySandInput.value = field.soilDistribution.loamy_sand || 0;
    if (sandyLoamInput) sandyLoamInput.value = field.soilDistribution.sandy_loam || 0;
    if (loamInput) loamInput.value = field.soilDistribution.loam || 0;
    if (siltyClayInput) siltyClayInput.value = field.soilDistribution.silty_clay || 0;

    updateSoilDistributionBar();
  }

  function initFormControls() {
    const selectCropN = document.getElementById("select-crop-n");
    const selectCropN1 = document.getElementById("select-crop-n1");
    const selectCropN2 = document.getElementById("select-crop-n2");
    const selectCropN3 = document.getElementById("select-crop-n3");
    const selectCropN4 = document.getElementById("select-crop-n4");
    const selectStraw = document.getElementById("select-straw-handling");

    populateCropsDropdown(selectCropN, false);
    populateCropsDropdown(selectCropN1, true);
    populateCropsDropdown(selectCropN2, true);
    populateCropsDropdown(selectCropN3, true);
    populateCropsDropdown(selectCropN4, true);

    selectCropN?.addEventListener("change", e => {
      const field = getActiveField();
      field.cropN = e.target.value;
      field.targetCropNPlus1 = null;
      saveState();
      renderApp();
    });

    selectCropN1?.addEventListener("change", e => {
      const field = getActiveField();
      field.cropN1 = e.target.value;
      field.targetCropNPlus1 = null;
      saveState();
      renderApp();
    });

    selectCropN2?.addEventListener("change", e => {
      const field = getActiveField();
      field.cropN2 = e.target.value;
      field.targetCropNPlus1 = null;
      saveState();
      renderApp();
    });

    selectCropN3?.addEventListener("change", e => {
      const field = getActiveField();
      field.cropN3 = e.target.value;
      field.targetCropNPlus1 = null;
      saveState();
      renderApp();
    });

    selectCropN4?.addEventListener("change", e => {
      const field = getActiveField();
      field.cropN4 = e.target.value;
      field.targetCropNPlus1 = null;
      saveState();
      renderApp();
    });

    selectStraw?.addEventListener("change", e => {
      const field = getActiveField();
      field.strawHandled = e.target.value;
      saveState();
      renderApp();
    });

    initSoilDistributionSliders();
    syncFormWithActiveField();
  }

  function populateCropsDropdown(selectEl, allowEmpty = false) {
    if (!selectEl) return;
    const crops = getAllCrops();
    const families = {
      cereales: "Céréales et grains (Blé, Orge, Seigle, Triticale...)",
      oleoprot: "Oléagineux, protéagineux et fibres (Soja, Colza, Lin, Tournesol...)",
      fourrages: "Légumineuses pérennes et fourrages (Luzerne, Trèfle, Herbe...)",
      lourdes: "Cultures avec labour obligatoire (Maïs, Pommes de terre, Betteraves)",
      premium: "Légumes et bulbes (Carottes, Panais, Oignons, Betteraves rouges)",
      nouveautes: "Nouveautés et maraîchage (Riz, Épinards, Pois, Haricots)",
      speciales: "Cultures spéciales et industrielles (Chanvre, Coton, Vignes)",
      platinum: "Foresterie (Peupliers)"
    };

    let html = "";
    if (allowEmpty) {
      html += `<option value="">-- Aucune / Non renseigné --</option>`;
    }

    Object.keys(families).forEach(famKey => {
      const famCrops = crops.filter(c => c.family === famKey);
      if (famCrops.length > 0) {
        html += `<optgroup label="${families[famKey]}">`;
        famCrops.forEach(c => {
          html += `<option value="${c.id}">${c.name}</option>`;
        });
        html += `</optgroup>`;
      }
    });

    selectEl.innerHTML = html;
  }

  function initSoilDistributionSliders() {
    const loamySandInput = document.getElementById("soil-loamy-sand-val");
    const sandyLoamInput = document.getElementById("soil-sandy-loam-val");
    const loamInput = document.getElementById("soil-loam-val");
    const siltyClayInput = document.getElementById("soil-silty-clay-val");

    if (!loamySandInput) return;

    const updateSoil = () => {
      const field = getActiveField();
      field.soilDistribution.loamy_sand = parseFloat(loamySandInput.value) || 0;
      field.soilDistribution.sandy_loam = parseFloat(sandyLoamInput.value) || 0;
      field.soilDistribution.loam = parseFloat(loamInput.value) || 0;
      field.soilDistribution.silty_clay = parseFloat(siltyClayInput.value) || 0;

      updateSoilDistributionBar();
      saveState();
      renderApp();
    };

    [loamySandInput, sandyLoamInput, loamInput, siltyClayInput].forEach(inp => {
      inp.addEventListener("input", updateSoil);
    });

    document.querySelectorAll(".btn-soil-preset").forEach(btn => {
      btn.addEventListener("click", () => {
        const field = getActiveField();
        const preset = btn.dataset.preset;
        if (preset === "loamy-sand-pure") {
          field.soilDistribution = { loamy_sand: 100, sandy_loam: 0, loam: 0, silty_clay: 0 };
        } else if (preset === "sandy-loam-pure") {
          field.soilDistribution = { loamy_sand: 0, sandy_loam: 100, loam: 0, silty_clay: 0 };
        } else if (preset === "loam-pure") {
          field.soilDistribution = { loamy_sand: 0, sandy_loam: 0, loam: 100, silty_clay: 0 };
        } else if (preset === "silty-clay-pure") {
          field.soilDistribution = { loamy_sand: 0, sandy_loam: 0, loam: 0, silty_clay: 100 };
        } else if (preset === "balanced") {
          field.soilDistribution = { loamy_sand: 10, sandy_loam: 30, loam: 40, silty_clay: 20 };
        }

        loamySandInput.value = field.soilDistribution.loamy_sand;
        sandyLoamInput.value = field.soilDistribution.sandy_loam;
        loamInput.value = field.soilDistribution.loam;
        siltyClayInput.value = field.soilDistribution.silty_clay;

        updateSoilDistributionBar();
        saveState();
        renderApp();
      });
    });
  }

  function updateSoilDistributionBar() {
    const field = getActiveField();
    const total = (field.soilDistribution.loamy_sand || 0) + (field.soilDistribution.sandy_loam || 0) + (field.soilDistribution.loam || 0) + (field.soilDistribution.silty_clay || 0);
    const totalEl = document.getElementById("soil-total-indicator");
    if (totalEl) {
      totalEl.textContent = `${total}%`;
      totalEl.className = total === 100 ? "text-success-custom font-bold" : "text-danger-custom font-bold";
    }
  }

  function selectNextCrop(cropId) {
    const field = getActiveField();
    field.targetCropNPlus1 = cropId;
    saveState();
    renderApp();
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function initApp() {
    loadState();
    initTheme();
    initFormControls();
    renderApp();
  }

  window.AgriEngine = {
    switchActiveField,
    addNewField,
    renameActiveField,
    duplicateActiveField,
    deleteActiveField,
    selectNextCrop,
    toggleTaskCompletion,
    toggleViewMode
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
