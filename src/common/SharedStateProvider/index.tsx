import { Map } from "immutable";
import { createContext, ReactNode, useContext, useState } from "react";

const SharedStateContext = createContext({
  sharedState: Map<string, unknown>(),
  setSharedState: (value: Map<string, unknown>) => {},
});

export type GlobalStateProviderProps = { children?: ReactNode };

export function SharedStateProvider(props: GlobalStateProviderProps) {
  const [sharedState, setSharedState] = useState(Map<string, unknown>());
  return <SharedStateContext.Provider {...props} value={{ sharedState, setSharedState }} />;
}

export type SharedState<S = unknown> = [S | undefined, (value: S) => void];

export function useSharedState(key: string): SharedState {
  let { sharedState, setSharedState } = useContext(SharedStateContext);
  const state = sharedState.get(key);
  const setState = (value: unknown) => setSharedState(sharedState.set(key, value));
  return [state, setState];
}
