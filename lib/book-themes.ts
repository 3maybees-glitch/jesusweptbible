export interface ThemeWord {
  word: string
  strongNumber: string
  lemma: string
  meaning: string
}

export interface BookTheme {
  book: string
  theme: string
  words: ThemeWord[]
}

export const bookThemes: BookTheme[] = [
  // Old Testament
  {
    book: "Genesis",
    theme: "Divine Creation",
    words: [
      { word: "beginning", strongNumber: "H7225", lemma: "re'shith", meaning: "First; starting point; origin of all things" },
      { word: "created", strongNumber: "H1254", lemma: "bara", meaning: "To create by divine power; bring into existence from nothing" },
    ],
  },
  // Gospels
  {
    book: "Matthew",
    theme: "Kingdom Heaven",
    words: [
      { word: "Kingdom", strongNumber: "G932", lemma: "basileia", meaning: "Royal dominion, reign, or sovereign rule" },
      { word: "Heaven", strongNumber: "G3772", lemma: "ouranos", meaning: "The dwelling place of God; the spiritual realm" },
    ],
  },
  {
    book: "Mark",
    theme: "Son God",
    words: [
      { word: "Son", strongNumber: "G5207", lemma: "huios", meaning: "One sharing nature and character of the father" },
      { word: "God", strongNumber: "G2316", lemma: "theos", meaning: "The supreme divine Being; the Creator" },
    ],
  },
  {
    book: "Luke",
    theme: "Son Man",
    words: [
      { word: "Son", strongNumber: "G5207", lemma: "huios", meaning: "One sharing identity and relational standing" },
      { word: "Man", strongNumber: "G444", lemma: "anthropos", meaning: "Human being; mankind in its full earthly condition" },
    ],
  },
  {
    book: "John",
    theme: "Eternal Life",
    words: [
      { word: "Eternal", strongNumber: "G166", lemma: "aionios", meaning: "Everlasting, without end; divine in quality" },
      { word: "Life", strongNumber: "G2222", lemma: "zoe", meaning: "Absolute fullness of life; spiritual vitality" },
    ],
  },
  // Church History
  {
    book: "Acts",
    theme: "Holy Ghost",
    words: [
      { word: "Holy", strongNumber: "G40", lemma: "hagios", meaning: "Set apart, sacred, morally pure" },
      { word: "Ghost", strongNumber: "G4151", lemma: "pneuma", meaning: "Spirit, breath; the invisible life-giving presence" },
    ],
  },
  // Pauline Letters
  {
    book: "Romans",
    theme: "Righteousness God",
    words: [
      { word: "Righteousness", strongNumber: "G1343", lemma: "dikaiosyne", meaning: "Divine justice; state of being declared right before God" },
      { word: "God", strongNumber: "G2316", lemma: "theos", meaning: "The sovereign Creator and judge of all" },
    ],
  },
  {
    book: "1 Corinthians",
    theme: "Body Christ",
    words: [
      { word: "Body", strongNumber: "G4983", lemma: "soma", meaning: "Living organism; unified structure with many members" },
      { word: "Christ", strongNumber: "G5547", lemma: "Christos", meaning: "The Anointed One; Messiah" },
    ],
  },
  {
    book: "2 Corinthians",
    theme: "Sufficient Grace",
    words: [
      { word: "Sufficient", strongNumber: "G714", lemma: "arkeo", meaning: "To be enough; to satisfy fully" },
      { word: "Grace", strongNumber: "G5485", lemma: "charis", meaning: "Unmerited favor; divine enablement" },
    ],
  },
  {
    book: "Galatians",
    theme: "Liberty Christ",
    words: [
      { word: "Liberty", strongNumber: "G1657", lemma: "eleutheria", meaning: "Freedom from bondage; true spiritual independence" },
      { word: "Christ", strongNumber: "G5547", lemma: "Christos", meaning: "The promised Anointed Deliverer" },
    ],
  },
  {
    book: "Ephesians",
    theme: "Heavenly Places",
    words: [
      { word: "Heavenly", strongNumber: "G2032", lemma: "epouranios", meaning: "Existing in the heavenly realm" },
      { word: "Places", strongNumber: "G5117", lemma: "topos", meaning: "Divine spheres of authority and blessing" },
    ],
  },
  {
    book: "Philippians",
    theme: "Rejoice Lord",
    words: [
      { word: "Rejoice", strongNumber: "G5463", lemma: "chairo", meaning: "To be glad, thrive, delight greatly" },
      { word: "Lord", strongNumber: "G2962", lemma: "kyrios", meaning: "Master, supreme authority" },
    ],
  },
  {
    book: "Colossians",
    theme: "Christ Jesus",
    words: [
      { word: "Christ", strongNumber: "G5547", lemma: "Christos", meaning: "Anointed Messiah" },
      { word: "Jesus", strongNumber: "G2424", lemma: "Iesous", meaning: "Yahweh saves; the personal name of the incarnate Son" },
    ],
  },
  {
    book: "1 Thessalonians",
    theme: "Lord Coming",
    words: [
      { word: "Lord", strongNumber: "G2962", lemma: "kyrios", meaning: "Sovereign ruler" },
      { word: "Coming", strongNumber: "G3952", lemma: "parousia", meaning: "Arrival, presence, official appearing of a king" },
    ],
  },
  {
    book: "2 Thessalonians",
    theme: "Day Lord",
    words: [
      { word: "Day", strongNumber: "G2250", lemma: "hemera", meaning: "A period of time marked by decisive divine action" },
      { word: "Lord", strongNumber: "G2962", lemma: "kyrios", meaning: "Supreme authority" },
    ],
  },
  {
    book: "1 Timothy",
    theme: "Sound Doctrine",
    words: [
      { word: "Sound", strongNumber: "G5198", lemma: "hugiaino", meaning: "Healthy, whole, free from corruption" },
      { word: "Doctrine", strongNumber: "G1319", lemma: "didaskalia", meaning: "Instruction, systematic teaching" },
    ],
  },
  {
    book: "2 Timothy",
    theme: "Endure Hardness",
    words: [
      { word: "Endure", strongNumber: "G4779", lemma: "sunkakopatheo", meaning: "To suffer hardship together faithfully" },
      { word: "Hardness", strongNumber: "G2553", lemma: "kakopatheia", meaning: "To endure affliction or adversity" },
    ],
  },
  {
    book: "Titus",
    theme: "Good Works",
    words: [
      { word: "Good", strongNumber: "G2570", lemma: "kalos", meaning: "Beautiful, noble, intrinsically good" },
      { word: "Works", strongNumber: "G2041", lemma: "ergon", meaning: "Deeds, actions, tangible expressions" },
    ],
  },
  {
    book: "Philemon",
    theme: "Brother Beloved",
    words: [
      { word: "Brother", strongNumber: "G80", lemma: "adelphos", meaning: "One born from the same source; spiritual sibling" },
      { word: "Beloved", strongNumber: "G27", lemma: "agapetos", meaning: "Deeply loved; cherished with covenant affection" },
    ],
  },
  // General Letters
  {
    book: "Hebrews",
    theme: "Better Covenant",
    words: [
      { word: "Better", strongNumber: "G2909", lemma: "kreitton", meaning: "Superior in value, excellence, and effect" },
      { word: "Covenant", strongNumber: "G1242", lemma: "diatheke", meaning: "Binding agreement established by divine initiative" },
    ],
  },
  {
    book: "James",
    theme: "Faith Works",
    words: [
      { word: "Faith", strongNumber: "G4102", lemma: "pistis", meaning: "Trusting reliance; firm persuasion" },
      { word: "Works", strongNumber: "G2041", lemma: "ergon", meaning: "Visible actions that demonstrate inner reality" },
    ],
  },
  {
    book: "1 Peter",
    theme: "Living Hope",
    words: [
      { word: "Living", strongNumber: "G2198", lemma: "zao", meaning: "Active, alive, vibrant" },
      { word: "Hope", strongNumber: "G1680", lemma: "elpis", meaning: "Confident expectation of future good" },
    ],
  },
  {
    book: "2 Peter",
    theme: "False Teachers",
    words: [
      { word: "False", strongNumber: "G5571", lemma: "pseudos", meaning: "Lying, counterfeit, deceptive" },
      { word: "Teachers", strongNumber: "G1320", lemma: "didaskalos", meaning: "Instructor, one who shapes doctrine" },
    ],
  },
  {
    book: "1 John",
    theme: "God Love",
    words: [
      { word: "God", strongNumber: "G2316", lemma: "theos", meaning: "Supreme divine Being" },
      { word: "Love", strongNumber: "G26", lemma: "agape", meaning: "Self-giving, covenantal love rooted in divine character" },
    ],
  },
  {
    book: "2 John",
    theme: "Truth Love",
    words: [
      { word: "Truth", strongNumber: "G225", lemma: "aletheia", meaning: "Divine reality as it truly is" },
      { word: "Love", strongNumber: "G26", lemma: "agape", meaning: "Sacrificial devotion rooted in God's nature" },
    ],
  },
  {
    book: "3 John",
    theme: "Walk Truth",
    words: [
      { word: "Walk", strongNumber: "G4043", lemma: "peripateo", meaning: "To live, conduct oneself, order one's life" },
      { word: "Truth", strongNumber: "G225", lemma: "aletheia", meaning: "Divine reality expressed in life and doctrine" },
    ],
  },
  {
    book: "Jude",
    theme: "Earnestly Contend",
    words: [
      { word: "Earnestly", strongNumber: "G1864", lemma: "epagonizomai", meaning: "To struggle intensely, to fight zealously" },
      { word: "Contend", strongNumber: "G1864", lemma: "epagonizomai", meaning: "In defense of something precious" },
    ],
  },
  // Prophecy
  {
    book: "Revelation",
    theme: "Alpha Omega",
    words: [
      { word: "Alpha", strongNumber: "G1", lemma: "alpha", meaning: "The first letter; the beginning" },
      { word: "Omega", strongNumber: "G5598", lemma: "omega", meaning: "The last letter; the consummation and end" },
    ],
  },
]

export function getThemeByBook(bookName: string): BookTheme | undefined {
  return bookThemes.find((theme) => theme.book === bookName)
}
