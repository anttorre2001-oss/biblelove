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
  christConnection: string;
}

export const bookIntros: BookIntro[] = [
  // ──── OLD TESTAMENT ────
  {
    book: "Genesis", author: "Moses (traditionally attributed)", dateWritten: "~1450-1410 BC",
    audience: "The nation of Israel preparing to enter the Promised Land", genre: "Narrative, Poetry, Genealogy",
    outline: ["Primeval History (Ch. 1-11): Creation, Fall, Flood, Babel","Abraham's Story (Ch. 12-25): Call, covenant, faith tested","Isaac & Jacob (Ch. 25-36): Birthright, blessing, wrestling with God","Joseph in Egypt (Ch. 37-50): Betrayal, providence, reconciliation"],
    keyThemes: ["Creation & sovereignty of God","Sin and its consequences","Covenant & promise","Providence & redemption","Faith & obedience"],
    theologicalSignificance: "Genesis establishes the foundational theology of Scripture: God as Creator, the nature of humanity as image-bearers, the origin of sin, the promise of redemption (protoevangelium in 3:15), and God's covenant relationship with His people through Abraham.",
    christConnection: "The 'seed of the woman' (3:15) who will crush the serpent's head. Abraham's promised seed through whom all nations will be blessed (12:3). Joseph as a type of Christ — rejected by brothers, exalted to save many.",
  },
  {
    book: "Exodus", author: "Moses", dateWritten: "~1450-1410 BC",
    audience: "Israel, delivered from Egypt", genre: "Historical Narrative, Law",
    outline: ["Bondage in Egypt (Ch. 1-12): Oppression, plagues, Passover","The Exodus & Wilderness (Ch. 13-18): Red Sea, provision","The Law at Sinai (Ch. 19-24): Ten Commandments, covenant","The Tabernacle (Ch. 25-40): God dwelling among His people"],
    keyThemes: ["Redemption & deliverance","The Passover lamb","God's holiness & law","God's presence (tabernacle)","Covenant faithfulness"],
    theologicalSignificance: "Exodus reveals God as Redeemer. The Passover is the central Old Testament picture of salvation — an innocent lamb dies so that judgment passes over. The giving of the Law reveals God's holy character. The tabernacle shows God's desire to dwell among His people.",
    christConnection: "Jesus is the true Passover Lamb (1 Cor 5:7). He is the better Moses who leads His people from slavery to sin. He is the true tabernacle — 'the Word became flesh and dwelt (tabernacled) among us' (John 1:14).",
  },
  {
    book: "Leviticus", author: "Moses", dateWritten: "~1445-1405 BC",
    audience: "Israel at Mount Sinai", genre: "Law, Ritual Instruction",
    outline: ["Laws of Sacrifice (Ch. 1-7): Burnt, grain, peace, sin, guilt offerings","Priesthood Established (Ch. 8-10): Aaron's consecration","Clean & Unclean (Ch. 11-15): Purity laws","Day of Atonement (Ch. 16): The heart of Leviticus","Holiness Code (Ch. 17-27): 'Be holy, for I am holy'"],
    keyThemes: ["Holiness of God","Atonement through sacrifice","Mediation through priesthood","Clean and unclean","God dwelling among His people"],
    theologicalSignificance: "Leviticus answers: How can a holy God dwell among sinful people? Through sacrifice, priesthood, and purity. The Day of Atonement (Ch. 16) is the theological center — the scapegoat bearing sins away foreshadows Christ.",
    christConnection: "Every sacrifice points to Christ's once-for-all offering (Heb 10:10). The high priest entering the Holy of Holies foreshadows Christ's heavenly intercession. 'Be holy' finds fulfillment in believers made holy through Christ.",
  },
  {
    book: "Numbers", author: "Moses", dateWritten: "~1405 BC",
    audience: "Israel in the wilderness", genre: "Historical Narrative, Law, Census",
    outline: ["At Sinai: Preparation (Ch. 1-10)","Wilderness Wandering (Ch. 11-25): Rebellion and judgment","New Generation Preparation (Ch. 26-36): Hope renewed"],
    keyThemes: ["God's faithfulness despite human unfaithfulness","Consequences of unbelief","Wandering and discipline","God's provision in the wilderness"],
    theologicalSignificance: "Numbers shows the cost of unbelief — an entire generation died in the wilderness because they refused to trust God (Ch. 13-14). Yet God's purposes cannot be thwarted; He raises up a new generation.",
    christConnection: "The bronze serpent lifted up (21:8-9) is a direct type of Christ on the cross (John 3:14). Christ is the rock that gives water (1 Cor 10:4). Balaam's prophecy of the 'star out of Jacob' (24:17) points to Christ.",
  },
  {
    book: "Deuteronomy", author: "Moses", dateWritten: "~1405 BC",
    audience: "The new generation of Israel on the edge of the Promised Land", genre: "Covenant Renewal, Sermons, Law",
    outline: ["Moses' First Speech (Ch. 1-4): Historical review","Moses' Second Speech (Ch. 5-26): The Law restated and expanded","Blessings & Curses (Ch. 27-28): Covenant consequences","Moses' Final Words (Ch. 29-34): Succession, death of Moses"],
    keyThemes: ["Love and obey God wholeheartedly","Remember God's faithfulness","The Shema — 'Hear, O Israel'","Covenant blessings and curses","The promised Prophet to come"],
    theologicalSignificance: "Deuteronomy is Moses' farewell, urging Israel to love God with all their heart. The Shema (6:4-5) becomes the heartbeat of Jewish faith. Jesus called it the greatest commandment (Matt 22:37).",
    christConnection: "Jesus is the Prophet like Moses (18:15-18, Acts 3:22). He perfectly kept the covenant that Israel could not. He quoted Deuteronomy to defeat Satan's temptations (Matt 4).",
  },
  {
    book: "Joshua", author: "Joshua (with later editorial additions)", dateWritten: "~1400-1370 BC",
    audience: "Israel entering Canaan", genre: "Historical Narrative, Military",
    outline: ["Entering the Land (Ch. 1-5): Jordan crossing, Jericho","Conquest (Ch. 6-12): Battles and victories","Land Distribution (Ch. 13-21): Tribal allotments","Joshua's Farewell (Ch. 22-24): 'Choose this day whom you will serve'"],
    keyThemes: ["God's faithfulness to His promises","Holy war and divine judgment","Faith and obedience","Rest in the Promised Land"],
    theologicalSignificance: "Joshua demonstrates God's faithfulness — every promise made to Abraham regarding the land is fulfilled. The conquest also reveals God's holiness in judging the wickedness of the Canaanite nations.",
    christConnection: "Joshua (Yeshua) shares Jesus' name and mission: leading God's people into rest (Heb 4:8-9). Rahab the outsider saved by faith prefigures Gentile inclusion. The ark leading into Jordan pictures Christ going before us through death.",
  },
  {
    book: "Judges", author: "Possibly Samuel", dateWritten: "~1050-1000 BC",
    audience: "Israel in the period before the monarchy", genre: "Historical Narrative",
    outline: ["Incomplete Conquest (Ch. 1-2)","The Cycle of Judges (Ch. 3-16): Sin → oppression → cry → deliverance","Moral Decay (Ch. 17-21): 'Everyone did what was right in his own eyes'"],
    keyThemes: ["The downward spiral of sin","God's patience and deliverance","Human need for godly leadership","Grace despite unfaithfulness"],
    theologicalSignificance: "Judges reveals the bankruptcy of human autonomy — 'everyone did what was right in his own eyes' (21:25). The repeated cycle of sin-judgment-deliverance shows humanity's need for a permanent Savior-King.",
    christConnection: "Each judge is a partial, flawed deliverer pointing to the need for the true and perfect Deliverer. The refrain 'no king in Israel' creates longing for the ultimate King — Christ.",
  },
  {
    book: "Ruth", author: "Unknown (possibly Samuel)", dateWritten: "~1000 BC",
    audience: "Israel", genre: "Narrative, Romance",
    outline: ["Loss and Loyalty (Ch. 1): Naomi and Ruth","Providence at Work (Ch. 2): Gleaning in Boaz's field","The Threshing Floor (Ch. 3): Ruth's bold request","Redemption (Ch. 4): Boaz as kinsman-redeemer"],
    keyThemes: ["Loyal love (hesed)","Kinsman-redeemer","Providence","Inclusion of Gentiles"],
    theologicalSignificance: "Ruth is a jewel of hesed (covenant loyalty/love) set against the dark backdrop of Judges. It shows God's providence working through ordinary faithfulness and His welcome of Gentiles into His covenant family.",
    christConnection: "Boaz as kinsman-redeemer is a beautiful type of Christ who redeems His bride. Ruth the Moabite in Christ's genealogy (Matt 1:5) shows salvation extends beyond Israel.",
  },
  {
    book: "1 Samuel", author: "Samuel, Nathan, Gad (1 Chr 29:29)", dateWritten: "~1050-900 BC",
    audience: "Israel during the transition to monarchy", genre: "Historical Narrative",
    outline: ["Samuel the Prophet (Ch. 1-7)","Saul's Rise and Fall (Ch. 8-15)","David's Rise (Ch. 16-31): Anointing, Goliath, flight from Saul"],
    keyThemes: ["God's sovereignty over human kingdoms","The heart vs. outward appearance","Obedience over sacrifice","The anointed king (messiah)"],
    theologicalSignificance: "1 Samuel explores kingship — Israel demands a king 'like the nations,' but God's choice differs from man's. Saul looks the part but lacks heart; David is chosen because 'the LORD looks at the heart' (16:7).",
    christConnection: "David, the shepherd-king anointed by God, is the great type of Christ. His defeat of Goliath prefigures Christ's victory over the enemy. The Davidic line leads directly to Jesus.",
  },
  {
    book: "2 Samuel", author: "Unknown (Nathan, Gad likely)", dateWritten: "~930 BC",
    audience: "Israel", genre: "Historical Narrative",
    outline: ["David's Triumphs (Ch. 1-10): United kingdom, Davidic covenant","David's Failures (Ch. 11-20): Bathsheba, Absalom's rebellion","Appendix (Ch. 21-24): Psalms, mighty men"],
    keyThemes: ["The Davidic covenant","Sin and its consequences","Grace and restoration","God's sovereign plan"],
    theologicalSignificance: "2 Samuel contains the Davidic Covenant (Ch. 7) — God's promise of an eternal throne through David's line. This is the foundation for all messianic expectation. David's sin with Bathsheba shows even the 'man after God's heart' needs grace.",
    christConnection: "The Davidic Covenant (7:12-16) finds ultimate fulfillment in Christ's eternal kingdom. David's suffering and restoration foreshadow Christ's pattern of suffering before glory.",
  },
  {
    book: "1 Kings", author: "Unknown (possibly Jeremiah)", dateWritten: "~560 BC",
    audience: "Israel in exile", genre: "Historical Narrative",
    outline: ["Solomon's Reign (Ch. 1-11): Wisdom, temple, decline","Divided Kingdom (Ch. 12-16): Rehoboam vs. Jeroboam","Elijah the Prophet (Ch. 17-22): Confrontation with Baal worship"],
    keyThemes: ["Wisdom and folly","The temple as God's dwelling","Idolatry and its consequences","Prophetic confrontation"],
    theologicalSignificance: "1 Kings shows the glory and tragedy of Israel — Solomon's temple represents God dwelling among His people, but Solomon's idolatry leads to division. The prophetic ministry of Elijah demonstrates God's jealousy for true worship.",
    christConnection: "Solomon's wisdom points to Christ, 'in whom are hidden all the treasures of wisdom' (Col 2:3). The temple foreshadows Christ's body (John 2:19-21). Elijah prefigures John the Baptist who prepares the way for Christ.",
  },
  {
    book: "2 Kings", author: "Unknown (possibly Jeremiah)", dateWritten: "~560 BC",
    audience: "Israel in exile", genre: "Historical Narrative",
    outline: ["Elisha's Ministry (Ch. 1-8)","Kings of Israel & Judah (Ch. 9-17): Israel's fall (722 BC)","Judah Alone (Ch. 18-25): Hezekiah, Josiah, exile (586 BC)"],
    keyThemes: ["Consequences of covenant unfaithfulness","God's patience and warnings","The prophetic word","Exile as judgment"],
    theologicalSignificance: "2 Kings records the tragic end of both kingdoms due to persistent idolatry. Despite repeated prophetic warnings, Israel and Judah refuse to repent. Yet God preserves a remnant, keeping His covenant promise alive.",
    christConnection: "Elisha's miracles (healing, multiplying food, raising the dead) foreshadow Christ's ministry. The exile creates the longing for a Messiah who will restore the kingdom and bring God's people home.",
  },
  {
    book: "1 Chronicles", author: "Ezra (traditionally)", dateWritten: "~450-400 BC",
    audience: "Post-exilic Israel", genre: "Genealogy, Historical Narrative",
    outline: ["Genealogies (Ch. 1-9): Adam to the return from exile","David's Reign (Ch. 10-29): Temple preparations, worship"],
    keyThemes: ["Continuity of God's people","Worship and the temple","The Davidic line","God's faithfulness through generations"],
    theologicalSignificance: "Written for the post-exilic community, 1 Chronicles reaffirms God's covenant with David and emphasizes worship. The genealogies show that God's plan of redemption has continued through every generation.",
    christConnection: "The genealogies trace the messianic line. David's preparation for the temple points to Christ who builds the true temple — His church.",
  },
  {
    book: "2 Chronicles", author: "Ezra (traditionally)", dateWritten: "~450-400 BC",
    audience: "Post-exilic Israel", genre: "Historical Narrative",
    outline: ["Solomon's Temple (Ch. 1-9): Construction and dedication","Kings of Judah (Ch. 10-36): Faithfulness and failure, ending in exile"],
    keyThemes: ["Temple worship","Revival and reform","'If my people humble themselves' (7:14)","God's patience"],
    theologicalSignificance: "2 Chronicles emphasizes that blessing follows faithfulness and judgment follows unfaithfulness. The repeated pattern of revival under godly kings offers hope that repentance is always possible (7:14).",
    christConnection: "The temple's glory and eventual destruction create longing for the true temple — Christ himself. The promise of 2 Chr 7:14 finds ultimate fulfillment in Christ's atoning work.",
  },
  {
    book: "Ezra", author: "Ezra", dateWritten: "~450-400 BC",
    audience: "Post-exilic Jews returning from Babylon", genre: "Historical Narrative",
    outline: ["First Return & Temple Rebuilding (Ch. 1-6): Under Zerubbabel","Second Return & Reform (Ch. 7-10): Under Ezra, confronting intermarriage"],
    keyThemes: ["God's faithfulness to His promises","Restoration after judgment","Purity of worship","The Word of God as foundation"],
    theologicalSignificance: "Ezra shows God fulfilling His promise to restore Israel after 70 years of exile. The rebuilding of the temple represents renewed relationship with God. Ezra's devotion to Scripture models the priority of God's Word.",
    christConnection: "The return from exile pictures spiritual redemption. The rebuilt temple foreshadows the greater restoration Christ brings. Ezra as priest-teacher prefigures Christ as our great High Priest and Teacher.",
  },
  {
    book: "Nehemiah", author: "Nehemiah (with Ezra)", dateWritten: "~430-400 BC",
    audience: "Post-exilic Jews in Jerusalem", genre: "Historical Narrative, Memoir",
    outline: ["Rebuilding the Walls (Ch. 1-7): Leadership under opposition","Revival & Renewal (Ch. 8-10): Reading the Law, confession","Community Life (Ch. 11-13): Repopulation, dedication, reforms"],
    keyThemes: ["Prayer and action","Leadership under opposition","Community covenant renewal","God's protection and provision"],
    theologicalSignificance: "Nehemiah demonstrates that spiritual revival and practical action go hand in hand. The rebuilding of Jerusalem's walls represents the restoration of God's people's identity, security, and mission.",
    christConnection: "Nehemiah as rebuilder and intercessor foreshadows Christ who rebuilds the broken walls of humanity's relationship with God. The community covenant renewal points to the new covenant in Christ.",
  },
  {
    book: "Esther", author: "Unknown", dateWritten: "~470-400 BC",
    audience: "Jews in the Persian Empire", genre: "Historical Narrative",
    outline: ["Esther Becomes Queen (Ch. 1-2)","Haman's Plot (Ch. 3-4): 'For such a time as this'","Deliverance (Ch. 5-10): Reversal and celebration (Purim)"],
    keyThemes: ["God's hidden providence","Courage and faithfulness","Reversal of fortune","Preservation of God's people"],
    theologicalSignificance: "Though God's name never appears in Esther, His providence saturates every chapter. Esther shows that God works behind the scenes to preserve His people and His redemptive plan, even when He seems absent.",
    christConnection: "Esther risking her life to save her people ('If I perish, I perish') foreshadows Christ's self-sacrifice. Mordecai's exaltation after humiliation mirrors Christ's pattern of suffering then glory.",
  },
  {
    book: "Job", author: "Unknown (possibly pre-Mosaic)", dateWritten: "Unknown (possibly ~2000-1500 BC)",
    audience: "All who suffer", genre: "Wisdom Literature, Poetry, Drama",
    outline: ["Prologue (Ch. 1-2): Job's testing","Dialogue with Friends (Ch. 3-31): Why do the righteous suffer?","Elihu's Speech (Ch. 32-37)","God Speaks (Ch. 38-41): 'Where were you?'","Epilogue (Ch. 42): Restoration"],
    keyThemes: ["Suffering and sovereignty","The limits of human wisdom","God's justice and mystery","Faith without answers"],
    theologicalSignificance: "Job tackles the deepest question: Why do the righteous suffer? The answer is not a formula but a Person — God himself. When God speaks from the whirlwind, He doesn't explain suffering but reveals His sovereign majesty, and Job finds that enough.",
    christConnection: "Job's innocent suffering foreshadows Christ's. Job's cry for a mediator (9:33) is answered in Christ. Job's restoration after suffering mirrors Christ's resurrection and the believer's future hope.",
  },
  {
    book: "Psalms", author: "David (73), Asaph, Sons of Korah, Moses, Solomon, others", dateWritten: "~1440-430 BC (spanning ~1,000 years)",
    audience: "Israel — used in temple worship and personal devotion", genre: "Hebrew Poetry, Hymns, Laments, Wisdom",
    outline: ["Book I (Ps 1-41): David's personal psalms","Book II (Ps 42-72): National psalms","Book III (Ps 73-89): Asaph psalms, crisis of faith","Book IV (Ps 90-106): Kingship of God","Book V (Ps 107-150): Praise, pilgrimage, Hallelujah"],
    keyThemes: ["Worship & praise","Lament & suffering","God's kingship","Trust in adversity","The Messiah"],
    theologicalSignificance: "The Psalms are the prayer book and hymnal of God's people. They teach the full range of human emotion before God — from ecstatic praise to agonizing lament — and reveal a theology of honest relationship with God.",
    christConnection: "Messianic psalms prophecy Christ's suffering (Ps 22), resurrection (Ps 16), eternal kingship (Ps 2, 110), and betrayal (Ps 41:9). Jesus quoted the Psalms more than any other book.",
  },
  {
    book: "Proverbs", author: "Solomon (primarily), Agur, Lemuel", dateWritten: "~970-700 BC",
    audience: "Young men, the wise, all who seek wisdom", genre: "Wisdom Literature",
    outline: ["Wisdom's Call (Ch. 1-9): Lady Wisdom vs. Lady Folly","Solomon's Proverbs (Ch. 10-22)","Sayings of the Wise (Ch. 22-24)","Hezekiah's Collection (Ch. 25-29)","Agur & Lemuel (Ch. 30-31)"],
    keyThemes: ["The fear of the Lord is the beginning of wisdom","Wise vs. foolish living","Speech, wealth, relationships","The excellent wife (Ch. 31)"],
    theologicalSignificance: "Proverbs teaches that true wisdom begins with fearing the Lord (1:7). It provides practical guidance for daily life rooted in the character of God. Wisdom is personified as a divine attribute present at creation (Ch. 8).",
    christConnection: "Christ is 'the wisdom of God' (1 Cor 1:24, 30). Wisdom personified in Proverbs 8 has been understood as pointing to the pre-incarnate Christ. In Him are 'hidden all the treasures of wisdom and knowledge' (Col 2:3).",
  },
  {
    book: "Ecclesiastes", author: "Solomon ('Qoheleth' — the Teacher)", dateWritten: "~935 BC",
    audience: "Those searching for meaning", genre: "Wisdom Literature, Philosophy",
    outline: ["Everything is Meaningless (Ch. 1-2): Pleasure, toil, wisdom fail","Times and Seasons (Ch. 3-5): God's sovereignty","Wisdom's Limits (Ch. 6-8)","Life's Conclusion (Ch. 9-12): 'Fear God and keep His commandments'"],
    keyThemes: ["Vanity/meaninglessness 'under the sun'","The limits of human achievement","Enjoying God's gifts","Fearing God as the ultimate meaning"],
    theologicalSignificance: "Ecclesiastes is a brutally honest search for meaning apart from God — and finds only 'vanity.' It drives the reader to the conclusion that meaning is found only in relationship with God: 'Fear God and keep His commandments' (12:13).",
    christConnection: "Ecclesiastes creates the vacuum that only Christ can fill. Jesus is the answer to the Teacher's quest — the one who gives life 'to the full' (John 10:10) and puts eternity in perspective.",
  },
  {
    book: "Song of Solomon", author: "Solomon", dateWritten: "~965 BC",
    audience: "Israel", genre: "Love Poetry",
    outline: ["The Courtship (Ch. 1-3)","The Wedding (Ch. 3-5)","Struggles and Reunion (Ch. 5-8)"],
    keyThemes: ["Romantic love as God's gift","Beauty of marital intimacy","Longing and devotion","Love 'strong as death'"],
    theologicalSignificance: "Song of Solomon celebrates the goodness of romantic love and intimacy within marriage as a gift from God. It corrects both ascetic rejection of the body and its misuse. 'Love is strong as death' (8:6).",
    christConnection: "Traditionally interpreted as an allegory of Christ's love for His church (Eph 5:25-32). The passionate pursuit, intimate knowledge, and unbreakable love mirror the gospel relationship.",
  },
  {
    book: "Isaiah", author: "Isaiah son of Amoz", dateWritten: "~740-680 BC",
    audience: "Judah and Jerusalem", genre: "Prophecy, Poetry",
    outline: ["Judgment (Ch. 1-39): Against Judah and the nations","Comfort (Ch. 40-55): Redemption, Servant Songs","Future Glory (Ch. 56-66): New creation, restoration"],
    keyThemes: ["The holiness of God","Judgment and salvation","The Suffering Servant","The remnant","New creation"],
    theologicalSignificance: "Isaiah is the 'fifth Gospel' — containing more messianic prophecy than any other OT book. The Servant Songs (42, 49, 50, 52-53) describe the Messiah's mission with breathtaking precision, written 700 years before Christ.",
    christConnection: "Isaiah 7:14 — virgin birth. Isaiah 9:6 — mighty God, prince of peace. Isaiah 53 — He was pierced for our transgressions. Isaiah 61 — the Spirit of the Lord is upon me (Jesus' inaugural sermon, Luke 4:18-19).",
  },
  {
    book: "Jeremiah", author: "Jeremiah ('the weeping prophet')", dateWritten: "~627-580 BC",
    audience: "Judah before and during the Babylonian exile", genre: "Prophecy, Biography",
    outline: ["Call & Early Prophecies (Ch. 1-25)","Conflict & Persecution (Ch. 26-45)","Oracles Against Nations (Ch. 46-51)","Fall of Jerusalem (Ch. 52)"],
    keyThemes: ["Unfaithfulness and judgment","The new covenant (Ch. 31)","Repentance","God's sovereign plan through exile"],
    theologicalSignificance: "Jeremiah proclaims judgment on Judah while embodying God's grief over His people's sin. The promise of the New Covenant (31:31-34) is one of the most important prophecies in Scripture — God will write His law on hearts.",
    christConnection: "The New Covenant (31:31-34) is fulfilled in Christ's blood (Luke 22:20). Jeremiah's suffering for truth foreshadows Christ's rejection. The 'righteous Branch' (23:5-6) is the Messiah.",
  },
  {
    book: "Lamentations", author: "Jeremiah (traditionally)", dateWritten: "~586 BC",
    audience: "Jews mourning Jerusalem's destruction", genre: "Poetry, Lament",
    outline: ["First Lament (Ch. 1): Jerusalem's desolation","Second Lament (Ch. 2): God's anger","Hope in the Midst (Ch. 3): 'His mercies are new every morning'","Fourth Lament (Ch. 4): Horrors of the siege","Fifth Lament (Ch. 5): Prayer for restoration"],
    keyThemes: ["Grief over sin's consequences","God's justice","'Great is Thy faithfulness' (3:23)","Hope amid devastation"],
    theologicalSignificance: "Lamentations models honest grief before God. Even in the ashes of judgment, the author finds hope in God's character: 'His mercies are new every morning; great is your faithfulness' (3:22-23).",
    christConnection: "Jesus wept over Jerusalem (Luke 19:41-44) as Jeremiah did. Christ bore the ultimate desolation on the cross — 'My God, why have you forsaken me?' — so that we need never be truly forsaken.",
  },
  {
    book: "Ezekiel", author: "Ezekiel the priest", dateWritten: "~593-571 BC",
    audience: "Jewish exiles in Babylon", genre: "Prophecy, Apocalyptic, Vision",
    outline: ["Judgment on Judah (Ch. 1-24): Visions, symbolic acts","Oracles Against Nations (Ch. 25-32)","Restoration & Hope (Ch. 33-48): Valley of dry bones, new temple"],
    keyThemes: ["The glory of God","God's sovereignty over nations","New heart and Spirit","Resurrection and restoration"],
    theologicalSignificance: "Ezekiel proclaims that God's glory, though departed from the temple due to sin (Ch. 10-11), will return. The vision of dry bones (Ch. 37) is the most powerful picture of spiritual and national resurrection in the OT.",
    christConnection: "The Good Shepherd (34:23) is fulfilled in Christ (John 10). The new temple vision (Ch. 40-48) foreshadows Christ as the true temple. The 'new heart and new Spirit' (36:26-27) comes through Christ.",
  },
  {
    book: "Daniel", author: "Daniel", dateWritten: "~536 BC",
    audience: "Jewish exiles, future generations", genre: "Historical Narrative, Apocalyptic Prophecy",
    outline: ["Court Tales (Ch. 1-6): Faithfulness in exile — fiery furnace, lions' den","Apocalyptic Visions (Ch. 7-12): Four kingdoms, Son of Man, end times"],
    keyThemes: ["God's sovereignty over all kingdoms","Faithfulness under persecution","Prophetic timeline of history","The coming kingdom of God"],
    theologicalSignificance: "Daniel reveals that behind the rise and fall of empires stands the sovereign God of heaven. The 'Son of Man' vision (7:13-14) becomes Jesus' favorite self-designation, claiming universal and eternal authority.",
    christConnection: "The Son of Man (7:13-14) is Christ. The stone that destroys all kingdoms (2:44-45) is Christ's eternal kingdom. Daniel's faithfulness in the lions' den foreshadows Christ's victory through suffering.",
  },
  {
    book: "Hosea", author: "Hosea", dateWritten: "~750-715 BC",
    audience: "Northern Kingdom of Israel", genre: "Prophecy",
    outline: ["Hosea's Marriage (Ch. 1-3): Gomer as picture of unfaithful Israel","Israel's Unfaithfulness (Ch. 4-10): Indictment","Judgment & Restoration (Ch. 11-14): God's relentless love"],
    keyThemes: ["God's covenant love (hesed)","Spiritual adultery","Judgment with hope of restoration","God's relentless pursuit"],
    theologicalSignificance: "Hosea's marriage to unfaithful Gomer is a living parable of God's love for unfaithful Israel. God is not a distant judge but a heartbroken spouse: 'How can I give you up, Ephraim?' (11:8).",
    christConnection: "Hosea 11:1 ('Out of Egypt I called my son') is fulfilled in Jesus (Matt 2:15). Christ is the faithful bridegroom who pursues His unfaithful bride (the church) with relentless love.",
  },
  {
    book: "Joel", author: "Joel", dateWritten: "~835-800 BC (debated)",
    audience: "Judah", genre: "Prophecy",
    outline: ["The Locust Plague (Ch. 1): Present devastation","The Day of the Lord (Ch. 2): Call to repentance","The Spirit Poured Out (Ch. 2:28-3:21): Future restoration"],
    keyThemes: ["The Day of the Lord","Repentance","The outpouring of the Holy Spirit","Restoration"],
    theologicalSignificance: "Joel uses a devastating locust plague to point to the greater 'Day of the Lord.' His prophecy of the Spirit being poured out 'on all flesh' (2:28-29) is fulfilled at Pentecost (Acts 2:16-21).",
    christConnection: "The outpouring of the Spirit (2:28-29) comes through Christ's work (Acts 2). 'Everyone who calls on the name of the Lord will be saved' (2:32) is quoted by Paul about Jesus (Rom 10:13).",
  },
  {
    book: "Amos", author: "Amos, a shepherd from Tekoa", dateWritten: "~760-750 BC",
    audience: "Northern Kingdom of Israel", genre: "Prophecy",
    outline: ["Judgments on Nations (Ch. 1-2)","Three Sermons Against Israel (Ch. 3-6)","Five Visions of Judgment (Ch. 7-9): With restoration promise"],
    keyThemes: ["Social justice","God judges all nations","'Let justice roll down like waters'","True worship vs. empty ritual"],
    theologicalSignificance: "Amos thunders against religious hypocrisy that ignores social injustice. God rejects worship from those who exploit the poor (5:21-24). True faith produces just actions.",
    christConnection: "Christ embodied Amos' call for justice and mercy. He overturned temple tables as Amos condemned corrupt worship. The 'rebuilding of David's fallen tent' (9:11) is applied to the church in Acts 15:16-17.",
  },
  {
    book: "Obadiah", author: "Obadiah", dateWritten: "~586 BC",
    audience: "Edom and Judah", genre: "Prophecy",
    outline: ["Judgment on Edom (v. 1-14)","The Day of the Lord (v. 15-21): Universal justice"],
    keyThemes: ["God's justice against pride","Brotherly betrayal","The Day of the Lord","'The kingdom shall be the Lord's'"],
    theologicalSignificance: "The shortest OT book addresses Edom's pride and cruelty toward Judah. It warns: 'As you have done, it shall be done to you' (v.15). Pride before God always leads to a fall.",
    christConnection: "The final declaration that 'the kingdom shall be the Lord's' (v.21) points to Christ's eternal reign over all nations.",
  },
  {
    book: "Jonah", author: "Jonah (or narrator)", dateWritten: "~780-750 BC",
    audience: "Israel", genre: "Narrative, Satire",
    outline: ["Flight from God (Ch. 1): The storm and the fish","Prayer from the Deep (Ch. 2)","Nineveh Repents (Ch. 3)","Jonah's Anger & God's Compassion (Ch. 4)"],
    keyThemes: ["God's compassion for all nations","Running from God's call","Repentance","God's sovereignty over nature"],
    theologicalSignificance: "Jonah challenges Israel's exclusivism — God loves even Israel's enemies. Jonah is angry that God is gracious (4:2), exposing the ugliness of self-righteous religion that limits God's mercy.",
    christConnection: "Jesus explicitly uses Jonah as a sign: 'As Jonah was three days in the belly of the great fish, so will the Son of Man be three days in the heart of the earth' (Matt 12:40).",
  },
  {
    book: "Micah", author: "Micah of Moresheth", dateWritten: "~735-700 BC",
    audience: "Judah and Israel", genre: "Prophecy",
    outline: ["Judgment (Ch. 1-3): Against injustice and false prophets","Hope (Ch. 4-5): The ruler from Bethlehem","God's Case (Ch. 6-7): 'What does the Lord require?'"],
    keyThemes: ["Justice, mercy, and humility","The ruler from Bethlehem","God's case against His people","Hope through judgment"],
    theologicalSignificance: "Micah 6:8 summarizes what God requires: 'Do justice, love mercy, walk humbly with your God.' Micah 5:2 pinpoints Bethlehem as the Messiah's birthplace — fulfilled 700 years later.",
    christConnection: "Micah 5:2 — the Messiah born in Bethlehem, whose origins are 'from of old, from ancient days' (pre-existence). Christ perfectly embodies Micah's call to justice, mercy, and humility.",
  },
  {
    book: "Nahum", author: "Nahum", dateWritten: "~663-612 BC",
    audience: "Judah (concerning Nineveh)", genre: "Prophecy, Poetry",
    outline: ["God's Character (Ch. 1): Slow to anger, great in power","Nineveh's Fall Described (Ch. 2-3)"],
    keyThemes: ["God's justice against oppression","The fall of proud empires","Comfort for the oppressed"],
    theologicalSignificance: "Nahum proclaims that the God who forgave Nineveh in Jonah's day will judge Nineveh for returning to wickedness. God's patience has limits — His justice will prevail.",
    christConnection: "God's righteous judgment against evil finds ultimate expression at the cross, where Christ bore divine wrath, and at His return, when all evil is finally defeated.",
  },
  {
    book: "Habakkuk", author: "Habakkuk", dateWritten: "~612-589 BC",
    audience: "Judah", genre: "Prophecy, Dialogue",
    outline: ["First Complaint: Why do the wicked prosper? (Ch. 1)","Second Complaint: Why use Babylon? (Ch. 1-2)","Habakkuk's Prayer of Faith (Ch. 3)"],
    keyThemes: ["Wrestling with God's justice","'The righteous shall live by faith' (2:4)","Trusting God when circumstances make no sense"],
    theologicalSignificance: "Habakkuk is unique — a prophet who argues with God. His question 'How long?' resonates with all who suffer injustice. The answer: 'The righteous shall live by faith' (2:4) — the verse that ignited the Reformation.",
    christConnection: "'The righteous shall live by faith' (2:4) is quoted three times in the NT (Rom 1:17, Gal 3:11, Heb 10:38) as the foundation of gospel faith. Christ is the object of that faith.",
  },
  {
    book: "Zephaniah", author: "Zephaniah", dateWritten: "~630-620 BC",
    audience: "Judah", genre: "Prophecy",
    outline: ["Universal Judgment (Ch. 1): The Day of the Lord","Judgment on Nations (Ch. 2)","Jerusalem Judged & Restored (Ch. 3): 'He will rejoice over you with singing'"],
    keyThemes: ["The Day of the Lord","Judgment on complacency","A humble remnant","God's joyful love"],
    theologicalSignificance: "Zephaniah's most stunning verse: 'The LORD your God is in your midst... He will rejoice over you with gladness; He will quiet you by His love; He will exult over you with loud singing' (3:17). The warrior-judge is also the singing lover.",
    christConnection: "Christ embodies God 'in your midst' (3:17) — Emmanuel. He gathers the humble remnant and rejoices over His redeemed people with joy.",
  },
  {
    book: "Haggai", author: "Haggai", dateWritten: "520 BC",
    audience: "Post-exilic Jews rebuilding the temple", genre: "Prophecy",
    outline: ["Call to Rebuild (Ch. 1)","Greater Glory Promised (Ch. 2)"],
    keyThemes: ["Priorities — God's house first","'The latter glory shall be greater'","God's presence over material wealth"],
    theologicalSignificance: "Haggai challenges misplaced priorities — the people build their own houses while God's temple lies in ruins. He promises the latter temple's glory will exceed the former — fulfilled when Christ entered it.",
    christConnection: "The 'desire of all nations' (2:7) coming to fill the temple with glory is fulfilled in Christ. The 'latter glory' of God's dwelling comes ultimately in Christ and His church.",
  },
  {
    book: "Zechariah", author: "Zechariah", dateWritten: "~520-480 BC",
    audience: "Post-exilic Jews", genre: "Prophecy, Apocalyptic",
    outline: ["Eight Night Visions (Ch. 1-6)","Fasting & Justice (Ch. 7-8)","Two Oracles (Ch. 9-14): The coming King and the pierced one"],
    keyThemes: ["God's jealousy for Zion","The Branch (Messiah)","The humble King on a donkey","They will look on the one they pierced"],
    theologicalSignificance: "Zechariah is the most messianic of the minor prophets. It predicts Christ's triumphal entry (9:9), betrayal for 30 pieces of silver (11:12-13), piercing (12:10), and the shepherd struck (13:7) — with stunning precision.",
    christConnection: "Palm Sunday (9:9), 30 silver pieces (11:12-13/Matt 27:9), 'Look on me whom they have pierced' (12:10/John 19:37), 'Strike the shepherd' (13:7/Matt 26:31). Zechariah reads like a passion narrative written 500 years early.",
  },
  {
    book: "Malachi", author: "Malachi", dateWritten: "~435-400 BC",
    audience: "Post-exilic Israel grown complacent", genre: "Prophecy, Disputation",
    outline: ["God's Love Questioned (Ch. 1)","Corrupt Worship & Faithless Leaders (Ch. 2)","The Coming Messenger (Ch. 3-4): Elijah before the Day of the Lord"],
    keyThemes: ["God's unchanging love","Faithless worship","Tithing and stewardship","The messenger who prepares the way"],
    theologicalSignificance: "Malachi closes the OT with a rebuke of spiritual complacency and a promise: God will send His messenger to prepare the way before the Lord himself comes (3:1). Then 400 years of prophetic silence until John the Baptist.",
    christConnection: "The messenger (3:1) is John the Baptist (Matt 11:10). The 'sun of righteousness' rising 'with healing in its wings' (4:2) is Christ. Malachi's promise of Elijah (4:5) is fulfilled in John (Matt 17:10-13).",
  },
  // ──── NEW TESTAMENT ────
  {
    book: "Matthew", author: "Matthew (Levi), tax collector turned apostle", dateWritten: "~AD 55-65",
    audience: "Jewish Christians, demonstrating Jesus as the promised Messiah", genre: "Gospel, Narrative",
    outline: ["Birth & Preparation (Ch. 1-4)","Sermon on the Mount (Ch. 5-7)","Miracles & Ministry (Ch. 8-12)","Parables (Ch. 13)","Conflict & Teaching (Ch. 14-25)","Passion & Resurrection (Ch. 26-28)"],
    keyThemes: ["Jesus as King & Messiah","Kingdom of Heaven","Fulfillment of OT","Discipleship"],
    theologicalSignificance: "Matthew bridges Old and New Testaments, showing Jesus as the fulfillment of Israel's hopes. His fivefold discourse structure mirrors the Torah, presenting Jesus as the new Moses.",
    christConnection: "Jesus is the son of David, son of Abraham — the King who fulfills every messianic prophecy. The Great Commission (28:18-20) reveals his universal authority.",
  },
  {
    book: "Mark", author: "John Mark (companion of Peter)", dateWritten: "~AD 55-65",
    audience: "Roman Christians facing persecution", genre: "Gospel, Narrative",
    outline: ["Ministry in Galilee (Ch. 1-9)","Journey to Jerusalem (Ch. 10)","Passion Week (Ch. 11-16)"],
    keyThemes: ["Jesus as Suffering Servant","The Messianic Secret","Discipleship as cross-bearing","The kingdom of God"],
    theologicalSignificance: "Mark is the fast-paced, action-oriented Gospel. Jesus is constantly 'immediately' moving, demonstrating authority through deeds. The climax comes when the Roman centurion at the cross declares, 'Truly this man was the Son of God' (15:39).",
    christConnection: "Jesus is the Suffering Servant who 'came not to be served but to serve, and to give his life as a ransom for many' (10:45). The cross is not a defeat but the victory.",
  },
  {
    book: "Luke", author: "Luke, physician and companion of Paul", dateWritten: "~AD 60-62",
    audience: "Theophilus; Gentile readers", genre: "Gospel, Historical Narrative",
    outline: ["Birth Narratives (Ch. 1-2)","Galilean Ministry (Ch. 3-9)","Journey to Jerusalem (Ch. 9-19)","Passion & Resurrection (Ch. 19-24)"],
    keyThemes: ["Jesus as Savior of all people","Compassion for the marginalized","The Holy Spirit","Prayer","Joy"],
    theologicalSignificance: "Luke emphasizes Jesus' universal mission — to the poor, women, Samaritans, Gentiles, and sinners. More than any other Gospel, Luke shows Jesus at prayer and highlights the role of the Holy Spirit.",
    christConnection: "Jesus is the Son of Man who 'came to seek and save the lost' (19:10). His genealogy traces back to Adam (not just Abraham), emphasizing His identity as Savior of all humanity.",
  },
  {
    book: "John", author: "John the Apostle", dateWritten: "~AD 85-95",
    audience: "Both Jews and Gentiles", genre: "Theological Gospel",
    outline: ["Prologue (Ch. 1)","Book of Signs (Ch. 2-12)","Book of Glory (Ch. 13-20)","Epilogue (Ch. 21)"],
    keyThemes: ["Jesus as divine Son of God","Belief and eternal life","Seven 'I AM' statements","The Holy Spirit","Light vs. darkness"],
    theologicalSignificance: "John presents the highest Christology — Jesus is the eternal Word, fully God, who became flesh. The seven 'I AM' statements echo God's self-revelation to Moses. John's purpose: 'that you may believe' (20:31).",
    christConnection: "Jesus IS God incarnate. The seven I AMs: Bread of Life, Light of the World, Door, Good Shepherd, Resurrection & Life, Way/Truth/Life, True Vine.",
  },
  {
    book: "Acts", author: "Luke", dateWritten: "~AD 62-64",
    audience: "Theophilus; the early church", genre: "Historical Narrative",
    outline: ["Church in Jerusalem (Ch. 1-7): Pentecost, early growth","Expansion to Judea/Samaria (Ch. 8-12)","Paul's Missionary Journeys (Ch. 13-21)","Paul's Trials & Journey to Rome (Ch. 22-28)"],
    keyThemes: ["The Holy Spirit's power","The unstoppable spread of the gospel","Unity across ethnic boundaries","Bold witness under persecution"],
    theologicalSignificance: "Acts shows the risen Christ continuing His work through the Spirit-empowered church. The gospel moves from Jerusalem to Rome — from Jewish roots to a universal faith. The Spirit is the primary actor.",
    christConnection: "The risen Christ pours out His Spirit (2:33) and directs His church. Acts demonstrates that Jesus is Lord over all nations, fulfilling the promise to Abraham.",
  },
  {
    book: "Romans", author: "Paul the Apostle", dateWritten: "~AD 57",
    audience: "The church in Rome", genre: "Epistle, Theological Treatise",
    outline: ["Universal Sin (Ch. 1-3)","Justification by Faith (Ch. 3-5)","Sanctification (Ch. 6-8)","Israel & the Church (Ch. 9-11)","Christian Living (Ch. 12-16)"],
    keyThemes: ["Justification by faith alone","Grace","The righteousness of God","Union with Christ","The Holy Spirit"],
    theologicalSignificance: "Romans is the most systematic presentation of Christian theology in Scripture. It lays out the entire gospel: humanity's sin, God's righteousness, justification by faith, sanctification by the Spirit, and the hope of glory.",
    christConnection: "Christ is the propitiation for sin (3:25), the one who died and rose for justification (4:25), the one in whom we are united (6:1-11), and the one from whose love nothing can separate us (8:35-39).",
  },
  {
    book: "1 Corinthians", author: "Paul", dateWritten: "~AD 55",
    audience: "The church in Corinth", genre: "Epistle",
    outline: ["Divisions (Ch. 1-4)","Moral Issues (Ch. 5-6)","Marriage & Freedom (Ch. 7-10)","Worship & Gifts (Ch. 11-14)","Resurrection (Ch. 15)"],
    keyThemes: ["Unity in Christ","Sexual ethics","Spiritual gifts","Love (Ch. 13)","Bodily resurrection"],
    theologicalSignificance: "Paul addresses a church riddled with division, immorality, and confusion about spiritual gifts. Chapter 13 (love) and chapter 15 (resurrection) are two of the most important chapters in the NT.",
    christConnection: "Christ is the foundation (3:11), our Passover Lamb (5:7), the power and wisdom of God (1:24), and the firstfruits of resurrection (15:20-23).",
  },
  {
    book: "2 Corinthians", author: "Paul", dateWritten: "~AD 56",
    audience: "The church in Corinth", genre: "Epistle, Personal",
    outline: ["Comfort in Suffering (Ch. 1-7)","The Collection (Ch. 8-9)","Paul's Defense (Ch. 10-13)"],
    keyThemes: ["Strength in weakness","New covenant ministry","Generous giving","Suffering and comfort","Authenticity in leadership"],
    theologicalSignificance: "Paul's most personal letter reveals that God's power is perfected in weakness (12:9). True ministry is not impressive performance but transparent dependence on God.",
    christConnection: "Christ 'became poor so that by his poverty you might become rich' (8:9). He is the image of God (4:4), and we are being transformed into His likeness (3:18).",
  },
  {
    book: "Galatians", author: "Paul", dateWritten: "~AD 49",
    audience: "Churches in Galatia", genre: "Epistle, Polemic",
    outline: ["Paul's Authority (Ch. 1-2)","Justification by Faith, Not Law (Ch. 3-4)","Freedom in Christ (Ch. 5-6)"],
    keyThemes: ["Justification by faith alone","Freedom from the law","The fruit of the Spirit","Living by the Spirit"],
    theologicalSignificance: "Galatians is the 'Magna Carta of Christian liberty.' Paul passionately defends justification by faith alone against those demanding Gentile converts keep the Jewish law. 'It is for freedom that Christ has set us free' (5:1).",
    christConnection: "Christ 'gave himself for our sins to deliver us' (1:4). He 'redeemed us from the curse of the law by becoming a curse for us' (3:13). We are crucified with Christ (2:20).",
  },
  {
    book: "Ephesians", author: "Paul", dateWritten: "~AD 60-62",
    audience: "The church in Ephesus (possibly circular letter)", genre: "Epistle",
    outline: ["Our Identity in Christ (Ch. 1-3): Chosen, redeemed, sealed, united","Our Walk in Christ (Ch. 4-6): Unity, holiness, armor of God"],
    keyThemes: ["Grace","The church as Christ's body","Unity of Jew and Gentile","Spiritual warfare","Marriage as gospel picture"],
    theologicalSignificance: "Ephesians is Paul's magnum opus on the church — its cosmic purpose, its unity across ethnic lines, and its calling to display God's wisdom to the spiritual realm (3:10). Chapters 1-3 are pure theology; 4-6 are application.",
    christConnection: "Christ is the head of the church (1:22), the cornerstone (2:20), the one who fills all in all (1:23), and the bridegroom who gave himself for His bride (5:25-27).",
  },
  {
    book: "Philippians", author: "Paul (from prison)", dateWritten: "~AD 61",
    audience: "The church in Philippi", genre: "Epistle, Personal",
    outline: ["Joy in Suffering (Ch. 1)","The Christ Hymn (Ch. 2)","Knowing Christ (Ch. 3)","Rejoice Always (Ch. 4)"],
    keyThemes: ["Joy in all circumstances","Humility of Christ","Pressing on toward the goal","Contentment","Partnership in the gospel"],
    theologicalSignificance: "Written from prison, Philippians is the 'epistle of joy.' The Christ Hymn (2:5-11) is one of the earliest and highest Christological statements — Christ emptied himself, was exalted, and every knee will bow.",
    christConnection: "The Christ Hymn (2:5-11): pre-existent, incarnate, crucified, exalted, Lord of all. 'To live is Christ, to die is gain' (1:21).",
  },
  {
    book: "Colossians", author: "Paul", dateWritten: "~AD 60-62",
    audience: "The church in Colossae", genre: "Epistle",
    outline: ["The Supremacy of Christ (Ch. 1-2)","Living in Christ (Ch. 3-4)"],
    keyThemes: ["Christ's supremacy over all","Fullness in Christ alone","Freedom from legalism","New life in Christ"],
    theologicalSignificance: "Colossians combats false teaching by exalting Christ as supreme over all creation and all spiritual powers. 'In him all the fullness of God was pleased to dwell' (1:19). You need nothing beyond Christ.",
    christConnection: "Christ is 'the image of the invisible God, the firstborn over all creation' (1:15). All things were created through Him and for Him. He holds all things together (1:17).",
  },
  {
    book: "1 Thessalonians", author: "Paul", dateWritten: "~AD 51",
    audience: "The church in Thessalonica", genre: "Epistle",
    outline: ["Thanksgiving (Ch. 1-3)","Holy Living & Christ's Return (Ch. 4-5)"],
    keyThemes: ["Christ's return","Living to please God","Comfort for the grieving","Holiness"],
    theologicalSignificance: "Likely Paul's earliest letter, it addresses confusion about Christ's return and what happens to believers who die before it. Paul assures: 'the dead in Christ will rise first' (4:16).",
    christConnection: "Christ will 'descend from heaven with a cry of command' (4:16). He delivers us from coming wrath (1:10) and will present us blameless at His coming (3:13).",
  },
  {
    book: "2 Thessalonians", author: "Paul", dateWritten: "~AD 51-52",
    audience: "The church in Thessalonica", genre: "Epistle",
    outline: ["Encouragement in Persecution (Ch. 1)","The Man of Lawlessness (Ch. 2)","Warning Against Idleness (Ch. 3)"],
    keyThemes: ["Perseverance under persecution","The Day of the Lord","The man of lawlessness","Faithful work while waiting"],
    theologicalSignificance: "Paul corrects the belief that the Day of the Lord has already come. He describes events that must precede it and urges believers to work faithfully while waiting — not idly speculate about end times.",
    christConnection: "Christ will destroy the lawless one 'with the breath of his mouth' (2:8). He is faithful and will 'strengthen and protect you from the evil one' (3:3).",
  },
  {
    book: "1 Timothy", author: "Paul", dateWritten: "~AD 63-65",
    audience: "Timothy, Paul's protégé in Ephesus", genre: "Epistle, Pastoral",
    outline: ["Sound Doctrine (Ch. 1)","Worship & Leadership (Ch. 2-3)","False Teaching & Pastoral Care (Ch. 4-6)"],
    keyThemes: ["Sound doctrine","Church leadership qualifications","Godliness","Fighting the good fight"],
    theologicalSignificance: "1 Timothy provides essential instruction for church order — qualifications for elders and deacons, the importance of sound teaching, and how to handle false teachers. 'The church of the living God, the pillar and foundation of the truth' (3:15).",
    christConnection: "There is 'one mediator between God and men, the man Christ Jesus, who gave himself as a ransom for all' (2:5-6).",
  },
  {
    book: "2 Timothy", author: "Paul (final letter, from death row)", dateWritten: "~AD 67",
    audience: "Timothy", genre: "Epistle, Personal Testament",
    outline: ["Fan the Flame (Ch. 1)","Be a Good Soldier (Ch. 2)","Last Days & Scripture (Ch. 3)","Final Charge (Ch. 4)"],
    keyThemes: ["Perseverance","The inspiration of Scripture","Finishing well","Passing the baton"],
    theologicalSignificance: "Paul's final letter, written facing execution. Contains the classic statement on Scripture's inspiration (3:16-17) and Paul's triumphant declaration: 'I have fought the good fight, I have finished the race' (4:7).",
    christConnection: "Christ Jesus 'abolished death and brought life and immortality to light through the gospel' (1:10). He is the risen descendant of David (2:8) and the righteous judge (4:8).",
  },
  {
    book: "Titus", author: "Paul", dateWritten: "~AD 63-65",
    audience: "Titus, organizing churches in Crete", genre: "Epistle, Pastoral",
    outline: ["Appointing Elders (Ch. 1)","Sound Teaching for All (Ch. 2)","Doing Good (Ch. 3)"],
    keyThemes: ["Good works flowing from grace","Sound doctrine","Leadership qualifications","Grace that teaches us"],
    theologicalSignificance: "Titus 2:11-14 is one of the most beautiful gospel summaries: 'The grace of God has appeared, bringing salvation for all people, training us to renounce ungodliness' while we await Christ's glorious appearing.",
    christConnection: "Christ 'gave himself for us to redeem us from all lawlessness and to purify for himself a people for his own possession, zealous for good works' (2:14).",
  },
  {
    book: "Philemon", author: "Paul", dateWritten: "~AD 60-62",
    audience: "Philemon (and the house church)", genre: "Personal Letter",
    outline: ["Paul's Appeal (v. 1-25): Receive Onesimus as a brother"],
    keyThemes: ["Forgiveness and reconciliation","Social transformation through the gospel","Substitutionary love"],
    theologicalSignificance: "Paul's shortest letter asks Philemon to receive his runaway slave Onesimus back — not as a slave but as a beloved brother. The gospel doesn't just save souls; it transforms social relationships.",
    christConnection: "Paul's offer — 'charge it to my account' (v.18) — mirrors Christ who took our debt upon Himself. The reconciliation between Philemon and Onesimus pictures our reconciliation with God.",
  },
  {
    book: "Hebrews", author: "Unknown (Paul? Apollos? Barnabas?)", dateWritten: "~AD 64-68",
    audience: "Jewish Christians tempted to return to Judaism", genre: "Sermon/Epistle",
    outline: ["Christ Superior to Angels (Ch. 1-2)","Superior to Moses (Ch. 3-4)","Superior Priesthood (Ch. 5-7)","Superior Covenant (Ch. 8-10)","Faith Hall of Fame (Ch. 11)","Endurance (Ch. 12-13)"],
    keyThemes: ["Christ's superiority","The new covenant","Faith","Perseverance","Christ as High Priest"],
    theologicalSignificance: "Hebrews is the definitive argument that Christ is the fulfillment and surpassing of everything in the Old Covenant — angels, Moses, the priesthood, sacrifices, the tabernacle. 'Better' appears 13 times.",
    christConnection: "Christ is the radiance of God's glory (1:3), the great High Priest (4:14), the mediator of a better covenant (8:6), and the pioneer and perfecter of faith (12:2).",
  },
  {
    book: "James", author: "James, brother of Jesus", dateWritten: "~AD 45-49",
    audience: "Jewish Christians in the diaspora", genre: "Epistle, Wisdom Literature",
    outline: ["Trials & Temptation (Ch. 1)","Faith & Works (Ch. 2)","Taming the Tongue (Ch. 3)","Humility & Patience (Ch. 4-5)"],
    keyThemes: ["Faith demonstrated by works","Taming the tongue","Caring for the poor","Patience in suffering","Wisdom from above"],
    theologicalSignificance: "James insists that genuine faith produces action: 'faith without works is dead' (2:26). This doesn't contradict Paul's 'faith alone' — they address different questions. Paul asks how we're justified; James asks what real faith looks like.",
    christConnection: "James calls Jesus 'the Lord of glory' (2:1). Christ is the model of patient endurance and humble service that James urges believers to follow.",
  },
  {
    book: "1 Peter", author: "Peter the Apostle", dateWritten: "~AD 62-64",
    audience: "Scattered Christians in Asia Minor", genre: "Epistle",
    outline: ["Living Hope (Ch. 1)","Living Stones (Ch. 2)","Suffering & Submission (Ch. 3-4)","Shepherding the Flock (Ch. 5)"],
    keyThemes: ["Hope amid suffering","Holy living as exiles","Christ's example in suffering","The people of God"],
    theologicalSignificance: "Written to persecuted believers, 1 Peter frames Christians as 'elect exiles' — chosen by God, living as strangers in a hostile world, but anchored by a 'living hope through the resurrection of Jesus Christ' (1:3).",
    christConnection: "Christ suffered for us, 'leaving you an example, so that you might follow in his steps' (2:21). He bore our sins on the tree (2:24). He is the 'chief Shepherd' (5:4).",
  },
  {
    book: "2 Peter", author: "Peter the Apostle", dateWritten: "~AD 65-68",
    audience: "The same churches", genre: "Epistle, Testament",
    outline: ["Grow in Grace (Ch. 1)","False Teachers (Ch. 2)","The Day of the Lord (Ch. 3)"],
    keyThemes: ["Spiritual growth","Warning against false teachers","Christ's return","God's patience"],
    theologicalSignificance: "Peter's farewell letter warns against false teachers and scoffers who deny Christ's return. God is 'not slow... but patient, not wanting anyone to perish' (3:9). The world will be renewed, not abandoned.",
    christConnection: "Christ's return will bring 'new heavens and a new earth in which righteousness dwells' (3:13). Peter was an eyewitness of Christ's majesty at the Transfiguration (1:16-18).",
  },
  {
    book: "1 John", author: "John the Apostle", dateWritten: "~AD 85-95",
    audience: "Churches in Asia Minor", genre: "Epistle",
    outline: ["God is Light (Ch. 1-2)","Children of God (Ch. 3)","God is Love (Ch. 4)","Assurance (Ch. 5)"],
    keyThemes: ["Assurance of salvation","God is light and love","Fellowship","Abiding in Christ","Overcoming the world"],
    theologicalSignificance: "1 John provides three tests of genuine faith: doctrinal (believing Jesus came in the flesh), moral (practicing righteousness), and social (loving one another). 'God is love' (4:8,16) is one of the most profound statements in Scripture.",
    christConnection: "Jesus is 'the atoning sacrifice for our sins, and not only for ours but also for the sins of the whole world' (2:2). He is the eternal life 'which was with the Father and was made manifest to us' (1:2).",
  },
  {
    book: "2 John", author: "John ('the elder')", dateWritten: "~AD 85-95",
    audience: "The 'elect lady' (a church)", genre: "Letter",
    outline: ["Walk in Truth and Love (v. 1-13)"],
    keyThemes: ["Truth and love together","Warning against false teachers","Hospitality with discernment"],
    theologicalSignificance: "2 John insists that truth and love are inseparable — love without truth is sentimentality; truth without love is harshness. It warns against welcoming those who deny Christ's incarnation.",
    christConnection: "Jesus Christ 'coming in the flesh' (v.7) is the non-negotiable confession. Those who deny the incarnation deny both Father and Son.",
  },
  {
    book: "3 John", author: "John ('the elder')", dateWritten: "~AD 85-95",
    audience: "Gaius", genre: "Personal Letter",
    outline: ["Commendation of Gaius (v. 1-8)","Condemnation of Diotrephes (v. 9-11)","Commendation of Demetrius (v. 12-14)"],
    keyThemes: ["Hospitality","Truth in action","Good vs. bad leadership","Walking in truth"],
    theologicalSignificance: "3 John contrasts Gaius (generous, hospitable, walking in truth) with Diotrephes (power-hungry, inhospitable). Church leadership must be marked by service, not self-promotion.",
    christConnection: "Those who 'go out for the sake of the Name' (v.7) serve Christ's mission. Walking in truth means walking in Christ who is the Truth.",
  },
  {
    book: "Jude", author: "Jude, brother of James and Jesus", dateWritten: "~AD 65-80",
    audience: "The church at large", genre: "Epistle",
    outline: ["Contend for the Faith (v. 1-4)","Examples of Judgment (v. 5-16)","Perseverance (v. 17-25)"],
    keyThemes: ["Contending for the faith","God's judgment on false teachers","Perseverance","Doxology"],
    theologicalSignificance: "Jude urgently calls believers to 'contend for the faith that was once for all delivered to the saints' (v.3) against false teachers who pervert grace into license. It closes with one of the NT's greatest doxologies (v.24-25).",
    christConnection: "Christ is the one 'able to keep you from stumbling and to present you blameless before the presence of his glory with great joy' (v.24). He is 'our only Master and Lord' (v.4).",
  },
  {
    book: "Revelation", author: "John the Apostle (from Patmos)", dateWritten: "~AD 95",
    audience: "Seven churches in Asia Minor; the universal church", genre: "Apocalyptic, Prophecy, Letter",
    outline: ["Vision of Christ (Ch. 1)","Letters to Seven Churches (Ch. 2-3)","Throne Room & Seals (Ch. 4-7)","Trumpets & Signs (Ch. 8-14)","Bowls of Wrath (Ch. 15-16)","Fall of Babylon & Return (Ch. 17-20)","New Creation (Ch. 21-22)"],
    keyThemes: ["Sovereignty of God","The Lamb who was slain","Spiritual warfare","Final judgment","New creation"],
    theologicalSignificance: "Revelation is the climax of the biblical story — God's ultimate triumph over evil. Written to persecuted Christians, it assures that God is on the throne and Christ will return to make all things new.",
    christConnection: "Jesus is the Alpha and Omega, the Lion of Judah who is the Lamb, the King of Kings who returns in glory to reign forever.",
  },
];

// ──── CHAPTER DEEP DIVES ────
export const chapterTheology: ChapterTheology[] = [
  // GENESIS
  {
    book: "Genesis", chapter: 1, title: "Creation: God Speaks the World into Being",
    summary: "God creates the heavens and the earth in six days through His spoken word, ordering chaos into beauty and declaring it 'very good.'",
    keyThemes: ["God's sovereignty", "Creation by word", "Order from chaos", "Goodness of creation"],
    theologicalConcepts: [
      { term: "Imago Dei", definition: "Humanity made in God's image — bearing His likeness in rationality, morality, creativity, and relational capacity.", relatedVerses: ["Genesis 1:26-27", "Genesis 9:6", "James 3:9"] },
      { term: "Creation ex nihilo", definition: "God created everything from nothing — not from pre-existing material.", relatedVerses: ["Genesis 1:1", "Hebrews 11:3", "Romans 4:17"] },
      { term: "Dominion Mandate", definition: "Humanity is given authority to steward and cultivate creation as God's representatives.", relatedVerses: ["Genesis 1:28", "Psalm 8:6-8"] },
    ],
    crossReferences: [
      { reference: "John 1:1-3", connection: "Christ as the Word through whom all things were made" },
      { reference: "Colossians 1:15-17", connection: "All things created through and for Christ" },
      { reference: "Hebrews 11:3", connection: "By faith we understand the universe was created by God's word" },
    ],
    historicalContext: "Ancient Near Eastern cultures had creation stories (Enuma Elish, Atrahasis) featuring warring gods creating humans as slaves. Genesis stands in stark contrast: one sovereign God creates with purpose and love.",
    applicationQuestions: ["How does being made in God's image affect how you see yourself and others?", "What does it mean to be a steward of creation?", "How does God bringing order from chaos encourage you?"],
  },
  {
    book: "Genesis", chapter: 3, title: "The Fall: Sin Enters the World",
    summary: "The serpent deceives Eve, Adam and Eve disobey God, and sin enters the human race — bringing shame, broken relationships, and death. Yet God provides the first promise of redemption.",
    keyThemes: ["Temptation", "Sin and shame", "Broken communion", "Promise of redemption"],
    theologicalConcepts: [
      { term: "Protoevangelium", definition: "The 'first gospel' — Genesis 3:15's promise that the seed of the woman will crush the serpent's head. The first messianic prophecy.", relatedVerses: ["Genesis 3:15", "Romans 16:20", "Revelation 12:9"] },
      { term: "Original Sin", definition: "Adam's sin brought guilt and a sin nature upon all humanity. We sin because we are sinners by nature.", relatedVerses: ["Genesis 3:6-7", "Romans 5:12", "Psalm 51:5"] },
      { term: "Federal Headship", definition: "Adam acted as representative head of all humanity — his fall affected all. Christ, the 'last Adam,' is the new representative head.", relatedVerses: ["Romans 5:18-19", "1 Corinthians 15:22", "1 Corinthians 15:45"] },
    ],
    crossReferences: [
      { reference: "Romans 5:12-21", connection: "Adam and Christ compared — sin and grace" },
      { reference: "1 Corinthians 15:21-22", connection: "Death through Adam, life through Christ" },
      { reference: "Revelation 20:2", connection: "The ancient serpent finally defeated" },
    ],
    historicalContext: "The serpent in ANE symbolism was associated with chaos and evil. The consequences — toil, pain, conflict, death — describe the world as we experience it.",
    applicationQuestions: ["Where do you see temptation's pattern (doubt → desire → disobey) in your life?", "How does the protoevangelium give hope?", "What does God making garments for Adam and Eve reveal about His character?"],
  },
  // EXODUS 14 — RED SEA
  {
    book: "Exodus", chapter: 14, title: "The Red Sea: God's Supreme Deliverance",
    summary: "Trapped between the Egyptian army and the sea, Israel witnesses the most dramatic rescue in the Old Testament. God parts the waters, Israel walks through on dry ground, and Pharaoh's army is destroyed.",
    keyThemes: ["Divine deliverance", "Faith in impossible situations", "God fights for His people", "The destruction of the enemy"],
    theologicalConcepts: [
      { term: "Salvation by God Alone", definition: "Moses tells the people: 'Stand firm and see the salvation of the LORD.' Israel contributes nothing — they only need to trust and watch God act. This is the paradigm of salvation throughout Scripture.", relatedVerses: ["Exodus 14:13-14", "Psalm 46:10", "Ephesians 2:8-9"] },
      { term: "Typological Baptism", definition: "Paul interprets the Red Sea crossing as a 'baptism' into Moses — passing through water from slavery to freedom. It foreshadows Christian baptism: death to the old life, resurrection to the new.", relatedVerses: ["1 Corinthians 10:1-2", "Romans 6:3-4", "1 Peter 3:20-21"] },
      { term: "Holy War (Yahweh War)", definition: "God himself fights for Israel: 'The LORD will fight for you; you need only to be still.' This is not human warfare but divine intervention against evil.", relatedVerses: ["Exodus 14:14", "Exodus 15:3", "2 Chronicles 20:15", "Revelation 19:11"] },
      { term: "Hardening of Pharaoh", definition: "God hardens Pharaoh's heart to pursue Israel into the sea — a theological tension between divine sovereignty and human responsibility that Paul explores in Romans 9.", relatedVerses: ["Exodus 14:4,8,17", "Romans 9:17-18", "Exodus 9:12"] },
    ],
    crossReferences: [
      { reference: "Isaiah 43:1-3,16-19", connection: "God who made a way through the sea will do a 'new thing' — the new exodus in Christ" },
      { reference: "1 Corinthians 10:1-4", connection: "Israel's Red Sea crossing as a type of baptism; the rock that followed was Christ" },
      { reference: "Revelation 15:2-3", connection: "The redeemed sing 'the song of Moses and the Lamb' — Exodus deliverance and gospel deliverance united" },
      { reference: "Hebrews 11:29", connection: "By faith they passed through the Red Sea as on dry land" },
    ],
    historicalContext: "The exact location of the crossing is debated (traditional site near the Gulf of Suez; others suggest the Reed Sea/Lake Timsah). The event became Israel's defining memory — recited in every Passover, echoed by every prophet. When later biblical writers want to say 'God saves,' they point to the Red Sea. Egyptian records never mention the Exodus, but this is consistent with ANE practice of not recording military defeats.",
    applicationQuestions: ["When have you been 'trapped' with no human solution? How did God make a way?", "What does 'Stand firm and see the salvation of the LORD' mean for your current struggle?", "How does the Red Sea crossing shape your understanding of baptism?", "Where is God asking you to trust Him in an 'impossible' situation right now?"],
  },
  // ISAIAH 53 — SUFFERING SERVANT
  {
    book: "Isaiah", chapter: 53, title: "The Suffering Servant: He Was Pierced for Our Transgressions",
    summary: "The fourth and climactic Servant Song describes a figure who bears the sins of many through his suffering and death, who is 'despised and rejected,' yet whose wounds bring healing. Written 700 years before Christ, it reads like a firsthand account of the crucifixion.",
    keyThemes: ["Substitutionary atonement", "Innocent suffering", "Rejection by humanity", "Vindication by God"],
    theologicalConcepts: [
      { term: "Penal Substitutionary Atonement", definition: "The Servant suffers the punishment that others deserve: 'He was pierced for our transgressions, crushed for our iniquities; the punishment that brought us peace was on him' (53:5). This is the clearest OT statement of substitutionary atonement.", relatedVerses: ["Isaiah 53:4-6", "2 Corinthians 5:21", "1 Peter 2:24", "Romans 3:25"] },
      { term: "The Silent Lamb", definition: "The Servant does not defend himself: 'like a lamb led to slaughter... he did not open his mouth' (53:7). Jesus fulfilled this at His trial before Pilate and Herod.", relatedVerses: ["Isaiah 53:7", "Matthew 27:12-14", "Acts 8:32-35", "1 Peter 2:23"] },
      { term: "Imputation", definition: "'The LORD has laid on him the iniquity of us all' (53:6). Our sins are transferred to the Servant; His righteousness is credited to us. This is the heart of the gospel.", relatedVerses: ["Isaiah 53:6,11", "2 Corinthians 5:21", "Romans 4:24-25", "Philippians 3:9"] },
      { term: "Vicarious Death & Resurrection", definition: "Though He dies and is buried (53:9), He 'will see his offspring and prolong his days' (53:10) — implying resurrection. Death cannot hold him.", relatedVerses: ["Isaiah 53:9-10", "Acts 2:24", "Romans 4:25", "Hebrews 13:20"] },
    ],
    crossReferences: [
      { reference: "Matthew 8:17", connection: "Jesus' healing ministry fulfills 'He took up our infirmities'" },
      { reference: "Acts 8:30-35", connection: "Philip explains Isaiah 53 to the Ethiopian eunuch as pointing to Jesus" },
      { reference: "1 Peter 2:22-25", connection: "Peter directly quotes Isaiah 53, applying it to Christ's crucifixion" },
      { reference: "Mark 10:45", connection: "Jesus says He came 'to give his life as a ransom for many' — echoing Isaiah 53:12" },
    ],
    historicalContext: "Jewish interpretation before Christ debated whether the Servant was Israel collectively or an individual. The Dead Sea Scrolls show some pre-Christian Jews expected a suffering Messiah. After Christianity, most rabbinic interpretation shifted to the collective reading. The Ethiopian eunuch's question — 'Who is the prophet talking about?' (Acts 8:34) — is the most important question this chapter raises.",
    applicationQuestions: ["Read Isaiah 53:5 slowly. What does it mean that YOUR healing came through HIS wounds?", "How does the Servant's silence challenge our instinct for self-defense?", "How does 'All we like sheep have gone astray' (53:6) apply to your life?", "'It was the LORD's will to crush him' (53:10) — how do you reconcile God's love with this?"],
  },
  // LUKE 15 — THE PRODIGALS
  {
    book: "Luke", chapter: 15, title: "The Parables of the Lost: Heaven's Joy Over Sinners",
    summary: "Three parables — the lost sheep, the lost coin, and the prodigal son — form Jesus' most powerful defense of His ministry to sinners. Each parable reveals God's relentless pursuit of the lost and heaven's extravagant joy when one sinner repents.",
    keyThemes: ["God's seeking love", "Repentance and joy", "Grace vs. self-righteousness", "The heart of the Father"],
    theologicalConcepts: [
      { term: "Prevenient Grace", definition: "In each parable, the search begins with the owner/father — not the lost. The shepherd seeks the sheep; the woman sweeps for the coin; the father watches for the son. God initiates salvation before we seek Him.", relatedVerses: ["Luke 15:4,8,20", "Romans 5:8", "1 John 4:10,19", "John 6:44"] },
      { term: "The Two Lost Sons", definition: "The parable actually has TWO lost sons. The younger son is lost in rebellion; the elder son is lost in religion. Both are alienated from the father's heart. The elder son represents the Pharisees who resent God's grace to sinners.", relatedVerses: ["Luke 15:25-32", "Luke 18:9-14", "Matthew 21:31", "Romans 9:30-32"] },
      { term: "Radical Hospitality", definition: "The father's response violates every cultural norm: a patriarch running (undignified), embracing a defiled son, killing the fattened calf (extreme expense), giving the best robe and ring (full restoration). This is not just forgiveness — it's lavish celebration.", relatedVerses: ["Luke 15:20-24", "Ephesians 2:4-7", "Romans 8:32", "Zephaniah 3:17"] },
      { term: "Repentance", definition: "The younger son 'came to himself' — repentance is coming to your senses, recognizing where you truly are and where you belong. But the father accepts him before the rehearsed speech is finished.", relatedVerses: ["Luke 15:17-21", "Acts 3:19", "2 Corinthians 7:10", "Joel 2:12-13"] },
    ],
    crossReferences: [
      { reference: "Ezekiel 34:11-16", connection: "God as the shepherd who seeks His lost sheep — the OT background" },
      { reference: "Matthew 18:12-14", connection: "Matthew's version of the lost sheep with emphasis on God's will that none perish" },
      { reference: "2 Corinthians 5:17-21", connection: "Reconciliation — 'God was in Christ reconciling the world to Himself'" },
      { reference: "Romans 5:6-8", connection: "While we were still sinners (far off), Christ died for us (the father ran)" },
    ],
    historicalContext: "Jesus told these parables in response to Pharisees grumbling: 'This man welcomes sinners and eats with them' (15:2). In that culture, shared meals meant acceptance and fellowship. The Pharisees were scandalized that Jesus — a rabbi — would eat with tax collectors and sinners. These three parables are Jesus' defense: He eats with sinners because that's what God does. The father in the parable does what no Middle Eastern patriarch would do — he runs to meet his disgraced son, absorbing the shame himself.",
    applicationQuestions: ["Which son do you identify with more — the younger (rebellion) or the elder (religion)?", "What does the father running tell you about God's posture toward you?", "Is there anyone you resent God showing grace to? That's the elder brother's heart.", "What does 'he came to himself' look like in your own story of repentance?"],
  },
  // ACTS 2 — PENTECOST
  {
    book: "Acts", chapter: 2, title: "Pentecost: The Spirit Poured Out on All Flesh",
    summary: "Fifty days after Jesus' resurrection, the Holy Spirit descends on the gathered believers in Jerusalem with wind, fire, and tongues. Peter preaches the first gospel sermon, 3,000 are baptized, and the church is born.",
    keyThemes: ["The Holy Spirit's arrival", "The birth of the church", "Multicultural gospel", "Repentance and baptism"],
    theologicalConcepts: [
      { term: "The Baptism of the Holy Spirit", definition: "Jesus promised they would be 'baptized with the Holy Spirit' (Acts 1:5). At Pentecost, the Spirit is poured out not on a select few (as in the OT) but on all believers — old, young, male, female, slave, free. This democratization of the Spirit fulfills Joel 2:28-32.", relatedVerses: ["Acts 2:1-4,17-18", "Joel 2:28-32", "Acts 1:5,8", "1 Corinthians 12:13"] },
      { term: "Tongues (Glossolalia)", definition: "The Spirit enables believers to speak in other human languages they had not learned, so that Jews from every nation hear the gospel in their own tongue. This reverses Babel (Genesis 11) — where God confused languages in judgment, He now unites languages in grace.", relatedVerses: ["Acts 2:4-11", "Genesis 11:1-9", "1 Corinthians 14:1-25", "Mark 16:17"] },
      { term: "Kerygma (The Apostolic Gospel)", definition: "Peter's sermon establishes the core gospel message: Jesus' life, death, and resurrection fulfill Scripture; God has made Him Lord and Christ; repent and be baptized for forgiveness. This becomes the template for all apostolic preaching.", relatedVerses: ["Acts 2:22-36", "Acts 3:13-26", "Acts 10:34-43", "1 Corinthians 15:1-8"] },
      { term: "The Community of the Spirit", definition: "The first church is characterized by devotion to teaching, fellowship, breaking bread, and prayer (2:42). They share possessions and 'have all things in common.' This is not mandated communism but Spirit-generated generosity.", relatedVerses: ["Acts 2:42-47", "Acts 4:32-35", "Romans 12:10-13", "Hebrews 10:24-25"] },
    ],
    crossReferences: [
      { reference: "Joel 2:28-32", connection: "Peter explicitly quotes this as fulfilled at Pentecost" },
      { reference: "John 14:16-17,26", connection: "Jesus' promise of the Spirit as 'another Helper' — now fulfilled" },
      { reference: "Genesis 11:1-9", connection: "Babel's language confusion is reversed at Pentecost — unity restored" },
      { reference: "Ezekiel 36:26-27", connection: "God's promise to put His Spirit within His people — now realized" },
      { reference: "1 Corinthians 12:12-13", connection: "By one Spirit we are all baptized into one body" },
    ],
    historicalContext: "Pentecost (Shavuot) was the Jewish Feast of Weeks, celebrating the wheat harvest and, in later tradition, the giving of the Law at Sinai. The timing is profoundly symbolic: as God gave the Law on Sinai with fire and thunder, now He gives the Spirit with tongues of fire. The Law was written on stone; the Spirit writes on hearts (2 Cor 3:3). Jerusalem was packed with Jewish pilgrims from across the Roman Empire — God chose this moment so that the gospel immediately reaches representatives of every nation.",
    applicationQuestions: ["How does Pentecost change your understanding of the Holy Spirit's role in your life?", "The early church devoted themselves to teaching, fellowship, breaking bread, and prayer (2:42). How does your community reflect these priorities?", "The reversal of Babel shows God's heart for every language and culture. How does this challenge ethnocentrism?", "Peter said 'Repent and be baptized.' Have you responded to this invitation?"],
  },
  // MATTHEW 5 — SERMON ON THE MOUNT
  {
    book: "Matthew", chapter: 5, title: "The Sermon on the Mount: Kingdom Ethics",
    summary: "Jesus begins his most famous sermon with the Beatitudes — radical blessings that invert worldly values — then reinterprets the Law with divine authority.",
    keyThemes: ["Kingdom values", "True righteousness", "Law fulfilled", "Heart transformation"],
    theologicalConcepts: [
      { term: "The Beatitudes", definition: "Eight declarations of blessedness describing citizens of God's kingdom. Not moral achievements to earn but descriptions of those transformed by grace.", relatedVerses: ["Matthew 5:3-12", "Luke 6:20-26", "Isaiah 61:1-3"] },
      { term: "Fulfillment of the Law", definition: "Jesus did not come to abolish the Law but to fulfill it — bringing out its deepest intention. The Law's demand is ultimately met only in Christ.", relatedVerses: ["Matthew 5:17-20", "Romans 10:4", "Romans 8:3-4"] },
    ],
    crossReferences: [
      { reference: "Deuteronomy 18:15", connection: "The prophet like Moses — Jesus teaches from the mountain" },
      { reference: "Romans 8:3-4", connection: "What the law could not do, God did through Christ" },
    ],
    historicalContext: "First-century rabbis debated Torah's meaning. Jesus' formula 'You have heard... but I say' was unprecedented — no rabbi claimed authority over the Law itself. Jesus speaks as the Lawgiver.",
    applicationQuestions: ["Which Beatitude most challenges your current values?", "How does Jesus' teaching on anger and lust change your understanding of 'keeping the commandments'?", "What does it mean to be 'salt and light' in your context?"],
  },
  // JOHN 1
  {
    book: "John", chapter: 1, title: "The Word Made Flesh",
    summary: "John's Gospel opens with a cosmic prologue declaring Jesus as the eternal Word (Logos) — God himself — who created all things and became flesh to reveal the Father.",
    keyThemes: ["Deity of Christ", "Incarnation", "Light and darkness", "Grace and truth"],
    theologicalConcepts: [
      { term: "Logos (The Word)", definition: "Greek philosophical term radically redefined: the Logos is not an abstract force but a Person — the pre-existent Son of God who became human.", relatedVerses: ["John 1:1-3", "John 1:14", "1 John 1:1", "Revelation 19:13"] },
      { term: "Incarnation", definition: "The eternal Son took on full human nature without ceasing to be God — 'the Word became flesh.' The central miracle of Christianity.", relatedVerses: ["John 1:14", "Philippians 2:6-8", "1 Timothy 3:16", "Hebrews 2:14"] },
    ],
    crossReferences: [
      { reference: "Genesis 1:1", connection: "'In the beginning' — John echoes Genesis, placing Jesus at creation" },
      { reference: "Colossians 1:15-20", connection: "The supremacy of Christ as Creator and sustainer" },
      { reference: "Hebrews 1:1-3", connection: "God has spoken through His Son" },
    ],
    historicalContext: "John likely wrote from Ephesus around AD 90. Logos resonated with both Jewish readers (God's creative Word) and Greek readers (Stoic philosophy). John masterfully bridges both worlds.",
    applicationQuestions: ["What does it mean that the Creator 'became flesh and dwelt among us'?", "John says Jesus is 'full of grace AND truth' — how do you hold both together?"],
  },
  // ROMANS 8
  {
    book: "Romans", chapter: 8, title: "Life in the Spirit — The Greatest Chapter",
    summary: "Paul soars from 'no condemnation' to 'nothing can separate us from God's love' — the summit of Christian theology.",
    keyThemes: ["No condemnation", "Life in the Spirit", "Adoption", "Suffering and glory", "Inseparable love"],
    theologicalConcepts: [
      { term: "No Condemnation", definition: "Those in Christ face no divine judgment — not because sinless but because Christ bore it.", relatedVerses: ["Romans 8:1", "Romans 5:1", "John 5:24"] },
      { term: "Adoption (Huiothesia)", definition: "Believers are adopted children of God with full inheritance rights, crying 'Abba, Father.'", relatedVerses: ["Romans 8:15-17", "Galatians 4:4-7", "Ephesians 1:5"] },
      { term: "Glorification", definition: "The final step of salvation — so certain Paul writes it in past tense (8:30).", relatedVerses: ["Romans 8:30", "Philippians 3:21", "1 John 3:2"] },
      { term: "Providence (8:28)", definition: "'All things work together for good' — not that everything is good, but God orchestrates even suffering toward conforming us to Christ.", relatedVerses: ["Romans 8:28-29", "Genesis 50:20", "Ephesians 1:11"] },
    ],
    crossReferences: [
      { reference: "John 10:28-29", connection: "No one can snatch believers from God's hand" },
      { reference: "Ephesians 1:13-14", connection: "The Spirit as guarantee of our inheritance" },
      { reference: "Revelation 21:3-4", connection: "The final fulfillment — no more death or pain" },
    ],
    historicalContext: "Roman Christians faced growing persecution. Paul's declaration that nothing can separate them from Christ's love was steel for their suffering.",
    applicationQuestions: ["What does 'no condemnation' mean for your guilt and shame?", "How does the Spirit's intercession comfort you when you can't pray?", "What would you add to Paul's list in v.35 from your own life?"],
  },
  // PSALM 23
  {
    book: "Psalms", chapter: 23, title: "The Lord Is My Shepherd",
    summary: "David's most beloved psalm declares God as the perfect Shepherd who provides, guides, comforts, and protects through every season of life — even the valley of death.",
    keyThemes: ["God as Shepherd", "Provision and rest", "Comfort in darkness", "Overflowing abundance"],
    theologicalConcepts: [
      { term: "The Divine Shepherd", definition: "God as Shepherd is one of the Bible's most intimate metaphors. The shepherd knows each sheep by name, leads them to nourishment, protects from predators, and carries the weak.", relatedVerses: ["Psalm 23:1", "Isaiah 40:11", "Ezekiel 34:11-16", "John 10:11,14"] },
      { term: "The Valley of Death's Shadow", definition: "The psalm doesn't promise the absence of dark valleys but the presence of God in them. 'You are with me' — the shift from 'He' to 'You' marks the psalm's emotional center.", relatedVerses: ["Psalm 23:4", "Isaiah 43:2", "Matthew 28:20", "Hebrews 13:5"] },
    ],
    crossReferences: [
      { reference: "John 10:11-18", connection: "Jesus declares 'I am the Good Shepherd' — the ultimate fulfillment" },
      { reference: "Revelation 7:17", connection: "The Lamb at the center of the throne will be their shepherd" },
      { reference: "Ezekiel 34:23", connection: "God promises one shepherd, David, to tend His flock — fulfilled in Christ" },
    ],
    historicalContext: "David wrote from personal experience as a shepherd in Bethlehem's hills. He faced lions, bears, and the wilderness. When he says 'The Lord is my shepherd,' he knows exactly what a good shepherd does — and he sees God doing it for him.",
    applicationQuestions: ["What does 'I shall not want' mean in your current circumstances?", "When have you experienced God's presence in a 'valley of the shadow of death'?", "How does the image of the overflowing cup speak to God's generosity toward you?"],
  },
  // REVELATION 21
  {
    book: "Revelation", chapter: 21, title: "New Heaven, New Earth: All Things Made New",
    summary: "The Bible's climactic vision: God creates a new heaven and new earth, the New Jerusalem descends, and God dwells with His people forever. No more death, mourning, crying, or pain.",
    keyThemes: ["New creation", "God dwelling with humanity", "No more death or sorrow", "The Bride of Christ"],
    theologicalConcepts: [
      { term: "New Creation", definition: "God doesn't abandon creation but renews it. The new heaven and earth fulfill the promise that creation itself 'will be liberated from its bondage to decay' (Rom 8:21).", relatedVerses: ["Revelation 21:1", "Isaiah 65:17", "2 Peter 3:13", "Romans 8:19-22"] },
      { term: "Immanuel Fully Realized", definition: "'God's dwelling place is now among the people, and he will dwell with them' (21:3). The entire biblical story — Eden, tabernacle, temple, incarnation — reaches its goal: God with us, unmediated, forever.", relatedVerses: ["Revelation 21:3", "Genesis 3:8", "Exodus 25:8", "John 1:14", "Matthew 1:23"] },
    ],
    crossReferences: [
      { reference: "Genesis 1-2", connection: "Creation restored — the tree of life returns (22:2), the curse is removed (22:3)" },
      { reference: "Isaiah 25:6-9", connection: "God will swallow up death forever and wipe away tears" },
      { reference: "2 Corinthians 5:17", connection: "Those in Christ are already a 'new creation' — foretaste of what's coming" },
    ],
    historicalContext: "Written to persecuted Christians on the verge of despair, Revelation 21 is the Bible's ultimate answer to suffering. It doesn't minimize pain but promises that 'the old order of things has passed away' and God makes 'everything new.'",
    applicationQuestions: ["How does the promise of 'no more death or crying' shape how you face grief today?", "What does it mean that God's plan ends not in escape from earth but in renewed creation?", "How does the vision of the New Jerusalem give you hope in a broken world?"],
  },
];

export function getChapterTheology(book: string, chapter: number): ChapterTheology | undefined {
  return chapterTheology.find(
    (t) => t.book.toLowerCase() === book.toLowerCase() && t.chapter === chapter
  );
}

export function getBookIntro(book: string): BookIntro | undefined {
  return bookIntros.find((b) => b.book.toLowerCase() === book.toLowerCase());
}
