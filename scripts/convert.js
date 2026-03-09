const fs = require('fs');
const path = require('path');

// Read the JSON data from read-only context
const jsonPath = '/vercel/share/user_read_only_context/text_attachments/genesis_dataset---1-23-QwCjV.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Filter chapters 17-23
const chapters = data.filter(item => item.chapter >= 17 && item.chapter <= 23);

// Generate TypeScript files for each chapter
chapters.forEach(chapterData => {
  const chapterNum = chapterData.chapter;
  const fileName = `genesis-${chapterNum}.ts`;
  const filePath = path.join('/vercel/share/v0-project/lib', fileName);
  
  // Format verses
  const versesCode = chapterData.verses.map(verse => `      {
        verseNumber: ${verse.verse},
        text: "${verse.text.replace(/"/g, '\\"')}",
        highlightedWords: [${verse.words.map(w => `
          { word: "${w.word}", strongNumber: "${w.strongNumber}", lemma: "${w.lemma}", meaning: "${w.meaning.replace(/"/g, '\\"')}" }`).join(',')
        }
        ]
      }`).join(',\n');
  
  const themeWordsCode = chapterData.theme_words.map(w => `      { word: "${w.word}", strongNumber: "${w.strongNumber}", language: "Hebrew", lemma: "${w.lemma}", meaning: "${w.meaning.replace(/"/g, '\\"')}" }`).join(',\n');
  
  const tsContent = `import { ChapterData } from "@/lib/bible-data"

export const genesisChapter${chapterNum}: ChapterData = {
  "Genesis-${chapterNum}": {
    book: "Genesis",
    chapter: ${chapterNum},
    twoWordSummary: "${chapterData.twoWordSummary}",
    themeSummary: "${chapterData.themeSummary.replace(/"/g, '\\"')}",
    sentenceDescription: "${chapterData.sentenceDescription.replace(/"/g, '\\"')}",
    themeWords: [
${themeWordsCode}
    ],
    verses: [
${versesCode}
    ]
  }
}
`;

  fs.writeFileSync(filePath, tsContent, 'utf8');
  console.log(`Created ${fileName}`);
});

console.log('Done! Generated chapters 17-23.');
