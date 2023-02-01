import { create } from 'zustand'

export const useGarmentStore = create((set) => ({
   showGarment: 0, 
   nextGarmentStore:   () => set({showGarment: 1}),
   prevGarmentStore:  () => set({showGarment: 0}),
}));

