/**
 * Base de données complète des cultures Farming Simulator 25 (FS25)
 * Inclut :
 * - Les cultures officielles du jeu de base et de toutes les extensions
 * - Les cultures et variantes de la carte Le Mechet et des modules agronomiques :
 *   épeautre, blé d'hiver, blé de printemps, orge d'hiver, orge de printemps, seigle grain,
 *   seigle vert, maïs grain, maïs pour ensilage, herbe semée, prairie permanente, avoine d'hiver,
 *   avoine de printemps, féverole, méteil, sarrasin, luzerne, trèfle, lin, chanvre, moutarde, oignons, etc.
 * - Les règles de rotation des cultures
 * - Les exigences en azote et sol de l'agriculture de précision
 * - Les contraintes de la politique de rotation du mod Paperasserie
 * 
 * Rédigé exclusivement en français selon les règles typographiques (majuscule uniquement en début de phrase ou nom propre).
 */
const CROPS_DATABASE = [
  // ==================== 1. CÉRÉALES D'AUTOMNE ET RUSTIQUES ====================
  {
    id: "fs25-ble",
    name: "Blé d'hiver",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Septembre - octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (rotation recommandée céréale vers colza d'hiver)" },
      { cropId: "fs25-tournesol", bonus: "+12% (excellente rotation)" },
      { cropId: "fs25-feverole", bonus: "+18% (céréale vers légumineuse fixatrice)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (céréale vers légumineuse)" },
      { cropId: "fs25-soja", bonus: "+15% (céréale vers légumineuse)" },
      { cropId: "fs25-luzerne", bonus: "+15% (céréale vers luzerne)" },
      { cropId: "fs25-mais-grain", bonus: "+10% (bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-ble", malus: "-15% (pénalité de monoculture blé sur blé)" },
      { cropId: "fs25-ble-printemps", malus: "-15% (même espèce consécutive)" },
      { cropId: "fs25-orge", malus: "-10% (même famille de céréales consécutives)" },
      { cropId: "fs25-orge-printemps", malus: "-10% (même famille de céréales)" },
      { cropId: "fs25-epeautre", malus: "-12% (céréales à paille proches)" },
      { cropId: "fs25-seigle", malus: "-10% (même famille de céréales)" },
      { cropId: "fs25-triticale", malus: "-10% (même famille de céréales)" }
    ],
    residuesType: "Andains de paille et chaumes",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et balles",
        month: "Août",
        title: "Ramassage de la paille (presse à balles ou autochargeuse)",
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
        notes: "Passage du broyeur pour valider l'état 'chaumes broyées'.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 3,
        phase: "3. Chaux",
        month: "Août",
        title: "Chaux à dosage variable automatique",
        recommendedToolIds: ["fs25-epandeur-chaux"],
        speed: "18-20 km/h",
        notes: "Épandage modulé selon la carte de pH et le type de sol.",
        fs25YieldImpact: "+15% et score de pH optimal (100/100)"
      },
      {
        order: 4,
        phase: "4. Semis direct",
        month: "Septembre",
        title: "Semis direct sans labour avec fertilisation modulée",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-pumps-hoses-ombilical"],
        speed: "15-18 km/h",
        notes: "Le semis direct sans labour octroie la note maximale de 100/100 au score environnemental de travail du sol.",
        fs25YieldImpact: "+22.5% (premier apport) et note maximale de sol"
      },
      {
        order: 5,
        phase: "5. Finition",
        month: "Septembre",
        title: "Passage du rouleau compresseur de sol",
        recommendedToolIds: ["fs25-rouleau-sol"],
        speed: "15 km/h",
        notes: "Enfonce les petites pierres et confère l'état 'roulé'.",
        fs25YieldImpact: "+2.5% de rendement"
      },
      {
        order: 6,
        phase: "6. Désherbage et azote",
        month: "Mars",
        title: "Désherbage ciblé par caméras ou herse étrille mécanique",
        recommendedToolIds: ["fs25-pf-spot-spraying", "fs25-sarcleuse-herse-etrille"],
        speed: "15 km/h",
        notes: "Pulvérisation ciblée par caméras : score environnemental de désherbage maximal.",
        fs25YieldImpact: "Score de désherbage maximal (100/100)"
      }
    ]
  },
  {
    id: "fs25-ble-printemps",
    name: "Blé de printemps",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "cereals",
    harvestPeriod: "Août - septembre",
    sowPeriod: "Mars - avril",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "140-170 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (blé de printemps vers colza d'hiver direct)" },
      { cropId: "fs25-feverole", bonus: "+18% (vers féverole d'hiver ou de printemps)" },
      { cropId: "fs25-soja", bonus: "+15% (vers légumineuse)" }
    ],
    badNextCrops: [
      { cropId: "fs25-ble", malus: "-15% (monoculture de blé)" },
      { cropId: "fs25-ble-printemps", malus: "-15% (monoculture de blé de printemps)" },
      { cropId: "fs25-orge-printemps", malus: "-10% (céréales de printemps successives)" }
    ],
    residuesType: "Andains de paille et chaumes",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille",
        month: "Septembre",
        title: "Pressage de paille de blé de printemps",
        recommendedToolIds: ["fs25-presse-balles"],
        speed: "15-20 km/h",
        notes: "Pressage de la paille.",
        fs25YieldImpact: "Revenu paille"
      }
    ]
  },
  {
    id: "fs25-epeautre",
    name: "Épeautre",
    family: "cereales",
    familyLabel: "Céréales rustiques",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Septembre - octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+18% (rotation optimale épeautre vers colza)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (épeautre vers légumineuse)" },
      { cropId: "fs25-soja", bonus: "+15% (épeautre vers soja)" },
      { cropId: "fs25-tournesol", bonus: "+12% (très bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-epeautre", malus: "-20% (monoculture épeautre sur épeautre)" },
      { cropId: "fs25-ble", malus: "-12% (céréales proches consécutives)" },
      { cropId: "fs25-triticale", malus: "-10% (même famille)" }
    ],
    residuesType: "Paille très abondante et robuste",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et chaumes",
        month: "Août",
        title: "Pressage de la paille d'épeautre et broyage des chaumes",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "L'épeautre produit un volume de paille très important.",
        fs25YieldImpact: "+2.5%"
      },
      {
        order: 2,
        phase: "2. Chaux et semis",
        month: "Septembre",
        title: "Chaux variable et semis direct",
        recommendedToolIds: ["fs25-epandeur-chaux", "fs25-semoir-direct"],
        speed: "15-18 km/h",
        notes: "Très rustique, valorise parfaitement les sols limoneux ou acides.",
        fs25YieldImpact: "+15% (chaux) + 22.5% (engrais initial)"
      }
    ]
  },
  {
    id: "fs25-orge",
    name: "Orge d'hiver (escourgeon)",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juin - juillet",
    sowPeriod: "Septembre - octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "140-180 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+18% (précédent royal pour colza d'hiver semé en août)" },
      { cropId: "fs25-soja", bonus: "+15% (excellente rotation)" },
      { cropId: "fs25-moutarde", bonus: "+15% (permet un couvert d'été immédiat)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (céréale vers légumineuse)" },
      { cropId: "fs25-luzerne", bonus: "+15% (orge vers luzerne)" }
    ],
    badNextCrops: [
      { cropId: "fs25-orge", malus: "-15% (monoculture orge sur orge)" },
      { cropId: "fs25-orge-printemps", malus: "-15% (orge d'hiver vers orge de printemps)" },
      { cropId: "fs25-ble", malus: "-10% (céréales successives)" }
    ],
    residuesType: "Volume élevé de paille",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille",
        month: "Juillet",
        title: "Pressage de la paille d'orge",
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
      }
    ]
  },
  {
    id: "fs25-orge-printemps",
    name: "Orge de printemps (orge brassicole)",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Février - mars",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "110-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (orge brassicole vers colza)" },
      { cropId: "fs25-soja", bonus: "+15% (vers légumineuse)" }
    ],
    badNextCrops: [
      { cropId: "fs25-orge-printemps", malus: "-15% (monoculture orge de printemps)" },
      { cropId: "fs25-orge", malus: "-15% (même espèce consécutive)" }
    ],
    residuesType: "Paille fine pour alimentation ou litière",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et chaumes",
        month: "Août",
        title: "Pressage paille et broyage des chaumes",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "Paille claire de printemps.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-seigle",
    name: "Seigle (grain)",
    family: "cereales",
    familyLabel: "Céréales rustiques",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Septembre - octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "110-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (seigle vers colza d'hiver)" },
      { cropId: "fs25-trefle", bonus: "+18% (seigle vers trèfle)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (seigle vers légumineuse)" },
      { cropId: "fs25-pomme-de-terre", bonus: "+12% (excellente valorisation sur sols légers)" }
    ],
    badNextCrops: [
      { cropId: "fs25-seigle", malus: "-15% (monoculture de seigle)" },
      { cropId: "fs25-seigle-vert", malus: "-15% (même espèce)" },
      { cropId: "fs25-ble", malus: "-10% (céréales successives)" },
      { cropId: "fs25-triticale", malus: "-10% (même famille)" }
    ],
    residuesType: "Paille abondante très fibreuse",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et chaumes",
        month: "Août",
        title: "Pressage de paille et broyage des chaumes de seigle",
        recommendedToolIds: ["fs25-presse-balles", "fs25-broyeur"],
        speed: "15 km/h",
        notes: "Le seigle produit une excellente paille rustique.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-seigle-vert",
    name: "Seigle vert (fourrager / ensilage plante entière)",
    family: "cereales",
    familyLabel: "Céréales fourragères et dérobées",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "cereals",
    harvestPeriod: "Mai (plante entière immature)",
    sowPeriod: "Septembre - octobre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "90-120 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-mais-ensilage", bonus: "+20% (dérobée optimale : seigle vert récolté en mai vers maïs ensilage semé immédiatement)" },
      { cropId: "fs25-mais-grain", bonus: "+18% (seigle vert vers maïs)" },
      { cropId: "fs25-tournesol", bonus: "+18% (seigle vert vers tournesol dérobé)" },
      { cropId: "fs25-soja", bonus: "+15% (seigle vert vers soja)" }
    ],
    badNextCrops: [
      { cropId: "fs25-seigle-vert", malus: "-20% (monoculture de seigle vert)" },
      { cropId: "fs25-seigle", malus: "-15% (même espèce consécutive)" }
    ],
    residuesType: "Ensilage végétal à haute digestibilité",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Ensilage dérobée",
        month: "Mai",
        title: "Récolte ensileuse plante entière et semis direct immédiat d'été",
        recommendedToolIds: ["fs25-semoir-direct", "fs25-semoir-monograine"],
        speed: "15 km/h",
        notes: "Libère la parcelle début mai pour une culture d'été à haut rendement.",
        fs25YieldImpact: "Double récolte sur l'année"
      }
    ]
  },
  {
    id: "fs25-triticale",
    name: "Triticale",
    family: "cereales",
    familyLabel: "Céréales rustiques",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Septembre - octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "130-160 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (triticale vers colza)" },
      { cropId: "fs25-soja", bonus: "+15% (triticale vers soja)" },
      { cropId: "fs25-luzerne", bonus: "+15% (triticale vers luzerne)" }
    ],
    badNextCrops: [
      { cropId: "fs25-triticale", malus: "-15% (monoculture de triticale)" },
      { cropId: "fs25-ble", malus: "-10% (céréales successives)" }
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
    name: "Avoine de printemps",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Jeu de base",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Mars - avril",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (excellente rotation)" },
      { cropId: "fs25-soja", bonus: "+15% (rotation céréale vers soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-avoine", malus: "-15% (monoculture d'avoine)" }],
    residuesType: "Paille pour chevaux",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et chaumes",
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
    id: "fs25-avoine-hiver",
    name: "Avoine d'hiver",
    family: "cereales",
    familyLabel: "Céréales à paille",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "cereals",
    harvestPeriod: "Juillet",
    sowPeriod: "Octobre",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-colza", bonus: "+15% (vers colza)" },
      { cropId: "fs25-soja", bonus: "+15% (vers soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-avoine-hiver", malus: "-15% (monoculture)" }],
    residuesType: "Paille d'hiver",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille",
        month: "Juillet",
        title: "Pressage paille d'avoine d'hiver",
        recommendedToolIds: ["fs25-presse-balles"],
        speed: "15 km/h",
        notes: "Pressage de paille.",
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
    harvestPeriod: "Août - septembre",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "110-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (sorgho vers soja)" },
      { cropId: "fs25-ble", bonus: "+12% (sorgho vers blé d'hiver)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (sorgho vers pois ou haricots)" }
    ],
    badNextCrops: [{ cropId: "fs25-sorgho", malus: "-15% (monoculture de sorgho)" }],
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
  {
    id: "fs25-meteil",
    name: "Méteil fourrager (ensilage plante entière)",
    family: "cereales",
    familyLabel: "Fourrages et ensilages",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "cereals",
    harvestPeriod: "Juin (ensilage plante entière)",
    sowPeriod: "Septembre - octobre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "80-110 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-mais-ensilage", bonus: "+20% (méteil ensilé en juin vers maïs dérobé)" },
      { cropId: "fs25-tournesol", bonus: "+18% (vers tournesol dérobé)" },
      { cropId: "fs25-soja", bonus: "+15% (vers soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-meteil", malus: "-15% (monoculture de méteil)" }],
    residuesType: "Ensilage riche en protéines",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Ensilage",
        month: "Juin",
        title: "Ensilage plante entière du méteil",
        recommendedToolIds: ["fs25-semoir-direct"],
        speed: "15 km/h",
        notes: "Mélange très équilibré pour bovins.",
        fs25YieldImpact: "Excellente valeur nutritive"
      }
    ]
  },

  // ==================== 2. LÉGUMINEUSES ET FOURRAGES ====================
  {
    id: "fs25-luzerne",
    name: "Luzerne",
    family: "fourrages",
    familyLabel: "Légumineuses pérennes",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "legumes",
    harvestPeriod: "Mai à octobre (3-4 coupes par an)",
    sowPeriod: "Mars - avril ou août",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (fixatrice d'azote - aucun engrais chimique nécessaire)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (précédent royal : retournement de luzerne vers blé d'hiver)" },
      { cropId: "fs25-mais-grain", bonus: "+20% (retournement de luzerne vers maïs)" },
      { cropId: "fs25-mais-ensilage", bonus: "+20% (retournement vers maïs ensilage)" },
      { cropId: "fs25-colza", bonus: "+18% (excellente fertilisation résiduelle)" }
    ],
    badNextCrops: [
      { cropId: "fs25-luzerne", malus: "-20% (monoculture continue après destruction)" },
      { cropId: "fs25-trefle", malus: "-12% (légumineuses fourragères consécutives)" }
    ],
    residuesType: "Foin ou ensilage de haute valeur protéique et reliquat azoté massif",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Fauche et entretien",
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
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "legumes",
    harvestPeriod: "Mai à septembre (2-3 coupes par an)",
    sowPeriod: "Mars - avril",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (fixation symbiotique d'azote)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (trèfle vers blé d'hiver)" },
      { cropId: "fs25-mais-grain", bonus: "+18% (trèfle vers maïs)" },
      { cropId: "fs25-mais-ensilage", bonus: "+18% (trèfle vers maïs ensilage)" },
      { cropId: "fs25-seigle", bonus: "+18% (trèfle vers seigle)" }
    ],
    badNextCrops: [{ cropId: "fs25-trefle", malus: "-20% (monoculture de trèfle)" }],
    residuesType: "Masse organique azotée très riche",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage ou ensilage",
        month: "Septembre",
        title: "Broyage ou ensilage du trèfle avant céréale",
        recommendedToolIds: ["fs25-broyeur", "fs25-semoir-direct"],
        speed: "15 km/h",
        notes: "Apporte un reliquat d'azote naturel colossal pour la culture suivante.",
        fs25YieldImpact: "+20% (rotation) et +50 kg N/ha gratuit"
      }
    ]
  },
  {
    id: "fs25-feverole",
    name: "Féverole (protéagineux fixateur d'azote)",
    family: "oleoprot",
    familyLabel: "Légumineuses et protéagineux",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "legumes",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Mars - avril ou octobre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (auto-suffisante en azote)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (précédent d'or : féverole vers blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+18% (excellente valorisation de l'azote)" },
      { cropId: "fs25-epeautre", bonus: "+18% (féverole vers épeautre)" },
      { cropId: "fs25-colza", bonus: "+15% (vers colza)" }
    ],
    badNextCrops: [
      { cropId: "fs25-feverole", malus: "-20% (monoculture de féverole)" },
      { cropId: "fs25-pois-haricots", malus: "-12% (légumineuses consécutives)" },
      { cropId: "fs25-soja", malus: "-12% (légumineuses consécutives)" }
    ],
    residuesType: "Tiges sèches riches en reliquats azotés",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        month: "Août",
        title: "Broyage des chaumes de féverole",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Laisse un sol riche en azote.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },
  {
    id: "fs25-soja",
    name: "Soja (fixateur d'azote)",
    family: "oleoprot",
    familyLabel: "Légumineuses et protéagineux",
    dlc: "Jeu de base",
    rotationCategory: "legumes",
    harvestPeriod: "Septembre - octobre",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0 kg N/ha (auto-suffisant en azote)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (rotation optimale : soja vers blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+18% (excellente valorisation de l'azote résiduel)" },
      { cropId: "fs25-epeautre", bonus: "+18% (soja vers épeautre)" },
      { cropId: "fs25-colza", bonus: "+15% (très bon précédent)" },
      { cropId: "fs25-mais-grain", bonus: "+15% (rotation soja vers maïs)" }
    ],
    badNextCrops: [
      { cropId: "fs25-soja", malus: "-20% (pénalité de monoculture soja)" },
      { cropId: "fs25-pois-haricots", malus: "-12% (légumineuses consécutives)" },
      { cropId: "fs25-feverole", malus: "-12% (légumineuses consécutives)" }
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
      }
    ]
  },
  {
    id: "fs25-pois-haricots",
    name: "Pois et haricots verts",
    family: "nouveautes",
    familyLabel: "Nouveautés et légumineuses",
    dlc: "Jeu de base",
    rotationCategory: "legumes",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Mars - avril",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "0-40 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+20% (précédent idéal pour le blé d'hiver)" },
      { cropId: "fs25-epeautre", bonus: "+18% (précédent idéal épeautre)" },
      { cropId: "fs25-colza", bonus: "+15% (semé directement en août)" }
    ],
    badNextCrops: [{ cropId: "fs25-pois-haricots", malus: "-20% (monoculture de pois ou haricots)" }],
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

  // ==================== 3. CULTURES LOURDES ET TUBERCULES ====================
  {
    id: "fs25-mais-grain",
    name: "Maïs grain",
    family: "lourdes",
    familyLabel: "Cultures avec labour obligatoire",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Octobre - novembre",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "200-240 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (rotation recommandée maïs vers soja)" },
      { cropId: "fs25-ble", bonus: "+12% (blé d'hiver tardif ou printemps)" },
      { cropId: "fs25-tournesol", bonus: "+10% (bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-mais-grain", malus: "-20% (monoculture maïs sur maïs)" },
      { cropId: "fs25-mais-ensilage", malus: "-15% (maïs consécutif)" }
    ],
    residuesType: "Cannes de maïs épaisses (déclenche l'état labour requis)",
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
        phase: "2. Labour sous-soleuse",
        month: "Novembre",
        title: "Sous-soleuse (valide le labour sans dégrader la note environnementale de sol)",
        recommendedToolIds: ["fs25-sous-soleuse", "fs25-charrue"],
        speed: "12 km/h",
        notes: "La sous-soleuse préserve le score de sol par rapport à la charrue.",
        fs25YieldImpact: "+10% (labour validé) et score de sol préservé"
      }
    ]
  },
  {
    id: "fs25-mais-ensilage",
    name: "Maïs pour ensilage",
    family: "lourdes",
    familyLabel: "Cultures avec labour obligatoire",
    dlc: "Jeu de base",
    rotationCategory: "roots",
    harvestPeriod: "Septembre - octobre (coupe plante entière)",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "180-220 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (maïs ensilage récolté tôt vers blé d'hiver optimal)" },
      { cropId: "fs25-seigle-vert", bonus: "+18% (vers seigle vert dérobé d'hiver)" },
      { cropId: "fs25-soja", bonus: "+15% (vers soja)" }
    ],
    badNextCrops: [
      { cropId: "fs25-mais-ensilage", malus: "-20% (monoculture de maïs ensilage)" },
      { cropId: "fs25-mais-grain", malus: "-15% (maïs consécutif)" }
    ],
    residuesType: "Chaumes rases coupées à l'ensileuse (sous-soleuse requise)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        month: "Octobre",
        title: "Sous-soleuse et décompacteur (valide le labour après ensilage)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Décompacte le passage répété des remorques d'ensilage.",
        fs25YieldImpact: "+10% (labour)"
      }
    ]
  },
  {
    id: "fs25-oignons",
    name: "Oignons",
    family: "premium",
    familyLabel: "Légumes et bulbes",
    dlc: "Extension Premium",
    rotationCategory: "roots",
    harvestPeriod: "Août - octobre",
    sowPeriod: "Mars - avril",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (rotation optimale : oignons vers blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (excellente rotation vers céréale)" },
      { cropId: "fs25-epeautre", bonus: "+15% (oignons vers épeautre)" },
      { cropId: "fs25-soja", bonus: "+15% (oignons vers légumineuse)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (oignons vers pois ou haricots)" }
    ],
    badNextCrops: [
      { cropId: "fs25-oignons", malus: "-25% (pénalité de monoculture oignons sur oignons)" },
      { cropId: "fs25-carottes-panais", malus: "-15% (légumes successifs)" },
      { cropId: "fs25-betterave-rouge", malus: "-15% (légumes successifs)" },
      { cropId: "fs25-pomme-de-terre", malus: "-12% (tubercules successifs)" }
    ],
    residuesType: "Fanes et billons résiduels (sous-soleuse requise)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        month: "Octobre",
        title: "Sous-soleuse (aplanit les billons et valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Aplanit les buttes d'oignons et valide l'état de labour sans dégrader la note environnementale.",
        fs25YieldImpact: "+10% (labour)"
      }
    ]
  },
  {
    id: "fs25-carottes-panais",
    name: "Carottes et panais",
    family: "premium",
    familyLabel: "Légumes racines",
    dlc: "Extension Premium",
    rotationCategory: "roots",
    harvestPeriod: "Août - novembre",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (légumes racines vers céréale d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (très bon précédent)" },
      { cropId: "fs25-soja", bonus: "+12% (bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-carottes-panais", malus: "-20% (monoculture carottes ou panais)" },
      { cropId: "fs25-oignons", malus: "-15% (légumes et bulbes consécutifs)" },
      { cropId: "fs25-betterave-rouge", malus: "-15% (légumes racines consécutifs)" },
      { cropId: "fs25-pomme-de-terre", malus: "-15% (tubercules)" }
    ],
    residuesType: "Fanes et billons résiduels (sous-soleuse requise)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        month: "Novembre",
        title: "Sous-soleuse (élimine les buttes et valide le labour)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Aplanit les billons et valide l'état de labour.",
        fs25YieldImpact: "+10% (labour)"
      }
    ]
  },
  {
    id: "fs25-betterave-rouge",
    name: "Betteraves rouges",
    family: "premium",
    familyLabel: "Légumes racines",
    dlc: "Extension Premium",
    rotationCategory: "roots",
    harvestPeriod: "Septembre - novembre",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "140-170 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (rotation vers céréale)" },
      { cropId: "fs25-soja", bonus: "+12% (vers légumineuse)" }
    ],
    badNextCrops: [{ cropId: "fs25-betterave-rouge", malus: "-20% (monoculture de betteraves)" }],
    residuesType: "Fanes au sol",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        month: "Novembre",
        title: "Sous-soleuse (labour validé)",
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
    harvestPeriod: "Août - septembre",
    sowPeriod: "Mars - avril",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "180-220 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (tubercules vers blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (excellent précédent)" }
    ],
    badNextCrops: [{ cropId: "fs25-pomme-de-terre", malus: "-20% (monoculture de pommes de terre)" }],
    residuesType: "Fanes broyées",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        month: "Septembre",
        title: "Sous-solage (valide le labour)",
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
    harvestPeriod: "Octobre - novembre",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [{ cropId: "fs25-ble", bonus: "+15% (betteraves vers blé d'hiver)" }],
    badNextCrops: [{ cropId: "fs25-betterave", malus: "-20% (monoculture de betteraves)" }],
    residuesType: "Feuilles broyées",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse",
        month: "Novembre",
        title: "Sous-soleuse (labour validé)",
        recommendedToolIds: ["fs25-sous-soleuse"],
        speed: "12 km/h",
        notes: "Passage de la sous-soleuse.",
        fs25YieldImpact: "+10%"
      }
    ]
  },

  // ==================== 4. OLÉAGINEUX ET FIBRES ====================
  {
    id: "fs25-colza",
    name: "Colza",
    family: "oleoprot",
    familyLabel: "Oléagineux et protéagineux",
    dlc: "Jeu de base",
    rotationCategory: "oilseeds",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Août - septembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "180-220 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (rotation optimale : colza vers blé d'hiver)" },
      { cropId: "fs25-epeautre", bonus: "+18% (colza vers épeautre)" },
      { cropId: "fs25-orge", bonus: "+15% (excellente rotation)" },
      { cropId: "fs25-seigle", bonus: "+15% (colza vers seigle)" },
      { cropId: "fs25-soja", bonus: "+12% (bonne rotation)" }
    ],
    badNextCrops: [
      { cropId: "fs25-colza", malus: "-25% (pénalité de monoculture colza)" },
      { cropId: "fs25-tournesol", malus: "-12% (oléagineux consécutifs)" },
      { cropId: "fs25-lin", malus: "-12% (oléagineux consécutifs)" },
      { cropId: "fs25-moutarde", malus: "-15% (brassicacées consécutives)" }
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
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "oilseeds",
    harvestPeriod: "Juillet - août",
    sowPeriod: "Mars - avril",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "80-110 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (lin vers blé d'hiver - précédent nettoyant exceptionnel)" },
      { cropId: "fs25-epeautre", bonus: "+18% (lin vers épeautre)" },
      { cropId: "fs25-orge", bonus: "+15% (lin vers orge)" }
    ],
    badNextCrops: [
      { cropId: "fs25-lin", malus: "-25% (monoculture de lin)" },
      { cropId: "fs25-colza", malus: "-12% (oléagineux)" }
    ],
    residuesType: "Paille de lin (fibres)",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Paille et chaumes",
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
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "special",
    harvestPeriod: "Août - septembre",
    sowPeriod: "Avril - mai",
    hasStraw: true,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "90-120 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+18% (chanvre vers blé d'hiver - étouffe les adventices)" },
      { cropId: "fs25-epeautre", bonus: "+18% (chanvre vers épeautre)" },
      { cropId: "fs25-seigle", bonus: "+15% (chanvre vers seigle)" }
    ],
    badNextCrops: [{ cropId: "fs25-chanvre", malus: "-20% (monoculture de chanvre)" }],
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
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-150 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (tournesol vers blé d'hiver)" },
      { cropId: "fs25-epeautre", bonus: "+15% (tournesol vers épeautre)" },
      { cropId: "fs25-soja", bonus: "+12% (tournesol vers soja)" }
    ],
    badNextCrops: [
      { cropId: "fs25-tournesol", malus: "-20% (monoculture de tournesol)" },
      { cropId: "fs25-colza", malus: "-12% (oléagineux consécutifs)" }
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
  {
    id: "fs25-sarrasin",
    name: "Sarrasin (blé noir / dérobée d'été)",
    family: "cereales",
    familyLabel: "Céréales et dérobées",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "special",
    harvestPeriod: "Septembre - octobre",
    sowPeriod: "Mai - juin",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "40-70 kg N/ha (très sobre)",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (sarrasin vers blé d'hiver)" },
      { cropId: "fs25-orge", bonus: "+15% (vers orge)" }
    ],
    badNextCrops: [{ cropId: "fs25-sarrasin", malus: "-15% (monoculture)" }],
    residuesType: "Résidus fins à décomposition rapide",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Chaumes",
        month: "Octobre",
        title: "Broyage léger et préparation",
        recommendedToolIds: ["fs25-broyeur"],
        speed: "15 km/h",
        notes: "Excellente plante assainissante.",
        fs25YieldImpact: "+2.5%"
      }
    ]
  },

  // ==================== 5. ENGRAIS VERTS ET NOUVEAUTÉS ====================
  {
    id: "fs25-moutarde",
    name: "Moutarde",
    family: "oleoprot",
    familyLabel: "Engrais verts et cultures intermédiaires",
    dlc: "Carte Le Mechet et mods",
    rotationCategory: "oilseeds",
    harvestPeriod: "Octobre ou destruction hivernale",
    sowPeriod: "Août - septembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "60-90 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-mais-grain", bonus: "+18% (moutarde vers maïs au printemps)" },
      { cropId: "fs25-mais-ensilage", bonus: "+18% (moutarde vers maïs ensilage)" },
      { cropId: "fs25-soja", bonus: "+15% (moutarde vers soja)" },
      { cropId: "fs25-pomme-de-terre", bonus: "+15% (effet assainissant nématicide)" }
    ],
    badNextCrops: [
      { cropId: "fs25-colza", malus: "-15% (brassicacées consécutives)" }
    ],
    residuesType: "Matière verte broyée / engrais vert",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Destruction du couvert",
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
    harvestPeriod: "Octobre - novembre",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "160-190 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-soja", bonus: "+15% (riz vers légumineuse)" },
      { cropId: "fs25-pois-haricots", bonus: "+15% (riz vers pois)" }
    ],
    badNextCrops: [{ cropId: "fs25-riz-inonde", malus: "-15% (monoculture de riz)" }],
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
    harvestPeriod: "Printemps et automne (2 récoltes par an)",
    sowPeriod: "Mars ou août",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: true,
    pfNitrogenTarget: "100-140 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (épinards vers blé)" },
      { cropId: "fs25-soja", bonus: "+15% (épinards vers soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-epinards", malus: "-15% (plus de 2 récoltes successives)" }],
    residuesType: "Résidus fins",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Broyage et chaux",
        month: "Novembre",
        title: "Broyage et chaux variable",
        recommendedToolIds: ["fs25-broyeur", "fs25-epandeur-chaux"],
        speed: "15 km/h",
        notes: "Broyer et chauler.",
        fs25YieldImpact: "+2.5% + 15%"
      }
    ]
  },

  // ==================== 6. PRAIRIES ET CULTURES PÉRENNES ====================
  {
    id: "fs25-herbe",
    name: "Herbe semée (ray-grass / prairie temporaire)",
    family: "fourrages",
    familyLabel: "Fourrages et élevage",
    dlc: "Jeu de base",
    rotationCategory: "grass",
    harvestPeriod: "Avril à novembre (3-4 coupes par an)",
    sowPeriod: "Mars - avril ou août - septembre",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha par coupe",
    idealNextCrops: [
      { cropId: "fs25-mais-grain", bonus: "+20% (retournement de prairie temporaire vers maïs grain)" },
      { cropId: "fs25-mais-ensilage", bonus: "+20% (retournement vers maïs ensilage)" },
      { cropId: "fs25-ble", bonus: "+18% (retournement vers blé d'hiver)" }
    ],
    badNextCrops: [],
    residuesType: "Andains d'herbe fraîche",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Rouleau à herbe",
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
    id: "fs25-prairie-permanente",
    name: "Herbe de prairie permanente",
    family: "fourrages",
    familyLabel: "Fourrages et élevage",
    dlc: "Jeu de base et carte Le Mechet",
    rotationCategory: "grass",
    harvestPeriod: "Avril à novembre (coupes ou pâture)",
    sowPeriod: "Pérenne (non ressemée annuellement)",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "100-140 kg N/ha par coupe",
    idealNextCrops: [
      { cropId: "fs25-prairie-permanente", bonus: "+0% (maintien en prairie permanente)" },
      { cropId: "fs25-mais-grain", bonus: "+20% (en cas de mise en culture exceptionnelle)" }
    ],
    badNextCrops: [],
    residuesType: "Fourrage d'herbe permanente",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Entretien prairie",
        month: "Avril",
        title: "Ébousage, roulage et fertilisation organique de printemps",
        recommendedToolIds: ["fs25-rouleau-herbe", "fs25-epandeur-chaux"],
        speed: "15 km/h",
        notes: "Maintien de la flore prairiale pérenne.",
        fs25YieldImpact: "+1 niveau de fertilisation"
      }
    ]
  },
  {
    id: "fs25-peupliers",
    name: "Peupliers",
    family: "platinum",
    familyLabel: "Foresterie et bois",
    dlc: "Extension Platinum",
    rotationCategory: "fallow",
    harvestPeriod: "Toute l'année après 16 mois",
    sowPeriod: "Mars - mai",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "100 kg N/ha",
    idealNextCrops: [{ cropId: "fs25-ble", bonus: "+10% (après broyage de souches)" }],
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
        fs25YieldImpact: "+45% (engrais maximal)"
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
    harvestPeriod: "Octobre - novembre",
    sowPeriod: "Avril - mai",
    hasStraw: false,
    needsPlowing: false,
    directDrillCompatible: false,
    pfNitrogenTarget: "120-160 kg N/ha",
    idealNextCrops: [
      { cropId: "fs25-ble", bonus: "+15% (coton vers blé d'hiver)" },
      { cropId: "fs25-soja", bonus: "+12% (coton vers soja)" }
    ],
    badNextCrops: [{ cropId: "fs25-coton", malus: "-20% (monoculture de coton)" }],
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
    harvestPeriod: "Octobre - décembre",
    sowPeriod: "Mars - avril",
    hasStraw: false,
    needsPlowing: true,
    directDrillCompatible: false,
    pfNitrogenTarget: "160-200 kg N/ha",
    idealNextCrops: [{ cropId: "fs25-soja", bonus: "+15% (canne vers soja)" }],
    badNextCrops: [],
    residuesType: "Souches de canne à sucre",
    defaultSteps: [
      {
        order: 1,
        phase: "1. Sous-soleuse ou repousse",
        month: "Décembre",
        title: "Sous-soleuse ou fertilisation de repousse",
        recommendedToolIds: ["fs25-sous-soleuse", "fs25-epandeur-chaux"],
        speed: "12 km/h",
        notes: "Détruire les souches pour remettre en culture ou fertiliser pour la repousse.",
        fs25YieldImpact: "+10% (labour validé)"
      }
    ]
  },
  {
    id: "fs25-raisins-olives",
    name: "Vigne et olives",
    family: "speciales",
    familyLabel: "Cultures spécialisées",
    dlc: "Jeu de base",
    rotationCategory: "special",
    harvestPeriod: "Septembre - octobre",
    sowPeriod: "Mars - mai",
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
        phase: "1. Tonte et broyage",
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
