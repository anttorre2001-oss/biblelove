export interface TheologyConcept {
  term: string;
  definition: string;
  relatedVerses: string[];
}

export interface ChapterTheology {
  book: string;
  chapter: number;
  title: string;
  summary: string;
  keyThemes: string[];
  theologicalConcepts: TheologyConcept[];
  crossReferences: { reference: string; connection: string }[];
  historicalContext: string;
  applicationQuestions: string[];
}

export interface BookIntro {
  book: string;
  author: string;
  dateWritten: string;
  audience: string;
  genre: string;
  outline: string[];
  keyThemes: string[];
  theologicalSignificance: string;
  christConnection: string; // How this book points to Christ
}

export const bookIntros: BookIntro[] = [
  {
    book: "Genesis",
    author: "Moses (traditionally attributed)",
    dateWritten: "~1450-1410 BC",
    audience: "The nation of Israel preparing to enter the Promised Land",
    genre: "Narrative, Poetry, Genealogy",
    outline: [
      "Primeval History (Ch. 1-11): Creation, Fall, Flood, Babel",
      "Abraham's Story (Ch. 12-25): Call, covenant, faith tested",
      "Isaac & Jacob (Ch. 25-36): Birthright, blessing, wrestling with God",
      "Joseph in Egypt (Ch. 37-50): Betrayal, providence, reconciliation",
    ],
    keyThemes: ["Creation & sovereignty of God", "Sin and its consequences", "Covenant & promise", "Providence & redemption", "Faith & obedience"],
    theologicalSignificance: "Genesis establishes the foundational theology of Scripture: God as Creator, the nature of humanity as image-bearers, the origin of sin, the promise of redemption (protoevangelium in 3:15), and God's covenant relationship with His people through Abraham.",
    christConnection: "The 'seed of the woman' (3:15) who will crush the serpent's head. Abraham's promised seed through whom all nations will be blessed (12:3). Joseph as a type of Christ — rejected by brothers, exalted to save many.",
  },
  {
    book: "Exodus",
    author: "Moses",
    dateWritten: "~1450-1410 BC",
    audience: "Israel, delivered from Egypt",
    genre: "Historical Narrative, Law",
    outline: [
      "Bondage in Egypt (Ch. 1-12): Oppression, plagues, Passover",
      "The Exodus & Wilderness (Ch. 13-18): Red Sea, provision",
      "The Law at Sinai (Ch. 19-24): Ten Commandments, covenant",
      "The Tabernacle (Ch. 25-40): God dwelling among His people",
    ],
    keyThemes: ["Redemption & deliverance", "The Passover lamb", "God's holiness & law", "God's presence (tabernacle)", "Covenant faithfulness"],
    theologicalSignificance: "Exodus reveals God as Redeemer. The Passover is the central Old Testament picture of salvation — an innocent lamb dies so that judgment passes over. The giving of the Law reveals God's holy character. The tabernacle shows God's desire to dwell among His people.",
    christConnection: "Jesus is the true Passover Lamb (1 Cor 5:7). He is the better Moses who leads His people from slavery to sin. He is the true tabernacle — 'the Word became flesh and dwelt (tabernacled) among us' (John 1:14).",
  },
  {
    book: "Psalms",
    author: "David (73), Asaph, Sons of Korah, Moses, Solomon, others",
    dateWritten: "~1440-430 BC (spanning ~1,000 years)",
    audience: "Israel — used in temple worship and personal devotion",
    genre: "Hebrew Poetry, Hymns, Laments, Wisdom",
    outline: [
      "Book I (Ps 1-41): David's personal psalms, trust & lament",
      "Book II (Ps 42-72): National psalms, David & sons of Korah",
      "Book III (Ps 73-89): Asaph psalms, crisis of faith",
      "Book IV (Ps 90-106): Kingship of God, Moses' prayer",
      "Book V (Ps 107-150): Praise, pilgrimage psalms, Hallelujah",
    ],
    keyThemes: ["Worship & praise", "Lament & suffering", "God's kingship", "Trust in adversity", "The Messiah", "Creation & providence"],
    theologicalSignificance: "The Psalms are the prayer book and hymnal of God's people. They teach us the full range of human emotion before God — from ecstatic praise to agonizing lament. They reveal a theology of honest relationship with God where every feeling is brought into His presence.",
    christConnection: "Messianic psalms prophecy Christ's suffering (Ps 22), resurrection (Ps 16), eternal kingship (Ps 2, 110), and betrayal (Ps 41:9). Jesus himself quoted the Psalms more than any other book.",
  },
  {
    book: "Matthew",
    author: "Matthew (Levi), tax collector turned apostle",
    dateWritten: "~AD 55-65",
    audience: "Jewish Christians, demonstrating Jesus as the promised Messiah",
    genre: "Gospel, Narrative",
    outline: [
      "Birth & Preparation (Ch. 1-4): Genealogy, birth, baptism, temptation",
      "Sermon on the Mount (Ch. 5-7): Kingdom ethics",
      "Miracles & Ministry (Ch. 8-12): Authority demonstrated",
      "Parables of the Kingdom (Ch. 13): Mysteries revealed",
      "Conflict & Teaching (Ch. 14-25): Opposition, eschatology",
      "Passion & Resurrection (Ch. 26-28): Cross and empty tomb",
    ],
    keyThemes: ["Jesus as King & Messiah", "Kingdom of Heaven", "Fulfillment of Old Testament", "Discipleship", "Judgment & mercy"],
    theologicalSignificance: "Matthew bridges the Old and New Testaments, showing Jesus as the fulfillment of Israel's hopes. His fivefold discourse structure mirrors the Torah, presenting Jesus as the new Moses who gives the definitive interpretation of God's law.",
    christConnection: "Jesus is presented as the son of David, son of Abraham — the King who fulfills every messianic prophecy. The Great Commission (28:18-20) reveals his universal authority.",
  },
  {
    book: "John",
    author: "John the Apostle, 'the disciple whom Jesus loved'",
    dateWritten: "~AD 85-95",
    audience: "Both Jews and Gentiles — a universal Gospel",
    genre: "Theological Gospel, Narrative",
    outline: [
      "Prologue (Ch. 1): The Word made flesh",
      "Book of Signs (Ch. 2-12): Seven miraculous signs",
      "Book of Glory (Ch. 13-20): Upper Room, cross, resurrection",
      "Epilogue (Ch. 21): Restoration of Peter, final commission",
    ],
    keyThemes: ["Jesus as divine Son of God", "Belief and eternal life", "Seven 'I AM' statements", "The Holy Spirit", "Light vs. darkness", "Love"],
    theologicalSignificance: "John presents the highest Christology of the Gospels — Jesus is the eternal Word (Logos), fully God, who became flesh. The seven 'I AM' statements echo God's self-revelation to Moses, claiming divine identity. John's purpose is explicitly theological: 'that you may believe' (20:31).",
    christConnection: "Jesus IS God incarnate. The seven I AMs: Bread of Life, Light of the World, Door, Good Shepherd, Resurrection & Life, Way/Truth/Life, True Vine.",
  },
  {
    book: "Romans",
    author: "Paul the Apostle",
    dateWritten: "~AD 57",
    audience: "The church in Rome — mixed Jewish & Gentile believers",
    genre: "Epistle, Systematic Theological Treatise",
    outline: [
      "The Problem: Universal Sin (Ch. 1-3): All have sinned",
      "The Solution: Justification by Faith (Ch. 3-5): Grace through faith",
      "The Power: Sanctification (Ch. 6-8): Freedom, Spirit, glory",
      "The Plan: Israel & the Church (Ch. 9-11): Sovereignty & mercy",
      "The Practice: Christian Living (Ch. 12-16): Transformed lives",
    ],
    keyThemes: ["Justification by faith alone", "Grace", "The righteousness of God", "Union with Christ", "The Holy Spirit", "God's sovereignty"],
    theologicalSignificance: "Romans is the most systematic presentation of Christian theology in Scripture. It lays out the entire gospel: humanity's sin, God's righteousness, justification by faith, sanctification by the Spirit, and the hope of glory. Romans 8 is considered by many the greatest chapter in the Bible.",
    christConnection: "Christ is the propitiation for sin (3:25), the one who died and rose for justification (4:25), the one in whom we are united (6:1-11), and the one from whose love nothing can separate us (8:35-39).",
  },
  {
    book: "Revelation",
    author: "John the Apostle (from exile on Patmos)",
    dateWritten: "~AD 95",
    audience: "Seven churches in Asia Minor; the universal church",
    genre: "Apocalyptic Literature, Prophecy, Letter",
    outline: [
      "Vision of Christ (Ch. 1): The glorified Lord",
      "Letters to Seven Churches (Ch. 2-3): Commendation & warning",
      "Throne Room & Seals (Ch. 4-7): Worship & judgment",
      "Trumpets & Signs (Ch. 8-14): Cosmic conflict",
      "Bowls of Wrath (Ch. 15-16): Final judgments",
      "Fall of Babylon & Return of Christ (Ch. 17-20): Victory",
      "New Creation (Ch. 21-22): New heaven, new earth, eternal life",
    ],
    keyThemes: ["Sovereignty of God", "The Lamb who was slain", "Spiritual warfare", "Final judgment", "Hope & perseverance", "New creation"],
    theologicalSignificance: "Revelation is the climax of the biblical story — the ultimate triumph of God over evil. Written to persecuted Christians, it assures believers that despite present suffering, God is on the throne and Christ will return to make all things new.",
    christConnection: "Jesus is the Alpha and Omega, the Lion of Judah who is also the Lamb, the Faithful Witness, the King of Kings who returns in glory to reign forever.",
  },
];

export const chapterTheology: ChapterTheology[] = [
  // GENESIS
  {
    book: "Genesis", chapter: 1, title: "Creation: God Speaks the World into Being",
    summary: "God creates the heavens and the earth in six days through His spoken word, ordering chaos into beauty and declaring it 'very good.'",
    keyThemes: ["God's sovereignty", "Creation by word", "Order from chaos", "Goodness of creation"],
    theologicalConcepts: [
      { term: "Imago Dei", definition: "Humanity made in God's image — bearing His likeness in rationality, morality, creativity, and relational capacity. This is the basis of human dignity and worth.", relatedVerses: ["Genesis 1:26-27", "Genesis 9:6", "James 3:9"] },
      { term: "Creation ex nihilo", definition: "God created everything from nothing — not from pre-existing material. This distinguishes biblical theology from ancient Near Eastern creation myths.", relatedVerses: ["Genesis 1:1", "Hebrews 11:3", "Romans 4:17"] },
      { term: "Dominion Mandate", definition: "Humanity is given authority to steward and cultivate creation as God's representatives on earth.", relatedVerses: ["Genesis 1:28", "Psalm 8:6-8"] },
    ],
    crossReferences: [
      { reference: "John 1:1-3", connection: "Christ as the Word through whom all things were made" },
      { reference: "Colossians 1:15-17", connection: "All things created through and for Christ" },
      { reference: "Hebrews 11:3", connection: "By faith we understand the universe was created by God's word" },
    ],
    historicalContext: "Ancient Near Eastern cultures had their own creation stories (Enuma Elish, Atrahasis) featuring warring gods creating humans as slaves. Genesis stands in stark contrast: one sovereign God creates with purpose, love, and order, making humanity as honored image-bearers.",
    applicationQuestions: ["How does being made in God's image affect how you see yourself and others?", "What does it mean to be a steward of creation in your daily life?", "How does God bringing order from chaos encourage you in uncertain times?"],
  },
  {
    book: "Genesis", chapter: 2, title: "Eden: God's Intimate Design",
    summary: "A closer look at the creation of man from dust, the planting of Eden, and the creation of woman — revealing God's intimate, personal care.",
    keyThemes: ["God's personal care", "Work as gift", "Marriage", "Human relationships"],
    theologicalConcepts: [
      { term: "Covenant of Works", definition: "Some theologians see God's command regarding the tree as a covenant arrangement — obedience brings blessing, disobedience brings death.", relatedVerses: ["Genesis 2:16-17", "Hosea 6:7", "Romans 5:12-14"] },
      { term: "Ezer Kenegdo", definition: "Hebrew for 'helper corresponding to him' — the woman is not subordinate but a powerful ally and equal partner, the same word used of God himself as Israel's 'helper.'", relatedVerses: ["Genesis 2:18", "Psalm 121:1-2", "Psalm 33:20"] },
    ],
    crossReferences: [
      { reference: "Ephesians 5:31-32", connection: "Marriage as a picture of Christ and the Church" },
      { reference: "Revelation 22:1-2", connection: "The river and tree of life restored in the new creation" },
    ],
    historicalContext: "The Garden of Eden is described with geographical markers (Tigris, Euphrates) placing it in ancient Mesopotamia. The garden-temple motif — God walking with humanity — foreshadows tabernacle and temple theology.",
    applicationQuestions: ["How does God's hands-on creation of humanity affect your understanding of your worth?", "What does the institution of marriage in Eden teach about God's design for relationships?"],
  },
  {
    book: "Genesis", chapter: 3, title: "The Fall: Sin Enters the World",
    summary: "The serpent deceives Eve, Adam and Eve disobey God, and sin enters the human race — bringing shame, broken relationships, and death. Yet God provides the first promise of redemption.",
    keyThemes: ["Temptation", "Sin and shame", "Broken communion", "Promise of redemption"],
    theologicalConcepts: [
      { term: "Protoevangelium", definition: "The 'first gospel' — Genesis 3:15's promise that the seed of the woman will crush the serpent's head. This is the first messianic prophecy, pointing to Christ's victory over Satan.", relatedVerses: ["Genesis 3:15", "Romans 16:20", "Revelation 12:9"] },
      { term: "Original Sin", definition: "The doctrine that Adam's sin brought guilt and a sin nature upon all humanity. We sin because we are sinners by nature, not merely by choice.", relatedVerses: ["Genesis 3:6-7", "Romans 5:12", "Psalm 51:5"] },
      { term: "Federal Headship", definition: "Adam acted as representative head of all humanity — his fall affected all. Christ, the 'last Adam,' is the new representative head whose obedience brings life.", relatedVerses: ["Romans 5:18-19", "1 Corinthians 15:22", "1 Corinthians 15:45"] },
    ],
    crossReferences: [
      { reference: "Romans 5:12-21", connection: "Adam and Christ compared — sin and grace" },
      { reference: "1 Corinthians 15:21-22", connection: "Death through Adam, life through Christ" },
      { reference: "Revelation 20:2", connection: "The ancient serpent finally defeated" },
    ],
    historicalContext: "The serpent in ancient Near Eastern symbolism was associated with chaos and evil. The consequences of the fall — toil, pain, relational conflict, death — describe the world as we experience it, explaining why things are 'not the way they're supposed to be.'",
    applicationQuestions: ["Where do you see the pattern of temptation (doubt God's word, desire what's forbidden, disobey) in your own life?", "How does the protoevangelium (3:15) give you hope even in the darkest chapters of the Bible?", "What does God making garments for Adam and Eve (3:21) reveal about His character?"],
  },
  // MATTHEW
  {
    book: "Matthew", chapter: 5, title: "The Sermon on the Mount: Kingdom Ethics",
    summary: "Jesus begins his most famous sermon with the Beatitudes — radical blessings that invert worldly values — then reinterprets the Law with divine authority.",
    keyThemes: ["Kingdom values", "True righteousness", "Law fulfilled", "Heart transformation"],
    theologicalConcepts: [
      { term: "The Beatitudes", definition: "Eight declarations of blessedness that describe citizens of God's kingdom. They are not moral achievements to earn but descriptions of those transformed by grace.", relatedVerses: ["Matthew 5:3-12", "Luke 6:20-26", "Isaiah 61:1-3"] },
      { term: "Fulfillment of the Law", definition: "Jesus did not come to abolish the Law but to fulfill it — bringing out its deepest intention. Murder is traced to anger, adultery to lust. The Law's demand is ultimately met only in Christ.", relatedVerses: ["Matthew 5:17-20", "Romans 10:4", "Romans 8:3-4"] },
    ],
    crossReferences: [
      { reference: "Deuteronomy 18:15", connection: "The prophet like Moses — Jesus teaches from the mountain as Moses received law on Sinai" },
      { reference: "Romans 8:3-4", connection: "What the law could not do, God did through Christ" },
    ],
    historicalContext: "First-century rabbis debated the meaning of Torah. Jesus' formula 'You have heard it said... but I say to you' was unprecedented — no rabbi claimed authority over the Law itself. Jesus speaks not as an interpreter but as the Lawgiver.",
    applicationQuestions: ["Which Beatitude most challenges your current values?", "How does Jesus' teaching on anger and lust change your understanding of 'keeping the commandments'?", "What does it mean practically to be 'salt and light' in your context?"],
  },
  {
    book: "Matthew", chapter: 6, title: "Secret Devotion & Kingdom Priorities",
    summary: "Jesus teaches on prayer (including the Lord's Prayer), fasting, and trusting God for provision rather than pursuing earthly treasure.",
    keyThemes: ["Authentic worship", "Prayer", "Trust vs. anxiety", "Eternal treasure"],
    theologicalConcepts: [
      { term: "The Lord's Prayer", definition: "A model prayer given by Jesus that encompasses adoration ('hallowed be your name'), submission ('your kingdom come'), dependence ('daily bread'), confession ('forgive us'), and protection ('deliver us from evil').", relatedVerses: ["Matthew 6:9-13", "Luke 11:2-4"] },
      { term: "Mammon", definition: "An Aramaic word for wealth/possessions personified as a rival master. Jesus declares it impossible to serve both God and Mammon — one must choose.", relatedVerses: ["Matthew 6:24", "Luke 16:13", "1 Timothy 6:10"] },
    ],
    crossReferences: [
      { reference: "Philippians 4:6-7", connection: "Don't be anxious — bring everything to God in prayer" },
      { reference: "Colossians 3:1-2", connection: "Set your mind on things above, not earthly things" },
    ],
    historicalContext: "Public displays of piety were common in first-century Judaism and Greco-Roman religion. Jesus challenges the 'performance' of religion, emphasizing that true devotion is before God alone — 'your Father who sees in secret.'",
    applicationQuestions: ["Is your spiritual life more about public image or private devotion?", "What are you anxious about right now? How does Jesus' teaching on God's provision speak to that?", "Where might 'mammon' be competing with God for your loyalty?"],
  },
  // JOHN
  {
    book: "John", chapter: 1, title: "The Word Made Flesh",
    summary: "John's Gospel opens with a cosmic prologue declaring Jesus as the eternal Word (Logos) — God himself — who created all things and became flesh to reveal the Father.",
    keyThemes: ["Deity of Christ", "Incarnation", "Light and darkness", "Grace and truth"],
    theologicalConcepts: [
      { term: "Logos (The Word)", definition: "Greek philosophical term for the rational principle governing the universe. John radically redefines it: the Logos is not an abstract force but a Person — the pre-existent Son of God who became human.", relatedVerses: ["John 1:1-3", "John 1:14", "1 John 1:1", "Revelation 19:13"] },
      { term: "Incarnation", definition: "The eternal Son of God took on full human nature without ceasing to be God — 'the Word became flesh.' This is the central miracle of Christianity.", relatedVerses: ["John 1:14", "Philippians 2:6-8", "1 Timothy 3:16", "Hebrews 2:14"] },
      { term: "Prevenient Grace", definition: "The 'true light that gives light to everyone' — God's initiative in reaching humanity before they seek Him.", relatedVerses: ["John 1:9", "John 6:44", "Titus 2:11"] },
    ],
    crossReferences: [
      { reference: "Genesis 1:1", connection: "'In the beginning' — John deliberately echoes Genesis, placing Jesus at creation" },
      { reference: "Colossians 1:15-20", connection: "The supremacy of Christ as Creator and sustainer" },
      { reference: "Hebrews 1:1-3", connection: "God has spoken through His Son, the exact imprint of His nature" },
    ],
    historicalContext: "John likely wrote from Ephesus around AD 90. The concept of Logos would resonate with both Jewish readers (God's creative Word in Genesis, God's Wisdom in Proverbs 8) and Greek readers (Stoic philosophy's rational governing principle). John masterfully bridges both worlds.",
    applicationQuestions: ["What does it mean that the Creator of the universe 'became flesh and dwelt among us'?", "John says Jesus is 'full of grace AND truth' — how do you hold both together?", "How does 'the true light that gives light to everyone' challenge spiritual elitism?"],
  },
  // ROMANS
  {
    book: "Romans", chapter: 8, title: "Life in the Spirit — The Greatest Chapter",
    summary: "Paul soars from 'no condemnation' to 'nothing can separate us from God's love' — the summit of Christian theology. The Spirit empowers, intercedes, and guarantees our glory.",
    keyThemes: ["No condemnation", "Life in the Spirit", "Adoption as children", "Suffering and glory", "Inseparable love"],
    theologicalConcepts: [
      { term: "No Condemnation", definition: "Those united to Christ face no divine judgment — not because they are sinless but because Christ bore the condemnation in their place.", relatedVerses: ["Romans 8:1", "Romans 5:1", "John 5:24"] },
      { term: "Adoption (Huiothesia)", definition: "Believers are not merely forgiven servants but adopted children of God with full inheritance rights, crying 'Abba, Father' through the Spirit.", relatedVerses: ["Romans 8:15-17", "Galatians 4:4-7", "Ephesians 1:5"] },
      { term: "Glorification", definition: "The final step of salvation — the complete transformation of believers into Christ's image, including resurrection bodies. It is so certain Paul writes it in past tense.", relatedVerses: ["Romans 8:30", "Philippians 3:21", "1 John 3:2"] },
      { term: "Providence (Romans 8:28)", definition: "'All things work together for good' — not that everything is good, but that God sovereignly orchestrates even suffering and evil toward the ultimate good of conforming believers to Christ's image.", relatedVerses: ["Romans 8:28-29", "Genesis 50:20", "Ephesians 1:11"] },
    ],
    crossReferences: [
      { reference: "John 10:28-29", connection: "No one can snatch believers from God's hand" },
      { reference: "Ephesians 1:13-14", connection: "The Spirit as guarantee of our inheritance" },
      { reference: "Revelation 21:3-4", connection: "The final fulfillment — no more death, mourning, or pain" },
    ],
    historicalContext: "Roman Christians faced social ostracism and growing persecution. Paul's declaration that nothing — not tribulation, persecution, famine, nakedness, danger, or sword — can separate them from Christ's love was not abstract theology but steel for their suffering.",
    applicationQuestions: ["What does 'no condemnation' mean for your guilt and shame today?", "How does the Spirit's intercession (8:26-27) comfort you when you don't know how to pray?", "Paul lists extreme trials (v.35) — what would you add from your own life? How does the promise hold?"],
  },
];

// Helper to get theology for a specific book+chapter
export function getChapterTheology(book: string, chapter: number): ChapterTheology | undefined {
  return chapterTheology.find(
    (t) => t.book.toLowerCase() === book.toLowerCase() && t.chapter === chapter
  );
}

export function getBookIntro(book: string): BookIntro | undefined {
  return bookIntros.find((b) => b.book.toLowerCase() === book.toLowerCase());
}
