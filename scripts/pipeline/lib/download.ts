import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { execFileSync } from 'node:child_process'

const CACHE_DIR = join(import.meta.dirname, '..', '.cache')

function cachePathFor(url: string): string {
  const safeName = url.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9._-]/g, '_')
  return join(CACHE_DIR, safeName)
}

/** Scarica un URL in una cache locale (non versionata) ed è idempotente tra run successivi. */
export async function downloadToCache(url: string): Promise<Buffer> {
  const cachePath = cachePathFor(url)
  if (existsSync(cachePath)) {
    return readFileSync(cachePath)
  }

  console.log(`  scarico ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Download fallito (${response.status}) per ${url}`)
  }
  const buffer = Buffer.from(await response.arrayBuffer())

  mkdirSync(dirname(cachePath), { recursive: true })
  writeFileSync(cachePath, buffer)
  return buffer
}

/** Decomprime un buffer bzip2 appoggiandosi al comando `bunzip2` di sistema. */
export function bunzip2(buffer: Buffer): Buffer {
  return execFileSync('bunzip2', ['-c'], { input: buffer, maxBuffer: 1024 * 1024 * 1024 })
}

export async function downloadAndDecompress(url: string): Promise<string> {
  const compressed = await downloadToCache(url)
  return bunzip2(compressed).toString('utf-8')
}

export async function downloadText(url: string): Promise<string> {
  const buffer = await downloadToCache(url)
  return buffer.toString('utf-8')
}
