import { db } from './db'

const BACKUP_VERSION = 1

interface BackupPayload {
  backupVersion: number
  exportedAt: string
  tables: Record<string, unknown[]>
}

const TABLE_NAMES = [
  'cards',
  'reviewLogs',
  'grammarUnits',
  'exercises',
  'mediaItems',
  'journalEntries',
  'conversations',
  'sessions',
  'dailyStats',
  'settings',
] as const

export async function exportBackupText(): Promise<string> {
  const tables: Record<string, unknown[]> = {}
  for (const name of TABLE_NAMES) {
    tables[name] = await db.table(name).toArray()
  }
  const payload: BackupPayload = {
    backupVersion: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    tables,
  }
  return JSON.stringify(payload, null, 2)
}

export async function exportBackup(): Promise<Blob> {
  return new Blob([await exportBackupText()], { type: 'application/json' })
}

export async function downloadBackup(): Promise<void> {
  const blob = await exportBackup()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `babele-backup-${date}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importBackupText(text: string): Promise<void> {
  const payload = JSON.parse(text) as BackupPayload

  if (typeof payload.backupVersion !== 'number' || typeof payload.tables !== 'object') {
    throw new Error('File di backup non valido.')
  }

  await db.transaction('rw', TABLE_NAMES, async () => {
    for (const name of TABLE_NAMES) {
      const rows = payload.tables[name]
      if (!Array.isArray(rows)) continue
      await db.table(name).clear()
      await db.table(name).bulkPut(rows)
    }
  })
}

export async function importBackup(file: File): Promise<void> {
  await importBackupText(await file.text())
}
