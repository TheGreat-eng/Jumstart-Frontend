// src/contexts/authContext.ts
import { createContext } from 'react';
import type { AuthContextType } from './authContextTypes';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
