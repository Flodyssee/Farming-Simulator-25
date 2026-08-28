/**
 * Base de données des cultures FARMING SIMULATOR 25 (FS25)
 * Inclut le mod Crop Rotation, Precision Farming et toutes les extensions (Highlands Fishing, Premium, Platinum, etc.)
 */
const CROPS_DATABASE = [
  // ==================== 1. CÉRÉALES ====================
  {
    id: "fs25-ble",
    name: "Blé (Wheat)",
    family: "cereales",
    familyLabel: "Céréales avec Paille",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - Août",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Rotation recommandée Céréale vers Colza)" },
      { cropId: "fs25-tournesol", bonus: "+12% (Excellente rotation)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Céréale vers Légumineuse)" },
      { cropId: "fs25-soja", bonus: "+15% (Céréale vers Légumineuse)" },
      { cropId: "fs25-mais-grain", bonus: "+10% (Bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-ble", malus: "-15% (Pénalité Monoculture Blé sur Blé)" },
      { cropId: "fs25-orge", malus: "-10% (Même famille Céréales consécutives)" },
      { cropId: "fs25-avoine", malus: "-10% (Même famille Céréales)" }
    ],
    residuesType: "Andains de paille (récupérables à la presse ou autochargeuse) et chaumes",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et Balles",
        title: "Ramassage de la paille (Presse à balles ou autochargeuse)",
        recommendedToolIds: ["fs25-presse-balles", "fs25-goweil-presse-stationnaire", "fs25-autochargeuse"],
        speed: "15-20 km/h",
        notes: "Pressage des andains pour litière d'élevage ou valorisation commerciale.",
        fs25YieldImpact: "Revenu paille"
      },
      {
        order: 2,
        phase: "2. Chaumes",
        title: "Broyage des chaumes (Mulcher)",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "12-15 km/h",
        notes: "Passage du broyeur pour valider l'état 'Chaumes broyées'.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 3,
        phase: "3. Chaux (Precision Farming)",
        title: "Chaux à dosage variable automatique (Variable Rate)",
        recommendedToolIds: ["fs25-epandeur-chaux"],
        speed: "18-20 km/h",
        notes: "Épandage modulé selon la carte de pH et le type de sol.",
        fs25YieldImpact: "+15% et score pH 100/100"
      },
      {
        order: 4,
        phase: "4. Semis Direct (Score PF 100/100)",
        title: "Semis direct sans labour avec fertilisation modulée",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-pumps-hoses-ombilical"],
        speed: "15-18 km/h",
        notes: "Le semis direct sans labour octroie la note maximale de 100/100 au score environnemental de travail du sol.",
        fs25YieldImpact: "+22.5% (Engrais 1) et Score Sol PF 100/100"
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
        phase: "6. Désherbage et Azote (PF)",
        title: "Désherbage ciblé Spot Spraying ou Herse étrille mécanique",
        recommendedToolIds: ["fs25-pf-spot-spraying", "fs25-sarcleuse-herse-etrille"],
        speed: "15 km/h",
        notes: "Pulvérisation ciblée par caméras : score environnemental de désherbage maximal.",
        fs25YieldImpact: "Score Désherbage PF 100/100"
      }
    ]
  },
  {
    id: "fs25-orge",
    name: "Orge (Barley)",
    family: "cereales",
    familyLabel: "Céréales avec Paille",
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
      { cropId: "fs25-pois-haricots", bonus: "+15% (Céréale vers Légumineuse)" }
    ],
    badNextCrops: [
      { cropId: "fs25-orge", malus: "-15% (Monoculture Orge sur Orge)" },
      { cropId: "fs25-ble", malus: "-10% (Céréales successives)" }
    ],
    residuesType: "Volume élevé de paille",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille",
        title: "Pressage de la paille (Göweil ou standard)",
        recommendedToolIds: ["fs25-presse-balles", "fs25-goweil-presse-stationnaire"],
        speed: "15-20 km/h",
        notes: "Pressage de la paille d'orge.",
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
        phase: "3. Chaux et Semis direct PF",
        title: "Chaux variable et semis direct avec engrais",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Semis direct de la culture suivante.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais) et Score PF 100/100"
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
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - Août",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Excellente rotation)" },
      { cropId: "fs25-soja", bonus: "+15% (Rotation Céréale vers Soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-avoine", malus: "-15% (Monoculture Avoine)" }],
    residuesType: "Paille pour chevaux",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et Chaumes",
        title: "Pressage de paille et broyage des chaumes",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "Récupération de la paille et broyage des chaumes.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Semis et Rouleau",
        title: "Semis direct et rouleau de sol",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15-18 km/h",
        notes: "Semer et rouler immédiatement.",
        fs25YieldImpact: "+22.5% (Engrais) + 2.5% (Rouleau)"
      }
    ]
  },

  // ==================== 2. LÉGUMINEUSES ====================
  {
    id: "fs25-soja",
    name: "Soja (Soybeans - Fixateur d'Azote)",
    family: "oleoprot",
    familyLabel: "Légumineuses & Protéagineux",
    dlc: "Jeu de base",
    rotationCategory: "legumes",
    harvestPeriod: "Septembre - Octobre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (Auto-suffisant en Azote)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (Rotation optimale : Soja vers Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+18% (Excellente valorisation de l'azote résiduel)" },
      { cropId: "fs25-colza", bonus: "+15% (Très bon précédent)" },
      { cropId: "fs25-mais-grain", bonus: "+15% (Rotation Soja vers Maïs)" }
    ],
    badNextCrops: [
      { cropId: "fs25-soja", malus: "-20% (Pénalité Monoculture Soja)" },
      { cropId: "fs25-pois-haricots", malus: "-12% (Légumineuses consécutives)" }
    ],
    residuesType: "Chaumes courtes, reliquat azoté organique élevé",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        title: "Broyage des chaumes de soja",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage pour valider le bonus de +2.5%.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux et Semis Direct Blé (PF)",
        title: "Chaux variable et semis direct de Blé d'hiver",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Le blé d'hiver après soja bénéficie du bonus de rotation maximal (+20%) et du score PF 100/100.",
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
    name: "Pois & Haricots verts (Peas & Beans)",
    family: "nouveautes",
    familyLabel: "Nouveautés FS25 & Légumineuses",
    dlc: "Jeu de base",
    rotationCategory: "legumes",
    harvestPeriod: "Juillet - Août",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0-40 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (Précédent idéal pour le Blé d'hiver)" },
      { cropId: "fs25-colza", bonus: "+15% (Semé directement en août)" }
    ],
    badNextCrops: [{ cropId: "fs25-pois-haricots", malus: "-20% (Monoculture Pois/Haricots)" }],
    residuesType: "Résidus légers riches en azote",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        title: "Broyage des chaumes",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage pour le bonus de rendement.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Semis Direct Blé d'hiver",
        title: "Chaux variable et semis direct Blé ou Colza",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Semis direct sans labour pour préserver le reliquat d'azote.",
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

  // ==================== 3. CULTURES LOURDES & TUBERCULES ====================
  {
    id: "fs25-mais-grain",
    name: "Maïs grain & Ensilage (Corn)",
    family: "lourdes",
    familyLabel: "Cultures avec Labour obligatoire",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Octobre - Novembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "200-240 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (Rotation recommandée Maïs vers Soja)" },
      { cropId: "fs25-ble", bonus: "+12% (Blé d'hiver tardif ou printemps)" },
      { cropId: "fs25-tournesol", bonus: "+10% (Bonne rotation)" }
    ],
    badNextCrops: [{ cropId: "fs25-mais-grain", malus: "-20% (Monoculture Maïs sur Maïs)" }],
    residuesType: "Cannes de maïs épaisses (Déclenche l'état Labour requis)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage cannes",
        title: "Broyage des cannes de maïs (Mulcher)",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyer les cannes avant tout travail du sol pour valider les +2.5%.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 2,
        phase: "2. Labour PF (Sous-soleuse)",
        title: "Sous-soleuse (Valide le labour sans dégrader le score de sol PF)",
        recommendedToolIds: ["fs25-sous-soleuse", "fs25-charrue"],
        speed: "12 km/h",
        notes: "En Precision Farming, la sous-soleuse préserve le score de sol par rapport à la charrue.",
        fs25YieldImpact: "+10% (Labour validé) et score PF préservé"
      },
      {
        order: 3,
        phase: "3. Chaux et Lisier NIRS",
        title: "Chaux variable et apport de lisier avec capteur NIRS",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-pumps-hoses-ombilical", "fs25-oxbo-epandeur-automoteur"],
        speed: "16-18 km/h",
        notes: "Modulation de dose de chaux et lisier analysé par NIRS.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais 1)"
      },
      {
        order: 4,
        phase: "4. Semis Soja / Blé & Rouleau",
        title: "Semis monograine ou direct et passage du rouleau",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-semoir-monograine", "fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Semer et rouler le champ.",
        fs25YieldImpact: "+2.5% (Rouleau)"
      }
    ]
  },
  {
    id: "fs25-oignons",
    name: "Oignons (Onions)",
    family: "premium",
    familyLabel: "Légumes & Bulbes (Premium Expansion)",
    dlc: "Premium Expansion",
    rotationCategory: "roots",
    harvestPeriod: "Août - Octobre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (Rotation optimale : Oignons vers Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Excellente rotation vers Céréale)" },
      { cropId: "fs25-soja", bonus: "+15% (Oignons vers Légumineuse)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Oignons vers Pois/Haricots)" }
    ],
    badNextCrops: [
      { cropId: "fs25-oignons", malus: "-25% (Pénalité Monoculture Oignons sur Oignons)" },
      { cropId: "fs25-carottes-panais", malus: "-15% (Légumes successifs)" },
      { cropId: "fs25-betterave-rouge", malus: "-15% (Légumes successifs)" },
      { cropId: "fs25-pomme-de-terre", malus: "-12% (Tubercules successifs)" }
    ],
    residuesType: "Fanes et billons résiduels (Sous-soleuse requise)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        title: "Sous-soleuse (Aplanit les billons et valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Aplanit les buttes d'oignons et valide l'état de labour sans dégrader le score de sol PF.",
        fs25YieldImpact: "+10% (Labour)"
      },
      {
        order: 2,
        phase: "2. Chaux et Engrais PF",
        title: "Chaux variable et semis direct Blé d'hiver",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "16-18 km/h",
        notes: "Chauler à dose variable et implanter la céréale suivante au semoir direct.",
        fs25YieldImpact: "+18% (Rotation) + 15% (Chaux) + 22.5% (Engrais 1)"
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
    id: "fs25-carottes-panais",
    name: "Carottes & Panais (Premium DLC)",
    family: "premium",
    familyLabel: "Premium Expansion (Légumes)",
    dlc: "Premium Expansion",
    rotationCategory: "roots",
    harvestPeriod: "Août - Novembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Légumes racines vers Céréale d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Très bon précédent)" },
      { cropId: "fs25-soja", bonus: "+12% (Bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-carottes-panais", malus: "-20% (Monoculture Carottes/Panais)" },
      { cropId: "fs25-oignons", malus: "-15% (Légumes/Bulbes consécutifs)" },
      { cropId: "fs25-betterave-rouge", malus: "-15% (Légumes racines consécutifs)" },
      { cropId: "fs25-pomme-de-terre", malus: "-15% (Tubercules)" }
    ],
    residuesType: "Fanes et billons résiduels (Sous-soleuse requise)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        title: "Sous-soleuse (Élimine les buttes et valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Aplanit les billons et valide l'état de labour.",
        fs25YieldImpact: "+10% (Labour)"
      },
      {
        order: 2,
        phase: "2. Chaux et Engrais PF",
        title: "Chaux variable et semis direct Blé d'hiver",
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
    name: "Betteraves rouges (Red Beet - Premium DLC)",
    family: "premium",
    familyLabel: "Premium Expansion (Légumes)",
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
        phase: "2. Chaux et Semis direct Blé",
        title: "Chaux variable, semis direct et rouleau",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15-18 km/h",
        notes: "Chauler, semer et rouler.",
        fs25YieldImpact: "+15% (Rotation) + 15% (Chaux) + 2.5% (Rouleau)"
      }
    ]
  },
  {
    id: "fs25-pomme-de-terre",
    name: "Pommes de terre (Potatoes)",
    family: "lourdes",
    familyLabel: "Cultures avec Labour obligatoire",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Août - Septembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "180-220 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Tubercules vers Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Excellent précédent)" }
    ],
    badNextCrops: [{ cropId: "fs25-pomme-de-terre", malus: "-20% (Monoculture Pommes de terre)" }],
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
        phase: "2. Chaux et Lisier NIRS",
        title: "Chaux variable et lisier (Pumps N' Hoses)",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-pumps-hoses-ombilical"],
        speed: "16 km/h",
        notes: "Apport de chaux et lisier modulé.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais)"
      },
      {
        order: 3,
        phase: "3. Semis et Rouleau",
        title: "Semis direct et rouleau",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Semer et rouler le champ.",
        fs25YieldImpact: "+2.5% (Rouleau)"
      }
    ]
  },
  {
    id: "fs25-betterave",
    name: "Betteraves sucrières (Sugar Beet)",
    family: "lourdes",
    familyLabel: "Cultures avec Labour obligatoire",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Octobre - Novembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [{ cropId: "fs25-ble", bonus: "+15% (Betteraves vers Blé d'hiver)" }],
    badNextCrops: [{ cropId: "fs25-betterave", malus: "-20% (Monoculture Betteraves)" }],
    residuesType: "Feuilles broyées",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        title: "Sous-soleuse (Labour validé)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Passage de la sous-soleuse.",
        fs25YieldImpact: "+10%"
      },
      {
        order: 2,
        phase: "2. Chaux et Semis direct Blé",
        title: "Chaux variable, semis direct et rouleau",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15-18 km/h",
        notes: "Chauler, semer et rouler.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais) + 2.5% (Rouleau)"
      }
    ]
  },

  // ==================== 4. OLÉAGINEUX ====================
  {
    id: "fs25-colza",
    name: "Colza / Canola",
    family: "oleoprot",
    familyLabel: "Oléagineux & Protéagineux",
    dlc: "Jeu de base",
    rotationCategory: "oilseeds",
    harvestPeriod: "Juillet - Août",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "180-220 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (Rotation optimale : Colza vers Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Excellente rotation)" },
      { cropId: "fs25-soja", bonus: "+12% (Bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-colza", malus: "-25% (Pénalité Monoculture Colza)" },
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
        phase: "2. Chaux et Semis Direct Blé (PF)",
        title: "Chaux variable et semis direct Blé d'hiver",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Le blé d'hiver après colza est une rotation majeure de FS25.",
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
    name: "Tournesol (Sunflower)",
    family: "oleoprot",
    familyLabel: "Oléagineux & Protéagineux",
    dlc: "Jeu de base",
    rotationCategory: "oilseeds",
    harvestPeriod: "Octobre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Tournesol vers Blé d'hiver)" },
      { cropId: "fs25-soja", bonus: "+12% (Tournesol vers Soja)" }
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
        notes: "Broyage des cannes.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Déchaumage et Chaux PF",
        title: "Déchaumage à disques et chaux variable",
        recommendedToolIds: ["fs25-dechaumeur-disques", "fs25-epandeur-chaux"],
        speed: "18 km/h",
        notes: "Déchaumer sans faire remonter de grosses pierres.",
        fs25YieldImpact: "+15% (Chaux)"
      },
      {
        order: 3,
        phase: "3. Semis Blé d'hiver et Rouleau",
        title: "Semis Blé d'hiver et rouleau",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Semer et rouler.",
        fs25YieldImpact: "+15% (Rotation) + 2.5% (Rouleau)"
      }
    ]
  },

  // ==================== 5. NOUVEAUTÉS FS25 ====================
  {
    id: "fs25-riz-inonde",
    name: "Riz inondé (Paddy Rice)",
    family: "nouveautes",
    familyLabel: "Nouveautés FS25",
    dlc: "Jeu de base (FS25)",
    rotationCategory: "cereals",
    harvestPeriod: "Octobre - Novembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "160-190 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (Riz vers Légumineuse)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Riz vers Pois)" }
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
        notes: "Passage du broyeur dans la rizière à sec.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux et Travail de fond",
        title: "Chaux variable et déchaumage léger",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-dechaumeur-disques"],
        speed: "15 km/h",
        notes: "Préparation du lit de rizière.",
        fs25YieldImpact: "+15% (Chaux)"
      },
      {
        order: 3,
        phase: "3. Eau et Repiquage",
        title: "Mise en eau et repiquage du riz",
        recommendedToolIds: ["fs25-repiqueuse-riz"],
        speed: "8-12 km/h",
        notes: "Remplissage d'eau et repiquage.",
        fs25YieldImpact: "Rendement élevé"
      }
    ]
  },
  {
    id: "fs25-epinards",
    name: "Épinards (Spinach)",
    family: "nouveautes",
    familyLabel: "Nouveautés FS25",
    dlc: "Jeu de base (FS25)",
    rotationCategory: "roots",
    harvestPeriod: "Printemps & Automne (2 récoltes/an)",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "100-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Épinards vers Blé)" },
      { cropId: "fs25-soja", bonus: "+15% (Épinards vers Soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-epinards", malus: "-15% (Plus de 2 récoltes successives)" }],
    residuesType: "Résidus fins",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage et Chaux",
        title: "Broyage et chaux variable PF",
        recommendedToolIds: ["fs25-broyeur", "fs25-epandeur-chaux"],
        speed: "15 km/h",
        notes: "Broyer et chauler.",
        fs25YieldImpact: "+2.5% + 15%"
      },
      {
        order: 2,
        phase: "2. Semis direct et Rouleau",
        title: "Semis direct sans labour et rouleau",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-rouleau-sol"],
        speed: "15-18 km/h",
        notes: "Semer et rouler immédiatement.",
        fs25YieldImpact: "+22.5% (Engrais) + 2.5% (Rouleau) et Score PF Max"
      }
    ]
  },

  // ==================== 6. FORESTERIE & FOURRAGES ====================
  {
    id: "fs25-peupliers",
    name: "Peupliers (Poplar)",
    family: "platinum",
    familyLabel: "Platinum Expansion (Foresterie)",
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
        notes: "Fertiliser les souches pour maximiser le volume de bois.",
        fs25YieldImpact: "+45% (Engrais max)"
      },
      {
        order: 2,
        phase: "Option B : Remise en culture",
        title: "Broyage forestier des souches (Prinoth)",
        recommendedToolIds: ["fs25-broyeur-forestier"],
        speed: "6-8 km/h",
        notes: "Broyage des souches pour libérer le sol.",
        fs25YieldImpact: "Remise en culture céréalière"
      }
    ]
  },
  {
    id: "fs25-herbe",
    name: "Herbe et Prairies (Grass)",
    family: "fourrages",
    familyLabel: "Fourrages & Élevage",
    dlc: "Jeu de base & Göweil Pack",
    rotationCategory: "grass",
    harvestPeriod: "Avril à Novembre (3-4 coupes/an)",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha par coupe",
    idealNextCrops: [
      { cropId: "fs25-mais-grain", bonus: "+20% (Retournement de prairie vers Maïs)" },
      { cropId: "fs25-ble", bonus: "+15% (Retournement de prairie vers Blé)" }
    ],
    badNextCrops: [],
    residuesType: "Andains d'herbe fraîche (Foin, Ensilage ou Enrubanné Göweil)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Rouleau à herbe (PF)",
        title: "Passage du rouleau à herbe post-fauche",
        recommendedToolIds: ["fs25-rouleau-herbe"],
        speed: "12-15 km/h",
        notes: "Le rouleau à herbe confère un niveau de fertilisation sans dépense d'intrant.",
        fs25YieldImpact: "+1 niveau de fertilisation gratuit"
      },
      {
        order: 2,
        phase: "2. Lisier NIRS (Pumps N' Hoses)",
        title: "Apport de lisier ombilical avec capteur NIRS",
        recommendedToolIds: ["fs25-pumps-hoses-ombilical", "fs25-oxbo-epandeur-automoteur"],
        speed: "16-18 km/h",
        notes: "Compléter la fertilisation avec dosage NIRS.",
        fs25YieldImpact: "100% fertilisé et Score PF optimal"
      }
    ]
  },
  {
    id: "fs25-sorgho",
    name: "Sorgho (Sorghum)",
    family: "cereales",
    familyLabel: "Céréales & Grains",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Août - Septembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "110-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (Sorgho vers Soja)" },
      { cropId: "fs25-ble", bonus: "+12% (Sorgho vers Blé d'hiver)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Sorgho vers Pois/Haricots)" }
    ],
    badNextCrops: [{ cropId: "fs25-sorgho", malus: "-15% (Monoculture Sorgho)" }],
    residuesType: "Chaumes courtes de sorgho",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        title: "Broyage des chaumes de sorgho",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage des chaumes.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux et Semis direct PF",
        title: "Chaux variable et semis direct avec engrais",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Semis direct sans labour.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais) et Score PF 100/100"
      },
      {
        order: 3,
        phase: "3. Rouleau",
        title: "Roulage de sol post-semis",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Passage du rouleau.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-coton",
    name: "Coton (Cotton)",
    family: "speciales",
    familyLabel: "Cultures Spécialisées",
    dlc: "Jeu de base",
    rotationCategory: "special",
    harvestPeriod: "Octobre - Novembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (Coton vers Blé d'hiver)" },
      { cropId: "fs25-soja", bonus: "+12% (Coton vers Soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-coton", malus: "-20% (Monoculture Coton)" }],
    residuesType: "Tiges sèches de coton",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage",
        title: "Broyage des tiges de coton",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage des tiges.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux et Semis",
        title: "Chaux variable et semis monograine avec engrais",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-monograine"],
        speed: "15 km/h",
        notes: "Semis et apport d'engrais.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais)"
      }
    ]
  },
  {
    id: "fs25-canne-a-sucre",
    name: "Canne à sucre (Sugar Cane)",
    family: "speciales",
    familyLabel: "Cultures Spécialisées",
    dlc: "Jeu de base",
    rotationCategory: "special",
    harvestPeriod: "Octobre - Décembre",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [{ cropId: "fs25-soja", bonus: "+15% (Canne vers Soja)" }],
    badNextCrops: [],
    residuesType: "Souches de canne à sucre",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse (Repousse ou Remise en culture)",
        title: "Sous-soleuse ou Fertilisation de repousse",
        recommendedToolIds: ["fs25-sous-soleuse", "fs25-epandeur-chaux"],
        speed: "12 km/h",
        notes: "Détruire les souches pour remettre en culture ou fertiliser pour la repousse.",
        fs25YieldImpact: "+10% (Labour validé)"
      }
    ]
  },
  {
    id: "fs25-raisins-olives",
    name: "Vigne & Olives (Grapes & Olives)",
    family: "speciales",
    familyLabel: "Cultures Spécialisées",
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
        phase: "1. Tonte et Broyage",
        title: "Broyage des sarments et tonte inter-rang",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "10-12 km/h",
        notes: "Passage du broyeur compact d'inter-rang.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Pulvérisation N (PF)",
        title: "Fertilisation pulvérisateur et sous-solage",
        recommendedToolIds: ["fs25-pulverisateur-herbicide"],
        speed: "12 km/h",
        notes: "Fertilisation modulée des rangs.",
        fs25YieldImpact: "+45% (Engrais max)"
      }
    ]
  }

];

if (typeof window !== "undefined") {
  window.CROPS_DATABASE = CROPS_DATABASE;
}
