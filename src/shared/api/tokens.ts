import { LocalStorageKey } from "@shared/types";
import { Tokens } from "./types";

export const getTokens = (): Tokens | null => {
  const access = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
  const refresh = localStorage.getItem(LocalStorageKey.REFRESH_TOKEN);

  if (access && refresh) {
    return { access, refresh };
  }

  return null;
};

export const saveTokens = (tokens: Tokens): void => {
  localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, tokens.access);
  localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, tokens.refresh);
};

export const deleteTokens = () => {
  localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
};