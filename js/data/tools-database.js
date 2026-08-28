/**
 * Base de données des matériels et outils officiels FARMING SIMULATOR 25 (FS25)
 * Enrichie avec :
 * - Tous les DLCs (Premium, Platinum, Pumps N' Hoses, Göweil, Oxbo)
 * - Extension PRECISION FARMING (Échantillonneurs, Capteurs Isaria, Spot Spraying See & Spray, Capteurs NIRS Lisier)
 */
const TOOLS_DATABASE = [
  // ==================== 1. PRECISION FARMING (ÉCHANTILLONNAGE & CAPTEURS) ====================
  {
    id: "fs25-pf-echantillonneur",
    name: "Échantillonneur de sol (John Deere Gator / Isaria Scout - Precision Farming)",
    category: "precision",
    categoryLabel: "Precision Farming (Échantillonnage)",
    icon: "🔬",
    dlc: "Precision Farming",
    speed: "25 km/h (sur véhicule)",
    powerRequired: "Quad / Gator ou 3-points",
    fs25Bonus: "Révèle la carte des types de sol, du pH et de l'azote (N) pour le score environnemental",
    purpose: "Prélever des carottes de terre tous les 25 mètres pour analyser la parcelle.",
    advantages: [
      "Permet la modulation automatique de la chaux et des engrais (Variable Rate)",
      "Augmente le score environnemental de votre ferme",
      "Les données restent valables plusieurs saisons"
    ],
    precautions: [
      "Alternative : acheter directement la carte des sols dans le menu Precision Farming pour gagner du temps !"
    ],
    gameTip: "Dans Precision Farming, acheter la carte des sols coûte quelques centaines d'euros et évite de rouler partout !"
  },
  {
    id: "fs25-pf-capteurs-isaria",
    name: "Capteurs optiques de biomasse (Isaria PRO Compact / Fritzmeier - Precision Farming)",
    category: "precision",
    categoryLabel: "Precision Farming (Capteurs N)",
    icon: "📡",
    dlc: "Precision Farming",
    speed: "Selon outil attelé",
    powerRequired: "Montage sur rétroviseurs / toit tracteur",
    fs25Bonus: "Ajuste en temps réel la dose exacte d'azote (N) selon la couleur des feuilles",
    purpose: "Scanne la culture vivante en temps réel pour doser l'engrais au millilitre près.",
    advantages: [
      "Économise jusqu'à 30% d'engrais liquide/solide sans perte de rendement",
      "Octroie le score maximal d'azote dans le Score Environnemental PF"
    ],
    precautions: [
      "Fonctionne uniquement le jour (la nuit, la lumière UV est insuffisante sauf capteurs actifs)"
    ],
    gameTip: "Installez les capteurs Isaria sur vos tracteurs de pulvérisation et d'épandage d'engrais."
  },
  {
    id: "fs25-pf-spot-spraying",
    name: "Pulvérisateur ciblé intelligent 'See & Spray' (John Deere R975i / Amazone SmartSprayer)",
    category: "precision",
    categoryLabel: "Precision Farming (Spot Spraying)",
    icon: "🎯",
    dlc: "Precision Farming",
    speed: "15 km/h",
    powerRequired: "200 ch / Automoteur",
    fs25Bonus: "Économise jusqu'à 90% d'herbicide & Score environnemental désherbage 100/100",
    purpose: "Détecte les mauvaises herbes par caméras IA et n'ouvre que les buses situées au-dessus de l'adventice.",
    advantages: [
      "Ne pulvérise que là où il y a une mauvaise herbe (champ vertueux)",
      "Coût en herbicide divisé par 10 !",
      "Score maximal de désherbage dans Precision Farming"
    ],
    precautions: [
      "Activer l'option 'Spot Spraying' dans la configuration du pulvérisateur au magasin"
    ],
    gameTip: "Le meilleur outil de pulvérisation de Precision Farming : économique, écologique et rapide !"
  },
  {
    id: "fs25-pf-capteur-nirs",
    name: "Capteur de lisier NIRS (Zunhammer / John Deere Manure Sensing - Precision Farming)",
    category: "precision",
    categoryLabel: "Precision Farming (Lisier NIRS)",
    icon: "🧪",
    dlc: "Precision Farming",
    speed: "Selon tonne à lisier",
    powerRequired: "Option tonne à lisier",
    fs25Bonus: "Mesure la teneur exacte en azote/phosphore du lisier pour un épandage au kg près",
    purpose: "Analyse en direct le lisier qui passe dans la rampe pour ajuster le débit selon la carte des sols.",
    advantages: [
      "Évite le surdosage ou sous-dosage d'azote organique",
      "Maximise le score environnemental du lisier"
    ],
    precautions: [
      "À cocher lors de l'achat ou personnalisation de la tonne à lisier au magasin"
    ],
    gameTip: "Couplé au système ombilical Pumps N' Hoses, vous obtenez la fertilisation la plus avancée du jeu !"
  },

  // ==================== 2. BROYEURS & FORESTERIE ====================
  {
    id: "fs25-broyeur",
    name: "Broyeur de résidus / Chaumes (Mulcher)",
    category: "broyage",
    categoryLabel: "Broyeurs (Magasin FS25)",
    icon: "⚙️",
    dlc: "Jeu de base",
    speed: "12 à 15 km/h",
    powerRequired: "75 à 250 ch",
    fs25Bonus: "+2.5% de rendement sur la récolte suivante",
    purpose: "Broyer les chaumes immédiatement après la moisson (maïs, tournesol, céréales, etc.).",
    advantages: [
      "Octroie le bonus d'état de champ 'Chaumes broyées' (+2.5% de rendement)",
      "Prépare le sol pour un semis direct respectueux du score de travail du sol PF",
      "Ne génère AUCUNE pierre dans le champ"
    ],
    precautions: [
      "Doit être passé IMMÉDIATEMENT après la récolte, avant tout travail du sol"
    ],
    gameTip: "Atteler un broyeur à l'avant et un semoir direct à l'arrière pour faire 2 opérations en 1 passage !"
  },
  {
    id: "fs25-broyeur-forestier",
    name: "Broyeur forestier & Rogneuse de souches (Prinoth / Ahwi)",
    category: "broyage",
    categoryLabel: "Foresterie (Platinum DLC)",
    icon: "🌲",
    dlc: "Platinum Expansion",
    speed: "5 à 8 km/h",
    powerRequired: "240 à 400 ch",
    fs25Bonus: "Supprime souches et buissons pour transformer une forêt en champ labourable",
    purpose: "Détruire les souches d'arbres et buissons après la coupe du bois ou des peupliers.",
    advantages: [
      "Nettoie une parcelle forestière pour créer un nouveau champ agricole",
      "Élimine les collisions avec les engins"
    ],
    precautions: [
      "Nécessite un tracteur de forte puissance"
    ],
    gameTip: "Passez une charrue avec 'Création de champs autorisée' pour délimiter votre nouvelle parcelle."
  },

  // ==================== 3. CHAUX & ENGRAIS À DOSAGE VARIABLE (PF) ====================
  {
    id: "fs25-epandeur-chaux",
    name: "Épandeur à Chaux / Engrais minéral à dosage variable (Bredal / Amazone PF)",
    category: "fertilisation",
    categoryLabel: "Épandeurs Chaux & Engrais (PF)",
    icon: "⚪",
    dlc: "Precision Farming & Base",
    speed: "15 à 20 km/h",
    powerRequired: "120 à 220 ch",
    fs25Bonus: "+15% de rendement & Score pH optimal (Precision Farming)",
    purpose: "Ajuste automatiquement la dose de chaux selon le type de sol (Glaise, Glaise sableuse, Argile limoneuse, Sable glaiseux) pour atteindre le pH idéal.",

    advantages: [
      "En Precision Farming : dose automatique selon la carte de pH (ne gaspille rien)",
      "Grande largeur de travail (jusqu'à 36 mètres)"
    ],
    precautions: [
      "Acheter des big bags de chaux ou palettes au magasin"
    ],
    gameTip: "Activez le dosage automatique (Variable Rate) sur 'ON' dans votre HUD Precision Farming !"
  },
  {
    id: "fs25-pumps-hoses-ombilical",
    name: "Système ombilical d'injection de lisier (Schouten / Bomech - Pumps N' Hoses)",
    category: "fertilisation",
    categoryLabel: "Pumps N' Hoses Experience DLC",
    icon: "💧",
    dlc: "Pumps N' Hoses",
    speed: "14 à 18 km/h",
    powerRequired: "180 à 300 ch",
    fs25Bonus: "Fertilisation continue sans aller-retour + Incorporation immédiate sans tassement",
    purpose: "Injecter le lisier/digestat directement dans le sol via tuyau raccordé à la station de pompage.",
    advantages: [
      "Débit de chantier infini sans aller-retour",
      "L'injecteur à disques déchaume et incorpore le lisier en une seule passe",
      "Protège le score environnemental de tassement des sols"
    ],
    precautions: [
      "Dérouler les tuyaux avec l'enrouleur Schouten et placer la pompe en bord de champ"
    ],
    gameTip: "Compatible avec le capteur NIRS pour moduler l'azote en continu !"
  },
  {
    id: "fs25-oxbo-epandeur-automoteur",
    name: "Épandeur automoteur haute capacité (Oxbo AT5105 / AT4103)",
    category: "fertilisation",
    categoryLabel: "Oxbo Pack DLC",
    icon: "🚜",
    dlc: "Oxbo Pack",
    speed: "16 à 22 km/h",
    powerRequired: "550 ch (Automoteur)",
    fs25Bonus: "Épandage ultra-rapide avec essieu en crabe (préserve les sols PF)",
    purpose: "Épandre de très gros volumes de lisier avec une maniabilité extrême.",
    advantages: [
      "Capacité gigantesque de 25 000L",
      "Mode marche en crabe qui répartit le poids sur le sol pour protéger la structure du sol"
    ],
    precautions: ["Coût d'achat élevé"],
    gameTip: "Parfait pour les très grands champs sur Zielonka ou Riverbend Springs."
  },

  // ==================== 4. CHARRUES, SOUS-SOLEUSES & BUTTEUSES ====================
  {
    id: "fs25-sous-soleuse",
    name: "Sous-soleuse / Décompacteur lourd (Subsoiler)",
    category: "profond",
    categoryLabel: "Sous-soleuses (FS25)",
    icon: "⚡",
    dlc: "Jeu de base",
    speed: "12 km/h",
    powerRequired: "180 à 350 ch",
    fs25Bonus: "Supprime 'Nécessite un labour' avec un bien meilleur score de travail du sol PF que la charrue !",
    purpose: "Remplacer la charrue après maïs, pommes de terre, betteraves, carottes, panais, canne à sucre.",
    advantages: [
      "Élimine l'obligation de labour imposée après les cultures lourdes",
      "Vitesse de travail plus élevée qu'une charrue (12 km/h vs 8-10 km/h)",
      "SCORE PRECISION FARMING : Moins pénalisant sur le score de sol que la charrue !",
      "Ne fait remonter que de petites pierres ré-enfonçables au rouleau"
    ],
    precautions: ["Ne permet pas de créer de nouveaux champs"],
    gameTip: "Le meilleur compromis en Precision Farming pour valider le labour sans massacrer son score de sol !"
  },
  {
    id: "fs25-butteuse-legumes",
    name: "Butteuse pour légumes racines (Grimme / Dewulf - Premium DLC)",
    category: "profond",
    categoryLabel: "Premium Expansion DLC (Légumes)",
    icon: "🥕",
    dlc: "Premium Expansion",
    speed: "10 à 12 km/h",
    powerRequired: "140 à 220 ch",
    fs25Bonus: "Conditionne le rendement maximal sur Carottes, Panais et Betteraves rouges",
    purpose: "Façonner des buttes/billons parfaits avant de semer les légumes racines.",
    advantages: [
      "Conditionne le sol pour maximiser le rendement des carottes et panais",
      "Permet aux récolteuses Dewulf de travailler sans bourrage"
    ],
    precautions: ["À passer après le labour ou la sous-soleuse"],
    gameTip: "Indispensable pour exploiter les nouvelles cultures maraîchères de Zielonka !"
  },
  {
    id: "fs25-charrue",
    name: "Charrue à versoirs (Plow)",
    category: "profond",
    categoryLabel: "Charrues (FS25)",
    icon: "⚓",
    dlc: "Jeu de base",
    speed: "8 à 10 km/h",
    powerRequired: "120 à 400 ch",
    fs25Bonus: "Supprime 'Nécessite un labour' (ATTENTION : fait chuter le score PF du travail du sol)",
    purpose: "Labour profond traditionnel et agrandissement de parcelles.",
    advantages: [
      "Supprime l'obligation de labour et enfouit 100% des mauvaises herbes",
      "Seul outil permettant de fusionner ou créer des champs"
    ],
    precautions: [
      "ATTENTION PRECISION FARMING : Le labour fait chuter le score environnemental de travail du sol à 0/100 !",
      "Fait remonter de GROSSES PIERRES nécessitant la ramasseuse de pierres"
    ],
    gameTip: "En Precision Farming, évitez la charrue sauf pour créer de nouveaux champs. Préférez la sous-soleuse !"
  },

  // ==================== 5. SEMOIRS DIRECTS (SCORE PF 100/100) ====================
  {
    id: "fs25-semoir-direct",
    name: "Semoir direct sans labour (Väderstad Rapid / Horsch Pronto / Köckerling)",
    category: "semis",
    categoryLabel: "Semoirs Directs (Score PF 100/100)",
    icon: "🎯",
    dlc: "Jeu de base",
    speed: "15 à 18 km/h",
    powerRequired: "180 à 350 ch",
    fs25Bonus: "Score Travail du Sol Precision Farming : 100/100 (Maximal) + Économie d'un passage",
    purpose: "Semer directement dans les chaumes sans travail du sol préalable.",
    advantages: [
      "Donne la note maximale de 100/100 au score environnemental de travail du sol en Precision Farming",
      "Sème et fertilise à modulation variable en 1 seul passage ultra-rapide",
      "Ne génère AUCUNE pierre"
    ],
    precautions: ["Ne convient pas aux cultures semées en lignes larges (maïs, carottes)"],
    gameTip: "L'outil roi absolu en Precision Farming pour maximiser votre score environnemental et vos subventions !"
  },
  {
    id: "fs25-semoir-monograine",
    name: "Planteuse de précision / Semoir monograine (Kverneland / Grimme / Väderstad Tempo)",
    category: "semis",
    categoryLabel: "Planteuses de précision (FS25)",
    icon: "🌽",
    dlc: "Jeu de base",
    speed: "15 km/h",
    powerRequired: "100 à 250 ch",
    fs25Bonus: "Obligatoire pour Maïs, Tournesol, Soja, Betteraves, Coton et Légumes",
    purpose: "Semer les cultures en lignes espacées ou sur buttes.",
    advantages: ["Gère l'engrais solide/liquide directement au semis"],
    precautions: ["Vérifier si le modèle nécessite un travail du sol préalable"],
    gameTip: "Modulation de dose de graines compatible avec Precision Farming !"
  },
  {
    id: "fs25-repiqueuse-riz",
    name: "Repiqueuse de riz inondé (Iseki / Yanmar - NOUVEAU FS25 🍚)",
    category: "semis",
    categoryLabel: "Matériel Rizicole (FS25)",
    icon: "🍚",
    dlc: "Jeu de base (Nouveauté FS25)",
    speed: "8 à 12 km/h",
    powerRequired: "50 à 100 ch",
    fs25Bonus: "Indispensable pour la culture du riz asiatique inondé",
    purpose: "Planter les barquettes de jeunes pousses de riz dans les rizières irriguées.",
    advantages: ["Permet de cultiver le riz inondé à très haute valeur marchande"],
    precautions: ["Nécessite le remplissage en eau via la pompe"],
    gameTip: "Culture haut de gamme de la carte Hutan Pantai."
  },

  // ==================== 6. ROULEAUX ====================
  {
    id: "fs25-rouleau-sol",
    name: "Rouleau compresseur de sol (Dalbo / Väderstad Roll-pack)",
    category: "roulage",
    categoryLabel: "Rouleaux (Magasin FS25)",
    icon: "🔘",
    dlc: "Jeu de base",
    speed: "12 à 15 km/h",
    powerRequired: "100 à 200 ch",
    fs25Bonus: "+2.5% de rendement et enfonce les petites pierres",
    purpose: "Passer sur le champ JUSTE APRÈS LE SEMIS.",
    advantages: [
      "Confère l'état 'Roulé' (+2.5% de rendement)",
      "Enfonce les petites pierres dans le sol, évitant de passer la ramasseuse de pierres !"
    ],
    precautions: ["À passer impérativement quand les graines sont tout juste semées"],
    gameTip: "Passez le rouleau immédiatement après le semoir direct pour clôturer la phase de semis."
  },
  {
    id: "fs25-rouleau-herbe",
    name: "Rouleau à herbe / Prairies (Grassland Roller)",
    category: "roulage",
    categoryLabel: "Entretien des Prairies (FS25)",
    icon: "🌿",
    dlc: "Jeu de base",
    speed: "12 à 15 km/h",
    powerRequired: "80 à 150 ch",
    fs25Bonus: "+1 niveau de fertilisation gratuit sur prairie",
    purpose: "Passer sur la prairie immédiatement après avoir fauché l'herbe.",
    advantages: [
      "Octroie immédiatement 1 niveau de fertilisation sans dépenser d'engrais",
      "Remet la prairie en état de croissance optimal"
    ],
    precautions: ["Ne fonctionne que sur l'herbe après la fauche"],
    gameTip: "Indispensable si vous faites de l'ensilage ou du foin pour vos animaux."
  },

  // ==================== 7. DÉSHERBAGE MÉCANIQUE & GÖWEIL PACK ====================
  {
    id: "fs25-sarcleuse-herse-etrille",
    name: "Sarcleuse / Herse étrille mécanique (Treffler / Einböck)",
    category: "desherbage",
    categoryLabel: "Désherbage mécanique (Score PF 100/100)",
    icon: "🧹",
    dlc: "Jeu de base",
    speed: "15 km/h",
    powerRequired: "70 à 150 ch",
    fs25Bonus: "Score Désherbage Precision Farming 100/100 (Sans aucun herbicide chimique)",
    purpose: "Détruire les mauvaises herbes au 1er stade (Petites mauvaises herbes).",
    advantages: [
      "Coût 0€ en consommable",
      "Score écologique parfait dans Precision Farming",
      "Grande largeur (jusqu'à 24m)"
    ],
    precautions: ["Ne fonctionne QUE sur les jeunes mauvaises herbes (stade 1)"],
    gameTip: "Passez la sarcleuse dès le premier mois après le semis quand les adventices pointent."
  },
  {
    id: "fs25-goweil-presse-stationnaire",
    name: "Enrubanneuse / Presse stationnaire combinée (Göweil LT-Master / G-1 F125)",
    category: "paille",
    categoryLabel: "Göweil Pack DLC",
    icon: "🛢️",
    dlc: "Göweil Pack",
    speed: "Stationnaire / 15 km/h",
    powerRequired: "160 à 280 ch",
    fs25Bonus: "Enrubannage de maïs broyé, pulpe de betterave, ensilage et balles haute densité",
    purpose: "Transformer les récoltes et résidus en balles d'ensilage hermétiques.",
    advantages: [
      "Enrubanne le maïs broyé et la pulpe de betteraves en balles individuelles",
      "Évite de construire de grands silos couloirs",
      "Haute densité de compactage"
    ],
    precautions: ["Nécessite du film plastique d'enrubannage"],
    gameTip: "Idéal pour stocker l'ensilage de maïs ou de betteraves sans bunker !"
  },
  {
    id: "fs25-presse-balles",
    name: "Presse à balles carrées / rondes (Krone / Kuhn / New Holland)",
    category: "paille",
    categoryLabel: "Presses à balles Standard",
    icon: "📦",
    dlc: "Jeu de base",
    speed: "15 à 20 km/h",
    powerRequired: "140 à 300 ch",
    fs25Bonus: "Récupère 100% de la paille pour litière ou revente",
    purpose: "Presser les andains de paille laissés par la moissonneuse (Blé, Orge, Avoine).",
    advantages: ["Source de revenu supplémentaire ou indispensable pour les stalles de vos vaches"],
    precautions: ["Penser à désactiver le broyeur de paille sur la moissonneuse"],
    gameTip: "Utilisez un plateau autochargeur de balles pour ramasser 14 à 24 balles en quelques secondes !"
  }
];

if (typeof window !== "undefined") {
  window.TOOLS_DATABASE = TOOLS_DATABASE;
}
