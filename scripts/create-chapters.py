#!/usr/bin/env python3
import json
import sys

# Read the JSON file from read-only context
json_path = "/vercel/share/v0-project/user_read_only_context/text_attachments/genesis_dataset---1-23-QwCjV.json"

try:
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    # Try alternate path
    json_path = "/user_read_only_context/text_attachments/genesis_dataset---1-23-QwCjV.json"
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

# Filter for chapters 17-23
chapters = [ch for ch in data['chapters'] if 17 <= ch['chapter'] <= 23]

# Generate TypeScript files for chapters 17-23
for chapter in chapters:
    chapter_num = chapter['chapter']
    
    # Build the TypeScript content
    ts_content = f"export const genesis{chapter_num} = {{\n"
    ts_content += f'  book: "Genesis",\n'
    ts_content += f'  chapter: {chapter_num},\n'
    
    # Add chapter theme
    theme = chapter.get('chapterTheme', {})
    ts_content += f'  chapterTheme: {{\n'
    ts_content += f'    twoWordSummary: {json.dumps(theme.get("twoWordSummary", ""))},\n'
    ts_content += f'    themeWords: {json.dumps(theme.get("themeWords", []), indent=6)},\n'
    ts_content += f'  }},\n'
    
    # Add sentence theme
    ts_content += f'  sentenceTheme: {json.dumps(chapter.get("sentenceTheme", ""))},\n'
    
    # Add verses
    ts_content += f'  verses: {json.dumps(chapter.get("verses", []), indent=4)},\n'
    ts_content += f'}} as const;\n'
    
    # Write to file
    output_path = f"/vercel/share/v0-project/lib/genesis-{chapter_num}.ts"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print(f"Created {output_path}")

print("All chapters 17-23 have been generated successfully!")
