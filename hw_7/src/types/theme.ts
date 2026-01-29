import React, {ReactNode} from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export type ThemeContextProviderProps = {
  children: ReactNode;
};