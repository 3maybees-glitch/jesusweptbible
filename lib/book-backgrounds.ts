// Mapping of NT books to their unique landscape background prompts
// These are themed to reflect the content/spirit of each book

export const bookBackgrounds: Record<string, string> = {
  // Gospels
  "Matthew": "dark mountainous landscape, ancient roman palestine, sunset golden hour, dramatic stormy sky, moody atmospheric",
  "Mark": "dark dramatic seascape of galilee, storm clouds, rough waters, palestinian coast, deep shadows, cinematic",
  "Luke": "dark lush mediterranean garden landscape, olive groves, ancient roman paths, warm amber light, mysterious mood",
  "John": "dark celestial night sky, stars and cosmos, deep universe, spiritual ethereal landscape, mystical atmosphere",

  // History
  "Acts": "dark ancient roman city landscape, jerusalem and early christian cities, dramatic architecture, glowing fires, dynamic energy",

  // Pauline Epistles
  "Romans": "dark ancient rome landscape, colosseum and forum at dusk, powerful architecture, deep shadows, contemplative mood",
  "1 Corinthians": "dark cosmopolitan city landscape, ancient corinth, marketplace ruins, golden sunset, warm glowing light",
  "2 Corinthians": "dark stormy seascape, rough seas, dramatic clouds, coastal cliffs, moody atmospheric lighting",
  "Galatians": "dark mountainous landscape, ancient anatolia, rolling hills, deep forests, golden hour light through mist",
  "Ephesians": "dark ethereal landscape, glowing city lights, celestial sky, spiritual mystical atmosphere, golden radiance",
  "Philippians": "dark joyful garden landscape, flowers and light, warm golden hour, peaceful serene atmosphere, gentle beauty",
  "Colossians": "dark rich earth tones landscape, ancient mystery, deep forests, mystical atmosphere, glowing warmth",
  "1 Thessalonians": "dark night sky, stars and constellations, hope and light in darkness, glowing horizon, peaceful twilight",
  "2 Thessalonians": "dark apocalyptic landscape, dramatic sky, divine light breaking through clouds, powerful spiritual energy",
  "1 Timothy": "dark spiritual mountain landscape, sacred temple architecture, glowing light, reverent peaceful atmosphere",
  "2 Timothy": "dark prison landscape, ancient rome dungeon, single light source, shadows and hope, dramatic lighting",
  "Titus": "dark island landscape, mediterranean, ancient greek ruins, golden sunset, warm glowing light over water",

  // Philemon
  "Philemon": "dark intimate house landscape, ancient roman home architecture, warm candlelight, personal spiritual space",

  // Hebrews
  "Hebrews": "dark temple landscape, heavenly architecture, divine light rays, golden sacred atmosphere, spiritual majesty",

  // General Epistles
  "James": "dark practical landscape, work and craftsmanship, fields and vineyards, earth tones, honest natural light",
  "1 Peter": "dark suffering landscape, rocky coastline, storms and perseverance, dramatic moody atmosphere, glowing hope",
  "2 Peter": "dark apocalyptic sky, end times vision, divine judgment, powerful celestial light, mystical atmosphere",
  "1 John": "close-up field of colorful flowers glowing with golden sunrise light, petals illuminated from behind, warm amber rays, blooming wildflowers in purples, pinks, yellows and whites, morning dew, ethereal glowing atmosphere, dreamy romantic lighting",
  "2 John": "dark truth landscape, bright light piercing darkness, clarity and vision, golden illumination",
  "3 John": "dark journey landscape, paths and roads, pilgrimage, golden sunset light, warm welcoming glow",

  // Jude
  "Jude": "dark cosmic landscape, stars and universe, divine judgment sky, powerful spiritual energy, mysterious sublime",

  // Revelation
  "Revelation": "dark apocalyptic vision landscape, throne room of god, divine light and fire, mystical celestial atmosphere, epic spiritual drama"
}

export function getBackgroundUrl(bookName: string): string {
  return `/backgrounds/${bookName.toLowerCase().replace(/\s+/g, '-')}.jpg`
}
