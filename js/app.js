/**
 * FS25 Post-Harvest, Precision Farming & Crop Rotation Engine
 * Analyse agronomique poussée : Culture N, Culture N-1, Distribution du sol PF (4 types de sol),
 * Recommandation de rotation optimale, nécessité de couvert végétal et feuille de route des travaux.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "fs25_post_harvest_planner_v3";

  // État initial par défaut
  let state = {
    cropN: "fs25-soja",            // Culture récoltée cette année (N)
    cropNMinus1: "fs25-mais-grain", // Culture de l'année précédente (N-1)
    targetCropNPlus1: null,        // Culture choisie pour N+1 (auto-calculée si null)
    strawHandled: "chopped",       // "bales" ou "chopped"
    soilDistribution: {
      loam: 60,       // Glaise (125% max)
      sandy_loam: 30, // Glaise sableuse (100% max)
      silty_clay: 10, // Argile limoneuse (110% max)
      loamy_sand: 0   // Sable glaiseux (80% max)
    },

    themePreference: "system", // "system", "dark", "light"
    savedPresets: []           // Liste de parcelles sauvegardées par l'utilisateur
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
      updateThemeButtonIcon();
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

  function updateThemeButtonIcon() {
    const iconEl = document.getElementById("theme-icon-indicator");
    const textEl = document.getElementById("theme-text-indicator");
    if (!iconEl) return;

    if (state.themePreference === "system") {
      iconEl.textContent = "💻";
      if (textEl) textEl.textContent = "Auto (Système)";
    } else if (state.themePreference === "dark") {
      iconEl.textContent = "🌙";
      if (textEl) textEl.textContent = "Sombre";
    } else {
      iconEl.textContent = "☀️";
      if (textEl) textEl.textContent = "Clair";
    }
  }

  // ==================== 2. LOCALSTORAGE ====================
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
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Erreur sauvegarde localStorage:", e);
    }
  }

  // ==================== 3. MOTEUR D'ASSOLEMENT (CROP ROTATION) & SOLS (PF) ====================
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
   * Calcule le score de rotation selon le mod Crop Rotation pour un enchaînement (N-1 -> N -> N+1)
   */
  function calculateRotationScore(cropNMinus1Id, cropNId, candidateCropId) {
    const cropN = getCropById(cropNId);
    const cropNMinus1 = cropNMinus1Id ? getCropById(cropNMinus1Id) : null;
    const candidate = getCropById(candidateCropId);

    if (!cropN || !candidate) return { score: 0, status: "neutral", text: "+0% (Rotation neutre)" };

    // 1. Détection des monocultures directes (N -> candidate identique)
    if (cropN.id === candidate.id) {
      return {
        score: -25,
        status: "danger",
        text: "-25% (Pénalité sévère : Monoculture directe de 2 ans consécutifs !)"
      };
    }

    // 2. Détection de retour trop précoce (N-1 identique à candidate)
    if (cropNMinus1 && cropNMinus1.id === candidate.id) {
      return {
        score: -10,
        status: "warning",
        text: "-10% (Retour trop rapide sur la même culture après 1 an)"
      };
    }

    // 3. Détection de même famille consécutive (ex: Céréale sur Céréale)
    if (cropN.rotationCategory === candidate.rotationCategory && cropN.rotationCategory !== "grass") {
      return {
        score: -15,
        status: "danger",
        text: `-15% (Même famille botanique consécutive : ${cropN.familyLabel})`
      };
    }

    // 4. Vérification des précédents parfaits listés dans la base
    const matchIdeal = (cropN.idealNextCrops || []).find(r => r.cropId === candidate.id);
    if (matchIdeal) {
      // Bonus supplémentaire si rotation triennale équilibrée (N-1 != N != N+1)
      let bonusVal = 15;
      if (matchIdeal.bonus.includes("20%")) bonusVal = 20;
      else if (matchIdeal.bonus.includes("18%")) bonusVal = 18;
      else if (matchIdeal.bonus.includes("12%")) bonusVal = 12;
      else if (matchIdeal.bonus.includes("10%")) bonusVal = 10;

      // Si N-1 est d'une 3ème famille différente, c'est une rotation d'or !
      if (cropNMinus1 && cropNMinus1.rotationCategory !== cropN.rotationCategory && cropNMinus1.rotationCategory !== candidate.rotationCategory) {
        bonusVal = Math.min(bonusVal + 2, 20);
      }

      return {
        score: bonusVal,
        status: "perfect",
        text: `+${bonusVal}% (${matchIdeal.bonus.replace(/\+\d+%\s*/, "")})`
      };
    }

    // 5. Vérification des incompatibilités
    const matchBad = (cropN.badNextCrops || []).find(r => r.cropId === candidate.id);
    if (matchBad) {
      return {
        score: -15,
        status: "danger",
        text: matchBad.malus
      };
    }

    // 6. Règle générale des familles bénéfiques
    if (cropN.rotationCategory === "legumes" && (candidate.rotationCategory === "cereals" || candidate.rotationCategory === "oilseeds")) {
      return { score: 15, status: "good", text: "+15% (Précédent Légumineuse fixatrice d'azote)" };
    }
    if (cropN.rotationCategory === "cereals" && (candidate.rotationCategory === "oilseeds" || candidate.rotationCategory === "legumes")) {
      return { score: 15, status: "good", text: "+15% (Alternance Céréale ➔ Oléagineux/Légumineuse)" };
    }
    if (cropN.rotationCategory === "oilseeds" && candidate.rotationCategory === "cereals") {
      return { score: 18, status: "perfect", text: "+18% (Oléagineux ➔ Céréale d'hiver)" };
    }
    if (cropN.rotationCategory === "roots" && (candidate.rotationCategory === "cereals" || candidate.rotationCategory === "legumes")) {
      return { score: 15, status: "good", text: "+15% (Sarclées/Tubercules ➔ Céréale meunière)" };
    }

    return { score: 5, status: "neutral", text: "+5% (Rotation standard acceptable)" };
  }

  /**
   * Calcule le potentiel de rendement Precision Farming moyen pondéré par la distribution du sol
   * 1. Glaise (Loam) : 125%
   * 2. Argile limoneuse (Silty Clay) : 110%
   * 3. Glaise sableuse (Sandy Loam) : 100%
   * 4. Sable glaiseux (Loamy Sand) : 80%
   */
  function calculateWeightedSoilYield(soilDist) {
    const yieldFactors = {
      loam: 1.25,        // Glaise : 125%
      silty_clay: 1.10,  // Argile limoneuse : 110%
      sandy_loam: 1.00,  // Glaise sableuse : 100%
      loamy_sand: 0.80   // Sable glaiseux : 80%
    };


    let totalPercent = (soilDist.loam || 0) + (soilDist.sandy_loam || 0) + (soilDist.silty_clay || 0) + (soilDist.loamy_sand || 0);
    if (totalPercent === 0) totalPercent = 100;

    const weighted = (
      ((soilDist.loam || 0) * yieldFactors.loam) +
      ((soilDist.sandy_loam || 0) * yieldFactors.sandy_loam) +
      ((soilDist.silty_clay || 0) * yieldFactors.silty_clay) +
      ((soilDist.loamy_sand || 0) * yieldFactors.loamy_sand)
    ) / totalPercent;

    return Math.round(weighted * 100); // ex: 115%
  }

  /**
   * Détermine si un couvert végétal (Radis oléagineux / CIPAN) est recommandé ou nécessaire
   */
  function evaluateCoverCropNeed(cropN, cropNPlus1) {
    // Si la culture N est récoltée en été (Juin - Août) et que la culture suivante est semée au printemps (Maïs, Tournesol, Soja, Coton, Pommes de terre, Betteraves, Légumes)
    const summerHarvestCrops = ["fs25-ble", "fs25-orge", "fs25-avoine", "fs25-colza", "fs25-pois-haricots"];
    const springSownCrops = ["fs25-mais-grain", "fs25-tournesol", "fs25-soja", "fs25-pomme-de-terre", "fs25-betterave", "fs25-carottes-panais", "fs25-betterave-rouge", "fs25-coton"];

    const isSummerHarvest = summerHarvestCrops.includes(cropN.id);
    const isSpringSown = springSownCrops.includes(cropNPlus1.id);

    if (isSummerHarvest && isSpringSown) {
      return {
        recommended: true,
        type: "Radis oléagineux (Oilseed Radish - Precision Farming)",
        reason: "Forte fenêtre d'interculture estivale/hivernale (6 à 8 mois) entre la moisson d'été et le semis de printemps. Le radis oléagineux apporte +1 NIVEAU D'AZOTE GRATUIT (+50 kg N/ha en Precision Farming) et empêche les mauvaises herbes de pousser !",
        timing: "Semis en août/septembre avec semoir direct -> Destruction au cultivateur/semoir direct au printemps avant semis",
        benefit: "+50 kg N/ha d'azote organique gratuit & protection du sol"
      };
    }

    if (cropN.id === "fs25-orge" && !isSpringSown) {
      return {
        recommended: true,
        type: "Radis oléagineux d'été rapide",
        reason: "L'orge est récoltée très tôt (juin/juillet). Un couvert de radis oléagineux de 60 jours peut être semé puis détruit avant le blé ou colza d'hiver pour enrichir le sol en azote gratuitement.",
        timing: "Semer immédiatement fin juin/juillet -> Détruire en septembre",
        benefit: "+1 niveau de fertilisation gratuit"
      };
    }

    return {
      recommended: false,
      type: "Non requis",
      reason: "La culture suivante est implantée rapidement après la récolte (semis d'automne/hiver sans longue période de sol nu).",
      timing: "Enchaînement direct vers les travaux de semis",
      benefit: "Gain de temps direct"
    };
  }

  /**
   * Génère l'itinéraire complet des travaux post-récolte
   */
  function generatePostHarvestTasks(cropN, cropNPlus1, coverCropInfo, strawHandled) {
    let tasks = [];
    let stepOrder = 1;

    // 1. Paille & Résidus
    if (cropN.hasStraw) {
      if (strawHandled === "bales") {
        tasks.push({
          order: stepOrder++,
          phase: "1. Récolte de la Paille",
          title: "Presser et ramasser les andains de paille",
          toolId: "fs25-presse-balles",
          speed: "15-20 km/h",
          impact: "Gros revenu ou litière pour animaux",
          notes: "Presse à balles (Göweil / Krone) avec plateau autochargeur de balles."
        });
      } else {
        tasks.push({
          order: stepOrder++,
          phase: "1. Gestion des Pailles",
          title: "Broyage de la paille à la moissonneuse",
          toolId: "fs25-broyeur",
          speed: "Moissonneuse",
          impact: "Restitution de matière organique",
          notes: "Activer l'éparpilleur et le broyeur de paille sur la moissonneuse-batteuse."
        });
      }
    }

    // 2. Broyeur de chaumes (Mulcher) -> Bonus +2.5%
    tasks.push({
      order: stepOrder++,
      phase: "2. Broyage des Chaumes (Mulching)",
      title: "Passer le broyeur sur les chaumes de récolte",
      toolId: "fs25-broyeur",
      speed: "12-15 km/h",
      impact: "+2.5% de rendement sur la récolte N+1",
      notes: "À passer immédiatement sur les chaumes avant tout travail du sol. Confère l'état 'Chaumes broyées'."
    });

    // 3. Si couvert végétal recommandé : Semis du radis oléagineux
    if (coverCropInfo.recommended) {
      tasks.push({
        order: stepOrder++,
        phase: "3. Couvert Végétal (Engrais vert PF)",
        title: `Implanter le couvert : ${coverCropInfo.type}`,
        toolId: "fs25-semoir-direct",
        speed: "15-18 km/h",
        impact: "+50 kg N/ha gratuit en Precision Farming",
        notes: coverCropInfo.timing + ". " + coverCropInfo.reason
      });
    }

    // 4. Labour / Sous-soleuse (si la culture récoltée déclenche l'obligation de labour)
    if (cropN.needsPlowing && state.settings.periodicPlowing) {
      tasks.push({
        order: stepOrder++,
        phase: "4. Restructuration du Sol (Labour requis)",
        title: "Sous-soleuse / Décompacteur (Recommandé en Precision Farming)",
        toolId: "fs25-sous-soleuse",
        speed: "12 km/h",
        impact: "Supprime le malus -10% de labour & Préserve le score de sol PF",
        notes: "La sous-soleuse élimine l'obligation de labour imposée par le maïs/tubercules/carottes sans faire chuter votre score environnemental PF et sans sortir de grosses pierres."
      });
    }

    // 5. Chaux à dosage variable (Precision Farming)
    tasks.push({
      order: stepOrder++,
      phase: "5. Chaux à Dosage Variable (PF)",
      title: "Épandage de chaux avec modulation automatique de dose",
      toolId: "fs25-epandeur-chaux",
      speed: "18-20 km/h",
      impact: "+15% de rendement & Score pH optimal 100/100",
      notes: "Precision Farming ajuste automatiquement le débit de chaux selon la carte des sols pour atteindre le pH parfait."
    });

    // 6. Semis de la culture N+1
    if (cropNPlus1.directDrillCompatible && cropNPlus1.id !== "fs25-riz-inonde") {
      tasks.push({
        order: stepOrder++,
        phase: "6. Semis Direct (Score PF 100/100)",
        title: `Semer ${cropNPlus1.name} au semoir direct sans labour avec cuve d'engrais`,
        toolId: "fs25-semoir-direct",
        speed: "15-18 km/h",
        impact: "Score Sol PF 100/100 + 1er apport d'azote modulé",
        notes: "Le semis direct sans labour permet d'obtenir la note maximale de 100/100 au score de travail du sol de Precision Farming."
      });
    } else if (cropNPlus1.id === "fs25-riz-inonde") {
      tasks.push({
        order: stepOrder++,
        phase: "6. Riziculture FS25",
        title: "Mise en eau de la rizière & Repiquage du riz",
        recommendedToolIds: ["fs25-repiqueuse-riz"],
        toolId: "fs25-repiqueuse-riz",
        speed: "8-12 km/h",
        impact: "Implantation rizière à haute valeur ajoutée",
        notes: "Ouvrir la vanne de pompage pour remplir la rizière et repiquer les barquettes de riz."
      });
    } else {
      tasks.push({
        order: stepOrder++,
        phase: "6. Semis & Fertilisation",
        title: `Semer ${cropNPlus1.name} (Semoir de précision / Planteuse) + 1er apport d'engrais`,
        toolId: "fs25-semoir-monograine",
        speed: "15 km/h",
        impact: "Implantation précise & fertilisation modulée",
        notes: "Semer sur lit préparé ou buttes."
      });
    }

    // 7. Roulage du sol
    if (cropNPlus1.id !== "fs25-riz-inonde") {
      tasks.push({
        order: stepOrder++,
        phase: "7. Roulage de Finition",
        title: "Passer le rouleau compresseur de sol sur le champ semé",
        toolId: "fs25-rouleau-sol",
        speed: "15 km/h",
        impact: "+2.5% de rendement & Enfonce les petites pierres",
        notes: "À passer immédiatement après le semis avant que les pousses ne germent."
      });
    }

    // 8. Deuxième apport d'azote avec capteurs Isaria / Lisier NIRS (PF)
    tasks.push({
      order: stepOrder++,
      phase: "8. Azote modulé (Capteurs Isaria / Lisier NIRS)",
      title: `Apport d'azote ciblé selon biomasse Isaria (Cible : ${cropNPlus1.pfNitrogenTarget || "Optimale"})`,
      toolId: "fs25-pf-capteurs-isaria",
      speed: "15-18 km/h",
      impact: "Score Azote PF 100/100 & 100% de fertilisation atteinte",
      notes: "Les capteurs optiques scannent la culture vivante en temps réel pour doser l'engrais au kg près sans surdosage."
    });

    // 9. Désherbage ciblé Spot Spraying (See & Spray)
    tasks.push({
      order: stepOrder++,
      phase: "9. Désherbage Intelligent (Spot Spraying)",
      title: "Pulvérisateur ciblé 'See & Spray' ou Herse étrille mécanique",
      toolId: "fs25-pf-spot-spraying",
      speed: "15 km/h",
      impact: "Score Désherbage PF 100/100 (Économie de 90% d'herbicide)",
      notes: "Les caméras intelligentes ne déclenchent la pulvérisation que là où des mauvaises herbes sont détectées."
    });

    // Associer les détails complets des outils
    tasks.forEach(t => {
      const toolObj = getToolById(t.toolId);
      t.toolDetails = toolObj ? {
        name: toolObj.name,
        icon: toolObj.icon,
        category: toolObj.categoryLabel,
        dlc: toolObj.dlc
      } : { name: "Outil adapté", icon: "🚜", category: "", dlc: "" };
    });

    return tasks;
  }

  // ==================== 4. ANALYSE & GÉNÉRATION DE LA RECOMMANDATION COMPLÈTE ====================
  function runAgronomicAnalysis() {
    const cropN = getCropById(state.cropN);
    const cropNMinus1 = state.cropNMinus1 ? getCropById(state.cropNMinus1) : null;
    const allCrops = getAllCrops();

    // 1. Évaluer chaque culture candidate pour N+1 selon le mod Crop Rotation
    const candidateRankings = allCrops.map(candidate => {
      const rot = calculateRotationScore(state.cropNMinus1, state.cropN, candidate.id);
      return {
        crop: candidate,
        rotationScore: rot.score,
        rotationStatus: rot.status,
        rotationText: rot.text
      };
    });

    // Trier les candidats du meilleur au pire score
    candidateRankings.sort((a, b) => b.rotationScore - a.rotationScore);

    // Déterminer la culture recommandée #1
    const topCandidate = candidateRankings[0];
    
    // Si l'utilisateur a sélectionné manuellement une culture pour N+1, on la prend, sinon on prend le top 1
    const chosenCropId = state.targetCropNPlus1 || topCandidate.crop.id;
    const chosenCrop = getCropById(chosenCropId);
    const chosenRotationInfo = calculateRotationScore(state.cropNMinus1, state.cropN, chosenCrop.id);

    // 2. Calcul du potentiel de rendement pondéré par la distribution du sol (PF)
    const baseSoilYield = calculateWeightedSoilYield(state.soilDistribution); // ex: 115%
    const totalPotentialYield = baseSoilYield + Math.max(chosenRotationInfo.score, -25) + 5; // +5% de bonus mulcher/roller

    // 3. Évaluation du couvert végétal
    const coverCropInfo = evaluateCoverCropNeed(cropN, chosenCrop);

    // 4. Génération de la feuille de route des travaux
    const tasks = generatePostHarvestTasks(cropN, chosenCrop, coverCropInfo, state.strawHandled);

    return {
      cropN,
      cropNMinus1,
      chosenCrop,
      chosenRotationInfo,
      candidateRankings,
      baseSoilYield,
      totalPotentialYield,
      coverCropInfo,
      tasks
    };
  }

  // ==================== 5. RENDU DE L'INTERFACE ====================
  function renderApp() {
    const analysis = runAgronomicAnalysis();
    const container = document.getElementById("analysis-results-container");
    if (!container) return;

    const { cropN, cropNMinus1, chosenCrop, chosenRotationInfo, candidateRankings, baseSoilYield, totalPotentialYield, coverCropInfo, tasks } = analysis;

    // Rendu du Top 3 des meilleures cultures recommandées
    const topRecommendationsHtml = candidateRankings.slice(0, 4).map((cand, idx) => {
      const isSelected = cand.crop.id === chosenCrop.id;
      const isTop1 = idx === 0;

      return `
        <div class="rotation-candidate-card ${isSelected ? "candidate-selected" : ""} ${isTop1 ? "candidate-top1" : ""}" 
             onclick="window.AgriEngine.selectNextCrop('${cand.crop.id}')">
          <div class="candidate-header">
            <span class="cand-icon">${cand.crop.icon}</span>
            <div>
              <div class="d-flex gap-2 align-items-center">
                <h4 class="cand-title">${escapeHtml(cand.crop.name)}</h4>
                ${isTop1 ? '<span class="badge-tag-owned">★ Choix Optimal</span>' : ""}
                ${isSelected && !isTop1 ? '<span class="badge-tag-owned">✓ Sélectionné</span>' : ""}
              </div>
              <div class="cand-fam text-muted text-xs">${escapeHtml(cand.crop.familyLabel)} • ${escapeHtml(cand.crop.dlc || "Base")}</div>
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
        <span>🔴 <strong>${escapeHtml(cand.crop.name)}</strong></span>
        <span class="text-xs text-danger-custom">${escapeHtml(cand.rotationText)}</span>
      </div>
    `).join("");

    // Rendu de la boîte Couvert Végétal
    let coverCropBoxHtml = "";
    if (coverCropInfo.recommended) {
      coverCropBoxHtml = `
        <div class="cover-crop-alert-box cover-crop-active">
          <div class="cover-crop-icon">🌱</div>
          <div class="cover-crop-content">
            <div class="d-flex justify-between align-items-center">
              <h4 class="cover-crop-title">Couvert Végétal Fortement Recommandé : ${escapeHtml(coverCropInfo.type)}</h4>
              <span class="cover-crop-badge">+50 kg N/ha Gratuit</span>
            </div>
            <p class="cover-crop-desc">${escapeHtml(coverCropInfo.reason)}</p>
            <div class="cover-crop-details text-xs">
              <span>📅 <strong>Période :</strong> ${escapeHtml(coverCropInfo.timing)}</span>
              <span>⭐ <strong>Bénéfice PF :</strong> ${escapeHtml(coverCropInfo.benefit)}</span>
            </div>
          </div>
        </div>
      `;
    } else {
      coverCropBoxHtml = `
        <div class="cover-crop-alert-box cover-crop-inactive">
          <div class="cover-crop-icon">⚡</div>
          <div class="cover-crop-content">
            <h4 class="cover-crop-title">Couvert végétal non nécessaire pour cette rotation</h4>
            <p class="cover-crop-desc text-muted">${escapeHtml(coverCropInfo.reason)}</p>
          </div>
        </div>
      `;
    }

    // Rendu de la liste des travaux post-récolte
    const tasksHtml = tasks.map((task, idx) => `
      <div class="workflow-task-item">
        <div class="task-step-number">${task.order}</div>
        <div class="task-details-col">
          <div class="d-flex justify-between align-items-start gap-2 flex-wrap">
            <div>
              <span class="task-phase-badge">${escapeHtml(task.phase)}</span>
              <h4 class="task-main-title">${escapeHtml(task.title)}</h4>
            </div>
            <div class="task-badges-wrap">
              <span class="spec-pill"><span class="text-muted">Vitesse :</span> <strong>${escapeHtml(task.speed)}</strong></span>
              <span class="spec-pill yield-bonus-pill highlight-bonus">⭐ ${escapeHtml(task.impact)}</span>
            </div>
          </div>

          <div class="task-tool-recommended">
            🛠️ <strong>Outil magasin FS25 :</strong> <span class="tool-name-highlight">${task.toolDetails.icon} ${escapeHtml(task.toolDetails.name)}</span>
            ${task.toolDetails.dlc ? `<span class="dlc-badge-pill">${escapeHtml(task.toolDetails.dlc)}</span>` : ""}
          </div>

          <div class="task-agronomic-note">
            💡 <em>${escapeHtml(task.notes)}</em>
          </div>
        </div>
      </div>
    `).join("");

    // Rendu complet
    container.innerHTML = `
      <!-- CARTE SYNTHÈSE DE RECOMMANDATION N+1 -->
      <section class="card result-hero-card">
        <div class="result-hero-header">
          <div class="hero-crop-selected">
            <span class="hero-crop-avatar">${chosenCrop.icon}</span>
            <div>
              <span class="hero-label">Culture Recommandée pour l'année N+1 :</span>
              <h2 class="hero-crop-title">${escapeHtml(chosenCrop.name)}</h2>
              <div class="hero-crop-meta text-sm text-muted">
                Rotation : <strong class="text-success-custom">${escapeHtml(chosenRotationInfo.text)}</strong> • Azote cible PF : <strong>${escapeHtml(chosenCrop.pfNitrogenTarget || "Normal")}</strong>
              </div>
            </div>
          </div>

          <div class="hero-yield-box">
            <div class="yield-box-label">Potentiel de Rendement Max :</div>
            <div class="yield-box-val">${totalPotentialYield}%</div>
            <div class="yield-box-sub text-xs text-muted">Sol PF (${baseSoilYield}%) + Rotation (${chosenRotationInfo.score >= 0 ? "+" + chosenRotationInfo.score : chosenRotationInfo.score}%) + Bonus (+5%)</div>
          </div>
        </div>

        <!-- Classement des options de rotation -->
        <div class="rotation-options-section">
          <h3 class="section-sub-title">1. Classement des cultures selon le mod Crop Rotation (Précédents N-1: ${cropNMinus1 ? cropNMinus1.name : "Non spécifié"} ➔ N: ${cropN.name}) :</h3>
          <div class="rotation-candidates-grid">
            ${topRecommendationsHtml}
          </div>

          ${badCandidates.length > 0 ? `
            <div class="bad-candidates-wrap">
              <div class="bad-candidates-label text-danger-custom text-xs font-bold">⚠️ Cultures à éviter absolument (Pénalité Monoculture) :</div>
              <div class="bad-candidates-flex">${badCandidatesHtml}</div>
            </div>
          ` : ""}
        </div>
      </section>

      <!-- SECTION 2 : COUVERT VÉGÉTAL -->
      <section class="mt-4">
        <h3 class="section-title-sm">2. Diagnostic Couvert Végétal & Interculture (Precision Farming)</h3>
        ${coverCropBoxHtml}
      </section>

      <!-- SECTION 3 : FEUILLE DE ROUTE DES TRAVAUX POST-RÉCOLTE -->
      <section class="mt-4">
        <div class="d-flex justify-between align-items-center mb-3">
          <h3 class="section-title-sm">3. Travaux à accomplir entre la récolte N (${escapeHtml(cropN.name)}) et le semis N+1 (${escapeHtml(chosenCrop.name)})</h3>
          <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Imprimer la feuille de route</button>
        </div>

        <div class="workflow-steps-list">
          ${tasksHtml}
        </div>
      </section>
    `;
  }

  // ==================== 6. INITIALISATION & FORMULAIRES ====================
  function initFormControls() {
    const selectCropN = document.getElementById("select-crop-n");
    const selectCropNMinus1 = document.getElementById("select-crop-n-minus-1");
    const selectStraw = document.getElementById("select-straw-handling");

    populateCropsDropdown(selectCropN, state.cropN);
    populateCropsDropdown(selectCropNMinus1, state.cropNMinus1, true);

    if (selectStraw) selectStraw.value = state.strawHandled;

    // Écouteurs de changement de cultures
    selectCropN?.addEventListener("change", e => {
      state.cropN = e.target.value;
      state.targetCropNPlus1 = null; // Réinitialiser pour recalculer automatiquement le meilleur
      saveState();
      renderApp();
    });

    selectCropNMinus1?.addEventListener("change", e => {
      state.cropNMinus1 = e.target.value;
      state.targetCropNPlus1 = null;
      saveState();
      renderApp();
    });

    selectStraw?.addEventListener("change", e => {
      state.strawHandled = e.target.value;
      saveState();
      renderApp();
    });

    // Curseur de types de sol Precision Farming
    initSoilDistributionSliders();
  }

  function populateCropsDropdown(selectEl, selectedVal, allowEmpty = false) {
    if (!selectEl) return;
    const crops = getAllCrops();
    const families = {
      cereales: "🌾 Céréales avec Paille (Blé, Orge, Avoine)",
      oleoprot: "🌻 Oléagineux & Légumineuses (Soja, Colza, Tournesol)",
      lourdes: "⚠️ Cultures avec Labour requis (Maïs, Pommes de terre, Betteraves)",
      premium: "🥕 Premium DLC (Carottes, Panais, Betteraves rouges)",
      nouveautes: "✨ Nouveautés FS25 (Riz, Épinards, Pois, Haricots)",
      fourrages: "🌿 Fourrages & Prairies (Herbe)",
      platinum: "🌲 Platinum (Peupliers)",
      speciales: "☁️ Cultures Spéciales (Coton, Vignes, Olives)"
    };

    let html = "";
    if (allowEmpty) {
      html += `<option value="" ${!selectedVal ? "selected" : ""}>-- Aucune / Nouvelle parcelle --</option>`;
    }

    Object.keys(families).forEach(famKey => {
      const famCrops = crops.filter(c => c.family === famKey);
      if (famCrops.length > 0) {
        html += `<optgroup label="${families[famKey]}">`;
        famCrops.forEach(c => {
          html += `<option value="${c.id}" ${c.id === selectedVal ? "selected" : ""}>${c.icon} ${c.name}</option>`;
        });
        html += `</optgroup>`;
      }
    });

    selectEl.innerHTML = html;
  }

  function initSoilDistributionSliders() {
    const loamInput = document.getElementById("soil-loam-val");
    const sandyLoamInput = document.getElementById("soil-sandy-loam-val");
    const siltyClayInput = document.getElementById("soil-silty-clay-val");
    const loamySandInput = document.getElementById("soil-loamy-sand-val");

    if (!loamInput) return;

    loamInput.value = state.soilDistribution.loam;
    sandyLoamInput.value = state.soilDistribution.sandy_loam;
    siltyClayInput.value = state.soilDistribution.silty_clay;
    loamySandInput.value = state.soilDistribution.loamy_sand;

    const updateSoil = () => {
      state.soilDistribution.loam = parseFloat(loamInput.value) || 0;
      state.soilDistribution.sandy_loam = parseFloat(sandyLoamInput.value) || 0;
      state.soilDistribution.silty_clay = parseFloat(siltyClayInput.value) || 0;
      state.soilDistribution.loamy_sand = parseFloat(loamySandInput.value) || 0;

      updateSoilDistributionBar();
      saveState();
      renderApp();
    };

    [loamInput, sandyLoamInput, siltyClayInput, loamySandInput].forEach(inp => {
      inp.addEventListener("input", updateSoil);
    });

    // Boutons de préréglages rapides de sol
    document.querySelectorAll(".btn-soil-preset").forEach(btn => {
      btn.addEventListener("click", () => {
        const preset = btn.dataset.preset;
        if (preset === "loam-pure") {
          state.soilDistribution = { loam: 100, sandy_loam: 0, silty_clay: 0, loamy_sand: 0 };
        } else if (preset === "balanced") {
          state.soilDistribution = { loam: 50, sandy_loam: 30, silty_clay: 20, loamy_sand: 0 };
        } else if (preset === "sandy") {
          state.soilDistribution = { loam: 20, sandy_loam: 50, silty_clay: 0, loamy_sand: 30 };
        } else if (preset === "clay") {
          state.soilDistribution = { loam: 30, sandy_loam: 10, silty_clay: 60, loamy_sand: 0 };
        }

        loamInput.value = state.soilDistribution.loam;
        sandyLoamInput.value = state.soilDistribution.sandy_loam;
        siltyClayInput.value = state.soilDistribution.silty_clay;
        loamySandInput.value = state.soilDistribution.loamy_sand;

        updateSoilDistributionBar();
        saveState();
        renderApp();
      });
    });

    updateSoilDistributionBar();
  }

  function updateSoilDistributionBar() {
    const total = state.soilDistribution.loam + state.soilDistribution.sandy_loam + state.soilDistribution.silty_clay + state.soilDistribution.loamy_sand;
    const totalEl = document.getElementById("soil-total-indicator");
    if (totalEl) {
      totalEl.textContent = `${total}%`;
      totalEl.className = total === 100 ? "text-success-custom font-bold" : "text-danger-custom font-bold";
    }
  }

  function selectNextCrop(cropId) {
    state.targetCropNPlus1 = cropId;
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
    selectNextCrop
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
