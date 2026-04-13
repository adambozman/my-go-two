import { createContext, useContext } from "react";
import type { UseKnowledgeCenterResult } from "@/lib/knowledgeCenter";

const defaultUserProfileValue: UseKnowledgeCenterResult = {
  knowledgeSnapshot: null,
  knowledgeDerivations: [],
  loading: true,
  refreshKnowledge: async () => {},
};

export const UserProfileContext = createContext<UseKnowledgeCenterResult>(
  defaultUserProfileValue,
);

export const useUserProfile = () => useContext(UserProfileContext);

// Codebase classification: runtime user-profile context contract.
