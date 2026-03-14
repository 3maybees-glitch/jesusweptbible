"use client"

import { ChevronLeft, Book } from "lucide-react"

interface AboutPageProps {
  onBack: () => void
}

// Christian Cross SVG Component
function ChristianCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vertical bar */}
      <rect x="40" y="10" width="20" height="120" rx="2" />
      {/* Horizontal bar */}
      <rect x="20" y="45" width="60" height="20" rx="2" />
    </svg>
  )
}

export function AboutPage({ onBack }: AboutPageProps) {
  const bookDescriptions = [
    // Old Testament - Pentateuch
    { name: "Genesis", desc: "Lush ancient world landscape with primordial garden Eden and creation dawn light. Diverse animals and nature celebrate the beginning of all things with mystical golden hour and ethereal luminous atmosphere depicting God's perfect creation." },
    { name: "Exodus", desc: "Dark desert landscape of ancient Egypt with Moses leading people toward freedom. Golden sunset over desert dunes with divine pillar of fire glow and dramatic sky representing God's miraculous deliverance and covenant establishment." },
    { name: "Leviticus", desc: "Dark ancient Jewish temple with sacred architecture and glowing divine light. Altar and worship imagery with reverent spiritual atmosphere and golden sanctuary depicting God's holiness and the way to approach His presence." },
    { name: "Numbers", desc: "Dark vast desert landscape showing wandering Israelites on their wilderness journey. Starry night sky with divine light, tents and campfires glow creating a mysterious journey atmosphere representing God's guidance through the wilderness." },
    { name: "Deuteronomy", desc: "Dark mountainous landscape featuring Mount Sinai with ancient covenants and golden divine light on mountain peaks. Tablets of law imagery with sacred spiritual power representing God's covenant renewal and final instructions to His people." },

    // Old Testament - Historical
    { name: "Joshua", desc: "Dark ancient Canaanite landscape with walls and fortresses and battle scenes. Divine light breaking through clouds with golden victory light and dramatic epic atmosphere representing God's power to conquer and establish His people in the promised land." },
    { name: "Judges", desc: "Dark ancient Hebrew landscape with tribal settlements and battles of warfare. Glowing fires and weapons with dramatic moody atmosphere showing cycles of chaos and order representing spiritual warfare and God's recurring deliverance." },
    { name: "Ruth", desc: "Golden wheat fields at harvest in ancient Bethlehem countryside with glowing warm sunset light. Peaceful pastoral beauty depicting intimate family moments and covenantal love representing redemption, grace, and God's care for the vulnerable." },
    { name: "1 Samuel", desc: "Dark ancient kingdom landscape with shepherd boy David in mountains and valleys. Glowing starlight with sacred anointing light and divine kingship emergence representing God's selection of His anointed king and His sovereignty in human leadership." },
    { name: "2 Samuel", desc: "Dark royal palace landscape of ancient Jerusalem kingdom with political intrigue and power dynamics. Dramatic shadows and light with regal architecture and divine judgment representing the consequences of human sin and God's enduring covenant promises." },
    { name: "1 Kings", desc: "Dark magnificent temple and palace depicting Solomon's kingdom glory with golden architectural splendor. Sacred divine light with wealth and wisdom imagery and glowing prosperity representing the height of Israel's glory and the dangers of worldly riches." },
    { name: "2 Kings", desc: "Dark political landscape showing kingdoms rising and falling with exile and restoration themes. Dramatic divine intervention with divine light breaking through darkness and judgment representing God's patience, warning, and redemptive purposes through judgment." },
    { name: "1 Chronicles", desc: "Dark genealogical heritage landscape showing ancient kingdom establishment. Genealogical records imagery with spiritual lineage light, divine covenant, and golden legacy representing the continuity of God's people and covenant faithfulness." },
    { name: "2 Chronicles", desc: "Dark temple renovation landscape depicting restoration and renewal with spiritual reformation. Divine presence light with sacred architecture glow and hope imagery representing God's faithfulness to restore His people and temple through repentance." },

    // Old Testament - Poetry & Wisdom
    { name: "Job", desc: "Dark stormy landscape depicting suffering and pain with divine whirlwind sky. Dramatic weather with spiritual wrestling and mystical divine revelation breaking through darkness representing wrestling with faith and God's ultimate sovereignty over suffering." },
    { name: "Psalms", desc: "Diverse beautiful landscape with mountains and valleys together, celestial sky merging with earth. Divine presence everywhere with warm glowing light of worship and praise representing the full range of human emotion and connection with God." },
    { name: "Proverbs", desc: "Dark marketplace landscape of ancient city gates showing wisdom and folly themes. Dramatic lighting with clarity and golden hour light on pathways creating moral wisdom light representing practical guidance and the pursuit of godly wisdom." },
    { name: "Ecclesiastes", desc: "Dark contemplative landscape showing seasons changing representing time and eternity. Sunset fading to night with philosophical deep atmosphere and golden hour melancholy depicting the search for meaning and ultimate fulfillment in God." },
    { name: "Song of Solomon", desc: "Lush romantic garden landscape with flowers, nature, and lovers in paradise. Warm golden romantic lighting with intimate beauty and sensual glowing atmosphere representing covenantal love and the celebration of God-honoring relationships." },

    // Old Testament - Major Prophets
    { name: "Isaiah", desc: "Dark prophetic landscape with divine throne room vision and heavenly beings. Glowing celestial light with future redemption vision and powerful spiritual energy depicting God's cosmic sovereignty, justice, and messianic promises of restoration." },
    { name: "Jeremiah", desc: "Dark troubled landscape showing Jerusalem before destruction with prophetic warning sky. Dramatic dark clouds with divine judgment light and emotional anguish representing God's weeping love and calls to repentance before judgment." },
    { name: "Lamentations", desc: "Dark desolate landscape depicting destroyed city ruins with mourning and sorrow. Somber melancholic atmosphere with scattered divine light through darkness showing grief representing lamentation over judgment and the seeds of restoration and hope." },
    { name: "Ezekiel", desc: "Dark apocalyptic vision landscape with heavenly throne chariot and divine creatures. Mystical cosmic light with surreal spiritual imagery and powerful otherworldly atmosphere representing God's transcendent holiness and visionary restoration of His people." },
    { name: "Daniel", desc: "Dark royal palace landscape of Babylon kingdom with mystical visions. Divine prophecy light with dream and reality blending and cosmic divine intervention representing God's sovereignty over kingdoms and prophetic revelation of end times." },

    // Old Testament - Minor Prophets
    { name: "Hosea", desc: "Dark passionate landscape with unfaithful love imagery and covenant restoration themes. Dramatic emotional lighting with divine mercy light breaking through and redemptive hope depicting God's unfailing love and restoration despite human unfaithfulness." },
    { name: "Joel", desc: "Dark locust plague landscape showing apocalyptic devastation with divine army imagery. Judgment and restoration with glowing divine light through darkness and renewal hope representing God's judgment on sin and restoration of joy and blessing." },
    { name: "Amos", desc: "Dark shepherd's landscape depicting social justice themes with divine judgment. Powerful prophetic light with moral clarity and golden prophetic vision breaking through representing God's demand for justice and His protection of the vulnerable." },
    { name: "Obadiah", desc: "Dark mountainous fortress landscape representing Edom nation with judgment and justice themes. Divine retribution light with spiritual warfare imagery and righteous victory depicting God's judgment on pride and His protection of His humble people." },
    { name: "Jonah", desc: "Dark tempestuous seascape with whale and ocean depths showing divine calling and redemption. Glowing miraculous light with spiritual transformation and second chances representing God's mercy, repentance, and compassion for all people." },
    { name: "Micah", desc: "Dark mountain landscape showing justice and mercy themes with covenant God. Healing light breaking through darkness with humble worship imagery and restoration depicting God's requirement for justice, mercy, and humility in His people." },
    { name: "Nahum", desc: "Dark Assyrian fortress landscape depicting divine judgment and powerful warfare imagery. Dramatic divine retribution with glowing judgment light and righteous anger representing God's justice against oppression and His protection of His people." },
    { name: "Habakkuk", desc: "Dark questioning landscape with divine dialogue and faith in darkness. Gradual illumination with spiritual transformation light and trust emerging representing the journey from questioning doubt to trusting in God's ultimate justice and sovereignty." },
    { name: "Zephaniah", desc: "Dark apocalyptic landscape depicting the day of the Lord with judgment and restoration. Dramatic sky transformation with divine light through judgment and ultimate redemption representing God's purifying judgment and restoration of a faithful remnant." },
    { name: "Haggai", desc: "Dark rebuilding landscape showing temple restoration with construction and community. Growing golden light of renewal with divine encouragement and restoration hope representing God's call to rebuild and the importance of prioritizing His kingdom." },
    { name: "Zechariah", desc: "Dark mystical vision landscape with prophetic visions and angels throughout. Future glory of God with divine light and celestial imagery, messianic hope, and glowing future representing God's covenant faithfulness and visions of ultimate restoration." },
    { name: "Malachi", desc: "Dark final waiting landscape with covenant renewal and divine messenger coming themes. Prophetic twilight light with preparation and expectation imagery and transformative light representing God's final word and preparation for the coming Messiah." },

    // New Testament - Gospels
    { name: "Matthew", desc: "Dark mountainous landscape of ancient Roman Palestine with sunset golden hour, dramatic stormy sky, moody atmospheric high contrast" },
    { name: "Mark", desc: "Dark dramatic seascape of Galilee with storm clouds, rough waters, Palestinian coast, deep shadows, cinematic mood" },
    { name: "Luke", desc: "Dark lush Mediterranean garden landscape with olive groves, ancient Roman paths, warm amber light, mysterious mood" },
    { name: "John", desc: "Dark celestial night sky with stars and cosmos, deep universe, spiritual ethereal landscape, mystical atmosphere" },

    // New Testament - History
    { name: "Acts", desc: "Dark ancient Roman city landscape of Jerusalem and early Christian cities with dramatic architecture, glowing fires, dynamic energy" },

    // New Testament - Pauline Epistles
    { name: "Romans", desc: "Dark ancient Rome landscape with Colosseum and forum at dusk, powerful architecture, deep shadows, contemplative mood" },
    { name: "1 Corinthians", desc: "Dark cosmopolitan city landscape of ancient Corinth with marketplace ruins, golden sunset, warm glowing light" },
    { name: "2 Corinthians", desc: "Dark stormy seascape with rough seas, dramatic clouds, coastal cliffs, moody atmospheric lighting" },
    { name: "Galatians", desc: "Dark mountainous landscape of ancient Anatolia with rolling hills, deep forests, golden hour light through mist" },
    { name: "Ephesians", desc: "Dark ethereal landscape with glowing city lights, celestial sky, spiritual mystical atmosphere, golden radiance" },
    { name: "Philippians", desc: "Dark joyful garden landscape with flowers and light, warm golden hour, peaceful serene atmosphere, gentle beauty" },
    { name: "Colossians", desc: "Dark rich earth tones landscape with ancient mystery, deep forests, mystical atmosphere, glowing warmth" },
    { name: "1 Thessalonians", desc: "Dark night sky with stars and constellations, hope and light in darkness, glowing horizon, peaceful twilight" },
    { name: "2 Thessalonians", desc: "Dark apocalyptic landscape with dramatic sky, divine light breaking through clouds, powerful spiritual energy" },
    { name: "1 Timothy", desc: "Dark spiritual mountain landscape with sacred temple architecture, glowing light, reverent peaceful atmosphere" },
    { name: "2 Timothy", desc: "Dark prison landscape of ancient Rome dungeon with single light source, shadows and hope, dramatic lighting" },
    { name: "Titus", desc: "Dark island landscape of Mediterranean with ancient Greek ruins, golden sunset, warm glowing light over water" },

    // New Testament - Philemon
    { name: "Philemon", desc: "Dark intimate house landscape with ancient Roman home architecture, warm candlelight, personal spiritual space" },

    // New Testament - Hebrews
    { name: "Hebrews", desc: "Dark temple landscape with heavenly architecture, divine light rays, golden sacred atmosphere, spiritual majesty" },

    // New Testament - General Epistles
    { name: "James", desc: "Dark practical landscape with work and craftsmanship, fields and vineyards, earth tones, honest natural light" },
    { name: "1 Peter", desc: "Dark suffering landscape with rocky coastline, storms and perseverance, dramatic moody atmosphere, glowing hope" },
    { name: "2 Peter", desc: "Dark apocalyptic sky with end times vision, divine judgment, powerful celestial light, mystical atmosphere" },
    { name: "1 John", desc: "Close-up field of colorful flowers glowing with golden sunrise light, petals illuminated from behind with warm amber rays, blooming wildflowers in purples, pinks, yellows and whites, morning dew, ethereal glowing atmosphere, dreamy romantic lighting" },
    { name: "2 John", desc: "Dark truth landscape with bright light piercing darkness, clarity and vision, golden illumination" },
    { name: "3 John", desc: "Dark journey landscape with paths and roads, pilgrimage, golden sunset light, warm welcoming glow" },

    // New Testament - Jude & Revelation
    { name: "Jude", desc: "Dark cosmic landscape with stars and universe, divine judgment sky, powerful spiritual energy, mysterious sublime" },
    { name: "Revelation", desc: "Dark apocalyptic vision landscape with throne room of God, divine light and fire, mystical celestial atmosphere, epic spiritual drama" },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-overlay-light pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-overlay-light border-b border-border/20 backdrop-blur-sm">
          <div className="px-4 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-3 min-h-[44px] px-2 -mx-2"
              aria-label="Back to books menu"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="font-serif text-2xl text-foreground text-center">
              About This App
            </h1>
            <p className="text-sm text-muted-foreground text-center mt-1">Old Testament & New Testament - King James Version</p>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 py-6 pb-12 max-w-2xl mx-auto">
          <section className="mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="font-serif text-lg font-bold text-foreground mb-3">Overview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This Bible app presents all 66 books of the Bible (39 Old Testament and 27 New Testament books) in the King James Version with thoughtfully designed, thematic landscape backgrounds for each book. Each background complements the spiritual themes and content of its respective book, from the creation of Genesis through the cosmic visions of Revelation.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="font-serif text-lg font-bold text-foreground mb-3">
                Strong's Concordance & Greek Word Study - Tutorial
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                This app integrates <span className="font-semibold">Strong's Concordance</span>, a comprehensive biblical reference tool that assigns unique numbers to every word in the original biblical languages (Greek for the New Testament and Hebrew for the Old Testament).
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">What is Strong's Concordance?</p>
                  <p className="text-sm text-muted-foreground">
                    Strong's Concordance is a reference system created by Dr. James Strong that allows readers to look up every occurrence of a biblical word across the entire Bible. Each Greek word is assigned a unique number (prefixed with "G" for Greek). This helps you understand the original meaning of scripture and how particular words were used throughout the New Testament.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Understanding Greek Words & Their Meanings</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    The Greek language is rich in nuance and deeper meaning than English translations often capture. When highlighted words appear in gold throughout the verses, each word includes:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li className="list-disc"><strong>Strong's Number:</strong> The unique identifier (e.g., G2424 for "Jesus")</li>
                    <li className="list-disc"><strong>Lemma:</strong> The base form of the word in Greek</li>
                    <li className="list-disc"><strong>Meaning:</strong> The literal and theological definition of the word</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Spiritual Significance of Clicking Words</p>
                  <p className="text-sm text-muted-foreground">
                    When you click on a highlighted Greek word, a popup displays its complete theological definition and spiritual significance. This allows you to explore the <span className="font-semibold">depth of meaning</span> behind key biblical concepts. For example, clicking on the Greek word "agapē" (love) reveals how it represents self-giving covenant love distinct from mere affection. Understanding these original meanings transforms your Bible study by revealing layers of spiritual truth that connect to God's divine character and redemptive purposes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="font-serif text-lg font-bold text-foreground mb-3">Glowing Cross Feature - Tutorial</h2>
              <div className="flex justify-end mb-4">
                <ChristianCross className="w-12 h-16 text-accent animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The <span className="font-semibold">glowing cross icon</span> positioned on the <span className="font-semibold">right side of each verse</span> allows you to interact with and track your scripture reading journey:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                <li className="list-disc">
                  <strong>Mark for Reflection:</strong> Tap the cross to highlight verses that have touched your heart or prompted spiritual contemplation. The glow marks these verses as important for future review and deeper study.
                </li>
                <li className="list-disc">
                  <strong>Track Your Progress:</strong> As you read through the New Testament, the glowing crosses provide a visual record of which verses you've engaged with, creating a personal map of your spiritual journey through scripture.
                </li>
                <li className="list-disc">
                  <strong>Revisit & Reflect:</strong> Return to marked verses anytime to recall insights, journal about your thoughts, or compare how your understanding has grown over time.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="font-serif text-lg font-bold text-foreground mb-3">Bible Version Citation</h2>
              <p className="leading-relaxed mb-2">
                <strong>King James Version (KJV)</strong>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Public Domain. The Authorized King James Version of the Bible text and word definitions are taken from the King James Version, originally published in 1611. This translation has been freely available in the public domain for centuries and is widely used for biblical study and spiritual reflection.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="font-serif text-lg font-bold text-foreground mb-3">Created By</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This app was created and designed by <strong>Darren and Luke Maybee</strong>. Developed with a passion for making scripture study accessible, beautiful, and spiritually enriching for all readers.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                <Book className="w-5 h-5 opacity-70" />
                Book Wallpaper Descriptions
              </h2>
            </div>
            <div className="space-y-4">
              {bookDescriptions.map((book) => (
                <div key={book.name} className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-serif font-semibold text-foreground mb-1.5">{book.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{book.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 pt-6 border-t border-border/30">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground text-center">
                Each background is designed with a 60% dark overlay to ensure text readability while maintaining the beauty of the landscape imagery.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
