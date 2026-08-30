/**
 * Base de données des cultures FARMING SIMULATOR 25 (FS25)
 * Inclut :
 * - Les cultures de base et de toutes les extensions officielles (Highlands Fishing, Premium, Platinum, etc.)
 * - Les cultures spécifiques de la carte LE MECHET (Luzerne, Trèfle, Seigle, Triticale, Lin, Chanvre, Moutarde)
 * - Les règles du mod CROP ROTATION
 * - Les exigences en azote et sol de PRECISION FARMING
 * - Les contraintes de la politique de rotation du mod PAPERASSERIE (RedTape)
 * 
 * Rédigé exclusivement en français sans équivalents en anglais.
 */
const CROPS_DATABASE = [
  // ==================== 1. CÉRÉALES & GRAINS ====================
  {
    id: "fs25-ble",
    name: "Blé",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - Août",
    sowPeriod: "Septembre - Octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Rotation recommandée Céréale vers Colza)" },
      { cropId: "fs25-tournesol", bonus: "+12% (Excellente rotation)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Céréale vers Légumineuse)" },
      { cropId: "fs25-soja", bonus: "+15% (Céréale vers Légumineuse)" },
      { cropId: "fs25-luzerne", bonus: "+15% (Céréale vers Luzerne)" },
      { cropId: "fs25-mais-grain", bonus: "+10% (Bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-ble", malus: "-15% (Pénalité monoculture Blé sur Blé)" },
      { cropId: "fs25-orge", malus: "-10% (Même famille Céréales consécutives)" },
      { cropId: "fs25-avoine", malus: "-10% (Même famille Céréales)" },
      { cropId: "fs25-seigle", malus: "-10% (Même famille Céréales)" },
      { cropId: "fs25-triticale", malus: "-10% (Même famille Céréales)" }
    ],
    residuesType: "Andains de paille et chaumes",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et Balles",
        month: "Août",
        title: "Ramassage de la paille (Presse à balles ou autochargeuse)",
        recommendedToolIds: ["fs25-presse-balles", "fs25-goweil-presse-stationnaire", "fs25-autochargeuse"],
        speed: "15-20 km/h",
        notes: "Pressage des andains pour litière d'élevage ou valorisation commerciale.",
        fs25YieldImpact: "Revenu paille"
      },
      {
        order: 2,
        phase: "2. Chaumes",
        month: "Août",
        title: "Broyage des chaumes",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "12-15 km/h",
        notes: "Passage du broyeur pour valider l'état 'Chaumes broyées'.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 3,
        phase: "3. Chaux (Precision Farming)",
        month: "Août",
        title: "Chaux à dosage variable automatique",
        recommendedToolIds: ["fs25-epandeur-chaux"],
        speed: "18-20 km/h",
        notes: "Épandage modulé selon la carte de pH et le type de sol.",
        fs25YieldImpact: "+15% et score pH 100/100"
      },
      {
        order: 4,
        phase: "4. Semis direct (Score PF 100/100)",
        month: "Septembre",
        title: "Semis direct sans labour avec fertilisation modulée",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-pumps-hoses-ombilical"],
        speed: "15-18 km/h",
        notes: "Le semis direct sans labour octroie la note maximale de 100/100 au score environnemental de travail du sol.",
        fs25YieldImpact: "+22.5% (Engrais 1) et Score Sol PF 100/100"
      },
      {
        order: 5,
        phase: "5. Finition",
        month: "Septembre",
        title: "Passage du rouleau compresseur de sol",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Enfonce les petites pierres et confère l'état 'Roulé'.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 6,
        phase: "6. Désherbage et Azote (PF)",
        month: "Mars",
        title: "Désherbage ciblé par caméras ou herse étrille mécanique",
        recommendedToolIds: ["fs25-pf-spot-spraying", "fs25-sarcleuse-herse-etrille"],
        speed: "15 km/h",
        notes: "Pulvérisation ciblée par caméras : score environnemental de désherbage maximal.",
        fs25YieldImpact: "Score Désherbage PF 100/100"
      }
    ]
  },
  {
    id: "fs25-orge",
    name: "Orge",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juin - Juillet",
    sowPeriod: "Septembre - Octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "140-180 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Précédent idéal pour Colza d'hiver semé en août)" },
      { cropId: "fs25-soja", bonus: "+15% (Excellente rotation)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Céréale vers Légumineuse)" },
      { cropId: "fs25-luzerne", bonus: "+15% (Orge vers Luzerne)" }
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
        month: "Juillet",
        title: "Pressage de la paille",
        recommendedToolIds: ["fs25-presse-balles", "fs25-goweil-presse-stationnaire"],
        speed: "15-20 km/h",
        notes: "Pressage de la paille d'orge.",
        fs25YieldImpact: "Revenu maximal paille"
      },
      {
        order: 2,
        phase: "2. Chaumes",
        month: "Juillet",
        title: "Broyage des chaumes",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Bonus de broyage.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 3,
        phase: "3. Chaux et Semis direct PF",
        month: "Août",
        title: "Chaux variable et semis direct avec engrais",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Semis direct de la culture suivante.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais) et Score PF 100/100"
      },
      {
        order: 4,
        phase: "4. Rouleau",
        month: "Août",
        title: "Roulage post-semis",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Passage du rouleau.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-seigle",
    name: "Seigle",
    family: "cereales",
    familyLabel: "Céréales rustiques",
    dlc: "Le Mechet & Mods",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - Août",
    sowPeriod: "Septembre - Octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "110-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Seigle vers Colza d'hiver)" },
      { cropId: "fs25-trefle", bonus: "+18% (Seigle vers Trèfle)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Seigle vers Légumineuse)" },
      { cropId: "fs25-pomme-de-terre", bonus: "+12% (Excellente valorisation sur sols légers)" }
    ],
    badNextCrops: [
      { cropId: "fs25-seigle", malus: "-15% (Monoculture Seigle)" },
      { cropId: "fs25-ble", malus: "-10% (Céréales successives)" },
      { cropId: "fs25-triticale", malus: "-10% (Même famille)" }
    ],
    residuesType: "Paille abondante très fibreuse",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille & Chaumes",
        month: "Août",
        title: "Pressage de paille et broyage des chaumes de seigle",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "Le seigle produit une excellente paille rustique.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux & Semis",
        month: "Septembre",
        title: "Chaux variable et semis direct",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Très rustique, adapté aux sols sableux ou acides du Morvan.",
        fs25YieldImpact: "+15% (Chaux) + 22.5% (Engrais 1)"
      }
    ]
  },
  {
    id: "fs25-triticale",
    name: "Triticale",
    family: "cereales",
    familyLabel: "Céréales rustiques",
    dlc: "Le Mechet & Mods",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - Août",
    sowPeriod: "Septembre - Octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "130-160 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (Triticale vers Colza)" },
      { cropId: "fs25-soja", bonus: "+15% (Triticale vers Soja)" },
      { cropId: "fs25-luzerne", bonus: "+15% (Triticale vers Luzerne)" }
    ],
    badNextCrops: [
      { cropId: "fs25-triticale", malus: "-15% (Monoculture Triticale)" },
      { cropId: "fs25-ble", malus: "-10% (Céréales successives)" }
    ],
    residuesType: "Très gros volume de paille",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille",
        month: "Août",
        title: "Pressage paille de triticale et broyage",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "Production maximale de paille pour élevage charolais ou laitier.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-avoine",
    name: "Avoine",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - Août",
    sowPeriod: "Mars - Avril",
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
        month: "Août",
        title: "Pressage de paille et broyage des chaumes",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "Récupération de la paille et broyage des chaumes.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-sorgho",
    name: "Sorgho",
    family: "cereales",
    familyLabel: "Céréales et grains",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Août - Septembre",
    sowPeriod: "Avril - Mai",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "110-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (Sorgho vers Soja)" },
      { cropId: "fs25-ble", bonus: "+12% (Sorgho vers Blé d'hiver)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Sorgho vers Pois ou Haricots)" }
    ],
    badNextCrops: [{ cropId: "fs25-sorgho", malus: "-15% (Monoculture Sorgho)" }],
    residuesType: "Chaumes courtes de sorgho",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        month: "Septembre",
        title: "Broyage des chaumes de sorgho",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage des chaumes.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },

  // ==================== 2. LÉGUMINEUSES & FOURRAGES ====================
  {
    id: "fs25-luzerne",
    name: "Luzerne",
    family: "fourrages",
    familyLabel: "Légumineuses pérennes",
    dlc: "Le Mechet & Mods",
    rotationCategory: "legumes",
    harvestPeriod: "Mai à Octobre (3-4 coupes par an)",
    sowPeriod: "Mars - Avril ou Août",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (Fixatrice d'azote - Aucun engrais chimique nécessaire)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (Précédent royal : Retournement de Luzerne vers Blé d'hiver)" },
      { cropId: "fs25-mais-grain", bonus: "+20% (Retournement de Luzerne vers Maïs)" },
      { cropId: "fs25-colza", bonus: "+18% (Excellente fertilisation résiduelle)" }
    ],
    badNextCrops: [
      { cropId: "fs25-luzerne", malus: "-20% (Monoculture continue après destruction)" },
      { cropId: "fs25-trefle", malus: "-12% (Légumineuses fourragères consécutives)" }
    ],
    residuesType: "Foin ou ensilage de haute valeur protéique et reliquat azoté massif",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Fauche et Entretien",
        month: "Octobre",
        title: "Dernière fauche d'automne et rouleau à prairie",
        recommendedToolIds: ["fs25-rouleau-herbe"],
        speed: "15 km/h",
        notes: "En cas de destruction pour mise en culture : broyage et déchaumage superficiel.",
        fs25YieldImpact: "Fourrage protéiné exceptionnel"
      }
    ]
  },
  {
    id: "fs25-trefle",
    name: "Trèfle",
    family: "fourrages",
    familyLabel: "Légumineuses et engrais verts",
    dlc: "Le Mechet & Mods",
    rotationCategory: "legumes",
    harvestPeriod: "Mai à Septembre (2-3 coupes par an)",
    sowPeriod: "Mars - Avril",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (Fixation symbiotique d'azote)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (Trèfle vers Blé d'hiver)" },
      { cropId: "fs25-mais-grain", bonus: "+18% (Trèfle vers Maïs)" },
      { cropId: "fs25-seigle", bonus: "+18% (Trèfle vers Seigle)" }
    ],
    badNextCrops: [{ cropId: "fs25-trefle", malus: "-20% (Monoculture Trèfle)" }],
    residuesType: "Masse organique azotée très riche",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage ou Ensilage",
        month: "Septembre",
        title: "Broyage ou ensilage du trèfle avant céréale",
        recommendedToolIds: ["fs25-broyeur", "fs25-semoir-direct"],
        speed: "15 km/h",
        notes: "Apporte un reliquat d'azote naturel colossal pour la culture suivante.",
        fs25YieldImpact: "+20% (Rotation) et +50 kg N/ha gratuit"
      }
    ]
  },
  {
    id: "fs25-soja",
    name: "Soja (Fixateur d'azote)",
    family: "oleoprot",
    familyLabel: "Légumineuses et protéagineux",
    dlc: "Jeu de base",
    rotationCategory: "legumes",
    harvestPeriod: "Septembre - Octobre",
    sowPeriod: "Avril - Mai",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (Auto-suffisant en azote)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (Rotation optimale : Soja vers Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+18% (Excellente valorisation de l'azote résiduel)" },
      { cropId: "fs25-colza", bonus: "+15% (Très bon précédent)" },
      { cropId: "fs25-mais-grain", bonus: "+15% (Rotation Soja vers Maïs)" }
    ],
    badNextCrops: [
      { cropId: "fs25-soja", malus: "-20% (Pénalité monoculture Soja)" },
      { cropId: "fs25-pois-haricots", malus: "-12% (Légumineuses consécutives)" }
    ],
    residuesType: "Chaumes courtes, reliquat azoté organique élevé",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        month: "Octobre",
        title: "Broyage des chaumes de soja",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage pour valider le bonus de +2.5%.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux et Semis direct Blé (PF)",
        month: "Octobre",
        title: "Chaux variable et semis direct de Blé d'hiver",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Le blé d'hiver après soja bénéficie du bonus de rotation maximal (+20%) et du score PF 100/100.",
        fs25YieldImpact: "+20% (Rotation) + 15% (Chaux) + Score Sol PF 100/100"
      },
      {
        order: 3,
        phase: "3. Finition",
        month: "Octobre",
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
    name: "Pois et Haricots verts",
    family: "nouveautes",
    familyLabel: "Nouveautés et légumineuses",
    dlc: "Jeu de base",
    rotationCategory: "legumes",
    harvestPeriod: "Juillet - Août",
    sowPeriod: "Mars - Avril",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0-40 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (Précédent idéal pour le Blé d'hiver)" },
      { cropId: "fs25-colza", bonus: "+15% (Semé directement en août)" }
    ],
    badNextCrops: [{ cropId: "fs25-pois-haricots", malus: "-20% (Monoculture Pois ou Haricots)" }],
    residuesType: "Résidus légers riches en azote",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        month: "Août",
        title: "Broyage des chaumes",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage pour le bonus de rendement.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },

  // ==================== 3. CULTURES LOURDES & TUBERCULES ====================
  {
    id: "fs25-mais-grain",
    name: "Maïs grain et Ensilage",
    family: "lourdes",
    familyLabel: "Cultures avec labour obligatoire",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Octobre - Novembre",
    sowPeriod: "Avril - Mai",
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
        month: "Novembre",
        title: "Broyage des cannes de maïs",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyer les cannes avant tout travail du sol pour valider les +2.5%.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 2,
        phase: "2. Labour PF (Sous-soleuse)",
        month: "Novembre",
        title: "Sous-soleuse (Valide le labour sans dégrader le score de sol PF)",
        recommendedToolIds: ["fs25-sous-soleuse", "fs25-charrue"],
        speed: "12 km/h",
        notes: "En Precision Farming, la sous-soleuse préserve le score de sol par rapport à la charrue.",
        fs25YieldImpact: "+10% (Labour validé) et score PF préservé"
      }
    ]
  },
  {
    id: "fs25-oignons",
    name: "Oignons",
    family: "premium",
    familyLabel: "Légumes et bulbes",
    dlc: "Premium Expansion",
    rotationCategory: "roots",
    harvestPeriod: "Août - Octobre",
    sowPeriod: "Mars - Avril",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (Rotation optimale : Oignons vers Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Excellente rotation vers Céréale)" },
      { cropId: "fs25-soja", bonus: "+15% (Oignons vers Légumineuse)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (Oignons vers Pois ou Haricots)" }
    ],
    badNextCrops: [
      { cropId: "fs25-oignons", malus: "-25% (Pénalité monoculture Oignons sur Oignons)" },
      { cropId: "fs25-carottes-panais", malus: "-15% (Légumes successifs)" },
      { cropId: "fs25-betterave-rouge", malus: "-15% (Légumes successifs)" },
      { cropId: "fs25-pomme-de-terre", malus: "-12% (Tubercules successifs)" }
    ],
    residuesType: "Fanes et billons résiduels (Sous-soleuse requise)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        month: "Octobre",
        title: "Sous-soleuse (Aplanit les billons et valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Aplanit les buttes d'oignons et valide l'état de labour sans dégrader le score de sol PF.",
        fs25YieldImpact: "+10% (Labour)"
      }
    ]
  },
  {
    id: "fs25-carottes-panais",
    name: "Carottes et Panais",
    family: "premium",
    familyLabel: "Légumes racines",
    dlc: "Premium Expansion",
    rotationCategory: "roots",
    harvestPeriod: "Août - Novembre",
    sowPeriod: "Avril - Mai",
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
      { cropId: "fs25-carottes-panais", malus: "-20% (Monoculture Carottes ou Panais)" },
      { cropId: "fs25-oignons", malus: "-15% (Légumes et bulbes consécutifs)" },
      { cropId: "fs25-betterave-rouge", malus: "-15% (Légumes racines consécutifs)" },
      { cropId: "fs25-pomme-de-terre", malus: "-15% (Tubercules)" }
    ],
    residuesType: "Fanes et billons résiduels (Sous-soleuse requise)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        month: "Novembre",
        title: "Sous-soleuse (Élimine les buttes et valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Aplanit les billons et valide l'état de labour.",
        fs25YieldImpact: "+10% (Labour)"
      }
    ]
  },
  {
    id: "fs25-betterave-rouge",
    name: "Betteraves rouges",
    family: "premium",
    familyLabel: "Légumes racines",
    dlc: "Premium Expansion",
    rotationCategory: "roots",
    harvestPeriod: "Septembre - Novembre",
    sowPeriod: "Avril - Mai",
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
        month: "Novembre",
        title: "Sous-soleuse (Labour validé)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Supprime le malus de labour.",
        fs25YieldImpact: "+10%"
      }
    ]
  },
  {
    id: "fs25-pomme-de-terre",
    name: "Pommes de terre",
    family: "lourdes",
    familyLabel: "Cultures avec labour obligatoire",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Août - Septembre",
    sowPeriod: "Mars - Avril",
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
        month: "Septembre",
        title: "Sous-solage (Valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Supprime le malus de labour.",
        fs25YieldImpact: "+10%"
      }
    ]
  },
  {
    id: "fs25-betterave",
    name: "Betteraves sucrières",
    family: "lourdes",
    familyLabel: "Cultures avec labour obligatoire",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Octobre - Novembre",
    sowPeriod: "Avril - Mai",
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
        month: "Novembre",
        title: "Sous-soleuse (Labour validé)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Passage de la sous-soleuse.",
        fs25YieldImpact: "+10%"
      }
    ]
  },

  // ==================== 4. OLÉAGINEUX & FIBRES ====================
  {
    id: "fs25-colza",
    name: "Colza",
    family: "oleoprot",
    familyLabel: "Oléagineux et protéagineux",
    dlc: "Jeu de base",
    rotationCategory: "oilseeds",
    harvestPeriod: "Juillet - Août",
    sowPeriod: "Août - Septembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "180-220 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (Rotation optimale : Colza vers Blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (Excellente rotation)" },
      { cropId: "fs25-seigle", bonus: "+15% (Colza vers Seigle)" },
      { cropId: "fs25-soja", bonus: "+12% (Bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-colza", malus: "-25% (Pénalité monoculture Colza)" },
      { cropId: "fs25-tournesol", malus: "-12% (Oléagineux consécutifs)" },
      { cropId: "fs25-lin", malus: "-12% (Oléagineux consécutifs)" }
    ],
    residuesType: "Chaumes fines de colza",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        month: "Août",
        title: "Broyage chaumes",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyer les chaumes pour +2.5%.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-lin",
    name: "Lin",
    family: "oleoprot",
    familyLabel: "Oléagineux et fibres",
    dlc: "Le Mechet & Mods",
    rotationCategory: "oilseeds",
    harvestPeriod: "Juillet - Août",
    sowPeriod: "Mars - Avril",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "80-110 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (Lin vers Blé d'hiver - Précédent nettoyant exceptionnel)" },
      { cropId: "fs25-orge", bonus: "+15% (Lin vers Orge)" }
    ],
    badNextCrops: [
      { cropId: "fs25-lin", malus: "-25% (Monoculture Lin)" },
      { cropId: "fs25-colza", malus: "-12% (Oléagineux)" }
    ],
    residuesType: "Paille de lin (fibres)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille & Chaumes",
        month: "Août",
        title: "Récolte paille de lin et broyage",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "Le lin laisse un sol meuble et propre.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-chanvre",
    name: "Chanvre",
    family: "speciales",
    familyLabel: "Cultures industrielles et fibres",
    dlc: "Le Mechet & Mods",
    rotationCategory: "special",
    harvestPeriod: "Août - Septembre",
    sowPeriod: "Avril - Mai",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "90-120 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (Chanvre vers Blé d'hiver - Étouffe les adventices)" },
      { cropId: "fs25-seigle", bonus: "+15% (Chanvre vers Seigle)" }
    ],
    badNextCrops: [{ cropId: "fs25-chanvre", malus: "-20% (Monoculture Chanvre)" }],
    residuesType: "Paille de chanvre et chènevotte",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille de chanvre",
        month: "Septembre",
        title: "Pressage paille de chanvre et déchaumage léger",
        recommendedToolIds: ["fs25-presse-balles", "fs25-dechaumeur-disques"],
        speed: "15 km/h",
        notes: "Excellente plante nettoyante du sol.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-tournesol",
    name: "Tournesol",
    family: "oleoprot",
    familyLabel: "Oléagineux et protéagineux",
    dlc: "Jeu de base",
    rotationCategory: "oilseeds",
    harvestPeriod: "Octobre",
    sowPeriod: "Avril - Mai",
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
        month: "Octobre",
        title: "Broyage des tiges de tournesol",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage des cannes.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },

  // ==================== 5. NOUVEAUTÉS FS25 & ENGRAIS VERTS ====================
  {
    id: "fs25-moutarde",
    name: "Moutarde",
    family: "oleoprot",
    familyLabel: "Engrais verts et CIPAN",
    dlc: "Le Mechet & Mods",
    rotationCategory: "oilseeds",
    harvestPeriod: "Octobre ou Destruction hivernale",
    sowPeriod: "Août - Septembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "60-90 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-mais-grain", bonus: "+18% (Moutarde vers Maïs au printemps)" },
      { cropId: "fs25-soja", bonus: "+15% (Moutarde vers Soja)" },
      { cropId: "fs25-pomme-de-terre", bonus: "+15% (Effet assainissant nématicide)" }
    ],
    badNextCrops: [
      { cropId: "fs25-colza", malus: "-15% (Brassicacées consécutives)" }
    ],
    residuesType: "Matière verte broyée / engrais vert",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Destruction Couvert",
        month: "Mars",
        title: "Broyage ou incorporation de la moutarde avant semis de printemps",
        recommendedToolIds: ["fs25-broyeur", "fs25-semoir-direct"],
        speed: "15 km/h",
        notes: "Restitue l'azote piégé pendant l'hiver.",
        fs25YieldImpact: "+50 kg N/ha gratuit et sol protégé"
      }
    ]
  },
  {
    id: "fs25-riz-inonde",
    name: "Riz inondé",
    family: "nouveautes",
    familyLabel: "Nouveautés et riziculture",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Octobre - Novembre",
    sowPeriod: "Avril - Mai",
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
        month: "Novembre",
        title: "Broyage des chaumes de riz",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "12-15 km/h",
        notes: "Passage du broyeur dans la rizière à sec.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-epinards",
    name: "Épinards",
    family: "nouveautes",
    familyLabel: "Nouveautés et maraîchage",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Printemps & Automne (2 récoltes par an)",
    sowPeriod: "Mars ou Août",
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
        month: "Novembre",
        title: "Broyage et chaux variable PF",
        recommendedToolIds: ["fs25-broyeur", "fs25-epandeur-chaux"],
        speed: "15 km/h",
        notes: "Broyer et chauler.",
        fs25YieldImpact: "+2.5% + 15%"
      }
    ]
  },

  // ==================== 6. FORESTERIE, FOURRAGES & SPÉCIALES ====================
  {
    id: "fs25-peupliers",
    name: "Peupliers",
    family: "platinum",
    familyLabel: "Foresterie et bois",
    dlc: "Platinum Expansion",
    rotationCategory: "fallow",
    harvestPeriod: "Toute l'année après 16 mois",
    sowPeriod: "Mars - Mai",
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
        month: "Toute l'année",
        title: "Fertilisation de repousse",
        recommendedToolIds: ["fs25-pumps-hoses-ombilical", "fs25-epandeur-chaux"],
        speed: "16 km/h",
        notes: "Fertiliser les souches pour maximiser le volume de bois.",
        fs25YieldImpact: "+45% (Engrais max)"
      }
    ]
  },
  {
    id: "fs25-herbe",
    name: "Herbe et Prairies",
    family: "fourrages",
    familyLabel: "Fourrages et élevage",
    dlc: "Jeu de base",
    rotationCategory: "grass",
    harvestPeriod: "Avril à Novembre (3-4 coupes par an)",
    sowPeriod: "Mars - Avril ou Août - Septembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha par coupe",
    idealNextCrops: [
      { cropId: "fs25-mais-grain", bonus: "+20% (Retournement de prairie vers Maïs)" },
      { cropId: "fs25-ble", bonus: "+15% (Retournement de prairie vers Blé)" }
    ],
    badNextCrops: [],
    residuesType: "Andains d'herbe fraîche",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Rouleau à herbe (PF)",
        month: "Après fauche",
        title: "Passage du rouleau à herbe post-fauche",
        recommendedToolIds: ["fs25-rouleau-herbe"],
        speed: "12-15 km/h",
        notes: "Le rouleau à herbe confère un niveau de fertilisation sans dépense d'intrant.",
        fs25YieldImpact: "+1 niveau de fertilisation gratuit"
      }
    ]
  },
  {
    id: "fs25-coton",
    name: "Coton",
    family: "speciales",
    familyLabel: "Cultures spécialisées",
    dlc: "Jeu de base",
    rotationCategory: "special",
    harvestPeriod: "Octobre - Novembre",
    sowPeriod: "Avril - Mai",
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
        month: "Novembre",
        title: "Broyage des tiges de coton",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Broyage des tiges.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-canne-a-sucre",
    name: "Canne à sucre",
    family: "speciales",
    familyLabel: "Cultures spécialisées",
    dlc: "Jeu de base",
    rotationCategory: "special",
    harvestPeriod: "Octobre - Décembre",
    sowPeriod: "Mars - Avril",
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
        phase: "1. Sous-soleuse ou Repousse",
        month: "Décembre",
        title: "Sous-soleuse ou fertilisation de repousse",
        recommendedToolIds: ["fs25-sous-soleuse", "fs25-epandeur-chaux"],
        speed: "12 km/h",
        notes: "Détruire les souches pour remettre en culture ou fertiliser pour la repousse.",
        fs25YieldImpact: "+10% (Labour validé)"
      }
    ]
  },
  {
    id: "fs25-raisins-olives",
    name: "Vigne et Olives",
    family: "speciales",
    familyLabel: "Cultures spécialisées",
    dlc: "Jeu de base",
    rotationCategory: "special",
    harvestPeriod: "Septembre - Octobre",
    sowPeriod: "Mars - Mai",
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
        month: "Octobre",
        title: "Broyage des sarments et tonte inter-rang",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "10-12 km/h",
        notes: "Passage du broyeur compact d'inter-rang.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.CROPS_DATABASE = CROPS_DATABASE;
}
