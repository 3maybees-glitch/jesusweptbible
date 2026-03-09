import fs from 'fs';
import path from 'path';

// Read the JSON file
const jsonPath = new URL('../user_read_only_context/text_attachments/genesis_dataset---1-23-QwCjV.json', import.meta.url);
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// Function to convert chapter data to TypeScript format
function convertChapterToTS(chapter) {
  const chapterNum = chapter.chapter;
  const exportName = `genesisChapter${chapterNum}`;
  
  // Build the verses array
  const versesCode = chapter.verses
    .map(verse => {
      const highlightedWordsCode = verse.highlightedWords
        .map(word => `{ word: "${word.word.replace(/"/g, '\\"')}", strongNumber: "${word.strongNumber}", lemma: "${word.lemma}", meaning: "${word.meaning.replace(/"/g, '\\"')}" }`)
        .join(', ');
      
      return `      { verseNumber: ${verse.verse}, text: "${verse.text.replace(/"/g, '\\"')}", highlightedWords: [${highlightedWordsCode}] }`;
    })
    .join(',\n');

  const themeWordsCode = chapter.chapterTheme.themeWords
    .map(word => `{ word: "${word.word}", strongNumber: "${word.strongNumber}", lemma: "${word.lemma}", meaning: "${word.meaning.replace(/"/g, '\\"')}" }`)
    .join(',\n      ');

  const twoWordSummary = chapter.chapterTheme.twoWordSummary;
  const themeSummary = chapter.sentenceTheme;

  const tsCode = `import { ChapterData } from "@/lib/bible-data"

export const ${exportName}: ChapterData = {
  "Genesis-${chapterNum}": {
    book: "Genesis",
    chapter: ${chapterNum},
    twoWordSummary: "${twoWordSummary}",
    themeSummary: "${themeSummary}",
    sentenceDescription: "${themeSummary}",
    themeWords: [
      ${themeWordsCode}
    ],
    verses: [
${versesCode}
    ]
  }
}
`;

  return tsCode;
}

// Generate files for chapters 17-23
for (let i = 17; i <= 23; i++) {
  const chapter = jsonData.chapters.find(c => c.chapter === i);
  if (chapter) {
    const tsCode = convertChapterToTS(chapter);
    const filePath = path.join('/vercel/share/v0-project/lib', `genesis-${i}.ts`);
    fs.writeFileSync(filePath, tsCode);
    console.log(`Created ${filePath}`);
  }
}

console.log('Conversion complete!');
