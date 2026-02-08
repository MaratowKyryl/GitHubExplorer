import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Repository } from "@/src/feature/search/types/repossitory";

interface SelectedRepositoryContextValue {
  selectedRepository: Repository | null;
  selectRepository: (repository: Repository) => void;
  clearRepository: () => void;
}

const SelectedRepositoryContext =
  createContext<SelectedRepositoryContextValue | null>(null);

export function SelectedRepositoryProvider({ children }: PropsWithChildren) {
  const [selectedRepository, setSelectedRepository] =
    useState<Repository | null>(null);

  const selectRepository = useCallback((repository: Repository) => {
    setSelectedRepository(repository);
  }, []);

  const clearRepository = useCallback(() => {
    setSelectedRepository(null);
  }, []);

  const value = useMemo(
    () => ({ selectedRepository, selectRepository, clearRepository }),
    [selectedRepository, selectRepository, clearRepository],
  );

  return (
    <SelectedRepositoryContext.Provider value={value}>
      {children}
    </SelectedRepositoryContext.Provider>
  );
}

export function useSelectedRepository(): SelectedRepositoryContextValue {
  const context = useContext(SelectedRepositoryContext);
  if (context === null) {
    throw new Error(
      "useSelectedRepository must be used within SelectedRepositoryProvider",
    );
  }
  return context;
}
