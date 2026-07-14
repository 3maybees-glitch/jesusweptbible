#!/usr/bin/env python3
"""Build curated reflection catalogs for songs, quotes, and landscapes."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "public" / "data"
BACKGROUNDS = ROOT / "public" / "backgrounds"

songs = [
  {"id": "it-is-well", "title": "It Is Well with My Soul", "artist": "Horatio Spafford", "type": "hymn", "tags": ["peace", "grief", "anxiety", "trust", "suffering"]},
  {"id": "great-is-thy-faithfulness", "title": "Great Is Thy Faithfulness", "artist": "Thomas Chisholm", "type": "hymn", "tags": ["provision", "change", "mercy", "anxiety", "gratitude"]},
  {"id": "be-thou-my-vision", "title": "Be Thou My Vision", "artist": "Traditional Irish", "type": "hymn", "tags": ["guidance", "identity", "priority", "schoolwork", "calling"]},
  {"id": "amazing-grace", "title": "Amazing Grace", "artist": "John Newton", "type": "hymn", "tags": ["grace", "guilt", "shame", "forgiveness", "hope"]},
  {"id": "how-great-thou-art", "title": "How Great Thou Art", "artist": "Carl Boberg", "type": "hymn", "tags": ["awe", "nature", "praise", "perspective", "comfort"]},
  {"id": "come-thou-fount", "title": "Come Thou Fount of Every Blessing", "artist": "Robert Robinson", "type": "hymn", "tags": ["wandering", "gratitude", "grace", "return"]},
  {"id": "what-a-friend", "title": "What a Friend We Have in Jesus", "artist": "Joseph Scriven", "type": "hymn", "tags": ["anxiety", "prayer", "burden", "friendship", "worry"]},
  {"id": "blessed-assurance", "title": "Blessed Assurance", "artist": "Fanny Crosby", "type": "hymn", "tags": ["assurance", "identity", "peace", "joy"]},
  {"id": "nearer-my-god", "title": "Nearer, My God, to Thee", "artist": "Sarah Flower Adams", "type": "hymn", "tags": ["suffering", "closeness", "grief", "trial"]},
  {"id": "abide-with-me", "title": "Abide with Me", "artist": "Henry Francis Lyte", "type": "hymn", "tags": ["weariness", "evening", "change", "comfort", "end"]},
  {"id": "rock-of-ages", "title": "Rock of Ages", "artist": "Augustus Toplady", "type": "hymn", "tags": ["refuge", "guilt", "weakness", "shelter"]},
  {"id": "holy-holy-holy", "title": "Holy, Holy, Holy", "artist": "Reginald Heber", "type": "hymn", "tags": ["awe", "worship", "holiness", "perspective"]},
  {"id": "in-christ-alone", "title": "In Christ Alone", "artist": "Keith Getty & Stuart Townend", "type": "hymn", "tags": ["foundation", "fear", "identity", "hope", "courage"]},
  {"id": "the-solid-rock", "title": "My Hope Is Built on Nothing Less", "artist": "Edward Mote", "type": "hymn", "tags": ["hope", "foundation", "storms", "assurance"]},
  {"id": "turn-your-eyes", "title": "Turn Your Eyes Upon Jesus", "artist": "Helen Howarth Lemmel", "type": "hymn", "tags": ["anxiety", "focus", "weariness", "perspective"]},
  {"id": "tis-so-sweet", "title": "Tis So Sweet to Trust in Jesus", "artist": "Louisa M. R. Stead", "type": "hymn", "tags": ["trust", "anxiety", "simplicity", "faith"]},
  {"id": "jesus-paid-it-all", "title": "Jesus Paid It All", "artist": "Elvina M. Hall", "type": "hymn", "tags": ["guilt", "grace", "shame", "forgiveness"]},
  {"id": "i-need-thee", "title": "I Need Thee Every Hour", "artist": "Annie S. Hawks", "type": "hymn", "tags": ["need", "anxiety", "dependence", "prayer"]},
  {"id": "precious-lord", "title": "Precious Lord, Take My Hand", "artist": "Thomas A. Dorsey", "type": "hymn", "tags": ["grief", "weakness", "guidance", "suffering"]},
  {"id": "his-eye-is-on-the-sparrow", "title": "His Eye Is on the Sparrow", "artist": "Civilla D. Martin", "type": "hymn", "tags": ["anxiety", "care", "worth", "fear"]},
  {"id": "leaning-on-everlasting", "title": "Leaning on the Everlasting Arms", "artist": "Elisha A. Hoffman", "type": "hymn", "tags": ["rest", "safety", "fellowship", "comfort"]},
  {"id": "be-still-my-soul", "title": "Be Still, My Soul", "artist": "Katharina von Schlegel", "type": "hymn", "tags": ["anxiety", "stillness", "trust", "grief"]},
  {"id": "because-he-lives", "title": "Because He Lives", "artist": "Bill & Gloria Gaither", "type": "hymn", "tags": ["hope", "fear", "future", "assurance"]},
  {"id": "how-deep-the-fathers", "title": "How Deep the Father's Love for Us", "artist": "Stuart Townend", "type": "hymn", "tags": ["love", "cross", "worth", "guilt"]},
  {"id": "give-me-jesus", "title": "Give Me Jesus", "artist": "Traditional / Fernando Ortega", "type": "hymn", "tags": ["simplicity", "priority", "grief", "devotion"]},
  {"id": "softly-and-tenderly", "title": "Softly and Tenderly", "artist": "Will L. Thompson", "type": "hymn", "tags": ["invitation", "return", "guilt", "mercy"]},
  {"id": "on-jordans-stormy", "title": "On Jordan's Stormy Banks", "artist": "Samuel Stennett", "type": "hymn", "tags": ["hope", "future", "journey", "home"]},
  {"id": "it-is-well-modern", "title": "It Is Well", "artist": "Bethel Music / Kristene DiMarco", "type": "ccm", "tags": ["peace", "storms", "trust", "anxiety"]},
  {"id": "oceans", "title": "Oceans (Where Feet May Fail)", "artist": "Hillsong UNITED", "type": "ccm", "tags": ["fear", "calling", "faith", "uncertainty", "journey"]},
  {"id": "what-a-beautiful-name", "title": "What a Beautiful Name", "artist": "Hillsong Worship", "type": "ccm", "tags": ["worship", "identity", "awe", "hope"]},
  {"id": "goodness-of-god", "title": "Goodness of God", "artist": "Bethel Music / Jenn Johnson", "type": "ccm", "tags": ["gratitude", "faithfulness", "life", "trust"]},
  {"id": "way-maker", "title": "Way Maker", "artist": "Sinach", "type": "ccm", "tags": ["waiting", "miracle", "anxiety", "hope", "darkness"]},
  {"id": "raise-a-hallelujah", "title": "Raise a Hallelujah", "artist": "Bethel Music", "type": "ccm", "tags": ["battle", "fear", "praise", "courage"]},
  {"id": "reckless-love", "title": "Reckless Love", "artist": "Cory Asbury", "type": "ccm", "tags": ["love", "worth", "pursuit", "identity"]},
  {"id": "build-my-life", "title": "Build My Life", "artist": "Pat Barrett", "type": "ccm", "tags": ["foundation", "worship", "priority", "calling"]},
  {"id": "another-in-the-fire", "title": "Another In The Fire", "artist": "Hillsong UNITED", "type": "ccm", "tags": ["suffering", "presence", "fire", "courage"]},
  {"id": "peace-be-still", "title": "Peace Be Still", "artist": "Hope Darst", "type": "ccm", "tags": ["anxiety", "storms", "peace", "fear"]},
  {"id": "jireh", "title": "Jireh", "artist": "Elevation Worship & Maverick City", "type": "ccm", "tags": ["provision", "enough", "anxiety", "identity", "schoolwork"]},
  {"id": "trust-in-god", "title": "Trust In God", "artist": "Elevation Worship", "type": "ccm", "tags": ["trust", "anxiety", "faith", "waiting"]},
  {"id": "holy-forever", "title": "Holy Forever", "artist": "Chris Tomlin", "type": "ccm", "tags": ["worship", "awe", "eternity", "perspective"]},
  {"id": "firm-foundation", "title": "Firm Foundation (He Won't)", "artist": "Cody Carnes", "type": "ccm", "tags": ["foundation", "fear", "storms", "assurance"]},
  {"id": "graves-into-gardens", "title": "Graves Into Gardens", "artist": "Elevation Worship", "type": "ccm", "tags": ["hope", "transformation", "grief", "new"]},
  {"id": "battle-belongs", "title": "The Battle Belongs", "artist": "Phil Wickham", "type": "ccm", "tags": ["battle", "fear", "surrender", "courage"]},
  {"id": "same-god", "title": "Same God", "artist": "Elevation Worship", "type": "ccm", "tags": ["waiting", "faithfulness", "prayer", "hope"]},
  {"id": "10k-reasons", "title": "10,000 Reasons (Bless the Lord)", "artist": "Matt Redman", "type": "ccm", "tags": ["gratitude", "praise", "weariness", "worship"]},
  {"id": "cornerstone", "title": "Cornerstone", "artist": "Hillsong Worship", "type": "ccm", "tags": ["foundation", "storms", "hope", "assurance"]},
  {"id": "no-longer-slaves", "title": "No Longer Slaves", "artist": "Bethel Music", "type": "ccm", "tags": ["fear", "identity", "freedom", "anxiety"]},
  {"id": "believe-for-it", "title": "Believe For It", "artist": "CeCe Winans", "type": "ccm", "tags": ["faith", "miracle", "waiting", "hope"]},
  {"id": "yes-i-will", "title": "Yes I Will", "artist": "Vertical Worship", "type": "ccm", "tags": ["praise", "darkness", "choice", "suffering"]},
  {"id": "lord-i-need-you", "title": "Lord I Need You", "artist": "Matt Maher", "type": "ccm", "tags": ["need", "weakness", "dependence", "grace"]},
  {"id": "jesus-strong-and-kind", "title": "Jesus Strong and Kind", "artist": "CityAlight", "type": "ccm", "tags": ["care", "children", "anxiety", "gentleness", "schoolwork"]},
  {"id": "yet-not-i", "title": "Yet Not I But Through Christ In Me", "artist": "CityAlight", "type": "ccm", "tags": ["weakness", "grace", "perseverance", "identity"]},
  {"id": "christ-be-magnified", "title": "Christ Be Magnified", "artist": "Cody Carnes", "type": "ccm", "tags": ["purpose", "worship", "life", "calling"]},
  {"id": "shepherd", "title": "Shepherd", "artist": "CityAlight", "type": "ccm", "tags": ["care", "guidance", "anxiety", "sheep"]},
]

quotes = [
  {"id": "augustine-rest", "text": "You have made us for yourself, O Lord, and our heart is restless until it rests in you.", "attribution": "Augustine of Hippo", "tags": ["rest", "anxiety", "longing", "peace"]},
  {"id": "lewis-pain", "text": "God whispers to us in our pleasures, speaks in our conscience, but shouts in our pains: it is His megaphone to rouse a deaf world.", "attribution": "C. S. Lewis", "tags": ["suffering", "pain", "attention", "hardship"]},
  {"id": "lewis-courage", "text": "Courage is not simply one of the virtues, but the form of every virtue at the testing point.", "attribution": "C. S. Lewis", "tags": ["courage", "fear", "testing", "pressure"]},
  {"id": "tozer-pursuit", "text": "The man who has God for his treasure has all things in One.", "attribution": "A. W. Tozer", "tags": ["priority", "contentment", "treasure", "anxiety"]},
  {"id": "keller-gospel", "text": "We are more sinful and flawed in ourselves than we ever dared believe, yet at the very same time we are more loved and accepted in Jesus Christ than we ever dared hope.", "attribution": "Timothy Keller", "tags": ["identity", "guilt", "grace", "worth"]},
  {"id": "spurgeon-anxiety", "text": "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.", "attribution": "Charles Spurgeon", "tags": ["anxiety", "worry", "strength", "today"]},
  {"id": "spurgeon-hope", "text": "Hope itself is like a star — not to be seen in the sunshine of prosperity, and only to be discovered in the night of adversity.", "attribution": "Charles Spurgeon", "tags": ["hope", "adversity", "darkness", "suffering"]},
  {"id": "muller-prayer", "text": "The beginning of anxiety is the end of faith, and the beginning of true faith is the end of anxiety.", "attribution": "George Müller", "tags": ["anxiety", "faith", "prayer", "trust"]},
  {"id": "corrie-ten-boom", "text": "Never be afraid to trust an unknown future to a known God.", "attribution": "Corrie ten Boom", "tags": ["fear", "future", "trust", "change", "lifechanges"]},
  {"id": "ten-boom-worry", "text": "Worry does not empty tomorrow of its sorrow, it empties today of its strength.", "attribution": "Corrie ten Boom", "tags": ["worry", "anxiety", "strength", "today"]},
  {"id": "luther-faith", "text": "Faith is a living, daring confidence in God's grace, so sure and certain that a man could stake his life on it a thousand times.", "attribution": "Martin Luther", "tags": ["faith", "grace", "courage", "assurance"]},
  {"id": "bonhoeffer-cost", "text": "When Christ calls a man, he bids him come and die.", "attribution": "Dietrich Bonhoeffer", "tags": ["calling", "cost", "discipleship", "courage"]},
  {"id": "julian-well", "text": "All shall be well, and all shall be well, and all manner of thing shall be well.", "attribution": "Julian of Norwich", "tags": ["hope", "anxiety", "suffering", "assurance"]},
  {"id": "calvin-providence", "text": "However many blessings we expect from God, His infinite liberality will always exceed all our wishes and our thoughts.", "attribution": "John Calvin", "tags": ["provision", "gratitude", "generosity", "hope"]},
  {"id": "piper-presence", "text": "God is most glorified in us when we are most satisfied in Him.", "attribution": "John Piper", "tags": ["joy", "worship", "satisfaction", "priority"]},
  {"id": "elliot-surrender", "text": "God always gives His best to those who leave the choice with Him.", "attribution": "Jim Elliot", "tags": ["surrender", "trust", "calling", "choice"]},
  {"id": "elliot-will", "text": "The will of God is never exactly what you expect it to be. It may seem to be much worse, but in the end it's going to be a lot better and a lot bigger.", "attribution": "Elisabeth Elliot", "tags": ["waiting", "will", "change", "trust"]},
  {"id": "elliot-feelings", "text": "Feelings are not facts, and they are not an accurate gauge of God's love or presence.", "attribution": "Elisabeth Elliot", "tags": ["feelings", "anxiety", "faith", "truth"]},
  {"id": "chambers-utmost", "text": "Faith never knows where it is being led, but it loves and knows the One who is leading.", "attribution": "Oswald Chambers", "tags": ["faith", "uncertainty", "guidance", "journey"]},
  {"id": "chambers-worry", "text": "Worry is an indication that we think God cannot look after us.", "attribution": "Oswald Chambers", "tags": ["worry", "anxiety", "trust", "care"]},
  {"id": "nouwen-beloved", "text": "You are the Beloved, and you need to hear that spoken to you every day.", "attribution": "Henri Nouwen", "tags": ["identity", "beloved", "worth", "anxiety"]},
  {"id": "nouwen-pain", "text": "The great spiritual call of the Beloved is to accept that brokenness as a blessing.", "attribution": "Henri Nouwen", "tags": ["brokenness", "suffering", "blessing", "identity"]},
  {"id": "francis-peace", "text": "Lord, make me an instrument of your peace.", "attribution": "Attributed to Francis of Assisi", "tags": ["peace", "prayer", "service", "anxiety"]},
  {"id": "a-kempis", "text": "Be not angry that you cannot make others as you wish them to be, since you cannot make yourself as you wish to be.", "attribution": "Thomas à Kempis", "tags": ["humility", "relationships", "self", "patience"]},
  {"id": "bunyan-progress", "text": "He that is down needs fear no fall.", "attribution": "John Bunyan", "tags": ["humility", "fear", "lowliness", "security"]},
  {"id": "edwards-resolve", "text": "Resolved, never to do anything which I should be afraid to do if it were the last hour of my life.", "attribution": "Jonathan Edwards", "tags": ["integrity", "resolve", "purpose", "courage"]},
  {"id": "stott-cross", "text": "Before we can begin to see the cross as something done for us, we have to see it as something done by us.", "attribution": "John Stott", "tags": ["cross", "guilt", "repentance", "grace"]},
  {"id": "packer-knowing", "text": "Once you become aware that the main business that you are here for is to know God, most of life's problems fall into place of their own accord.", "attribution": "J. I. Packer", "tags": ["priority", "knowing god", "perspective", "anxiety"]},
  {"id": "wilberforce", "text": "You may choose to look the other way but you can never say again that you did not know.", "attribution": "William Wilberforce", "tags": ["justice", "courage", "calling", "responsibility"]},
  {"id": "mother-teresa-small", "text": "Not all of us can do great things. But we can do small things with great love.", "attribution": "Mother Teresa", "tags": ["ordinary", "love", "service", "overwhelm", "schoolwork"]},
  {"id": "mother-teresa-faithful", "text": "God does not require that we be successful, only that we be faithful.", "attribution": "Mother Teresa", "tags": ["faithfulness", "failure", "pressure", "students"]},
  {"id": "chesterton-joy", "text": "Joy is the gigantic secret of the Christian.", "attribution": "G. K. Chesterton", "tags": ["joy", "secret", "hope", "perspective"]},
  {"id": "chesterton-thanks", "text": "The test of all happiness is gratitude.", "attribution": "G. K. Chesterton", "tags": ["gratitude", "joy", "happiness", "perspective"]},
  {"id": "pascal-god", "text": "There is a God-shaped vacuum in the heart of each man which cannot be satisfied by any created thing but only by God the Creator.", "attribution": "Blaise Pascal", "tags": ["longing", "rest", "identity", "anxiety"]},
  {"id": "luther-pray", "text": "To be a Christian without prayer is no more possible than to be alive without breathing.", "attribution": "Martin Luther", "tags": ["prayer", "need", "dependence", "life"]},
  {"id": "owen-beholding", "text": "The greatest sorrow and burden you can lay on the Father, the greatest unkindness you can do to Him is not to believe that He loves you.", "attribution": "John Owen", "tags": ["love", "belief", "identity", "doubt"]},
  {"id": "whitfield", "text": "We are immortal until our work on earth is done.", "attribution": "George Whitefield", "tags": ["purpose", "fear", "calling", "courage"]},
  {"id": "amy-carmichael", "text": "God hold us to that which drew us first, when the Cross was the attraction, and we wanted nothing else.", "attribution": "Amy Carmichael", "tags": ["calling", "cross", "devotion", "perseverance"]},
  {"id": "hudson-taylor", "text": "God's work done in God's way will never lack God's supply.", "attribution": "Hudson Taylor", "tags": ["provision", "calling", "work", "trust"]},
  {"id": "wesley-assurance", "text": "Best of all is, God is with us.", "attribution": "John Wesley", "tags": ["presence", "comfort", "hope"]},
  {"id": "tozer-hunger", "text": "The continuous and uninterrupted presence of God is more to be desired than all else.", "attribution": "A. W. Tozer", "tags": ["presence", "desire", "worship", "priority"]},
  {"id": "spurgeon-bitterness", "text": "I have learned to kiss the wave that throws me against the Rock of Ages.", "attribution": "Charles Spurgeon", "tags": ["suffering", "trust", "storms", "refuge"]},
  {"id": "lewis-heart", "text": "I pray because I can't help myself. I pray because I'm helpless. I pray because the need flows out of me all the time, waking and sleeping.", "attribution": "C. S. Lewis", "tags": ["prayer", "need", "helplessness", "dependence"]},
  {"id": "keller-suffering", "text": "Christianity does not give us a ladder to climb out of suffering; it gives us a Savior who climbs down into it with us.", "attribution": "Timothy Keller", "tags": ["suffering", "presence", "comfort", "christ"]},
  {"id": "nouwen-home", "text": "Home is not a place, but a Presence — living in the heart of God.", "attribution": "Henri Nouwen", "tags": ["belonging", "presence", "home", "anxiety"]},
]

landscapes = [
  {"id": "psalms", "book": "Psalms", "moodLabel": "Mountains and valleys under worship light", "tags": ["worship", "comfort", "peace", "nature", "anxiety"]},
  {"id": "job", "book": "Job", "moodLabel": "Stormy sky and whirlwind", "tags": ["suffering", "storms", "questioning", "grief"]},
  {"id": "ruth", "book": "Ruth", "moodLabel": "Golden harvest fields at sunset", "tags": ["provision", "loyalty", "hope", "ordinary", "work"]},
  {"id": "genesis", "book": "Genesis", "moodLabel": "Lush creation dawn", "tags": ["beginning", "new", "identity", "hope", "lifechanges"]},
  {"id": "exodus", "book": "Exodus", "moodLabel": "Desert dunes and guiding light", "tags": ["journey", "deliverance", "fear", "wilderness"]},
  {"id": "numbers", "book": "Numbers", "moodLabel": "Wilderness under starlight", "tags": ["wandering", "waiting", "journey", "uncertainty"]},
  {"id": "deuteronomy", "book": "Deuteronomy", "moodLabel": "Mountain covenant peaks", "tags": ["calling", "courage", "transition", "remember"]},
  {"id": "joshua", "book": "Joshua", "moodLabel": "Dawn over contested land", "tags": ["courage", "transition", "battle", "fear"]},
  {"id": "1-samuel", "book": "1 Samuel", "moodLabel": "Shepherd hills and night sky", "tags": ["calling", "youth", "pressure", "identity"]},
  {"id": "1-kings", "book": "1 Kings", "moodLabel": "Temple glow and royal courts", "tags": ["glory", "vocation", "responsibility"]},
  {"id": "haggai", "book": "Haggai", "moodLabel": "Rebuilding in emerging light", "tags": ["work", "opposition", "perseverance", "rebuild"]},
  {"id": "malachi", "book": "Malachi", "moodLabel": "Twilight waiting for a messenger", "tags": ["courage", "risk", "calling", "fear", "waiting"]},
  {"id": "proverbs", "book": "Proverbs", "moodLabel": "City pathways in golden light", "tags": ["wisdom", "students", "path", "learning"]},
  {"id": "ecclesiastes", "book": "Ecclesiastes", "moodLabel": "Changing seasons at twilight", "tags": ["seasons", "change", "lifechanges", "perspective"]},
  {"id": "isaiah", "book": "Isaiah", "moodLabel": "Celestial throne-room light", "tags": ["hope", "holy", "comfort", "future"]},
  {"id": "jeremiah", "book": "Jeremiah", "moodLabel": "Troubled skies over the city", "tags": ["grief", "warning", "lament", "change"]},
  {"id": "lamentations", "book": "Lamentations", "moodLabel": "Ruins with a faint mercy light", "tags": ["grief", "tears", "suffering", "hope"]},
  {"id": "daniel", "book": "Daniel", "moodLabel": "Night visions over empire courts", "tags": ["courage", "integrity", "students", "pressure"]},
  {"id": "jonah", "book": "Jonah", "moodLabel": "Tempestuous seascape", "tags": ["running", "storms", "second chance", "fear"]},
  {"id": "habakkuk", "book": "Habakkuk", "moodLabel": "Questioning hills under gradual light", "tags": ["doubt", "waiting", "trust", "complaint"]},
  {"id": "matthew", "book": "Matthew", "moodLabel": "Stormy mountains at golden hour", "tags": ["discipleship", "storms", "authority", "teaching"]},
  {"id": "mark", "book": "Mark", "moodLabel": "Galilee waves under dark clouds", "tags": ["urgency", "storms", "fear", "faith"]},
  {"id": "luke", "book": "Luke", "moodLabel": "Shepherd hillside at warm dusk", "tags": ["compassion", "care", "ordinary", "peace"]},
  {"id": "john", "book": "John", "moodLabel": "Deep night sky filled with stars", "tags": ["light", "eternal", "identity", "peace", "anxiety"]},
  {"id": "acts", "book": "Acts", "moodLabel": "Ancient city lit by mission fire", "tags": ["calling", "courage", "change", "community"]},
  {"id": "romans", "book": "Romans", "moodLabel": "Roman dusk over stone and shadow", "tags": ["gospel", "assurance", "mind", "identity"]},
  {"id": "2-corinthians", "book": "2 Corinthians", "moodLabel": "Rough seas and coastal cliffs", "tags": ["affliction", "comfort", "weakness", "perseverance"]},
  {"id": "philippians", "book": "Philippians", "moodLabel": "Peaceful garden in golden light", "tags": ["joy", "peace", "anxiety", "gratitude"]},
  {"id": "ephesians", "book": "Ephesians", "moodLabel": "Celestial glow over a night city", "tags": ["identity", "spiritual", "strength", "belonging"]},
  {"id": "hebrews", "book": "Hebrews", "moodLabel": "Sacred architecture in golden rays", "tags": ["perseverance", "faith", "rest", "race"]},
  {"id": "james", "book": "James", "moodLabel": "Vineyards and honest daylight", "tags": ["trials", "wisdom", "work", "integrity"]},
  {"id": "1-peter", "book": "1 Peter", "moodLabel": "Rocky coast through a storm", "tags": ["suffering", "hope", "exile", "perseverance"]},
  {"id": "1-john", "book": "1 John", "moodLabel": "Wildflowers glowing in sunrise", "tags": ["love", "assurance", "light", "community"]},
  {"id": "revelation", "book": "Revelation", "moodLabel": "Apocalyptic light and throne glory", "tags": ["hope", "future", "new", "tears", "end"]},
  {"id": "hosea", "book": "Hosea", "moodLabel": "Landscape of wounded love healed", "tags": ["return", "healing", "love", "forgiveness"]},
  {"id": "micah", "book": "Micah", "moodLabel": "Mountain path of justice and mercy", "tags": ["justice", "humility", "walking", "calling"]},
]

for landscape in landscapes:
  landscape["imagePath"] = f"/backgrounds/{landscape['id']}.jpg"

missing_img = [
  landscape["id"]
  for landscape in landscapes
  if not (BACKGROUNDS / f"{landscape['id']}.jpg").exists()
]

(DATA / "reflection-songs.json").write_text(
  json.dumps({"songs": songs}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)
(DATA / "reflection-quotes.json").write_text(
  json.dumps({"quotes": quotes}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)
(DATA / "reflection-landscapes.json").write_text(
  json.dumps({"landscapes": landscapes}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)

print(
  f"songs={len(songs)} quotes={len(quotes)} landscapes={len(landscapes)} missing_img={missing_img}"
)
