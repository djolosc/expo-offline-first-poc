import { useEffect, useState } from "react";
import { getSyncState, subscribeSync } from "./syncState";

export const useSyncState = () => {
  const [state, setState] = useState(getSyncState());

  useEffect(() => subscribeSync(setState), []);

  return state;
};
