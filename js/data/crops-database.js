/**
 * Base de données des cultures FARMING SIMULATOR 25 (FS25)
 * Enrichie avec :
 * - Le mod CROP ROTATION (Catégories de rotation, Précédents culturaux idéaux, Multiplicateurs de rendement)
 * - Le DLC PRECISION FARMING (Exigences en Azote N et pH selon le type de sol)
 * - Tous les DLCs (Premium, Platinum, Göweil, Pumps N' Hoses, Oxbo)
 */
const CROPS_DATABASE = [
  // ==================== 1. CÉRÉALES (PAILLE & ROTATION CEREALS) ====================
  {
    id: "fs25-ble",
    name: "Blé (Wheat)",
    family: "cereales",
    familyLabel: "Céréales avec Paille",
    icon: "🌾",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - Août",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Rotation parfaite Céréale ➔ Colza)" },
      { cropId: "fs25-tournesol", bonus: "+12% (Excellente rotation)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Céréale ➔ Légumineuse)" },
      { cropId: "fs25-soja", bonus: "+15% (Céréale ➔ Légumineuse)" },
      { cropId: "fs25-mais-grain", bonus: "+10% (Bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-ble", malus: "-15% (Pénalité Monoculture Blé sur Blé)" },
      { cropId: "fs25-orge", malus: "-10% (Même famille Céréales consécutives)" },
      { cropId: "fs25-avoine", malus: "-10% (Même famille Céréales)" }
    ],
    residuesType: "Andains de paille (récupérables à la presse ou autochargeuse) + chaumes",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille & Balles",
        title: "Ramassage paille (Presse Göweil / Standard)",
        recommendedToolIds: ["fs25-presse-balles", "fs25-goweil-presse-stationnaire", "fs25-autochargeuse"],
        speed: "15-20 km/h",
        notes: "Pressez les balles de paille pour vos étables ou revendez-les.",
        fs25YieldImpact: "Revenu supplémentaire paille"
      },
      {
        order: 2,
        phase: "2. Chaumes",
        title: "Broyage des chaumes (Mulcher)",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "12-15 km/h",
        notes: "Passez le broyeur pour obtenir l'état 'Chaumes broyées'.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 3,
        phase: "3. Chaux (Precision Farming)",
        title: "Chaux à dosage variable automatique (Variable Rate)",
        recommendedToolIds: ["fs25-epandeur-chaux"],
        speed: "18-20 km/h",
        notes: "Épandre la chaux : Precision Farming module automatiquement la dose selon le pH du sol.",
        fs25YieldImpact: "+15% & Score pH 100/100"
      },
      {
        order: 4,
        phase: "4. Semis Direct (Score PF 100/100)",
        title: "Semis direct sans labour avec cuve d'engrais (Modulation N)",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-pumps-hoses-ombilical"],
        speed: "15-18 km/h",
        notes: "Le semis direct sans labour donne la note maximale de 100/100 au score environnemental de travail du sol PF.",
        fs25YieldImpact: "+22.5% (Engrais 1) & Score Sol PF 100/100"
      },
      {
        order: 5,
        phase: "5. Finition",
        title: "Passage du rouleau compresseur de sol",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Enfonce les petites pierres et confère l'état 'Roulé'.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 6,
        phase: "6. Désherbage & Azote (PF)",
        title: "Spot Spraying 'See & Spray' ou Herse étrille mécanique",
        recommendedToolIds: ["fs25-pf-spot-spraying", "fs25-sarcleuse-herse-etrille"],
        speed: "15 km/h",
        notes: "Désherbage ultra-ciblé par caméras : score environnemental désherbage maximal (100/100) !",
        fs25YieldImpact: "Score Désherbage PF 100/100 (Pas de malus)"
      }
    ]
  },
  {
    id: "fs25-orge",
    name: "Orge (Barley)",
    family: "cereales",
    familyLabel: "Céréales avec Paille",
    icon: "🍺",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juin - Juillet",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "140-180 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Précédent idéal pour Colza d'hiver semé en août)" },
      { cropId: "fs25-soja", bonus: "+15% (Excellente rotation)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Légumineuse)" }
    ],
    badNextCrops: [
      { cropId: "fs25-orge", malus: "-15% (Monoculture Orge sur Orge)" },
      { cropId: "fs25-ble", malus: "-10% (Céréales successives)" }
    ],
    residuesType: "Volume maximal de paille de FS25",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille",
        title: "Pressage paille haute densité (Göweil / Standard)",
        recommendedToolIds: ["fs25-presse-balles", "fs25-goweil-presse-stationnaire"],
        speed: "15-20 km/h",
        notes: "Presser la paille d'orge.",
        fs25YieldImpact: "Revenu maximal paille"
      },
      {
        order: 2,
        phase: "2. Chaumes",
        title: "Broyage des chaumes",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Bonus de broyage.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 3,
        phase: "3. Chaux & Semis direct PF",
        title: "Chaux variable & Semis direct avec engrais",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Semer directement la culture suivante.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais) & Score PF 100/100"
      },
      {
        order: 4,
        phase: "4. Rouleau",
        title: "Roulage post-semis",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Passage du rouleau.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-avoine",
    name: "Avoine (Oat)",
    family: "cereales",
    familyLabel: "Céréales avec Paille",
    icon: "🥣",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - Août",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Excellente rotation)" },
      { cropId: "fs25-soja", bonus: "+15% (Rotation Céréale ➔ Soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-avoine", malus: "-15% (Monoculture Avoine)" }],
    residuesType: "Paille pour chevaux",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille & Chaumes",
        title: "Pressage paille & Broyage chaumes",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "Récupérer la paille et broyer les chaumes.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Semis & Rouleau",
        title: "Semis direct & Rouleau de sol",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15-18 km/h",
        notes: "Semer et rouler immédiatement.",
        fs25YieldImpact: "+22.5% (Engrais) + 2.5% (Rouleau) & Score PF Max"
      }
    ]
  },

  // ==================== 2. LÉGUMINEUSES (ROTATION LEGUMES & AZOTE PF) ====================
  {
    id: "fs25-soja",
    name: "Soja (Soybeans 🌱 - Fixateur d'Azote)",
    family: "oleoprot",
    familyLabel: "Légumineuses & Protéagineux",
    icon: "🌱",
    dlc: "Jeu de base",
    rotationCategory: "legumes",
    harvestPeriod: "Septembre - Octobre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (Fixe son propre azote dans Precision Farming !)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (ROTATION ROYALE : Soja ➔ Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+18% (Excellente valorisation de l'azote)" },
      { cropId: "fs25-colza", bonus: "+15% (Très bon précédent)" },
      { cropId: "fs25-mais-grain", bonus: "+15% (Rotation Soja ➔ Maïs)" }
    ],
    badNextCrops: [
      { cropId: "fs25-soja", malus: "-20% (Pénalité Monoculture Soja)" },
      { cropId: "fs25-pois-haricots", malus: "-12% (Légumineuses consécutives)" }
    ],
    residuesType: "Chaumes courtes, reliquat azoté organique maximal",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        title: "Broyage des chaumes de soja",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyer pour les +2.5%.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux & Semis Direct Blé (PF)",
        title: "Chaux variable & Semis direct de Blé d'hiver",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Le blé d'hiver après soja bénéficie du bonus de rotation maximal (+20%) et du meilleur score PF !",
        fs25YieldImpact: "+20% (Rotation) + 15% (Chaux) + Score Sol PF 100/100"
      },
      {
        order: 3,
        phase: "3. Finition",
        title: "Roulage de sol post-semis",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Passage du rouleau compresseur.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-pois-haricots",
    name: "Pois & Haricots verts / Peas & Beans (NOUVEAU FS25 🫛)",
    family: "nouveautes",
    familyLabel: "Nouveautés FS25 & Légumineuses",
    icon: "🫛",
    dlc: "Jeu de base (Nouveauté FS25)",
    rotationCategory: "legumes",
    harvestPeriod: "Juillet - Août",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0-40 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (Précédent royal pour le Blé d'hiver)" },
      { cropId: "fs25-colza", bonus: "+15% (Semé directement en août)" }
    ],
    badNextCrops: [{ cropId: "fs25-pois-haricots", malus: "-20% (Monoculture Pois/Haricots)" }],
    residuesType: "Résidus légers très riches en azote",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        title: "Broyage des chaumes",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyer pour +2.5%.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Semis Direct Blé d'hiver",
        title: "Chaux variable & Semis direct Blé / Colza",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Semer directement sans labour pour conserver le reliquat d'azote.",
        fs25YieldImpact: "+20% (Rotation) + 15% (Chaux) + Score PF 100/100"
      },
      {
        order: 3,
        phase: "3. Rouleau",
        title: "Roulage de sol",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Rouler le champ.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },

  // ==================== 3. CULTURES LOURDES & TUBERCULES (LABOUR / SOUS-SOLEUSE) ====================
  {
    id: "fs25-mais-grain",
    name: "Maïs grain & Ensilage (Corn 🌽)",
    family: "lourdes",
    familyLabel: "Cultures avec Labour obligatoire",
    icon: "🌽",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Octobre - Novembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "200-240 kg N/ha (Très gourmand en N)",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (Rotation parfaite Maïs ➔ Soja)" },
      { cropId: "fs25-ble", bonus: "+12% (Blé d'hiver tardif ou printemps)" },
      { cropId: "fs25-tournesol", bonus: "+10% (Bonne rotation)" }
    ],
    badNextCrops: [{ cropId: "fs25-mais-grain", malus: "-20% (Monoculture Maïs sur Maïs)" }],
    residuesType: "Grosses cannes de maïs (Déclenche 'Nécessite un labour')",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage cannes",
        title: "Broyage ultra-ras des cannes de maïs (Mulcher)",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyer les cannes avant tout travail du sol pour valider +2.5%.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 2,
        phase: "2. Labour PF (Sous-soleuse recommandée)",
        title: "Sous-soleuse (Élimine le labour SANS détruire le score de sol PF)",
        recommendedToolIds: ["fs25-sous-soleuse", "fs25-charrue"],
        speed: "12 km/h",
        notes: "En Precision Farming, la sous-soleuse préserve bien mieux le score de sol que la charrue !",
        fs25YieldImpact: "+10% (Labour validé) & Score PF préservé"
      },
      {
        order: 3,
        phase: "3. Chaux & Lisier NIRS (PF)",
        title: "Chaux variable & Injection de lisier avec capteur NIRS",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-pumps-hoses-ombilical", "fs25-oxbo-epandeur-automoteur"],
        speed: "16-18 km/h",
        notes: "Modulation de dose de chaux et lisier analysé par NIRS.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais 1)"
      },
      {
        order: 4,
        phase: "4. Semis Soja / Blé & Rouleau",
        title: "Semis monograine / direct & Passage du rouleau",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-semoir-monograine", "fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Semer et rouler le champ.",
        fs25YieldImpact: "+2.5% (Rouleau)"
      }
    ]
  },
  {
    id: "fs25-carottes-panais",
    name: "Carottes & Panais (Premium DLC 🥕)",
    family: "premium",
    familyLabel: "Premium Expansion (Légumes)",
    icon: "🥕",
    dlc: "Premium Expansion",
    rotationCategory: "roots",
    harvestPeriod: "Août - Novembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Légumes racines ➔ Céréale d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Très bon précédent)" },
      { cropId: "fs25-soja", bonus: "+12% (Bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-carottes-panais", malus: "-20% (Monoculture Carottes/Panais)" },
      { cropId: "fs25-betterave-rouge", malus: "-15% (Légumes racines consécutifs)" },
      { cropId: "fs25-pomme-de-terre", malus: "-15% (Tubercules)" }
    ],
    residuesType: "Fanes et buttes résiduelles (Sous-soleuse obligatoire)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        title: "Sous-soleuse (Élimine les buttes et valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Aplanit les billons et valide l'état labour.",
        fs25YieldImpact: "+10% (Labour)"
      },
      {
        order: 2,
        phase: "2. Chaux & Engrais PF",
        title: "Chaux variable & Semis direct Blé d'hiver",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "16-18 km/h",
        notes: "Chauler à dose variable et semer directement le blé.",
        fs25YieldImpact: "+15% (Rotation) + 15% (Chaux) + 22.5% (Engrais 1)"
      },
      {
        order: 3,
        phase: "3. Rouleau",
        title: "Roulage de finition",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Passage du rouleau compresseur.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-betterave-rouge",
    name: "Betteraves rouges (Red Beet - Premium DLC 🔴)",
    family: "premium",
    familyLabel: "Premium Expansion (Légumes)",
    icon: "🔴",
    dlc: "Premium Expansion",
    rotationCategory: "roots",
    harvestPeriod: "Septembre - Novembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "140-170 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Rotation vers Céréale)" },
      { cropId: "fs25-soja", bonus: "+12% (Vers Légumineuse)" }
    ],
    badNextCrops: [{ cropId: "fs25-betterave-rouge", malus: "-20% (Monoculture Betteraves)" }],
    residuesType: "Fanes au sol",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        title: "Sous-soleuse (Labour validé)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Supprime le malus de labour.",
        fs25YieldImpact: "+10%"
      },
      {
        order: 2,
        phase: "2. Chaux & Semis direct blé + Rouleau",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15-18 km/h",
        notes: "Chauler, semer et rouler.",
        fs25YieldImpact: "+15% (Rotation) + 15% (Chaux) + 2.5% (Rouleau)"
      }
    ]
  },
  {
    id: "fs25-pomme-de-terre",
    name: "Pommes de terre (Potatoes 🥔)",
    family: "lourdes",
    familyLabel: "Cultures avec Labour obligatoire",
    icon: "🥔",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Août - Septembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "180-220 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Tubercules ➔ Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Excellent précédent)" }
    ],
    badNextCrops: [{ cropId: "fs25-pomme-de-terre", malus: "-20% (Monoculture Patates)" }],
    residuesType: "Fanes broyées",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        title: "Sous-solage (Valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Supprime le malus de labour.",
        fs25YieldImpact: "+10%"
      },
      {
        order: 2,
        phase: "2. Chaux & Lisier NIRS",
        title: "Chaux variable & Lisier Pumps N' Hoses",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-pumps-hoses-ombilical"],
        speed: "16 km/h",
        notes: "Apport de chaux et lisier modulé.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais)"
      },
      {
        order: 3,
        phase: "3. Semis & Rouleau",
        title: "Semis direct & Rouleau",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Semer et rouler le champ.",
        fs25YieldImpact: "+2.5% (Rouleau)"
      }
    ]
  },
  {
    id: "fs25-betterave",
    name: "Betteraves sucrières (Sugar Beet 🌱)",
    family: "lourdes",
    familyLabel: "Cultures avec Labour obligatoire",
    icon: "🌱",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Octobre - Novembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [{ cropId: "fs25-ble", bonus: "+15% (Betteraves ➔ Blé d'hiver)" }],
    badNextCrops: [{ cropId: "fs25-betterave", malus: "-20% (Monoculture Betteraves)" }],
    residuesType: "Feuilles broyées",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        title: "Sous-soleuse (Labour validé)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Passez la sous-soleuse.",
        fs25YieldImpact: "+10%"
      },
      {
        order: 2,
        phase: "2. Chaux & Semis direct Blé",
        title: "Chaux variable, Semis direct et Rouleau",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15-18 km/h",
        notes: "Chauler, semer et rouler.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais) + 2.5% (Rouleau)"
      }
    ]
  },

  // ==================== 4. OLÉAGINEUX (ROTATION OILSEEDS) ====================
  {
    id: "fs25-colza",
    name: "Colza / Canola (Oilseed 🌼)",
    family: "oleoprot",
    familyLabel: "Oléagineux & Protéagineux",
    icon: "🌼",
    dlc: "Jeu de base",
    rotationCategory: "oilseeds",
    harvestPeriod: "Juillet - Août",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "180-220 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (ROTATION PARFAITE : Colza ➔ Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Excellente rotation)" },
      { cropId: "fs25-soja", bonus: "+12% (Bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-colza", malus: "-25% (PÉNALITÉ SÉVÈRE Monoculture Colza)" },
      { cropId: "fs25-tournesol", malus: "-12% (Oléagineux consécutifs)" }
    ],
    residuesType: "Chaumes fines de colza",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        title: "Broyage chaumes (Mulcher)",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyer les chaumes pour +2.5%.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux & Semis Direct Blé (PF)",
        title: "Chaux variable & Semis direct Blé d'hiver",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Le blé d'hiver après colza est la rotation reine de FS25.",
        fs25YieldImpact: "+18% (Rotation) + 15% (Chaux) + Score Sol PF 100/100"
      },
      {
        order: 3,
        phase: "3. Rouleau",
        title: "Roulage de sol",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Rouler le champ semé.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-tournesol",
    name: "Tournesol (Sunflower 🌻)",
    family: "oleoprot",
    familyLabel: "Oléagineux & Protéagineux",
    icon: "🌻",
    dlc: "Jeu de base",
    rotationCategory: "oilseeds",
    harvestPeriod: "Octobre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Tournesol ➔ Blé d'hiver)" },
      { cropId: "fs25-soja", bonus: "+12% (Tournesol ➔ Soja)" }
    ],
    badNextCrops: [
      { cropId: "fs25-tournesol", malus: "-20% (Monoculture Tournesol)" },
      { cropId: "fs25-colza", malus: "-12% (Oléagineux consécutifs)" }
    ],
    residuesType: "Tiges épaisses de tournesol",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        title: "Broyage des tiges de tournesol",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyer les cannes.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Déchaumage & Chaux PF",
        title: "Déchaumage à disques rapides & Chaux variable",
        recommendedToolIds: ["fs25-dechaumeur-disques", "fs25-epandeur-chaux"],
        speed: "18 km/h",
        notes: "Déchaumer sans sortir de grosses pierres.",
        fs25YieldImpact: "+15% (Chaux)"
      },
      {
        order: 3,
        phase: "3. Semis Blé d'hiver & Rouleau",
        title: "Semis Blé d'hiver + Rouleau",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Semer et rouler.",
        fs25YieldImpact: "+15% (Rotation) + 2.5% (Rouleau)"
      }
    ]
  },

  // ==================== 5. NOUVEAUTÉS FS25 (RIZ, ÉPINARDS) ====================
  {
    id: "fs25-riz-inonde",
    name: "Riz inondé / Paddy Rice (NOUVEAU FS25 🍚)",
    family: "nouveautes",
    familyLabel: "Nouveautés FS25",
    icon: "🍚",
    dlc: "Jeu de base (Nouveauté FS25)",
    rotationCategory: "cereals",
    harvestPeriod: "Octobre - Novembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "160-190 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (Riz ➔ Légumineuse)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Riz ➔ Pois)" }
    ],
    badNextCrops: [{ cropId: "fs25-riz-inonde", malus: "-15% (Monoculture Riz)" }],
    residuesType: "Chaumes dans rizière drainée",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage",
        title: "Broyage des chaumes de riz",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "12-15 km/h",
        notes: "Passez le broyeur dans la rizière à sec.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux & Travail de fond",
        title: "Chaux variable & Déchaumage léger",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-dechaumeur-disques"],
        speed: "15 km/h",
        notes: "Préparez le lit de rizière.",
        fs25YieldImpact: "+15% (Chaux)"
      },
      {
        order: 3,
        phase: "3. Eau & Repiquage",
        title: "Mise en eau & Repiquage du riz",
        recommendedToolIds: ["fs25-repiqueuse-riz"],
        speed: "8-12 km/h",
        notes: "Remplir d'eau et repiquer les plants.",
        fs25YieldImpact: "Très forte rentabilité"
      }
    ]
  },
  {
    id: "fs25-epinards",
    name: "Épinards / Spinach (NOUVEAU FS25 🍃)",
    family: "nouveautes",
    familyLabel: "Nouveautés FS25",
    icon: "🥬",
    dlc: "Jeu de base (Nouveauté FS25 / Oxbo)",
    rotationCategory: "roots",
    harvestPeriod: "Printemps & Automne (2 récoltes/an !)",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "100-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Épinards ➔ Blé)" },
      { cropId: "fs25-soja", bonus: "+15% (Épinards ➔ Soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-epinards", malus: "-15% (Plus de 2 récoltes successives)" }],
    residuesType: "Résidus fins",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage & Chaux",
        title: "Broyage & Chaux variable PF",
        recommendedToolIds: ["fs25-broyeur", "fs25-epandeur-chaux"],
        speed: "15 km/h",
        notes: "Broyer et chauler.",
        fs25YieldImpact: "+2.5% + 15%"
      },
      {
        order: 2,
        phase: "2. Semis direct & Rouleau",
        title: "Semis direct sans labour & Rouleau",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15-18 km/h",
        notes: "Semer et rouler immédiatement.",
        fs25YieldImpact: "+22.5% (Engrais) + 2.5% (Rouleau) & Score PF Max"
      }
    ]
  },

  // ==================== 6. FORESTERIE & FOURRAGES ====================
  {
    id: "fs25-peupliers",
    name: "Peupliers / Poplar (Platinum DLC 🌲)",
    family: "platinum",
    familyLabel: "Platinum Expansion (Foresterie)",
    icon: "🪵",
    dlc: "Platinum Expansion",
    rotationCategory: "fallow",
    harvestPeriod: "Toute l'année après 16 mois",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "100 kg N/ha",
    idealNextCrops: [{ cropId: "fs25-ble", bonus: "+10% (Après broyage de souches)" }],
    badNextCrops: [],
    residuesType: "Souches de peupliers",
    defaultSteps: [
      {
        order: 1,
        phase: "Option A : Repousse continue",
        title: "Fertilisation de repousse (Pumps N' Hoses)",
        recommendedToolIds: ["fs25-pumps-hoses-ombilical", "fs25-epandeur-chaux"],
        speed: "16 km/h",
        notes: "Fertiliser les souches pour maximiser les copeaux.",
        fs25YieldImpact: "+45% (Engrais max)"
      },
      {
        order: 2,
        phase: "Option B : Remise en culture",
        title: "Broyage forestier des souches (Prinoth)",
        recommendedToolIds: ["fs25-broyeur-forestier"],
        speed: "6-8 km/h",
        notes: "Broie les souches de peupliers pour effacer la culture.",
        fs25YieldImpact: "Remise en culture céréalière"
      }
    ]
  },
  {
    id: "fs25-herbe",
    name: "Herbe & Prairies (Grass 🌿)",
    family: "fourrages",
    familyLabel: "Fourrages & Élevage",
    icon: "🌿",
    dlc: "Jeu de base & Göweil Pack",
    rotationCategory: "grass",
    harvestPeriod: "Avril à Novembre (3-4 coupes/an)",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha par coupe",
    idealNextCrops: [
      { cropId: "fs25-mais-grain", bonus: "+20% (Retournement de prairie ➔ Maïs)" },
      { cropId: "fs25-ble", bonus: "+15% (Retournement de prairie ➔ Blé)" }
    ],
    badNextCrops: [],
    residuesType: "Andains d'herbe fraîche (Foin, Ensilage ou Enrubanné Göweil)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Rouleau à herbe (Astuce PF)",
        title: "Passage du Rouleau à herbe post-fauche",
        recommendedToolIds: ["fs25-rouleau-herbe"],
        speed: "12-15 km/h",
        notes: "Passez le rouleau à herbe pour obtenir 1 niveau de fertilisation GRATUIT !",
        fs25YieldImpact: "+1 niveau de fertilisation gratuit (+50% bonus herbe)"
      },
      {
        order: 2,
        phase: "2. Lisier NIRS (Pumps N' Hoses)",
        title: "Apport de lisier ombilical avec capteur NIRS",
        recommendedToolIds: ["fs25-pumps-hoses-ombilical", "fs25-oxbo-epandeur-automoteur"],
        speed: "16-18 km/h",
        notes: "Compléter la fertilisation à 100% avec dosage NIRS.",
        fs25YieldImpact: "100% fertilisé & Score PF Optimal"
      }
    ]
  },
  {
    id: "fs25-raisins-olives",
    name: "Vigne & Olives (Grapes & Olives 🍇)",
    family: "speciales",
    familyLabel: "Cultures Spécialisées",
    icon: "🍇",
    dlc: "Jeu de base",
    rotationCategory: "special",
    harvestPeriod: "Septembre - Octobre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "80-110 kg N/ha",
    idealNextCrops: [],
    badNextCrops: [],
    residuesType: "Inter-rangs enherbés et sarments",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Tonte & Broyage",
        title: "Broyage des sarments & Tonte inter-rang",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "10-12 km/h",
        notes: "Passage du broyeur compact.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Pulvérisation N (PF)",
        title: "Fertilisation pulvérisateur & Sous-solage",
        recommendedToolIds: ["fs25-pulverisateur-herbicide"],
        speed: "12 km/h",
        notes: "Fertiliser les rangs à dose variable.",
        fs25YieldImpact: "+45% (Engrais max)"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.CROPS_DATABASE = CROPS_DATABASE;
}
