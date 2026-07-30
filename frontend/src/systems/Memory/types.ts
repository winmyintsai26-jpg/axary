export interface MemoryRecord {
  createdAt: string
  id: string
  kind: 'dialogue' | 'reflection' | 'world-visit'
  summary: string
  worldId?: string
}

export interface MemoryRepository {
  list(): Promise<MemoryRecord[]>
  remember(memory: MemoryRecord): Promise<void>
}
