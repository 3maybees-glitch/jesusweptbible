import fs from 'fs';
import path from 'path';

// Read the JSON file
const jsonPath = '/vercel/share/v0-project/genesis-data.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Create lib directory if it doesn't exist
const libDir = '/vercel/share/v0-project/lib';
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Function to generate TypeScript file content
function generateTypescriptFile(chapterData) {
  const chapter = chapterData['Genesis-' + chapterData.chapter];
  
  const verses = chapter.verses.map(v => ({
    verseNumber: v.verseNumber,
    text: v.text,
    highlightedWords: v.hebrewWords ? v.hebrewWords.map(w => ({
      word: w.word,
      strongNumber: w.strongNumber,
      lemma: w.lemma,
      meaning: w.meaning
    })) : []
  }));

  const themeWords = chapter.hebrewWords ? chapter.hebrewWords.slice(0, 2).map(w => ({
    word: w.word,
    strongNumber: w.strongNumber,
    language: 'Hebrew',
    lemma: w.lemma,
    meaning: w.meaning
  })) : [];

  const tsContent = `import { ChapterData } from "@/lib/bible-data"

export const genesisChapter${chapter.chapter}: ChapterData = {
  "Genesis-${chapter.chapter}": {
    book: "${chapter.book}",
    chapter: ${chapter.chapter},
    twoWordSummary: "${chapter.twoWordSummary || ''}",
    themeSummary: "${(chapter.themeSummary || '').replace(/"/g, '\\"')}",
    sentenceDescription: "${(chapter.sentenceDescription || '').replace(/"/g, '\\"')}",
    themeWords: ${JSON.stringify(themeWords, null, 6)},
    verses: ${JSON.stringify(verses, null, 6)}
  }
}
`;

  return tsContent;
}

// Generate files for chapters 18-23
for (let i = 18; i <= 23; i++) {
  const chapterKey = `Genesis-${i}`;
  if (data[chapterKey]) {
    const chapterData = { ...data[chapterKey], chapter: i };
    const content = generateTypescriptFile(chapterData);
    const filePath = path.join(libDir, `genesis-${i}.ts`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created ${filePath}`);
  } else {
    console.log(`Chapter ${i} not found in JSON data`);
  }
}

console.log('Done generating Genesis chapters 18-23');
