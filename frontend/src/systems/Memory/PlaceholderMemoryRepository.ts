import type { MemoryRecord, MemoryRepository } from './types'

export class PlaceholderMemoryRepository implements MemoryRepository {
  private records: MemoryRecord[] = []

  async list(): Promise<MemoryRecord[]> {
    return structuredClone(this.records)
  }

  async remember(memory: MemoryRecord): Promise<void> {
    this.records = [...this.records, structuredClone(memory)]
  }
}
