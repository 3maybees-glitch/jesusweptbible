#!/usr/bin/env python3
import json
import sys

# Read the JSON file
with open('/vercel/share/v0-project/genesis-data.json', 'r') as f:
    data = json.load(f)

# Filter chapters 17-23
chapters_to_create = [ch for ch in data['chapters'] if 17 <= ch['chapter'] <= 23]

for chapter_data in chapters_to_create:
    chapter_num = chapter_data['chapter']
    book = chapter_data['book']
    
    # Build the TypeScript content
    ts_content = f'''import {{ ChapterData }} from "@/lib/bible-data"

export const genesisChapter{chapter_num}: ChapterData = {{
  "Genesis-{chapter_num}": {{
    book: "{book}",
    chapter: {chapter_num},
    twoWordSummary: "{chapter_data['chapterTheme']['twoWordSummary']}",
    themeSummary: "{chapter_data['sentenceTheme']}",
    sentenceDescription: "{chapter_data['sentenceTheme']}",
    themeWords: {json.dumps(chapter_data['chapterTheme']['themeWords'], indent={4}).replace('"', '\\"')},
    verses: [
'''
    
    # Add verses
    for verse in chapter_data['verses']:
        verse_num = verse['verse']
        verse_text = verse['text'].replace('"', '\\"')
        highlighted = json.dumps(verse['highlightedWords'])
        ts_content += f'''      {{ verseNumber: {verse_num}, text: "{verse_text}", highlightedWords: {highlighted} }},
'''
    
    ts_content += '''    ]
  }
}
'''
    
    # Write the file
    filename = f'/vercel/share/v0-project/lib/genesis-{chapter_num}.ts'
    with open(filename, 'w') as f:
        f.write(ts_content)
    
    print(f"Created {filename}")

print("Genesis chapters 17-23 files created successfully!")
