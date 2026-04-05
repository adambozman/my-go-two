import { createContext, useContext } from "react";
import type { UseKnowledgeCenterResult } from "@/lib/knowledgeCenter";

const defaultKnowledgeCenterValue: UseKnowledgeCenterResult = {
  knowledgeSnapshot: null,
  knowledgeDerivations: [],
  loading: true,
  refreshKnowledge: async () => {},
};

export const KnowledgeCenterContext = createContext<UseKnowledgeCenterResult>(
  defaultKnowledgeCenterValue,
);

export const useKnowledgeCenter = () => useContext(KnowledgeCenterContext);

// Codebase classification: runtime knowledge-center context contract.
