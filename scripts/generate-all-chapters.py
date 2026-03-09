#!/usr/bin/env python3
import json
import os

# Read the JSON file content
json_file = '/vercel/share/v0-project/genesis-data.json'

# Ensure the lib directory exists
os.makedirs('/vercel/share/v0-project/lib', exist_ok=True)

# Read the JSON data
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract chapters 17-23
chapters_to_export = [17, 18, 19, 20, 21, 22, 23]

for chapter_data in data['chapters']:
    chapter_num = chapter_data['chapter']
    
    if chapter_num not in chapters_to_export:
        continue
    
    # Generate TypeScript content
    ts_content = f"""export const genesis{chapter_num} = {{
  book: "Genesis",
  chapter: {chapter_num},
  chapterTheme: {{
    twoWordSummary: "{chapter_data['chapterTheme']['twoWordSummary']}",
    themeWords: {json.dumps(chapter_data['chapterTheme']['themeWords'], indent=6)},
  }},
  sentenceTheme: "{chapter_data['sentenceTheme']}",
  verses: {json.dumps(chapter_data['verses'], indent=4)},
}} as const;
"""
    
    # Write to file
    output_file = f'/vercel/share/v0-project/lib/genesis-{chapter_num}.ts'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Generated {output_file}")

print("All chapters generated successfully!")
