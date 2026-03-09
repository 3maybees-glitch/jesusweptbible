import json
import os

# Read the JSON data from the read-only context
json_path = '/vercel/share/v0-project/user_read_only_context/text_attachments/genesis_dataset---1-23-QwCjV.json'

# Try alternative path
if not os.path.exists(json_path):
    json_path = 'user_read_only_context/text_attachments/genesis_dataset---1-23-QwCjV.json'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Group verses by chapter
chapters = {}
for verse in data:
    chapter_num = verse['chapter']
    if chapter_num not in chapters:
        chapters[chapter_num] = {
            'chapter': chapter_num,
            'verses': []
        }
    chapters[chapter_num]['verses'].append(verse)

# Generate TypeScript files for chapters 17-23
for chapter_num in range(17, 24):
    if chapter_num not in chapters:
        print(f"Warning: Chapter {chapter_num} not found in data")
        continue
    
    chapter_data = chapters[chapter_num]
    verses = chapter_data['verses']
    
    # Create TypeScript content
    ts_content = f"""export const genesis{chapter_num} = {json.dumps(chapter_data, ensure_ascii=False, indent=2)};

export default genesis{chapter_num};
"""
    
    # Write to file
    output_path = f'/vercel/share/v0-project/lib/genesis-{chapter_num}.ts'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Generated {output_path} with {len(verses)} verses")

print("All chapters generated successfully!")
