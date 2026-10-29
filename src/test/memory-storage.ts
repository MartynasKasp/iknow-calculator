// Minimal localStorage stand-in for tests running in Node.
export function installMemoryStorage() {
    const data = new Map<string, string>();
    const storage = {
        getItem: (key: string) => data.get(key) ?? null,
        setItem: (key: string, value: string) => { data.set(key, String(value)); },
        removeItem: (key: string) => { data.delete(key); },
        clear: () => data.clear(),
        key: (i: number) => [...data.keys()][i] ?? null,
        get length() { return data.size; },
    };
    Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true });
    return storage;
}
