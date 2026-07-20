import sharp from "sharp"
import { readFileSync } from "node:fs"

const svg = readFileSync("public/icon.svg")

async function writePng(size, outPath) {
  await sharp(svg).resize(size, size).png().toFile(outPath)
  console.log("wrote", outPath)
}

async function writeMaskable(size, outPath) {
  const content = Math.round(size * 0.72)
  const icon = await sharp(svg).resize(content, content).png().toBuffer()
  await sharp({
    create: { width: size, height: size, channels: 4, background: "#f5f0e8" },
  })
    .composite([{ input: icon, gravity: "centre" }])
    .png()
    .toFile(outPath)
  console.log("wrote", outPath)
}

async function writeDarkIcon(size, outPath) {
  const darkSvg = Buffer.from(`<svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="#2a241c"/>
  <g fill="#d4b896">
    <rect x="226" y="136" width="60" height="240" rx="8"/>
    <rect x="166" y="206" width="180" height="60" rx="8"/>
  </g>
</svg>`)
  await sharp(darkSvg).resize(size, size).png().toFile(outPath)
  console.log("wrote", outPath)
}

await writePng(32, "public/icon-light-32x32.png")
await writeDarkIcon(32, "public/icon-dark-32x32.png")
await writePng(180, "public/apple-icon.png")
await writePng(192, "public/icon-192.png")
await writePng(512, "public/icon-512.png")
await writeMaskable(192, "public/icon-192-maskable.png")
await writeMaskable(512, "public/icon-512-maskable.png")
