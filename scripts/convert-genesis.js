#!/usr/bin/env node
// This script converts the genesis JSON data to individual TypeScript chapter files

const data = JSON.parse(`... Content omitted to save tokens. You MUST use Read to get the full and current version before editing ...`);

// Filter chapters 17-23
const chapters = data.chapters.filter(ch => ch.chapter >= 17 && ch.chapter <= 23);

chapters.forEach(chapter => {
  const chapterNum = chapter.chapter;
  
  // Convert the JSON structure to match the existing TypeScript format
  const genesisData = {
    book: chapter.book,
    chapter: chapter.chapter,
    twoWordSummary: chapter.chapterTheme.twoWordSummary,
    themeSummary: chapter.sentenceTheme,
    sentenceDescription: chapter.sentenceTheme,
    themeWords: chapter.chapterTheme.themeWords,
    verses: chapter.verses.map(v => ({
      verseNumber: v.verse,
      text: v.text,
      highlightedWords: v.highlightedWords
    }))
  };
  
  const keyName = `Genesis-${chapterNum}`;
  const exportName = `genesisChapter${chapterNum}`;
  
  // Generate the TypeScript file content
  const fileContent = `import { ChapterData } from "@/lib/bible-data"

export const ${exportName}: ChapterData = {
  "${keyName}": ${JSON.stringify(genesisData, null, 2)}
}
`;
  
  // Write the file
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join('/vercel/share/v0-project/lib', `genesis-${chapterNum}.ts`);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Created ${filePath}`);
});

console.log('Genesis chapters 17-23 files created successfully!');
