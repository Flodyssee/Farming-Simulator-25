/**
 * Base de données des matériels et outils officiels FARMING SIMULATOR 25 (FS25)
 * Inclut le jeu de base, toutes les extensions (dont Highlands Fishing, Premium, Platinum, Pumps N' Hoses, Göweil, Oxbo)
 * et le DLC Precision Farming.
 */
const TOOLS_DATABASE = [
  // ==================== 1. PRECISION FARMING ====================
  {
    id: "fs25-pf-echantillonneur",
    name: "Échantillonneur de sol (John Deere Gator / Isaria Scout)",
    category: "precision",
    categoryLabel: "Precision Farming - Échantillonnage",
    dlc: "Precision Farming",
    speed: "25 km/h",
    powerRequired: "Véhicule utilitaire ou attelage 3-points",
    fs25Bonus: "Révèle la carte des types de sol, du pH et de l'azote (N)",
    purpose: "Prélèvement d'échantillons de sol par carottage pour cartographier le champ.",
    advantages: [
      "Permet la modulation automatique de la chaux et des engrais (Variable Rate)",
      "Augmente le score environnemental de l'exploitation",
      "Données valables plusieurs saisons"
    ],
    precautions: [
      "Possibilité d'acheter directement la carte des sols dans le menu Precision Farming"
    ],
    gameTip: "L'achat direct de la carte des sols permet de gagner du temps sur les grandes parcelles."
  },
  {
    id: "fs25-pf-capteurs-isaria",
    name: "Capteurs optiques de biomasse (Isaria PRO Compact / Fritzmeier)",
    category: "precision",
    categoryLabel: "Precision Farming - Capteurs Azote",
    dlc: "Precision Farming",
    speed: "Selon outil attelé",
    powerRequired: "Montage sur rétroviseurs ou toit du tracteur",
    fs25Bonus: "Ajustement en temps réel de la dose d'azote (N) selon la réflectance foliaire",
    purpose: "Scanne la culture vivante pour appliquer la dose exacte requise sans gaspillage.",
    advantages: [
      "Économie d'engrais jusqu'à 30% sans baisse de rendement",
      "Note maximale au score environnemental d'azote"
    ],
    precautions: [
      "Utilisation de jour recommandée"
    ],
    gameTip: "À installer sur le tracteur principal dédié à la fertilisation et pulvérisation."
  },
  {
    id: "fs25-pf-spot-spraying",
    name: "Pulvérisateur ciblé intelligent (John Deere See & Spray / Amazone SmartSprayer)",
    category: "precision",
    categoryLabel: "Precision Farming - Spot Spraying",
    dlc: "Precision Farming",
    speed: "15 km/h",
    powerRequired: "200 ch / Automoteur",
    fs25Bonus: "Économie jusqu'à 90% d'herbicide & Score désherbage 100/100",
    purpose: "Détection des adventices par caméras embarquées et ouverture ciblée des buses.",
    advantages: [
      "Application stricte sur les mauvaises herbes ciblées",
      "Réduction drastique des coûts d'herbicide",
      "Score maximal dans Precision Farming"
    ],
    precautions: [
      "Vérifier l'activation de l'option Spot Spraying lors de la configuration"
    ],
    gameTip: "Permet de maximiser le score environnemental sans perte de temps."
  },
  {
    id: "fs25-pf-capteur-nirs",
    name: "Capteur de lisier NIRS (Zunhammer / John Deere Manure Sensing)",
    category: "precision",
    categoryLabel: "Precision Farming - Lisier NIRS",
    dlc: "Precision Farming",
    speed: "Selon tonne à lisier",
    powerRequired: "Option tonne à lisier",
    fs25Bonus: "Mesure de la teneur réelle en éléments fertilisants du lisier",
    purpose: "Analyse en direct de l'azote organique pour réguler le débit d'épandage.",
    advantages: [
      "Évite les carences et les surdosages en azote organique",
      "Maximise le score environnemental du lisier"
    ],
    precautions: [
      "Nécessite la compatibilité de la tonne ou de l'injecteur"
    ],
    gameTip: "Idéal couplé avec le système d'épandage ombilical Pumps N' Hoses."
  },

  // ==================== 2. BROYAGE & GESTION DES RÉSIDUS ====================
  {
    id: "fs25-broyeur",
    name: "Broyeur de résidus et chaumes (Mulcher)",
    category: "broyage",
    categoryLabel: "Broyeurs de surface",
    dlc: "Jeu de base",
    speed: "12 à 15 km/h",
    powerRequired: "75 à 250 ch",
    fs25Bonus: "+2.5% de rendement sur la culture suivante",
    purpose: "Broyage des chaumes de céréales, cannes de maïs et tournesol.",
    advantages: [
      "Valide l'état de champ 'Chaumes broyées' (+2.5% rendement)",
      "Facilite l'action des semoirs directs",
      "Ne génère aucune pierre"
    ],
    precautions: [
      "À effectuer avant tout travail du sol"
    ],
    gameTip: "Possibilité d'atteler le broyeur à l'avant et le semoir direct à l'arrière."
  },
  {
    id: "fs25-broyeur-forestier",
    name: "Broyeur forestier et de souches (Prinoth / Ahwi)",
    category: "broyage",
    categoryLabel: "Foresterie et remise en culture",
    dlc: "Platinum Expansion",
    speed: "5 à 8 km/h",
    powerRequired: "240 à 400 ch",
    fs25Bonus: "Élimination des souches pour remise en culture agricole",
    purpose: "Broyage des souches d'arbres et de peupliers après abattage.",
    advantages: [
      "Supprime les obstacles pour permettre le labour ou semis",
      "Permet de convertir des parcelles boisées en terres cultivables"
    ],
    precautions: [
      "Nécessite un tracteur de forte puissance"
    ],
    gameTip: "Après le broyage, passer une charrue avec l'option de création de champs autorisée."
  },

  // ==================== 3. CHAUX, AMENDEMENTS & HIGHLANDS FISHING ====================
  {
    id: "fs25-epandeur-chaux",
    name: "Épandeur d'amendements et chaux à dosage variable (Bredal / Amazone)",
    category: "fertilisation",
    categoryLabel: "Épandeurs de chaux et minéraux",
    dlc: "Jeu de base",
    speed: "15 à 20 km/h",
    powerRequired: "120 à 220 ch",
    fs25Bonus: "+15% de rendement & Score pH optimal (Precision Farming)",
    purpose: "Correction du pH selon les 4 types de sol cartographiés.",
    advantages: [
      "Modulation automatique de la dose de chaux selon la carte de pH",
      "Largeur de travail jusqu'à 36 mètres"
    ],
    precautions: [
      "Vérifier le niveau de chaux dans la cuve"
    ],
    gameTip: "Le dosage automatique s'adapte en direct à chaque type de sol traversé."
  },
  {
    id: "fs25-highlands-fertilisation",
    name: "Épandeur d'amendements organiques marins et compost (Highlands Fishing)",
    category: "fertilisation",
    categoryLabel: "Highlands Fishing Expansion",
    dlc: "Highlands Fishing",
    speed: "14 à 18 km/h",
    powerRequired: "140 à 220 ch",
    fs25Bonus: "Fertilisation organique complète issue des sous-produits de pêche",
    purpose: "Valorisation des résidus piscicoles et composts marins des Highlands.",
    advantages: [
      "Excellente valeur fertilisante organique à décomposition progressive",
      "Compatible avec les prairies et cultures céréalières écossaises"
    ],
    precautions: [
      "À incorporer ou épandre avant semis"
    ],
    gameTip: "Valorise les sous-produits des fermes aquacoles de l'extension Highlands Fishing."
  },
  {
    id: "fs25-pumps-hoses-ombilical",
    name: "Système ombilical d'injection de lisier (Schouten / Bomech)",
    category: "fertilisation",
    categoryLabel: "Pumps N' Hoses Experience",
    dlc: "Pumps N' Hoses",
    speed: "14 à 18 km/h",
    powerRequired: "180 à 300 ch",
    fs25Bonus: "Alimentation continue sans tonne lourde & Préservation du tassement PF",
    purpose: "Injection directe de lisier via tuyauterie souple raccordée à la pompe.",
    advantages: [
      "Chantier ininterrompu sans rotation de transport",
      "Évite la compaction du sol causée par les tonnes lourdes",
      "Déchaumage et enfouissement simultanés"
    ],
    precautions: [
      "Installation préalable des tuyaux et de la motopompe"
    ],
    gameTip: "Système particulièrement rentable sur les grands parcellaires."
  },
  {
    id: "fs25-oxbo-epandeur-automoteur",
    name: "Épandeur automoteur (Oxbo AT5105 / AT4103)",
    category: "fertilisation",
    categoryLabel: "Oxbo Pack",
    dlc: "Oxbo Pack",
    speed: "16 à 22 km/h",
    powerRequired: "550 ch (Automoteur)",
    fs25Bonus: "Débit de chantier élevé avec essieu en crabe protecteur du sol",
    purpose: "Épandage rapide de gros volumes de lisier, digestat ou chaux.",
    advantages: [
      "Capacité de 25 000 litres",
      "Mode de marche en crabe pour répartir la charge au sol"
    ],
    precautions: [
      "Investissement élevé"
    ],
    gameTip: "Idéal pour les entreprises de travaux agricoles et les grandes exploitations."
  },

  // ==================== 4. TRAVAIL DU SOL & SOUS-SOLEUSES ====================
  {
    id: "fs25-sous-soleuse",
    name: "Sous-soleuse / Décompacteur lourd (Agrisem / Combiplow)",
    category: "profond",
    categoryLabel: "Sous-soleuses",
    dlc: "Jeu de base",
    speed: "12 km/h",
    powerRequired: "180 à 350 ch",
    fs25Bonus: "Valide l'état de labour sans dégrader le score de sol Precision Farming",
    purpose: "Remplacement de la charrue après maïs, betteraves, pommes de terre, carottes et panais.",
    advantages: [
      "Élimine l'obligation de labour",
      "Vitesse de travail supérieure à la charrue (12 km/h vs 8-10 km/h)",
      "Ne génère pas de grosses pierres",
      "Préserve le score environnemental de travail du sol PF"
    ],
    precautions: [
      "Ne permet pas de créer de nouvelles parcelles"
    ],
    gameTip: "L'alternative privilégiée à la charrue pour concilier obligation de labour et score PF."
  },
  {
    id: "fs25-butteuse-legumes",
    name: "Butteuse pour légumes racines (Grimme / Dewulf)",
    category: "profond",
    categoryLabel: "Premium Expansion (Légumes)",
    dlc: "Premium Expansion",
    speed: "10 à 12 km/h",
    powerRequired: "140 à 220 ch",
    fs25Bonus: "Conditionne le rendement optimal sur carottes, panais et betteraves rouges",
    purpose: "Formation des billons pour les cultures de légumes racines.",
    advantages: [
      "Structure le sol pour le développement racinaire",
      "Facilite le travail ultérieur des récolteuses Dewulf"
    ],
    precautions: [
      "À réaliser sur sol préalablement décompacté"
    ],
    gameTip: "Étape indispensable pour les cultures maraîchères de la carte Zielonka."
  },
  {
    id: "fs25-dechaumeur-disques",
    name: "Déchaumeur à disques indépendants (Horsch / Lemken / Väderstad)",
    category: "superficiel",
    categoryLabel: "Déchaumeurs à disques",
    dlc: "Jeu de base",
    speed: "15 à 18 km/h",
    powerRequired: "100 à 300 ch",
    fs25Bonus: "Préparation rapide du lit de semence sans grosses pierres",
    purpose: "Mélange superficiel terre-paille et scalpage après récolte.",
    advantages: [
      "Vitesse de travail élevée",
      "Ne fait remonter que des petites pierres facilement enfoncées au rouleau"
    ],
    precautions: [
      "Ne valide pas l'obligation de labour sur maïs ou tubercules"
    ],
    gameTip: "Idéal après céréales ou oléagineux si un semis classique est envisagé."
  },

  // ==================== 5. SEMOIRS DIRECTS & PLANTATION ====================
  {
    id: "fs25-semoir-direct",
    name: "Semoir direct sans labour (Väderstad Rapid / Horsch Pronto)",
    category: "semis",
    categoryLabel: "Semoirs directs sans labour",
    dlc: "Jeu de base",
    speed: "15 à 18 km/h",
    powerRequired: "180 à 350 ch",
    fs25Bonus: "Score Travail du Sol Precision Farming : 100/100",
    purpose: "Semis direct dans les chaumes avec fertilisation simultanée.",
    advantages: [
      "Octroie la note maximale de 100/100 au score environnemental PF",
      "Supprime l'étape de déchaumage préalable",
      "Ne génère aucune pierre"
    ],
    precautions: [
      "Non adapté aux cultures en lignes larges (maïs, carottes)"
    ],
    gameTip: "L'outil central en Precision Farming pour maximiser les subventions et le rendement."
  },
  {
    id: "fs25-semoir-monograine",
    name: "Planteuse de précision / Semoir monograine (Kverneland / Grimme / Tempo)",
    category: "semis",
    categoryLabel: "Planteuses de précision",
    dlc: "Jeu de base",
    speed: "15 km/h",
    powerRequired: "100 à 250 ch",
    fs25Bonus: "Obligatoire pour maïs, tournesol, soja, betteraves, carottes et coton",
    purpose: "Semis en lignes espacées avec distribution graine par graine.",
    advantages: [
      "Dosage précis de la densité de semis",
      "Application localisée d'engrais"
    ],
    precautions: [
      "Vérifier si le modèle requiert une préparation de lit de semence"
    ],
    gameTip: "Compatible avec la modulation de dose de semences de Precision Farming."
  },
  {
    id: "fs25-repiqueuse-riz",
    name: "Repiqueuse de riz inondé (Iseki / Yanmar)",
    category: "semis",
    categoryLabel: "Matériel rizicole",
    dlc: "Jeu de base",
    speed: "8 à 12 km/h",
    powerRequired: "50 à 100 ch",
    fs25Bonus: "Implantation du riz asiatique inondé à forte rentabilité",
    purpose: "Plantation des jeunes pousses en barquettes dans les rizières en eau.",
    advantages: [
      "Culture spécifique à haute valeur ajoutée"
    ],
    precautions: [
      "Nécessite le remplissage préalable du bassin en eau"
    ],
    gameTip: "Culture typique de la carte asiatique Hutan Pantai."
  },

  // ==================== 6. ROULEAUX ====================
  {
    id: "fs25-rouleau-sol",
    name: "Rouleau compresseur de sol (Dalbo / Väderstad Roll-pack)",
    category: "roulage",
    categoryLabel: "Rouleaux compresseurs",
    dlc: "Jeu de base",
    speed: "12 à 15 km/h",
    powerRequired: "100 à 200 ch",
    fs25Bonus: "+2.5% de rendement & Enfoncement des petites pierres",
    purpose: "Reconsolidation du lit de semence juste après le semis.",
    advantages: [
      "Valide l'état 'Roulé' (+2.5% rendement)",
      "Enfonce les petites pierres dans le sol"
    ],
    precautions: [
      "À passer avant la levée des plantules"
    ],
    gameTip: "À passer immédiatement après le semoir pour finaliser le semis."
  },
  {
    id: "fs25-rouleau-herbe",
    name: "Rouleau à herbe / Prairies (Grassland Roller)",
    category: "roulage",
    categoryLabel: "Entretien des prairies",
    dlc: "Jeu de base",
    speed: "12 à 15 km/h",
    powerRequired: "80 à 150 ch",
    fs25Bonus: "+1 niveau de fertilisation gratuit sur prairie fauchée",
    purpose: "Entretien de la prairie immédiatement après la fauche de l'herbe.",
    advantages: [
      "Donne un niveau de fertilisation sans engrais",
      "Stimule le cycle de repousse"
    ],
    precautions: [
      "S'applique uniquement sur prairie fauchée"
    ],
    gameTip: "Opération systématique après chaque coupe d'herbe."
  },

  // ==================== 7. DÉSHERBAGE MÉCANIQUE & GÖWEIL ====================
  {
    id: "fs25-sarcleuse-herse-etrille",
    name: "Sarcleuse / Herse étrille mécanique (Treffler / Einböck)",
    category: "desherbage",
    categoryLabel: "Désherbage mécanique (Score PF 100/100)",
    dlc: "Jeu de base",
    speed: "15 km/h",
    powerRequired: "70 à 150 ch",
    fs25Bonus: "Score Désherbage Precision Farming 100/100",
    purpose: "Destruction mécanique des jeunes mauvaises herbes au stade initial.",
    advantages: [
      "Aucun coût d'intrant chimique",
      "Note environnementale maximale en Precision Farming",
      "Grande largeur de travail disponible"
    ],
    precautions: [
      "Efficace uniquement sur jeunes adventices (stade 1)"
    ],
    gameTip: "Passage précoce dès l'apparition des premières pousses indésirables."
  },
  {
    id: "fs25-goweil-presse-stationnaire",
    name: "Presse / Enrubanneuse combinée (Göweil LT-Master / G-1 F125)",
    category: "paille",
    categoryLabel: "Göweil Pack",
    dlc: "Göweil Pack",
    speed: "Stationnaire / 15 km/h",
    powerRequired: "160 à 280 ch",
    fs25Bonus: "Enrubannage hermétique de maïs broyé, pulpe de betteraves et fourrages",
    purpose: "Conditionnement de l'ensilage en balles denses protégées.",
    advantages: [
      "Permet de stocker l'ensilage de maïs ou de pulpes sans silo couloir",
      "Haute densité de compactage"
    ],
    precautions: [
      "Nécessite du film d'enrubannage"
    ],
    gameTip: "Alternative flexible aux silos couloirs pour la gestion de l'élevage."
  },
  {
    id: "fs25-presse-balles",
    name: "Presse à balles (Krone / Kuhn / New Holland)",
    category: "paille",
    categoryLabel: "Presses à balles",
    dlc: "Jeu de base",
    speed: "15 à 20 km/h",
    powerRequired: "140 à 300 ch",
    fs25Bonus: "Récupération intégrale de la paille",
    purpose: "Conditionnement des andains de paille (blé, orge, avoine) en balles.",
    advantages: [
      "Approvisionnement en litière pour les étables",
      "Revente de paille"
    ],
    precautions: [
      "Désactiver le broyeur de paille sur la moissonneuse"
    ],
    gameTip: "Utiliser un plateau autochargeur de balles pour un ramassage rapide."
  }
];

if (typeof window !== "undefined") {
  window.TOOLS_DATABASE = TOOLS_DATABASE;
}
