// Contextual data for Bible books: maps, timelines, key info popups
export interface BibleContextEntry {
  book: string;
  chapters?: number[]; // specific chapters, or all if omitted
  type: "map" | "timeline" | "info";
  title: string;
  description: string;
  details?: string[];
  mapUrl?: string; // for map type entries
  timelineEvents?: { year: string; event: string }[];
}

export const bibleContextData: BibleContextEntry[] = [
  // GENESIS
  {
    book: "Genesis",
    chapters: [1, 2, 3],
    type: "timeline",
    title: "Creation & The Fall",
    description: "The account of God creating the world in six days and resting on the seventh, followed by humanity's fall.",
    timelineEvents: [
      { year: "Day 1", event: "Light separated from darkness" },
      { year: "Day 2", event: "Sky and waters separated" },
      { year: "Day 3", event: "Dry land, seas, and vegetation" },
      { year: "Day 4", event: "Sun, moon, and stars" },
      { year: "Day 5", event: "Sea creatures and birds" },
      { year: "Day 6", event: "Land animals and humanity" },
      { year: "Day 7", event: "God rested" },
    ],
  },
  {
    book: "Genesis",
    chapters: [6, 7, 8, 9],
    type: "timeline",
    title: "The Great Flood",
    description: "Noah builds an ark at God's command to survive a catastrophic flood.",
    timelineEvents: [
      { year: "Before", event: "Wickedness fills the earth" },
      { year: "Building", event: "Noah constructs the ark (300×50×30 cubits)" },
      { year: "Day 1", event: "Animals enter the ark" },
      { year: "40 Days", event: "Rain falls on the earth" },
      { year: "150 Days", event: "Waters prevail" },
      { year: "Day 371", event: "Noah exits the ark" },
    ],
  },
  {
    book: "Genesis",
    chapters: [11, 12, 13, 14, 15],
    type: "map",
    title: "Abraham's Journey",
    description: "Abraham travels from Ur of the Chaldeans through Haran to the land of Canaan, then to Egypt and back.",
    details: [
      "🏠 Ur of the Chaldeans — Abraham's birthplace (modern Iraq)",
      "🛤️ Haran — stopping point in northern Mesopotamia (modern Turkey)",
      "⛺ Canaan — the Promised Land (modern Israel/Palestine)",
      "🏛️ Egypt — Abraham's sojourn during famine",
      "⛰️ Bethel — where Abraham built an altar",
    ],
  },
  // EXODUS
  {
    book: "Exodus",
    chapters: [1, 2, 3, 4, 5],
    type: "timeline",
    title: "Moses' Early Life",
    description: "From Israel's slavery in Egypt to Moses' call at the burning bush.",
    timelineEvents: [
      { year: "~1526 BC", event: "Moses born, hidden in basket on the Nile" },
      { year: "~1486 BC", event: "Moses flees to Midian after killing an Egyptian" },
      { year: "~1446 BC", event: "God appears in the burning bush" },
    ],
  },
  {
    book: "Exodus",
    chapters: [7, 8, 9, 10, 11, 12],
    type: "timeline",
    title: "The Ten Plagues of Egypt",
    description: "God sends ten devastating plagues to compel Pharaoh to release the Israelites.",
    timelineEvents: [
      { year: "1st", event: "Water to blood" },
      { year: "2nd", event: "Frogs" },
      { year: "3rd", event: "Gnats/Lice" },
      { year: "4th", event: "Flies" },
      { year: "5th", event: "Livestock disease" },
      { year: "6th", event: "Boils" },
      { year: "7th", event: "Hail" },
      { year: "8th", event: "Locusts" },
      { year: "9th", event: "Darkness" },
      { year: "10th", event: "Death of firstborn" },
    ],
  },
  {
    book: "Exodus",
    chapters: [13, 14, 15, 16, 17],
    type: "map",
    title: "The Exodus Route",
    description: "The Israelites' journey from Egypt through the Red Sea into the wilderness of Sinai.",
    details: [
      "🏛️ Rameses — departure point in Egypt",
      "🌊 Red Sea — miraculous crossing",
      "🏜️ Wilderness of Shur — 3 days without water",
      "💧 Marah — bitter water made sweet",
      "🌴 Elim — 12 springs and 70 palm trees",
      "⛰️ Mount Sinai — where God gives the Law",
    ],
  },
  // JOSHUA
  {
    book: "Joshua",
    chapters: [1, 2, 3, 4, 5, 6],
    type: "map",
    title: "Conquest of Canaan",
    description: "Joshua leads Israel across the Jordan River to conquer the Promised Land, beginning with Jericho.",
    details: [
      "🏕️ Shittim — Israel's camp east of Jordan",
      "🌊 Jordan River — miraculous crossing on dry ground",
      "⚔️ Jericho — walls fall after 7 days of marching",
      "🏔️ Mount Ebal & Gerizim — covenant renewal",
    ],
  },
  // 1 SAMUEL / 2 SAMUEL
  {
    book: "1 Samuel",
    chapters: [16, 17],
    type: "info",
    title: "David & Goliath",
    description: "Young David, a shepherd from Bethlehem, defeats the Philistine giant Goliath in the Valley of Elah.",
    details: [
      "📏 Goliath's height: ~9 feet 9 inches (6 cubits and a span)",
      "🪨 David chose 5 smooth stones from a brook",
      "⚔️ Valley of Elah — between Socoh and Azekah",
      "👑 This event begins David's rise to kingship",
    ],
  },
  // 1 KINGS
  {
    book: "1 Kings",
    chapters: [5, 6, 7, 8],
    type: "info",
    title: "Solomon's Temple",
    description: "King Solomon builds the first Temple in Jerusalem — the dwelling place of God among His people.",
    details: [
      "📐 Dimensions: 90 ft long × 30 ft wide × 45 ft high",
      "🪨 Built with stone quarried off-site (no hammer sounds)",
      "🏗️ 7 years to build, 183,000 laborers",
      "🕊️ The Ark of the Covenant placed in the Holy of Holies",
      "☁️ God's glory fills the temple at dedication",
    ],
  },
  // DANIEL
  {
    book: "Daniel",
    chapters: [1, 2, 3],
    type: "timeline",
    title: "Daniel in Babylon",
    description: "Daniel and friends are taken captive to Babylon and rise to prominence through faithfulness.",
    timelineEvents: [
      { year: "605 BC", event: "Daniel taken captive to Babylon" },
      { year: "604 BC", event: "Nebuchadnezzar's dream of the great statue" },
      { year: "~600 BC", event: "Shadrach, Meshach & Abednego in the fiery furnace" },
    ],
  },
  // MATTHEW
  {
    book: "Matthew",
    chapters: [1, 2],
    type: "map",
    title: "Birth of Jesus",
    description: "Jesus is born in Bethlehem, visited by wise men, and the family flees to Egypt.",
    details: [
      "🏘️ Nazareth — home of Mary and Joseph",
      "⭐ Bethlehem — birthplace of Jesus (5 miles south of Jerusalem)",
      "🏛️ Jerusalem — Herod's palace, wise men visit",
      "🐫 The East — origin of the Magi (possibly Persia)",
      "🇪🇬 Egypt — family flees Herod's massacre",
    ],
  },
  {
    book: "Matthew",
    chapters: [5, 6, 7],
    type: "info",
    title: "The Sermon on the Mount",
    description: "Jesus' most famous teaching, delivered on a hillside near Capernaum, covering the Beatitudes, Lord's Prayer, and the Golden Rule.",
    details: [
      "📍 Likely the hills near Capernaum, by the Sea of Galilee",
      "🙏 Contains the Lord's Prayer (Matthew 6:9-13)",
      "💛 The Golden Rule: 'Do unto others...' (Matthew 7:12)",
      "⛰️ 'Blessed are the poor in spirit...' — the Beatitudes",
    ],
  },
  {
    book: "Matthew",
    chapters: [26, 27, 28],
    type: "timeline",
    title: "Passion, Death & Resurrection",
    description: "The final events of Jesus' earthly ministry from the Last Supper to the Resurrection.",
    timelineEvents: [
      { year: "Thursday", event: "Last Supper in the Upper Room" },
      { year: "Thursday night", event: "Agony in Garden of Gethsemane; arrest" },
      { year: "Friday AM", event: "Trial before Pilate" },
      { year: "Friday ~9AM", event: "Crucifixion at Golgotha" },
      { year: "Friday ~3PM", event: "Jesus dies; temple veil torn" },
      { year: "Friday evening", event: "Buried in Joseph of Arimathea's tomb" },
      { year: "Sunday", event: "Resurrection — the empty tomb" },
    ],
  },
  // LUKE
  {
    book: "Luke",
    chapters: [2],
    type: "info",
    title: "The Nativity",
    description: "Luke's detailed account of Jesus' birth — the census, the manger, the shepherds, and the angels.",
    details: [
      "📜 Roman census under Caesar Augustus brought Mary & Joseph to Bethlehem",
      "🐑 Shepherds in the fields first hear the angelic announcement",
      "👼 'Glory to God in the highest, and on earth peace'",
      "🏛️ Baby Jesus presented at the Temple; Simeon's prophecy",
    ],
  },
  // JOHN
  {
    book: "John",
    chapters: [1],
    type: "info",
    title: "The Word Made Flesh",
    description: "John's Gospel opens with a cosmic prologue: Jesus is the eternal Word (Logos) through whom all things were made.",
    details: [
      "📖 'In the beginning was the Word' — echoes Genesis 1:1",
      "💡 'The light shines in the darkness, and the darkness has not overcome it'",
      "🕊️ John the Baptist testifies about the coming Messiah",
      "👥 First disciples called: Andrew, Simon Peter, Philip, Nathanael",
    ],
  },
  // ACTS
  {
    book: "Acts",
    chapters: [1, 2],
    type: "timeline",
    title: "Birth of the Church",
    description: "Jesus ascends to heaven, and the Holy Spirit descends at Pentecost, birthing the early Church.",
    timelineEvents: [
      { year: "Day 1", event: "Jesus ascends from the Mount of Olives" },
      { year: "Day 10", event: "Pentecost — Holy Spirit descends like fire" },
      { year: "Day 10", event: "Peter's sermon; 3,000 baptized" },
    ],
  },
  {
    book: "Acts",
    chapters: [9],
    type: "map",
    title: "Paul's Conversion",
    description: "Saul (Paul) encounters the risen Christ on the road to Damascus and is transformed from persecutor to apostle.",
    details: [
      "🏛️ Jerusalem — Saul receives letters to arrest Christians",
      "🛤️ Road to Damascus — blinding light and Jesus' voice",
      "🏠 Straight Street, Damascus — Ananias restores Saul's sight",
      "🌍 This begins Paul's world-changing missionary journeys",
    ],
  },
  {
    book: "Acts",
    chapters: [13, 14],
    type: "map",
    title: "Paul's First Missionary Journey",
    description: "Paul and Barnabas travel through Cyprus and Asia Minor spreading the Gospel.",
    details: [
      "⛵ Antioch (Syria) — sending church",
      "🏝️ Cyprus — Sergius Paulus converted",
      "🏔️ Pisidian Antioch — Paul's synagogue sermon",
      "🏛️ Iconium, Lystra, Derbe — churches planted amid persecution",
    ],
  },
  // REVELATION
  {
    book: "Revelation",
    chapters: [1, 2, 3],
    type: "map",
    title: "The Seven Churches of Asia",
    description: "Jesus dictates letters to seven churches in modern-day Turkey, each with specific commendations and warnings.",
    details: [
      "1️⃣ Ephesus — lost their first love",
      "2️⃣ Smyrna — faithful under persecution",
      "3️⃣ Pergamum — where Satan's throne is",
      "4️⃣ Thyatira — tolerating false teaching",
      "5️⃣ Sardis — dead but thought alive",
      "6️⃣ Philadelphia — open door no one can shut",
      "7️⃣ Laodicea — lukewarm, neither hot nor cold",
    ],
  },
  {
    book: "Revelation",
    chapters: [21, 22],
    type: "info",
    title: "The New Heaven & New Earth",
    description: "God creates a new heaven and earth. The New Jerusalem descends — no more death, mourning, or pain.",
    details: [
      "🏙️ New Jerusalem: ~1,400 miles cubed",
      "💎 12 gates of pearl, streets of gold",
      "🌊 River of life flowing from God's throne",
      "🌳 Tree of life bearing 12 kinds of fruit",
      "☀️ No sun needed — God's glory is the light",
    ],
  },
];

/**
 * Index bibleContextData by lowercase book name once at module load.
 * Looking up `getContextForReading` is hit on every ReadingPage render,
 * so filtering the full array on every call would be wasteful.
 */
const contextByBook: Map<string, BibleContextEntry[]> = (() => {
  const map = new Map<string, BibleContextEntry[]>();
  for (const entry of bibleContextData) {
    const key = entry.book.toLowerCase();
    const bucket = map.get(key);
    if (bucket) bucket.push(entry);
    else map.set(key, [entry]);
  }
  return map;
})();

/**
 * Get context entries relevant to the current reading
 */
export function getContextForReading(bookName: string, chapter: number): BibleContextEntry[] {
  const bucket = contextByBook.get(bookName.toLowerCase());
  if (!bucket) return [];
  return bucket.filter((entry) => (entry.chapters ? entry.chapters.includes(chapter) : true));
}
