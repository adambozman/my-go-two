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

// Compatibility alias for legacy imports while the rename lands across the app.
export const KnowledgeCenterContext = UserProfileContext;
export const useKnowledgeCenter = useUserProfile;

// Codebase classification: runtime user-profile context contract.
