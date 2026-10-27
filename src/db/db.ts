import Dexie, { type EntityTable } from 'dexie'
import type {
  Card,
  Conversation,
  DailyStats,
  Exercise,
  GrammarUnit,
  JournalEntry,
  MediaItem,
  ReviewLog,
  Session,
  Settings,
} from '../types/models'

export class BabeleDB extends Dexie {
  cards!: EntityTable<Card, 'id'>
  reviewLogs!: EntityTable<ReviewLog, 'id'>
  grammarUnits!: EntityTable<GrammarUnit, 'id'>
  exercises!: EntityTable<Exercise, 'id'>
  mediaItems!: EntityTable<MediaItem, 'id'>
  journalEntries!: EntityTable<JournalEntry, 'id'>
  conversations!: EntityTable<Conversation, 'id'>
  sessions!: EntityTable<Session, 'id'>
  dailyStats!: EntityTable<DailyStats, 'id'>
  settings!: EntityTable<Settings, 'id'>

  constructor() {
    super('babele')
    this.version(1).stores({
      cards: '++id, language, lemma, pos, cognate, falseFriend',
      reviewLogs: '++id, cardId, due',
      grammarUnits: '++id, language, cefrLevel',
      exercises: '++id, type, grammarUnitId',
      mediaItems: '++id, language, type, status',
      journalEntries: '++id, language, createdAt',
      conversations: '++id, language, createdAt',
      sessions: '++id, date',
      dailyStats: '++id, date, language',
      settings: '++id, &key',
    })
  }
}

export const db = new BabeleDB()
