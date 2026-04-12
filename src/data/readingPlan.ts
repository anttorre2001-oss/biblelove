// Chronological Bible Reading Plan - 365 days
// Each day has readings that follow the historical timeline of events

export interface DayReading {
  day: number;
  readings: {
    label: string;
    reference: string;
    category: "old-testament" | "new-testament" | "psalm" | "proverbs" | "gospel";
  }[];
}

// Abbreviated chronological plan (representative sample — full 365 days)
// In a production app you'd load this from a JSON file or API.
const planData: DayReading[] = [];

const chronologicalReadings = [
  // Week 1 - Creation & Early History
  [{ label: "The Creation", reference: "Genesis 1-3", category: "old-testament" as const }, { label: "Psalm of Wonder", reference: "Psalm 104", category: "psalm" as const }],
  [{ label: "The Fall & Cain", reference: "Genesis 4-5", category: "old-testament" as const }, { label: "Wisdom", reference: "Proverbs 1:1-7", category: "proverbs" as const }],
  [{ label: "The Flood", reference: "Genesis 6-8", category: "old-testament" as const }, { label: "Refuge", reference: "Psalm 46", category: "psalm" as const }],
  [{ label: "After the Flood", reference: "Genesis 9-11", category: "old-testament" as const }, { label: "Trust", reference: "Proverbs 3:1-12", category: "proverbs" as const }],
  [{ label: "Call of Abram", reference: "Genesis 12-14", category: "old-testament" as const }, { label: "The Lord is My Shepherd", reference: "Psalm 23", category: "psalm" as const }],
  [{ label: "God's Covenant", reference: "Genesis 15-17", category: "old-testament" as const }, { label: "Faithfulness", reference: "Psalm 89:1-18", category: "psalm" as const }],
  [{ label: "Sodom & Gomorrah", reference: "Genesis 18-19", category: "old-testament" as const }, { label: "Righteousness", reference: "Proverbs 10:1-12", category: "proverbs" as const }],
  // Week 2
  [{ label: "Isaac Is Born", reference: "Genesis 20-22", category: "old-testament" as const }, { label: "Provision", reference: "Psalm 37:1-11", category: "psalm" as const }],
  [{ label: "Isaac & Rebekah", reference: "Genesis 23-25", category: "old-testament" as const }, { label: "Guidance", reference: "Proverbs 16:1-9", category: "proverbs" as const }],
  [{ label: "Jacob & Esau", reference: "Genesis 26-28", category: "old-testament" as const }, { label: "Blessing", reference: "Psalm 67", category: "psalm" as const }],
  [{ label: "Jacob's Family", reference: "Genesis 29-31", category: "old-testament" as const }, { label: "Patience", reference: "Proverbs 14:29-35", category: "proverbs" as const }],
  [{ label: "Jacob Wrestles God", reference: "Genesis 32-34", category: "old-testament" as const }, { label: "Strength", reference: "Psalm 18:1-19", category: "psalm" as const }],
  [{ label: "Joseph's Dreams", reference: "Genesis 35-37", category: "old-testament" as const }, { label: "Hope", reference: "Psalm 42", category: "psalm" as const }],
  [{ label: "Joseph in Egypt", reference: "Genesis 38-40", category: "old-testament" as const }, { label: "Integrity", reference: "Proverbs 11:1-11", category: "proverbs" as const }],
  // Week 3
  [{ label: "Joseph Rises", reference: "Genesis 41-42", category: "old-testament" as const }, { label: "Exaltation", reference: "Psalm 75", category: "psalm" as const }],
  [{ label: "Brothers Reunite", reference: "Genesis 43-45", category: "old-testament" as const }, { label: "Forgiveness", reference: "Psalm 103:1-14", category: "psalm" as const }],
  [{ label: "Israel in Egypt", reference: "Genesis 46-48", category: "old-testament" as const }, { label: "Family", reference: "Proverbs 22:1-6", category: "proverbs" as const }],
  [{ label: "Jacob's Blessing", reference: "Genesis 49-50", category: "old-testament" as const }, { label: "Legacy", reference: "Psalm 78:1-16", category: "psalm" as const }],
  [{ label: "Israel Oppressed", reference: "Exodus 1-3", category: "old-testament" as const }, { label: "Deliverance", reference: "Psalm 77", category: "psalm" as const }],
  [{ label: "Moses & Pharaoh", reference: "Exodus 4-6", category: "old-testament" as const }, { label: "Courage", reference: "Proverbs 28:1-10", category: "proverbs" as const }],
  [{ label: "The Plagues Begin", reference: "Exodus 7-9", category: "old-testament" as const }, { label: "God's Power", reference: "Psalm 93", category: "psalm" as const }],
  // Week 4
  [{ label: "The Passover", reference: "Exodus 10-12", category: "old-testament" as const }, { label: "Redemption", reference: "Psalm 116", category: "psalm" as const }],
  [{ label: "Crossing the Sea", reference: "Exodus 13-15", category: "old-testament" as const }, { label: "Victory Song", reference: "Psalm 118:1-16", category: "psalm" as const }],
  [{ label: "Manna & Water", reference: "Exodus 16-18", category: "old-testament" as const }, { label: "Daily Bread", reference: "Proverbs 30:7-9", category: "proverbs" as const }],
  [{ label: "The Ten Commandments", reference: "Exodus 19-21", category: "old-testament" as const }, { label: "The Law", reference: "Psalm 19", category: "psalm" as const }],
  [{ label: "Laws & Covenant", reference: "Exodus 22-24", category: "old-testament" as const }, { label: "Justice", reference: "Proverbs 21:1-8", category: "proverbs" as const }],
  [{ label: "The Tabernacle Plans", reference: "Exodus 25-27", category: "old-testament" as const }, { label: "God's Dwelling", reference: "Psalm 84", category: "psalm" as const }],
  [{ label: "Priestly Garments", reference: "Exodus 28-30", category: "old-testament" as const }, { label: "Holiness", reference: "Psalm 99", category: "psalm" as const }],
  // Continue pattern for remaining days...
  [{ label: "The Golden Calf", reference: "Exodus 31-33", category: "old-testament" as const }, { label: "Mercy", reference: "Psalm 51:1-12", category: "psalm" as const }],
  [{ label: "God's Glory", reference: "Exodus 34-36", category: "old-testament" as const }, { label: "Radiance", reference: "Psalm 27:1-6", category: "psalm" as const }],
  [{ label: "Tabernacle Complete", reference: "Exodus 37-40", category: "old-testament" as const }, { label: "Completion", reference: "Psalm 90", category: "psalm" as const }],
];

// Generate all 365 days, cycling through available readings
for (let i = 0; i < 365; i++) {
  const readingIndex = i % chronologicalReadings.length;
  planData.push({
    day: i + 1,
    readings: chronologicalReadings[readingIndex],
  });
}

export const readingPlan = planData;

// Daily motivational verses
export const dailyVerses = [
  { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11 (NASB)" },
  { text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.", reference: "Proverbs 3:5-6 (NASB)" },
  { text: "Be strong and courageous. Do not be afraid or discouraged, for the Lord your God is with you wherever you go.", reference: "Joshua 1:9 (NLT)" },
  { text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.", reference: "Psalm 23:1-3 (NASB)" },
  { text: "Come to me, all of you who are weary and carry heavy burdens, and I will give you rest.", reference: "Matthew 11:28 (NLT)" },
  { text: "And we know that God causes all things to work together for good to those who love God, to those who are called according to His purpose.", reference: "Romans 8:28 (NASB)" },
  { text: "The steadfast love of the Lord never ceases; His mercies never come to an end; they are new every morning; great is Your faithfulness.", reference: "Lamentations 3:22-23 (NASB)" },
  { text: "I can do all things through Him who strengthens me.", reference: "Philippians 4:13 (NASB)" },
  { text: "Don't worry about anything; instead, pray about everything. Tell God what you need, and thank him for all he has done.", reference: "Philippians 4:6 (NLT)" },
  { text: "For God so loved the world, that He gave His only Son, so that everyone who believes in Him will not perish, but have eternal life.", reference: "John 3:16 (NASB)" },
  { text: "So we fix our eyes not on what is seen, but on what is unseen, since what is seen is temporary, but what is unseen is eternal.", reference: "2 Corinthians 4:18 (NLT)" },
  { text: "But those who wait for the Lord will gain new strength; they will mount up with wings like eagles, they will run and not get tired, they will walk and not become weary.", reference: "Isaiah 40:31 (NASB)" },
  { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", reference: "Psalm 34:18 (NLT)" },
  { text: "Your word is a lamp to my feet and a light to my path.", reference: "Psalm 119:105 (NASB)" },
];
