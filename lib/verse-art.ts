// Utility to check if a verse has associated Christian art
export interface VerseArtPainting {
  reference: string
  painting: string
  title: string
  artist: string
  year: string
  description: string
}

// Verse-to-art mappings embedded directly
const VERSE_ART_MAPPINGS: VerseArtPainting[] = [
  {
    reference: "genesis 1:27",
    painting: "creation-of-adam.jpg",
    title: "Creation of Adam",
    artist: "Michelangelo",
    year: "1512",
    description: "Michelangelo's iconic Sistine Chapel fresco depicting God giving life to Adam."
  },
  {
    reference: "genesis 3:23",
    painting: "expulsion-from-eden.jpg",
    title: "Expulsion from the Garden of Eden",
    artist: "Thomas Cole",
    year: "1828",
    description: "Adam and Eve being driven from the Garden after the fall."
  },
  {
    reference: "genesis 22:13",
    painting: "sacrifice-of-isaac.jpg",
    title: "The Sacrifice of Isaac",
    artist: "Caravaggio",
    year: "1603",
    description: "Abraham prepares to sacrifice Isaac before the angel intervenes."
  },
  {
    reference: "genesis 32:24",
    painting: "jacob-wrestling-angel.jpg",
    title: "Jacob Wrestling the Angel",
    artist: "Eugène Delacroix",
    year: "1855",
    description: "Jacob struggles with the angel through the night."
  },
  {
    reference: "exodus 32:19",
    painting: "moses-breaking-tablets.jpg",
    title: "Moses Breaking the Tablets",
    artist: "Rembrandt",
    year: "1659",
    description: "Moses reacts in anger after seeing Israel worship the golden calf."
  },
  {
    reference: "exodus 14:21",
    painting: "crossing-red-sea.jpg",
    title: "Crossing the Red Sea",
    artist: "Nicolas Poussin",
    year: "1634",
    description: "Israel crosses safely as the waters divide."
  },
  {
    reference: "daniel 6:22",
    painting: "daniel-in-lions-den.jpg",
    title: "Daniel in the Lions' Den",
    artist: "Peter Paul Rubens",
    year: "1615",
    description: "Daniel remains unharmed among the lions through God's protection."
  },
  {
    reference: "1 samuel 17:51",
    painting: "david-and-goliath.jpg",
    title: "David with the Head of Goliath",
    artist: "Caravaggio",
    year: "1610",
    description: "David stands victorious after defeating the giant."
  },
  {
    reference: "1 kings 17:6",
    painting: "elijah-fed-by-ravens.jpg",
    title: "Elijah Fed by Ravens",
    artist: "John Linnell",
    year: "1848",
    description: "God miraculously feeds Elijah through ravens."
  },
  {
    reference: "isaiah 6:1",
    painting: "prophet-isaiah.jpg",
    title: "The Prophet Isaiah",
    artist: "Raphael",
    year: "1511",
    description: "Isaiah receives his vision of the Lord seated on the throne."
  },
  {
    reference: "luke 1:28",
    painting: "annunciation.jpg",
    title: "The Annunciation",
    artist: "Leonardo da Vinci",
    year: "1472",
    description: "Gabriel announces to Mary that she will bear the Son of God."
  },
  {
    reference: "luke 2:7",
    painting: "nativity.jpg",
    title: "The Nativity",
    artist: "Caravaggio",
    year: "1600",
    description: "Christ is born in Bethlehem and laid in a manger."
  },
  {
    reference: "matthew 2:11",
    painting: "adoration-of-the-magi.jpg",
    title: "Adoration of the Magi",
    artist: "Leonardo da Vinci",
    year: "1481",
    description: "Wise men bring gifts to the newborn King."
  },
  {
    reference: "matthew 3:16",
    painting: "baptism-of-christ.jpg",
    title: "The Baptism of Christ",
    artist: "Andrea del Verrocchio",
    year: "1475",
    description: "Jesus is baptized in the Jordan as the Spirit descends like a dove."
  },
  {
    reference: "matthew 4:2",
    painting: "christ-in-the-desert.jpg",
    title: "Christ in the Desert",
    artist: "Ivan Kramskoi",
    year: "1872",
    description: "Jesus fasts forty days in the wilderness before beginning His ministry."
  },
  {
    reference: "matthew 9:9",
    painting: "calling-of-saint-matthew.jpg",
    title: "The Calling of Saint Matthew",
    artist: "Caravaggio",
    year: "1599",
    description: "Christ calls Matthew from his life as a tax collector."
  },
  {
    reference: "matthew 5:1",
    painting: "sermon-on-the-mount.jpg",
    title: "Sermon on the Mount",
    artist: "Carl Bloch",
    year: "1877",
    description: "Jesus teaches the crowds from the mountainside."
  },
  {
    reference: "matthew 14:25",
    painting: "christ-walking-on-water.jpg",
    title: "Christ Walking on Water",
    artist: "Ivan Aivazovsky",
    year: "1888",
    description: "Jesus walks upon the sea to His disciples."
  },
  {
    reference: "matthew 17:2",
    painting: "transfiguration.jpg",
    title: "The Transfiguration",
    artist: "Raphael",
    year: "1520",
    description: "Christ is revealed in divine glory before His disciples."
  },
  {
    reference: "john 11:43",
    painting: "raising-of-lazarus.jpg",
    title: "The Raising of Lazarus",
    artist: "Caravaggio",
    year: "1609",
    description: "Jesus raises Lazarus from the dead."
  },
  {
    reference: "matthew 26:26",
    painting: "last-supper.jpg",
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: "1498",
    description: "Christ institutes the Lord's Supper with His disciples."
  },
  {
    reference: "john 13:5",
    painting: "washing-the-feet.jpg",
    title: "Christ Washing the Disciples' Feet",
    artist: "Tintoretto",
    year: "1555",
    description: "Jesus humbly washes the feet of His disciples."
  },
  {
    reference: "matthew 26:50",
    painting: "arrest-of-christ.jpg",
    title: "The Arrest of Christ",
    artist: "Caravaggio",
    year: "1598",
    description: "Jesus is seized in the Garden of Gethsemane."
  },
  {
    reference: "john 19:17",
    painting: "christ-carrying-cross.jpg",
    title: "Christ Carrying the Cross",
    artist: "El Greco",
    year: "1580",
    description: "Jesus carries the cross toward Golgotha."
  },
  {
    reference: "john 19:5",
    painting: "ecce-homo.jpg",
    title: "Ecce Homo",
    artist: "Antonio Ciseri",
    year: "1871",
    description: "Pilate presents Jesus to the crowd saying 'Behold the man.'"
  },
  {
    reference: "john 19:18",
    painting: "crucifixion-velazquez.jpg",
    title: "The Crucifixion",
    artist: "Diego Velázquez",
    year: "1632",
    description: "Christ crucified for the sins of the world."
  },
  {
    reference: "john 19:30",
    painting: "christ-crucified.jpg",
    title: "Christ Crucified",
    artist: "Diego Velázquez",
    year: "1632",
    description: "Jesus declares 'It is finished.'"
  },
  {
    reference: "john 19:38",
    painting: "descent-from-cross.jpg",
    title: "Descent from the Cross",
    artist: "Peter Paul Rubens",
    year: "1614",
    description: "The body of Christ is taken down from the cross."
  },
  {
    reference: "john 19:25",
    painting: "lamentation.jpg",
    title: "The Lamentation",
    artist: "Giotto",
    year: "1305",
    description: "Followers mourn the body of Christ."
  },
  {
    reference: "john 19:26",
    painting: "pieta.jpg",
    title: "Pietà",
    artist: "William-Adolphe Bouguereau",
    year: "1876",
    description: "Mary cradles the body of Christ after the crucifixion."
  },
  {
    reference: "matthew 28:6",
    painting: "resurrection.jpg",
    title: "Resurrection of Christ",
    artist: "Raphael",
    year: "1499",
    description: "Christ rises victoriously from the grave."
  },
  {
    reference: "john 20:17",
    painting: "noli-me-tangere.jpg",
    title: "Noli Me Tangere",
    artist: "Titian",
    year: "1514",
    description: "Jesus appears to Mary Magdalene after His resurrection."
  },
  {
    reference: "luke 24:30",
    painting: "supper-at-emmaus.jpg",
    title: "Supper at Emmaus",
    artist: "Caravaggio",
    year: "1601",
    description: "Christ reveals Himself to two disciples while breaking bread."
  },
  {
    reference: "john 20:27",
    painting: "doubting-thomas.jpg",
    title: "Doubting Thomas",
    artist: "Caravaggio",
    year: "1603",
    description: "Thomas touches the wounds of the risen Christ."
  },
  {
    reference: "acts 1:9",
    painting: "ascension.jpg",
    title: "The Ascension",
    artist: "Rembrandt",
    year: "1636",
    description: "Christ ascends into heaven before His disciples."
  },
  {
    reference: "acts 2:3",
    painting: "pentecost.jpg",
    title: "Pentecost",
    artist: "El Greco",
    year: "1604",
    description: "The Holy Spirit descends upon the apostles."
  },
  {
    reference: "luke 15:20",
    painting: "prodigal-son.jpg",
    title: "Return of the Prodigal Son",
    artist: "Rembrandt",
    year: "1668",
    description: "The father welcomes home his lost son with compassion."
  },
  {
    reference: "mark 4:39",
    painting: "christ-in-the-storm.jpg",
    title: "Christ in the Storm on the Sea of Galilee",
    artist: "Rembrandt",
    year: "1633",
    description: "Christ calms the storm as the disciples fear."
  },
  {
    reference: "john 10:11",
    painting: "good-shepherd.jpg",
    title: "The Good Shepherd",
    artist: "Philippe de Champaigne",
    year: "1650",
    description: "Christ depicted as the shepherd caring for His flock."
  },
  {
    reference: "revelation 12:7",
    painting: "saint-michael-defeating-satan.jpg",
    title: "Saint Michael Defeating Satan",
    artist: "Raphael",
    year: "1518",
    description: "Michael defeats the dragon in the heavenly battle."
  },
  {
    reference: "john 11:35",
    painting: "jesus-wept.jpg",
    title: "Jesus Wept",
    artist: "Historical Christian Art",
    year: "Historical",
    description: "The shortest verse in the Bible depicting Jesus's compassion and humanity as he mourned Lazarus."
  }
]

// Normalize verse reference for comparison
function normalizeReference(reference: string): string {
  const normalized = reference.toLowerCase().replace(/\s+/g, " ").trim()
  return normalized
}

// Create a map of normalized references to paintings
function getVerseArtMap(): Map<string, VerseArtPainting> {
  const map = new Map<string, VerseArtPainting>()
  VERSE_ART_MAPPINGS.forEach((painting) => {
    const normalizedRef = normalizeReference(painting.reference)
    map.set(normalizedRef, painting)
  })
  return map
}

// Get art for a specific verse
export async function getVerseArt(
  book: string,
  chapter: number | string,
  verse: number | string,
): Promise<VerseArtPainting | null> {
  const mappings = getVerseArtMap()
  
  // Build reference step by step
  const bookStr = String(book).toLowerCase().trim()
  const chapterStr = String(chapter).trim()
  const verseStr = String(verse).trim()
  const reference = `${bookStr} ${chapterStr}:${verseStr}`
  
  const result = mappings.get(reference)
  return result || null
}

// Get all verses with art
export async function getAllVersesWithArt(): Promise<VerseArtPainting[]> {
  return VERSE_ART_MAPPINGS
}
