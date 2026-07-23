/* global console, process */
// One-off image processing: flood-fill remove the white background (only
// pixels connected to the image border — preserves the astronaut suit's
// own white/gray areas, which are enclosed by outlines, not touching the
// edge), then resize to 500x500. Run with: node scripts/process-mascot-image.mjs
import sharp from 'sharp'

const SRC = 'public/images/contact_us.png'
const OUT = 'public/images/mascot-contact-us.png'
const WHITE_THRESHOLD = 235 // pixel counts as "background white" if r,g,b all >= this
const TOLERANCE = 18 // max channel delta from the seed color to keep flood-filling

async function main() {
  const image = sharp(SRC)
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  const isBackgroundish = (idx) => {
    const r = data[idx]
    const g = data[idx + 1]
    const b = data[idx + 2]
    return r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD
  }

  const visited = new Uint8Array(width * height)
  const stack = []

  const pushIfBackground = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const pixelIndex = y * width + x
    if (visited[pixelIndex]) return
    const idx = pixelIndex * channels
    if (!isBackgroundish(idx)) return
    visited[pixelIndex] = 1
    stack.push(pixelIndex)
  }

  for (let x = 0; x < width; x++) {
    pushIfBackground(x, 0)
    pushIfBackground(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    pushIfBackground(0, y)
    pushIfBackground(width - 1, y)
  }

  while (stack.length) {
    const pixelIndex = stack.pop()
    const x = pixelIndex % width
    const y = Math.floor(pixelIndex / width)
    const idx = pixelIndex * channels
    data[idx + 3] = 0 // set alpha to 0

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      const nPixelIndex = ny * width + nx
      if (visited[nPixelIndex]) continue
      const nIdx = nPixelIndex * channels
      const r = data[nIdx]
      const g = data[nIdx + 1]
      const b = data[nIdx + 2]
      // Keep flood-filling through near-white pixels (anti-aliased edges),
      // using a tolerance band so it doesn't leak into the suit's shading.
      if (r >= WHITE_THRESHOLD - TOLERANCE && g >= WHITE_THRESHOLD - TOLERANCE && b >= WHITE_THRESHOLD - TOLERANCE) {
        visited[nPixelIndex] = 1
        stack.push(nPixelIndex)
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .resize(500, 500, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(OUT)

  console.log(`Written ${OUT} (500x500, background removed)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
