import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the type for your store's state
interface ScaleDataStore {
  jsonData: any[] | null;
  setJsonData: (data: any[]) => void;
  clearJsonData: () => void;
}

// Create the store with persistence
const useScaleDataStore = create<ScaleDataStore>()(
  persist(
    (set) => ({
      jsonData: null, // Initial state
      setJsonData: (data: any[]) => set({ jsonData: data }), // Action to set data
      clearJsonData: () => set({ jsonData: null }), // Action to clear data
    }),
    {
      name: "scale-data-store", // Unique name for the storage key
      // @ts-ignore
      getStorage: () => localStorage, // Use localStorage (or sessionStorage)
    }
  )
);

export default useScaleDataStore;
