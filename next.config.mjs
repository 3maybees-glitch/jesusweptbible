import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { spawnSync } from "node:child_process"
import withSerwistInit from "@serwist/next"

const revision =
  spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ||
  crypto.randomUUID()

const hashFile = (filePath) =>
  createHash("md5").update(readFileSync(filePath)).digest("hex")

const publicPrecache = [
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "icon-192-maskable.png",
  "icon-512-maskable.png",
  "apple-icon.png",
  "icon.svg",
  "icon-light-32x32.png",
  "icon-dark-32x32.png",
].map((file) => ({
  url: `/${file}`,
  revision: hashFile(`public/${file}`),
}))

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  // Register from a client component so we can skip Despia native wrappers.
  register: false,
  // Keep the reader on the current chapter when connectivity returns.
  reloadOnOnline: false,
  // Do not glob the full public/ tree (Bible JSON + art). Precache only install essentials.
  globPublicPatterns: [],
  additionalPrecacheEntries: [{ url: "/~offline", revision }, ...publicPrecache],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

export default withSerwist(nextConfig)
