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
  {
    book: "Exodus",
    theme: "Deliverance Covenant",
    words: [
      { word: "Deliverance", strongNumber: "H5337", lemma: "natsal", meaning: "to rescue or snatch away from danger; God's saving act." },
      { word: "Covenant", strongNumber: "H1285", lemma: "berith", meaning: "a binding agreement establishing relationship between God and His people." },
    ],
  },
  {
    book: "Leviticus",
    theme: "Holiness Sacrifice",
    words: [
      { word: "Holiness", strongNumber: "H6944", lemma: "qodesh", meaning: "that which is set apart, sacred, belonging to God." },
      { word: "Sacrifice", strongNumber: "H2077", lemma: "zebach", meaning: "an offering presented to God as an act of worship." },
    ],
  },
  {
    book: "Numbers",
    theme: "Wilderness Journey",
    words: [
      { word: "Wilderness", strongNumber: "H4057", lemma: "midbar", meaning: "desert region where Israel wandered under God's guidance." },
      { word: "Journey", strongNumber: "H4550", lemma: "massa", meaning: "a departure, journey, or stage of travel." },
    ],
  },
  {
    book: "Deuteronomy",
    theme: "Covenant Commandments",
    words: [
      { word: "Covenant", strongNumber: "H1285", lemma: "berith", meaning: "a solemn agreement binding God and Israel together." },
      { word: "Commandments", strongNumber: "H4687", lemma: "mitsvah", meaning: "a command or authoritative instruction from God." },
    ],
  },
  {
    book: "Joshua",
    theme: "Inheritance Land",
    words: [
      { word: "Inheritance", strongNumber: "H5159", lemma: "nachalah", meaning: "a possession given as a hereditary portion." },
      { word: "Land", strongNumber: "H776", lemma: "erets", meaning: "earth, territory, or the promised land given to Israel." },
    ],
  },
  {
    book: "Judges",
    theme: "Judges Deliverance",
    words: [
      { word: "Judges", strongNumber: "H8199", lemma: "shaphat", meaning: "to govern or rule as a judge." },
      { word: "Deliverance", strongNumber: "H3467", lemma: "yasha", meaning: "to save or rescue from enemies." },
    ],
  },
  {
    book: "Ruth",
    theme: "Redeemer Kindness",
    words: [
      { word: "Redeemer", strongNumber: "H1350", lemma: "gaal", meaning: "a kinsman who redeems family property or lineage." },
      { word: "Kindness", strongNumber: "H2617", lemma: "chesed", meaning: "loyal love, covenant kindness, mercy." },
    ],
  },
  {
    book: "1 Samuel",
    theme: "King Anointed",
    words: [
      { word: "King", strongNumber: "H4428", lemma: "melek", meaning: "a ruler or sovereign authority." },
      { word: "Anointed", strongNumber: "H4899", lemma: "mashiach", meaning: "one consecrated with oil; the anointed ruler." },
    ],
  },
  {
    book: "2 Samuel",
    theme: "Kingdom Throne",
    words: [
      { word: "Kingdom", strongNumber: "H4467", lemma: "mamlakah", meaning: "royal dominion or realm ruled by a king." },
      { word: "Throne", strongNumber: "H3678", lemma: "kisse", meaning: "seat of royal authority and rule." },
    ],
  },
  {
    book: "1 Kings",
    theme: "Temple Kingdom",
    words: [
      { word: "Temple", strongNumber: "H1964", lemma: "hekal", meaning: "the palace or sanctuary of God." },
      { word: "Kingdom", strongNumber: "H4467", lemma: "mamlakah", meaning: "royal dominion or reign." },
    ],
  },
  {
    book: "2 Kings",
    theme: "Captivity Judgment",
    words: [
      { word: "Captivity", strongNumber: "H7628", lemma: "shebi", meaning: "exile or removal from one's homeland." },
      { word: "Judgment", strongNumber: "H4941", lemma: "mishpat", meaning: "justice, verdict, or divine decision." },
    ],
  },
  {
    book: "1 Chronicles",
    theme: "David Kingdom",
    words: [
      { word: "David", strongNumber: "H1732", lemma: "david", meaning: "beloved; the king chosen by God whose lineage carries the covenant promise." },
      { word: "Kingdom", strongNumber: "H4467", lemma: "mamlakah", meaning: "royal dominion or realm ruled by a king." },
    ],
  },
  {
    book: "2 Chronicles",
    theme: "Temple House",
    words: [
      { word: "Temple", strongNumber: "H1964", lemma: "hekal", meaning: "palace or sanctuary; the dwelling place of God among His people." },
      { word: "House", strongNumber: "H1004", lemma: "bayith", meaning: "house, dwelling, or household; often referring to the house of God." },
    ],
  },
  {
    book: "Ezra",
    theme: "House God",
    words: [
      { word: "House", strongNumber: "H1004", lemma: "bayith", meaning: "dwelling place or temple structure." },
      { word: "God", strongNumber: "H430", lemma: "elohim", meaning: "the supreme divine being; the Creator and covenant God of Israel." },
    ],
  },
  {
    book: "Nehemiah",
    theme: "Wall Jerusalem",
    words: [
      { word: "Wall", strongNumber: "H2346", lemma: "chomah", meaning: "a protective wall surrounding a city for defense." },
      { word: "Jerusalem", strongNumber: "H3389", lemma: "yerushalaim", meaning: "the holy city chosen by God as the center of worship." },
    ],
  },
  {
    book: "Esther",
    theme: "King Queen",
    words: [
      { word: "King", strongNumber: "H4428", lemma: "melek", meaning: "sovereign ruler over a nation." },
      { word: "Queen", strongNumber: "H4436", lemma: "malkah", meaning: "female royal ruler or consort of a king." },
    ],
  },
  {
    book: "Job",
    theme: "Suffering Wisdom",
    words: [
      { word: "Suffering", strongNumber: "H5999", lemma: "amal", meaning: "painful toil, misery, or deep affliction." },
      { word: "Wisdom", strongNumber: "H2451", lemma: "chokmah", meaning: "skill in living; divine insight into truth and righteousness." },
    ],
  },
  {
    book: "Psalms",
    theme: "Praise LORD",
    words: [
      { word: "Praise", strongNumber: "H1984", lemma: "halal", meaning: "to boast, celebrate, or glorify with joyful praise." },
      { word: "LORD", strongNumber: "H3068", lemma: "yahweh", meaning: "the covenant name of God revealed to Israel." },
    ],
  },
  {
    book: "Proverbs",
    theme: "Wisdom Instruction",
    words: [
      { word: "Wisdom", strongNumber: "H2451", lemma: "chokmah", meaning: "practical understanding rooted in reverence for God." },
      { word: "Instruction", strongNumber: "H4148", lemma: "musar", meaning: "discipline, correction, or moral training." },
    ],
  },
  {
    book: "Ecclesiastes",
    theme: "Vanity Wisdom",
    words: [
      { word: "Vanity", strongNumber: "H1892", lemma: "hebel", meaning: "vapor, emptiness, fleeting meaninglessness." },
      { word: "Wisdom", strongNumber: "H2451", lemma: "chokmah", meaning: "insight into life's meaning and purpose." },
    ],
  },
  {
    book: "Song of Solomon",
    theme: "Love Beloved",
    words: [
      { word: "Love", strongNumber: "H160", lemma: "ahabah", meaning: "deep affection or covenantal love." },
      { word: "Beloved", strongNumber: "H1730", lemma: "dod", meaning: "one who is loved intimately." },
    ],
  },
  {
    book: "Isaiah",
    theme: "Holy Salvation",
    words: [
      { word: "Holy", strongNumber: "H6918", lemma: "qadosh", meaning: "set apart in purity and divine majesty." },
      { word: "Salvation", strongNumber: "H3444", lemma: "yeshuah", meaning: "deliverance, rescue, or victory given by God." },
    ],
  },
  {
    book: "Jeremiah",
    theme: "Word LORD",
    words: [
      { word: "Word", strongNumber: "H1697", lemma: "dabar", meaning: "spoken message, declaration, or command." },
      { word: "LORD", strongNumber: "H3068", lemma: "yahweh", meaning: "the covenant name of the God of Israel." },
    ],
  },
  {
    book: "Lamentations",
    theme: "Jerusalem Weeping",
    words: [
      { word: "Jerusalem", strongNumber: "H3389", lemma: "yerushalaim", meaning: "the sacred city chosen by God." },
      { word: "Weeping", strongNumber: "H1058", lemma: "bakah", meaning: "to cry, lament, or mourn deeply." },
    ],
  },
  {
    book: "Ezekiel",
    theme: "Glory LORD",
    words: [
      { word: "Glory", strongNumber: "H3519", lemma: "kabod", meaning: "weighty splendor, divine majesty and honor." },
      { word: "LORD", strongNumber: "H3068", lemma: "yahweh", meaning: "the covenant God revealing His presence." },
    ],
  },
  {
    book: "Daniel",
    theme: "Kingdom God",
    words: [
      { word: "Kingdom", strongNumber: "H4437", lemma: "malku", meaning: "royal dominion or sovereign reign." },
      { word: "God", strongNumber: "H426", lemma: "elah", meaning: "the Most High God ruling over all kingdoms." },
    ],
  },
  {
    book: "Hosea",
    theme: "Return LORD",
    words: [
      { word: "Return", strongNumber: "H7725", lemma: "shuv", meaning: "to turn back or repent." },
      { word: "LORD", strongNumber: "H3068", lemma: "yahweh", meaning: "the covenant God calling His people back." },
    ],
  },
  {
    book: "Joel",
    theme: "Day LORD",
    words: [
      { word: "Day", strongNumber: "H3117", lemma: "yom", meaning: "a specific time or divine appointed day." },
      { word: "LORD", strongNumber: "H3068", lemma: "yahweh", meaning: "the covenant God executing judgment and salvation." },
    ],
  },
  {
    book: "Amos",
    theme: "Justice Righteousness",
    words: [
      { word: "Justice", strongNumber: "H4941", lemma: "mishpat", meaning: "judgment, justice, proper legal order." },
      { word: "Righteousness", strongNumber: "H6666", lemma: "tsedaqah", meaning: "rightness, moral justice, and integrity." },
    ],
  },
  {
    book: "Obadiah",
    theme: "Edom Judgment",
    words: [
      { word: "Edom", strongNumber: "H123", lemma: "edom", meaning: "nation descended from Esau." },
      { word: "Judgment", strongNumber: "H4941", lemma: "mishpat", meaning: "divine verdict or justice." },
    ],
  },
  {
    book: "Jonah",
    theme: "Nineveh Repentance",
    words: [
      { word: "Nineveh", strongNumber: "H5210", lemma: "nineveh", meaning: "great Assyrian city called to repentance." },
      { word: "Repentance", strongNumber: "H5162", lemma: "nacham", meaning: "to relent, be moved to compassion, or change course." },
    ],
  },
  {
    book: "Micah",
    theme: "Justice Mercy",
    words: [
      { word: "Justice", strongNumber: "H4941", lemma: "mishpat", meaning: "right judgment according to God's standard." },
      { word: "Mercy", strongNumber: "H2617", lemma: "chesed", meaning: "steadfast covenant love and kindness." },
    ],
  },
  {
    book: "Nahum",
    theme: "Nineveh Desolation",
    words: [
      { word: "Nineveh", strongNumber: "H5210", lemma: "nineveh", meaning: "capital city of Assyria." },
      { word: "Desolation", strongNumber: "H8077", lemma: "shammah", meaning: "ruin, devastation, or astonishment." },
    ],
  },
  {
    book: "Habakkuk",
    theme: "Faith LORD",
    words: [
      { word: "Faith", strongNumber: "H530", lemma: "emunah", meaning: "firmness, steadfast trust in God." },
      { word: "LORD", strongNumber: "H3068", lemma: "yahweh", meaning: "the covenant God who is trusted by the righteous." },
    ],
  },
  {
    book: "Zephaniah",
    theme: "Day LORD",
    words: [
      { word: "Day", strongNumber: "H3117", lemma: "yom", meaning: "appointed time of divine intervention." },
      { word: "LORD", strongNumber: "H3068", lemma: "yahweh", meaning: "the covenant God bringing judgment and restoration." },
    ],
  },
  {
    book: "Haggai",
    theme: "House LORD",
    words: [
      { word: "House", strongNumber: "H1004", lemma: "bayith", meaning: "dwelling place or temple." },
      { word: "LORD", strongNumber: "H3068", lemma: "yahweh", meaning: "the covenant God whose house must be rebuilt." },
    ],
  },
  {
    book: "Zechariah",
    theme: "Jerusalem King",
    words: [
      { word: "Jerusalem", strongNumber: "H3389", lemma: "yerushalaim", meaning: "holy city chosen by God." },
      { word: "King", strongNumber: "H4428", lemma: "melek", meaning: "sovereign ruler, often pointing prophetically to Messiah." },
    ],
  },
  {
    book: "Malachi",
    theme: "Messenger Covenant",
    words: [
      { word: "Messenger", strongNumber: "H4397", lemma: "malak", meaning: "one sent with a message or divine commission." },
      { word: "Covenant", strongNumber: "H1285", lemma: "berith", meaning: "binding agreement establishing relationship between God and His people." },
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
