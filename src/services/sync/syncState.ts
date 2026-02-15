type SyncStatus = "idle" | "syncing" | "error" | "offline";

type SyncState = {
  status: SyncStatus;
  pending: number;
  lastSync: number | null;
  failed: number;
};

let state: SyncState = {
  status: "idle",
  pending: 0,
  lastSync: null,
  failed: 0,
};

const linsteners = new Set<(s: SyncState) => void>();

export const setSyncState = (partial: Partial<SyncState>) => {
  state = { ...state, ...partial };
  linsteners.forEach((l) => l(state));
};

export const subscribeSync = (listener: (s: SyncState) => void) => {
  linsteners.add(listener);
  return () => {
    linsteners.delete(listener);
  };
};

export const getSyncState = () => state;
