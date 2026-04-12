import artPentateuch from "@/assets/art-pentateuch.jpg";
import artHistory from "@/assets/art-history.jpg";
import artPoetry from "@/assets/art-poetry.jpg";
import artProphets from "@/assets/art-prophets.jpg";
import artGospels from "@/assets/art-gospels.jpg";
import artActs from "@/assets/art-acts.jpg";
import artLetters from "@/assets/art-letters.jpg";
import artRevelation from "@/assets/art-revelation.jpg";

// Map Bible books to their art group
const bookToGroup: Record<string, string> = {
  Genesis: "pentateuch", Exodus: "pentateuch", Leviticus: "pentateuch",
  Numbers: "pentateuch", Deuteronomy: "pentateuch",
  Joshua: "history", Judges: "history", Ruth: "history",
  "1 Samuel": "history", "2 Samuel": "history", "1 Kings": "history",
  "2 Kings": "history", "1 Chronicles": "history", "2 Chronicles": "history",
  Ezra: "history", Nehemiah: "history", Esther: "history",
  Job: "poetry", Psalms: "poetry", Psalm: "poetry", Proverbs: "poetry",
  Ecclesiastes: "poetry", "Song of Solomon": "poetry",
  Isaiah: "prophets", Jeremiah: "prophets", Lamentations: "prophets",
  Ezekiel: "prophets", Daniel: "prophets", Hosea: "prophets",
  Joel: "prophets", Amos: "prophets", Obadiah: "prophets",
  Jonah: "prophets", Micah: "prophets", Nahum: "prophets",
  Habakkuk: "prophets", Zephaniah: "prophets", Haggai: "prophets",
  Zechariah: "prophets", Malachi: "prophets",
  Matthew: "gospels", Mark: "gospels", Luke: "gospels", John: "gospels",
  Acts: "acts",
  Romans: "letters", "1 Corinthians": "letters", "2 Corinthians": "letters",
  Galatians: "letters", Ephesians: "letters", Philippians: "letters",
  Colossians: "letters", "1 Thessalonians": "letters", "2 Thessalonians": "letters",
  "1 Timothy": "letters", "2 Timothy": "letters", Titus: "letters",
  Philemon: "letters", Hebrews: "letters", James: "letters",
  "1 Peter": "letters", "2 Peter": "letters", "1 John": "letters",
  "2 John": "letters", "3 John": "letters", Jude: "letters",
  Revelation: "revelation",
};

const groupToArt: Record<string, string> = {
  pentateuch: artPentateuch,
  history: artHistory,
  poetry: artPoetry,
  prophets: artProphets,
  gospels: artGospels,
  acts: artActs,
  letters: artLetters,
  revelation: artRevelation,
};

export function getArtForReference(reference: string): string {
  // Extract the book name from a reference like "Genesis 1-3" or "1 Samuel 5:1-10"
  const match = reference.match(/^(\d?\s?[A-Za-z\s]+?)(?:\s+\d)/);
  const book = match ? match[1].trim() : "";
  const group = bookToGroup[book] || "pentateuch";
  return groupToArt[group];
}

export function getArtForCategory(category: string): string {
  switch (category) {
    case "old-testament": return artPentateuch;
    case "psalm": return artPoetry;
    case "proverbs": return artPoetry;
    case "gospel": return artGospels;
    case "new-testament": return artLetters;
    default: return artPentateuch;
  }
}
