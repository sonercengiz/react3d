
import { create } from 'zustand'
import { Vector3 } from 'three'

export const useStore = create((set) => ({
    to: new Vector3(0, 1, 10),
    orbitmode: false,
    setOrbitmode: (v) => set({ orbitmode: v }),
    autoRotate: false,
    setAutoRotate: (v) => set({ autoRotate: v })
  }))
  