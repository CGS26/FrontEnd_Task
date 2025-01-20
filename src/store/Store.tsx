import { create } from 'zustand';
interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}
interface TableStore {
  page: number;
  rowsPerPage: number;
  setPage: (newPage: number) => void;
  setRowsPerPage: (newRowsPerPage: number) => void;
}
export const useStore = create<AppState>((set:any) => ({
  language: 'en',
  setLanguage: (lang:string) => set({ language: lang }),
  theme: 'light',
  setTheme: (theme:string) => set({ theme }),
}));


export const useTableStore = create<TableStore>((set) => ({
  page: 0,
  rowsPerPage:15,
  setPage: (newPage: number) => set({ page: newPage }),
  setRowsPerPage: (newRowsPerPage: number) => set({ rowsPerPage: newRowsPerPage }),
}));