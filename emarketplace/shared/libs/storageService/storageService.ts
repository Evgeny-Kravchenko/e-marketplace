export interface BasicStorageService {
  setItem(key: string, data: unknown): void;
  getItem(key: string): unknown | null;
  removeItem(key: string): void;
}

export class StorageService implements BasicStorageService {
  constructor(private readonly storage: Storage) {}

  setItem(key: string, data: unknown): void {
    this.storage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string): unknown | null {
    const data = this.storage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
